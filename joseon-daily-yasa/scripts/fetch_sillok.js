const fs = require('fs');
const path = require('path');

// 조선 왕조 실록 코드 -> 왕 이름 & 원년(재위 1년) 서기 연도
const KING_INFO = {
  kaa: { name: '태조', baseYear: 1392 },
  kba: { name: '정종', baseYear: 1399 },
  kca: { name: '태종', baseYear: 1401 },
  kda: { name: '세종', baseYear: 1419 },
  kea: { name: '문종', baseYear: 1451 },
  kfa: { name: '단종', baseYear: 1453 },
  kga: { name: '세조', baseYear: 1455 },
  kha: { name: '예종', baseYear: 1469 },
  kia: { name: '성종', baseYear: 1470 },
  kja: { name: '연산군', baseYear: 1495 },
  kka: { name: '중종', baseYear: 1506 },
  kla: { name: '인종', baseYear: 1545 },
  kma: { name: '명종', baseYear: 1546 },
  kna: { name: '선조', baseYear: 1568 },
  koa: { name: '광해군', baseYear: 1609 },
  kpa: { name: '인조', baseYear: 1623 },
  kqa: { name: '효종', baseYear: 1650 },
  kra: { name: '현종', baseYear: 1660 },
  ksa: { name: '숙종', baseYear: 1675 },
  kta: { name: '경종', baseYear: 1721 },
  kua: { name: '영조', baseYear: 1725 },
  kva: { name: '정조', baseYear: 1777 },
  kwa: { name: '순조', baseYear: 1801 },
  kxa: { name: '헌종', baseYear: 1835 },
  kya: { name: '철종', baseYear: 1850 },
  kza: { name: '고종', baseYear: 1864 }
};

// 건조한 행정·의례 기사 제외 패턴
const BORING_PATTERNS = [
  /복명하다$/,
  /제사를 지내다/,
  /하례를 받다/,
  /진하하다/,
  /사은하다/,
  /윤대하다/,
  /상참을 받다/,
  /조참을 받다/,
  /정사를 보다/,
  /친히 제사/,
  /사신을 보내/,
  /방물을 바치/,
  /시호를 내리/,
  /능에 거둥/,
  /관직을 제수/,
  /로 삼다$/
];

// 서사·드라마·기이함 가산점 패턴
const DRAMATIC_KEYWORDS = [
  '죽이다', '살해', '도망', '몰래', '밤에', '괴이', '변괴', '불덩이', '울다', '통곡',
  '웃다', '속이다', '역모', '모반', '자객', '독약', '사약', '귀신', '호랑이', '표범',
  '벼락', '혜성', '지진', '우박', '유배', '파직', '국문', '고문', '투서', '벽서',
  '기생', '간통', '궁녀', '암행어사', '도둑', '의병', '거북선', '화포', '표류'
];

