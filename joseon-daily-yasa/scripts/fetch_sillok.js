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

// 흥미로운 야사/사건 중심 검색 키워드 및 카테고리 매핑 (대폭 확충)
const SEARCH_QUERIES = [
  { word: '호랑이', category: 'mystery', tags: ['호랑이', '야생동물', '한양야사'] },
  { word: '표범', category: 'mystery', tags: ['표범', '야생동물', '한양야사'] },
  { word: '혜성', category: 'mystery', tags: ['혜성', '천변', '관상감'] },
  { word: '우박', category: 'mystery', tags: ['우박', '이상기후', '천변'] },
  { word: '유성', category: 'mystery', tags: ['유성', '별똥별', '천문'] },
  { word: '지진', category: 'mystery', tags: ['지진', '천변', '재이'] },
  { word: '일식', category: 'mystery', tags: ['일식', '천문', '관상감'] },
  { word: '월식', category: 'mystery', tags: ['월식', '천문', '관상감'] },
  { word: '도깨비', category: 'mystery', tags: ['도깨비', '괴담', '민간전승'] },
  { word: '무지개', category: 'mystery', tags: ['무지개', '천변', '기상'] },
  { word: '서리', category: 'mystery', tags: ['서리', '이상기후', '농사'] },
  { word: '벼락', category: 'mystery', tags: ['벼락', '천변', '기이한일'] },
  { word: '화재', category: 'mystery', tags: ['화재', '한양도성', '금화'] },
  { word: '역병', category: 'mystery', tags: ['역병', '의술', '민생'] },
  { word: '메뚜기', category: 'mystery', tags: ['메뚜기', '황충', '기근'] },
  { word: '괴이', category: 'mystery', tags: ['괴이', '미스터리', '기문'] },
  { word: '역모', category: 'scandal', tags: ['역모', '옥사', '궁중비화'] },
  { word: '금주령', category: 'scandal', tags: ['금주령', '술', '풍속'] },
  { word: '궁녀', category: 'scandal', tags: ['궁녀', '궁중생활', '비화'] },
  { word: '뇌물', category: 'scandal', tags: ['뇌물', '탐관오리', '감찰'] },
  { word: '사치', category: 'scandal', tags: ['사치', '풍속단속', '양반'] },
  { word: '내시', category: 'scandal', tags: ['내시', '환관', '궁중비화'] },
  { word: '유배', category: 'scandal', tags: ['유배', '정쟁', '사화'] },
  { word: '탄핵', category: 'scandal', tags: ['탄핵', '사헌부', '정쟁'] },
  { word: '투서', category: 'scandal', tags: ['투서', '벽서', '음모'] },
  { word: '무고', category: 'scandal', tags: ['무고', '옥사', '재판'] },
  { word: '간통', category: 'scandal', tags: ['간통', '풍속', '형벌'] },
  { word: '첩', category: 'scandal', tags: ['첩', '양반가', '궁중비화'] },
  { word: '장녹수', category: 'scandal', tags: ['장녹수', '연산군', '비화'] },
  { word: '김안로', category: 'scandal', tags: ['김안로', '권신', '정쟁'] },
  { word: '암행어사', category: 'folklore', tags: ['암행어사', '민생', '탐관오리'] },
  { word: '도둑', category: 'folklore', tags: ['도둑', '치안', '야담'] },
  { word: '과거시험', category: 'folklore', tags: ['과거시험', '선비', '유생'] },
  { word: '화포', category: 'folklore', tags: ['화포', '무기', '국방'] },
  { word: '의병', category: 'folklore', tags: ['의병', '전란', '구국'] },
  { word: '선비', category: 'folklore', tags: ['선비', '유학자', '야담'] },
  { word: '승려', category: 'folklore', tags: ['승려', '사찰', '불교'] },
  { word: '무당', category: 'folklore', tags: ['무당', '민간신앙', '기우제'] },
  { word: '포도청', category: 'folklore', tags: ['포도청', '치안', '수사'] },
  { word: '보부상', category: 'folklore', tags: ['보부상', '상인', '장터'] },
  { word: '표류', category: 'folklore', tags: ['표류', '바다', '외국인'] },
  { word: '왜구', category: 'folklore', tags: ['왜구', '해안방어', '수군'] },
  { word: '거북선', category: 'folklore', tags: ['거북선', '수군', '해전'] },
  { word: '활쏘기', category: 'folklore', tags: ['활쏘기', '무예', '과거'] },
  { word: '기생', category: 'folklore', tags: ['기생', '풍류', '야담'] },
  { word: '효자', category: 'folklore', tags: ['효자', '미담', '포상'] },
  { word: '기우제', category: 'episode', tags: ['기우제', '가뭄', '애민'] },
  { word: '사냥', category: 'episode', tags: ['사냥', '강무', '왕의일상'] },
  { word: '경연', category: 'episode', tags: ['경연', '학문', '토론'] },
  { word: '측우기', category: 'episode', tags: ['측우기', '과학', '기상'] },
  { word: '해시계', category: 'episode', tags: ['해시계', '천문', '과학'] },
  { word: '백성', category: 'episode', tags: ['백성', '민생', '구휼'] },
  { word: '귤', category: 'episode', tags: ['진상품', '제주귤', '궁중음식'] },
  { word: '연회', category: 'episode', tags: ['연회', '궁중잔치', '풍악'] },
  { word: '온천', category: 'episode', tags: ['온천', '행차', '요양'] },
  { word: '인삼', category: 'episode', tags: ['인삼', '의약', '특산물'] },
  { word: '금속활자', category: 'episode', tags: ['활자', '인쇄', '서적'] },
  { word: '대동법', category: 'episode', tags: ['대동법', '세금개혁', '민생'] },
  { word: '균역법', category: 'episode', tags: ['균역법', '군역', '영조'] },
  { word: '한글', category: 'episode', tags: ['한글', '언문', '세종'] },
  { word: '의원', category: 'episode', tags: ['의원', '내의원', '의술'] },
  { word: '서원', category: 'episode', tags: ['서원', '유학', '교육'] },
  { word: '거둥', category: 'episode', tags: ['거둥', '행차', '어가'] },
  { word: '시전', category: 'episode', tags: ['시전', '상업', '한양'] },
  { word: '노비', category: 'episode', tags: ['노비', '신분제', '사회'] }
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

async function fetchQuery(q) {
  const params = new URLSearchParams({ topSearchWord: q.word, sillokType: 'S' });
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

    // 예: "1. 태조실록 2권, 태조 1년 윤12월 20일 병신 1번째기사 / 성안에 들어온 호랑이를..."
    const kingPrefix = id.slice(0, 3);
    const kingMeta = KING_INFO[kingPrefix];
    if (!kingMeta) continue;

    // 윤달 제외, 일반 월/일 파싱
    const metaMatch = subjectRaw.match(/^\d+\.\s*([^,]+),\s*([^\s]+)\s+(즉위년|\d+년)\s+(\d+)월\s+(\d+)일\s+[^/]+\/\s*(.+)$/);
    if (!metaMatch) continue;

    const sillokBook = metaMatch[1].trim();
    const kingLabel = metaMatch[2].trim();
    const reignYearStr = metaMatch[3].trim();
    const month = parseInt(metaMatch[4], 10);
    const day = parseInt(metaMatch[5], 10);
    const title = metaMatch[6].trim();

    if (month < 1 || month > 12 || day < 1 || day > 31) continue;
    if (textRaw.length < 30 || title.length < 6) continue;

    const reignNum = reignYearStr === '즉위년' ? 0 : Math.max(0, parseInt(reignYearStr, 10) - 1);
    const year = kingMeta.baseYear + reignNum;

    items.push({
      id: `sillok-${id}`,
      month,
      day,
      year,
      king: `${kingLabel} ${reignYearStr}`,
      lunarDate: `음력 ${month}월 ${day}일 (${sillokBook})`,
      category: q.category,
      interestScore: 86 + (textRaw.length > 100 ? 4 : 0),
      title,
      subtitle: `${kingLabel} ${reignYearStr}에 기록된 실제 《조선왕조실록》 기사`,
      source: `《${sillokBook}》`,
      sillokUrl: `https://sillok.history.go.kr/id/${id}`,
      tags: q.tags,
      summary: textRaw,
      officialRecord: textRaw,
      yasaStory: `${year}년(${kingLabel} ${reignYearStr}) ${month}월 ${day}일 실록에 실제로 기록된 이야기입니다.\n\n당시 조정과 백성들 사이에서 일어난 이 사건은 《${sillokBook}》에 다음과 같이 생생히 남아 있습니다.\n\n"${textRaw}"\n\n(※ 원문 전체 및 한문 원전은 국사편찬위원회 조선왕조실록 링크에서 확인하실 수 있습니다.)`,
      historianNote: `국사편찬위원회 조선왕조실록 아카이브 (기사 ID: ${id})`
    });
  }
  return items;
}

async function main() {
  const seenIds = new Set();
  const dateCounts = new Map();
  const collected = [];

  for (const q of SEARCH_QUERIES) {
    try {
      const items = await fetchQuery(q);
      let added = 0;
      for (const item of items) {
        if (seenIds.has(item.id)) continue;
        const key = `${String(item.month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`;
        const curCount = dateCounts.get(key) || 0;
        if (curCount >= 12) continue; // 날짜당 최대 12편까지 넉넉히 수집

        seenIds.add(item.id);
        dateCounts.set(key, curCount + 1);
        collected.push(item);
        added++;
      }
      console.log(`[${q.word}] fetched=${items.length}, added=${added}`);
    } catch (e) {
      console.error(`[${q.word}] error:`, e.message);
    }
  }

  console.log(`Total collected: ${collected.length}, covered dates: ${dateCounts.size}`);

  const outPath = path.join(__dirname, '..', 'stories_sillok.js');
  const fileContent = `// 국사편찬위원회 조선왕조실록(sillok.history.go.kr) 기반 날짜별 실록 기사 아카이브
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
