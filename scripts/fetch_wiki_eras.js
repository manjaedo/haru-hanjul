const fs = require('fs');
const path = require('path');

const daysInMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const titles = [];
for (let m = 1; m <= 12; m++) {
  for (let d = 1; d <= daysInMonth[m]; d++) {
    titles.push(`${m}월_${d}일`);
  }
}

function cleanWikiText(line) {
  return line
    .replace(/^\*\s*/, '')
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\{\{[^}]+\}\}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractMainWikiLink(line) {
  // 연도 링크([[1928년]], [[기원전 44년]])가 아닌 첫 번째 핵심 문서 링크 추출
  const matches = [...line.matchAll(/\[\[([^|\]]+)(?:\|[^\]]+)?\]\]/g)].map(m => m[1].trim());
  for (const target of matches) {
    if (/^(기원전\s*)?\d+년$/.test(target)) continue;
    if (/^\d+월\s*\d+일$/.test(target)) continue;
    if (/^파일:|^분류:/.test(target)) continue;
    return target;
  }
  return null;
}

function parseYear(line) {
  const bc = line.match(/기원전\s*(\d+)년/);
  if (bc) return -parseInt(bc[1], 10);
  const ad = line.match(/^(\d{1,4})년/);
  if (ad) return parseInt(ad[1], 10);
  return null;
}