// 시대·인물·사건 중심 확장 키워드
const SEARCH_QUERIES = [
  // 미스터리·천변·기이한 일
  { word: '호랑이', category: 'mystery', tags: ['호랑이', '야생동물', '한양야사'] },
  { word: '표범', category: 'mystery', tags: ['표범', '야생동물', '한양야사'] },
  { word: '혜성', category: 'mystery', tags: ['혜성', '천변', '관상감'] },
  { word: '우박', category: 'mystery', tags: ['우박', '이상기후', '천변'] },
  { word: '유성', category: 'mystery', tags: ['유성', '별똥별', '천문'] },
  { word: '지진', category: 'mystery', tags: ['지진', '천변', '재이'] },
  { word: '일식', category: 'mystery', tags: ['일식', '천문', '관상감'] },
  { word: '도깨비', category: 'mystery', tags: ['도깨비', '괴담', '민간전승'] },
  { word: '무지개', category: 'mystery', tags: ['무지개', '천변', '기상'] },
  { word: '벼락', category: 'mystery', tags: ['벼락', '천변', '기이한일'] },
  { word: '화재', category: 'mystery', tags: ['화재', '한양도성', '금화'] },
  { word: '괴이', category: 'mystery', tags: ['괴이', '미스터리', '기문'] },
  { word: '불덩이', category: 'mystery', tags: ['불덩이', '천변', '미스터리'] },
  { word: '피비', category: 'mystery', tags: ['피비', '괴변', '천변'] },
  { word: '쌍태아', category: 'mystery', tags: ['기문', '민생', '야사'] },

  // 궁중 비화·정쟁·핵심 인물
  { word: '장녹수', category: 'scandal', tags: ['장녹수', '연산군', '궁중비화'] },
  { word: '장희빈', category: 'scandal', tags: ['장희빈', '숙종', '궁중비화'] },
  { word: '사도세자', category: 'scandal', tags: ['사도세자', '영조', '정조'] },
  { word: '김안로', category: 'scandal', tags: ['김안로', '권신', '정쟁'] },
  { word: '김개시', category: 'scandal', tags: ['김개시', '광해군', '궁중비화'] },
  { word: '정여립', category: 'scandal', tags: ['정여립', '기축옥사', '선조'] },
  { word: '허균', category: 'scandal', tags: ['허균', '홍길동', '광해군'] },
  { word: '이괄', category: 'scandal', tags: ['이괄의난', '인조', '반란'] },
  { word: '홍경래', category: 'scandal', tags: ['홍경래의난', '순조', '민란'] },
  { word: '어우동', category: 'scandal', tags: ['어우동', '성종', '스캔들'] },
  { word: '역모', category: 'scandal', tags: ['역모', '옥사', '궁중비화'] },
  { word: '투서', category: 'scandal', tags: ['투서', '벽서', '음모'] },
  { word: '독약', category: 'scandal', tags: ['독약', '암살', '궁중비화'] },
  { word: '금주령', category: 'scandal', tags: ['금주령', '술', '풍속'] },
  { word: '궁녀', category: 'scandal', tags: ['궁녀', '궁중생활', '비화'] },
  { word: '간통', category: 'scandal', tags: ['간통', '풍속', '형벌'] },
  { word: '뇌물', category: 'scandal', tags: ['뇌물', '탐관오리', '감찰'] },
  { word: '사치', category: 'scandal', tags: ['사치', '풍속단속', '양반'] },

  // 야담·기인·백성 이야기
  { word: '암행어사', category: 'folklore', tags: ['암행어사', '민생', '탐관오리'] },
  { word: '도둑', category: 'folklore', tags: ['도둑', '치안', '야담'] },
  { word: '임꺽정', category: 'folklore', tags: ['임꺽정', '의적', '명종'] },
  { word: '과거시험', category: 'folklore', tags: ['과거시험', '선비', '유생'] },
  { word: '포도청', category: 'folklore', tags: ['포도청', '치안', '수사'] },
  { word: '표류', category: 'folklore', tags: ['표류', '바다', '외국인'] },
  { word: '기생', category: 'folklore', tags: ['기생', '풍류', '야담'] },
  { word: '무당', category: 'folklore', tags: ['무당', '민간신앙', '기우제'] },
  { word: '보부상', category: 'folklore', tags: ['보부상', '상인', '장터'] },
  { word: '화포', category: 'folklore', tags: ['화포', '무기', '국방'] },
  { word: '거북선', category: 'folklore', tags: ['거북선', '수군', '해전'] },
  { word: '의병', category: 'folklore', tags: ['의병', '전란', '구국'] },
  { word: '이순신', category: 'folklore', tags: ['이순신', '임진왜란', '수군'] },
  { word: '효자', category: 'folklore', tags: ['효자', '미담', '포상'] },

  // 왕의 일상·문화·과학·개혁
  { word: '장영실', category: 'episode', tags: ['장영실', '세종', '과학'] },
  { word: '측우기', category: 'episode', tags: ['측우기', '과학', '기상'] },
  { word: '해시계', category: 'episode', tags: ['해시계', '천문', '과학'] },
  { word: '한글', category: 'episode', tags: ['한글', '언문', '세종'] },
  { word: '정약용', category: 'episode', tags: ['정약용', '정조', '실학'] },
  { word: '박지원', category: 'episode', tags: ['박지원', '실학', '정조'] },
  { word: '김홍도', category: 'episode', tags: ['김홍도', '화원', '정조'] },
  { word: '사냥', category: 'episode', tags: ['사냥', '강무', '왕의일상'] },
  { word: '기우제', category: 'episode', tags: ['기우제', '가뭄', '애민'] },
  { word: '온천', category: 'episode', tags: ['온천', '행차', '요양'] },
  { word: '귤', category: 'episode', tags: ['진상품', '제주귤', '궁중음식'] },
  { word: '대동법', category: 'episode', tags: ['대동법', '세금개혁', '민생'] },
  { word: '균역법', category: 'episode', tags: ['균역법', '군역', '영조'] },
  { word: '탕평', category: 'episode', tags: ['탕평책', '영조', '정조'] },
  { word: '의원', category: 'episode', tags: ['의원', '내의원', '의술'] },
  { word: '허준', category: 'episode', tags: ['허준', '동의보감', '의술'] },
  { word: '빙고', category: 'episode', tags: ['빙고', '얼음', '계절일상'] },
  { word: '동지', category: 'episode', tags: ['동지', '세시풍속', '겨울'] },
  { word: '단오', category: 'episode', tags: ['단오', '부채', '세시풍속'] },
  { word: '추석', category: 'episode', tags: ['추석', '가을', '세시풍속'] },
  { word: '모내기', category: 'episode', tags: ['모내기', '농사', '봄여름'] },
  { word: '수라', category: 'episode', tags: ['수라상', '궁중음식', '왕의일상'] },
  { word: '매화', category: 'episode', tags: ['매화', '봄풍경', '궁궐'] },
  { word: '국화', category: 'episode', tags: ['국화', '가을풍경', '궁궐'] },
  { word: '부채', category: 'episode', tags: ['부채', '여름', '진상품'] },
  { word: '세찬', category: 'episode', tags: ['세찬', '설날', '겨울'] }
];