const ERAS = [
  {
    dir: 'samguk-daily-yasa',
    match: (y, txt) => y <= 935 && /신라|고구려|백제|가야|삼국|광개토|김유신|계백|원효|을지문덕|선덕|문무왕|장보고/.test(txt),
    kingLabel: (y) => (y < 0 ? '삼국 초기' : y <= 668 ? '삼국시대' : '통일신라·남북국'),
    cat: (txt) => /일식|혜성|지진|기이|신화|전설|꿈/.test(txt) ? 'mystery' : /즉위|암살|반란|폐위|정변/.test(txt) ? 'scandal' : /전투|승리|건국|장군|대첩/.test(txt) ? 'folklore' : 'episode'
  },
  {
    dir: 'goryeo-daily-yasa',
    match: (y, txt) => y >= 918 && y <= 1392 && /고려|왕건|광종|공민왕|거란|강감찬|서희|몽골|팔만대장경|정몽주|최영|이성계|삼별초|개경/.test(txt),
    kingLabel: () => '고려 왕조',
    cat: (txt) => /일식|혜성|지진|기이/.test(txt) ? 'mystery' : /정변|반란|암살|유배|폐위|살해/.test(txt) ? 'scandal' : /전투|격파|대첩|항전/.test(txt) ? 'folklore' : 'episode'
  },
  {
    dir: 'independence-daily-yasa',
    match: (y, txt) => y >= 1905 && y <= 1945 && /조선|대한|독립|만세|임시정부|의거|총독|일제|김구|안중근|윤봉길|이봉창|홍범도|김좌진|유관순|신간회|광복군|안창호|광주|물산장려/.test(txt),
    kingLabel: () => '일제강점기 독립운동사',
    cat: (txt) => /탈출|밀정|체포|수색/.test(txt) ? 'mystery' : /재판|사형|선고|투옥|순국/.test(txt) ? 'scandal' : /의거|폭탄|전투|만세|시위|창설/.test(txt) ? 'folklore' : 'episode'
  },
  {
    dir: 'persia-daily-yasa',
    match: (y, txt) => /페르시아|이란|아케메네스|사산|사파비|카자르|팔라비|테헤란|이스파한|키루스|다리우스|크세르크세스|호메이니/.test(txt),
    kingLabel: (y) => (y < 0 ? '고대 페르시아' : y < 1500 ? '페르시아 왕조' : '이란 근현대사'),
    cat: (txt) => /신비|화산|지진|기이/.test(txt) ? 'mystery' : /혁명|암살|쿠데타|정변|퇴위/.test(txt) ? 'scandal' : /전투|정복|승리/.test(txt) ? 'folklore' : 'episode'
  },
  {
    dir: 'britain-daily-yasa',
    match: (y, txt) => /영국|잉글랜드|브리튼|스코틀랜드|런던|엘리자베스|빅토리아|헨리\s*\d|찰스\s*\d|알프레드|윌리엄\s*\d|마그나|처칠|대처/.test(txt),
    kingLabel: (y) => (y < 1066 ? '앵글로색슨 영국' : y < 1603 ? '중세·튜더 영국' : '근현대 영국'),
    cat: (txt) => /화재|지진|폭풍|기이/.test(txt) ? 'mystery' : /처형|암살|퇴위|즉위|이혼|스캔들|혁명/.test(txt) ? 'scandal' : /전투|해전|승리|정복|헌장/.test(txt) ? 'folklore' : 'episode'
  },
  {
    dir: 'rome-daily-yasa',
    match: (y, txt) => y <= 1453 && /로마|카이사르|아우구스투스|네로|칼리굴라|콘스탄티누스|폼페이|한니발|키케로|티베리우스|트라야누스|콜로세움|비잔틴/.test(txt),
    kingLabel: (y) => (y < -27 ? '로마 공화정' : y <= 476 ? '로마 제국' : '동로마 제국'),
    cat: (txt) => /화산|일식|지진|화재/.test(txt) ? 'mystery' : /암살|자살|반란|황제|즉위/.test(txt) ? 'scandal' : /전투|정복|도하|승리/.test(txt) ? 'folklore' : 'episode'
  },
  {
    dir: 'turkey-daily-yasa',
    match: (y, txt) => /오스만|터키|튀르키예|콘스탄티노플|이스탄불|앙카라|아타튀르크|슐탄|술탄|메흐메트|슐레이만|셀주크/.test(txt),
    kingLabel: (y) => (y < 1923 ? '오스만 제국' : '튀르키예 공화국'),
    cat: (txt) => /지진|화재|기이/.test(txt) ? 'mystery' : /폐위|쿠데타|혁명|즉위|조약/.test(txt) ? 'scandal' : /정복|전투|함락|선포/.test(txt) ? 'folklore' : 'episode'
  },
  {
    dir: 'herodotus-daily-yasa',
    match: (y, txt) => y <= 300 && /그리스|아테네|스파르타|마라톤|알렉산드로스|헤로도토스|페르시아|델포이|올림피아|소크라테스|플라톤|아리스토텔레스|테르모필레|살라미스|트로이/.test(txt),
    kingLabel: (y) => (y < -323 ? '고대 그리스·지중해' : '헬레니즘 시대'),
    cat: (txt) => /신탁|일식|기이|전설/.test(txt) ? 'mystery' : /참주|추방|암살|독배/.test(txt) ? 'scandal' : /전투|해전|원정|올림픽/.test(txt) ? 'folklore' : 'episode'
  }
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchExtracts(docTitles) {
  const map = new Map();
  const unique = [...new Set(docTitles)];
  for (let i = 0; i < unique.length; i += 20) {
    const batch = unique.slice(i, i + 20);
    const url = `https://ko.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&exchars=500&redirects=1&format=json&titles=${encodeURIComponent(batch.join('|'))}`;
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'HaruHanjulHistoryBot/1.0 (https://manjaedo.github.io/haru-hanjul/)' }
      });
      const data = await res.json();
      const normalized = new Map();
      (data.query?.normalized || []).forEach(n => normalized.set(n.to, n.from));
      const redirects = new Map();
      (data.query?.redirects || []).forEach(r => redirects.set(r.to, r.from));

      for (const page of Object.values(data.query?.pages || {})) {
        if (!page.extract || page.extract.length < 40) continue;
        const cleanExtract = page.extract.replace(/\s+/g, ' ').trim();
        map.set(page.title, { extract: cleanExtract, finalTitle: page.title });
        if (redirects.has(page.title)) map.set(redirects.get(page.title), { extract: cleanExtract, finalTitle: page.title });
        if (normalized.has(page.title)) map.set(normalized.get(page.title), { extract: cleanExtract, finalTitle: page.title });
      }
    } catch (e) {}
    await sleep(300);
  }
  return map;
}

async function main() {
  const candidates = [];
  const docTitlesToFetch = [];

  for (let i = 0; i < titles.length; i += 50) {
    const batch = titles.slice(i, i + 50);
    const url = `https://ko.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&titles=${encodeURIComponent(batch.join('|'))}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'HaruHanjulHistoryBot/1.0 (https://manjaedo.github.io/haru-hanjul/)' }
    });
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {});

    for (const p of pages) {
      const mMatch = p.title?.match(/^(\d+)월\s*(\d+)일$/);
      if (!mMatch) continue;
      const month = parseInt(mMatch[1], 10);
      const day = parseInt(mMatch[2], 10);
      const raw = p.revisions?.[0]?.slots?.main?.['*'] || '';

      // 오직 '사건' 섹션만 사용 (단순 이름/생몰연도 나열인 탄생·사망 섹션 완전 배제!)
      const eventSection = raw.split(/==\s*탄생\s*==|==\s*출생\s*==|==\s*사망\s*==/)[0] || '';
      const lines = eventSection.split('\n').filter(l => /^\*\s*/.test(l));

      for (const l of lines) {
        const cleaned = cleanWikiText(l);
        // 단순 생몰연도 줄 추가 차단
        if (/\(~\s*\d+년\)|\(\d+년\s*~\)/.test(cleaned)) continue;

        const year = parseYear(cleaned);
        if (year === null) continue;
        const bodyText = cleaned.replace(/^(기원전\s*)?\d+년\s*[-–—:]?\s*/, '').trim();
        if (bodyText.length < 12) continue;

        const mainDoc = extractMainWikiLink(l);
        for (const era of ERAS) {
          if (era.match(year, cleaned)) {
            candidates.push({ era, month, day, year, bodyText, mainDoc });
            if (mainDoc) docTitlesToFetch.push(mainDoc);
          }
        }
      }
    }
    console.log(`Wiki events batch ${i / 50 + 1}/${Math.ceil(titles.length / 50)}`);
    await sleep(700);
  }

  console.log(`Fetching detailed extracts for ${new Set(docTitlesToFetch).size} linked articles...`);
  const extractMap = await fetchExtracts(docTitlesToFetch);

  const buckets = {};
  ERAS.forEach(e => { buckets[e.dir] = []; });

  for (const c of candidates) {
    const info = c.mainDoc ? extractMap.get(c.mainDoc) : null;
    // 실제 배경 설명(extract)이 없거나 너무 짧으면 제외해 '빈약한 1줄짜리' 방지
    if (!info || info.extract.length < 50) continue;

    const yearStr = c.year < 0 ? `기원전 ${Math.abs(c.year)}년` : `${c.year}년`;
    const docUrl = `https://ko.wikipedia.org/wiki/${encodeURIComponent(info.finalTitle.replace(/ /g, '_'))}`;

    buckets[c.era.dir].push({
      id: `wiki-${c.era.dir.split('-')[0]}-${String(c.month).padStart(2, '0')}${String(c.day).padStart(2, '0')}-${c.year}-${buckets[c.era.dir].length}`,
      month: c.month,
      day: c.day,
      year: c.year,
      king: c.era.kingLabel(c.year),
      lunarDate: `양력 ${c.month}월 ${c.day}일`,
      category: c.era.cat(c.bodyText),
      interestScore: 90,
      title: c.bodyText.length > 54 ? c.bodyText.slice(0, 52) + '…' : c.bodyText,
      source: `위키백과 · ${info.finalTitle}`,
      sillokUrl: docUrl,
      officialRecord: c.bodyText,
      yasaStory: `${yearStr} ${c.month}월 ${c.day}일 사건: ${c.bodyText}\n\n${info.extract}`
    });
  }

  for (const era of ERAS) {
    const list = buckets[era.dir];
    const uniqueDates = new Set(list.map(x => `${x.month}-${x.day}`)).size;
    console.log(`[${era.dir}] quality stories=${list.length}, dates=${uniqueDates}`);

    const outPath = path.join('c:/Users/manja/Desktop/Workspace/haru-hanjul', era.dir, 'stories_wiki.js');
    const content = `// 한국어 위키백과 실제 사건 + 상세 본문 요약 (${list.length}편, ${uniqueDates}일)
const WIKI_STORIES = ${JSON.stringify(list, null, 2)};

if (typeof CURATED_STORIES !== 'undefined') {
  WIKI_STORIES.forEach(story => {
    const key = \`\${String(story.month).padStart(2, '0')}-\${String(story.day).padStart(2, '0')}\`;
    if (!CURATED_STORIES[key]) CURATED_STORIES[key] = [];
    if (!CURATED_STORIES[key].some(e => e.officialRecord === story.officialRecord || e.id === story.id)) {
      CURATED_STORIES[key].push(story);
    }
  });
}
`;
    fs.writeFileSync(outPath, content, 'utf8');
  }
}

main();