function stripHtml(str) {
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreArticle(title, textRaw, year) {
  // 건조한 행정·의례 기사 필터링
  if (BORING_PATTERNS.some(p => p.test(title))) {
    return -1;
  }

  let score = 78;
  // 본문 구체성
  if (textRaw.length >= 60) score += 4;
  if (textRaw.length >= 110) score += 5;
  if (textRaw.length >= 160) score += 3;

  // 대화/인용 포함 여부
  if (/[""'「」]|이르기를|말하기를|아뢰기를/.test(textRaw)) score += 6;

  // 극적 사건 키워드
  let dramaHits = 0;
  for (const kw of DRAMATIC_KEYWORDS) {
    if (title.includes(kw) || textRaw.includes(kw)) dramaHits++;
  }
  score += Math.min(12, dramaHits * 4);

  // 후대 실록(1500년 이후) 균형 보너스
  if (year >= 1500) score += 2;
  if (year >= 1650) score += 2;

  return Math.min(99, score);
}

async function fetchQueryPage(q, pageIndex) {
  const params = new URLSearchParams({
    topSearchWord: q.word,
    sillokType: 'S',
    pageIndex: String(pageIndex)
  });
  const res = await fetch('https://sillok.history.go.kr/search/searchResultList.do', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });
  const html = await res.text();

  const items = [];
  const blockRegex = /<a href="javascript:goView\('([^']+)'[^)]*\);" class="subject">([\s\S]*?)<\/a>\s*<p class="text">([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = blockRegex.exec(html)) !== null) {
    const id = m[1];
    const subjectRaw = stripHtml(m[2]);
    const textRaw = stripHtml(m[3]);

    const kingPrefix = id.slice(0, 3);
    const kingMeta = KING_INFO[kingPrefix];
    if (!kingMeta) continue;

    const metaMatch = subjectRaw.match(/^\d+\.\s*([^,]+),\s*([^\s]+)\s+(즉위년|\d+년)\s+(\d+)월\s+(\d+)일\s+[^/]+\/\s*(.+)$/);
    if (!metaMatch) continue;

    const sillokBook = metaMatch[1].trim();
    const kingLabel = metaMatch[2].trim();
    const reignYearStr = metaMatch[3].trim();
    const month = parseInt(metaMatch[4], 10);
    const day = parseInt(metaMatch[5], 10);
    const title = metaMatch[6].trim();

    if (month < 1 || month > 12 || day < 1 || day > 31) continue;
    if (textRaw.length < 40 || title.length < 8) continue;

    const reignNum = reignYearStr === '즉위년' ? 0 : Math.max(0, parseInt(reignYearStr, 10) - 1);
    const year = kingMeta.baseYear + reignNum;

    const interestScore = scoreArticle(title, textRaw, year);
    if (interestScore < 82) continue; // 흥미도 미달(단순 보고 등) 제외

    items.push({
      id: `sillok-${id}`,
      month,
      day,
      year,
      king: `${kingLabel} ${reignYearStr}`,
      lunarDate: `음력 ${month}월 ${day}일 (${sillokBook})`,
      category: q.category,
      interestScore,
      title,
      subtitle: `${kingLabel} ${reignYearStr}에 기록된 실제 《조선왕조실록》 기사`,
      source: `《${sillokBook}》`,
      sillokUrl: `https://sillok.history.go.kr/id/${id}`,
      tags: q.tags,
      summary: textRaw,
      officialRecord: textRaw,
      yasaStory: `${year}년(${kingLabel} ${reignYearStr}) ${month}월 ${day}일 실록에 기록된 실제 사건입니다.\n\n"${textRaw}"\n\n(※ 원문 전체 및 한문 원전은 국사편찬위원회 조선왕조실록 링크에서 확인하실 수 있습니다.)`,
      historianNote: `국사편찬위원회 조선왕조실록 정선 아카이브 (흥미도 ${interestScore}점 · ID: ${id})`
    });
  }
  return items;
}

async function main() {
  const seenIds = new Set();
  const byDate = new Map();

  // 전 시대(초기·중기·후기) 분산을 위해 pageIndex 1, 3, 7 샘플링
  const tasks = [];
  for (const q of SEARCH_QUERIES) {
    tasks.push({ q, page: 1 });
    tasks.push({ q, page: 3 });
    tasks.push({ q, page: 7 });
  }

  // 8개씩 병렬 처리
  for (let i = 0; i < tasks.length; i += 8) {
    const batch = tasks.slice(i, i + 8);
    const results = await Promise.all(
      batch.map(({ q, page }) => fetchQueryPage(q, page).catch(() => []))
    );
    for (const items of results) {
      for (const item of items) {
        if (seenIds.has(item.id)) continue;
        seenIds.add(item.id);
        const key = `${String(item.month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`;
        if (!byDate.has(key)) byDate.set(key, []);
        byDate.get(key).push(item);
      }
    }
  }

  // 날짜별로 흥미도 점수 높은 순으로 정선 (최대 10편씩, 시대 분산)
  const collected = [];
  for (const [key, list] of byDate.entries()) {
    list.sort((a, b) => b.interestScore - a.interestScore);
    const picked = list.slice(0, 10);
    collected.push(...picked);
  }

  // 시대별 분포 집계
  const eraCount = { early: 0, mid: 0, late: 0 };
  collected.forEach(s => {
    if (s.year < 1500) eraCount.early++;
    else if (s.year < 1650) eraCount.mid++;
    else eraCount.late++;
  });

  console.log(`Total candidates: ${seenIds.size}, Curated selected: ${collected.length}, Dates: ${byDate.size}`);
  console.log('Era distribution:', eraCount);

  const outPath = path.join(__dirname, '..', 'stories_sillok.js');
  const fileContent = `// 국사편찬위원회 조선왕조실록(sillok.history.go.kr) 기반 흥미도 정선 & 전 시대 아카이브
// 자동 생성: ${new Date().toISOString().slice(0, 10)} (총 ${collected.length}편)

const SILLOK_STORIES = ${JSON.stringify(collected, null, 2)};

if (typeof CURATED_STORIES !== 'undefined') {
  SILLOK_STORIES.forEach(story => {
    const key = \`\${String(story.month).padStart(2, '0')}-\${String(story.day).padStart(2, '0')}\`;
    if (!CURATED_STORIES[key]) {
      CURATED_STORIES[key] = [];
    }
    if (!CURATED_STORIES[key].some(existing => existing.id === story.id)) {
      CURATED_STORIES[key].push(story);
    }
  });
}
`;
  fs.writeFileSync(outPath, fileContent, 'utf8');
  console.log('Saved to:', outPath);
}

main();
