const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function extractArrayFromJs(code, varName) {
  const re = new RegExp(`const ${varName} = (\\[[\\s\\S]*?\\n\\]);`);
  const m = code.match(re);
  if (!m) throw new Error(`Cannot find ${varName}`);
  return JSON.parse(m[1]);
}

function loadOldKoSummaries() {
  const map = new Map();
  try {
    const oldCode = execSync('git show HEAD:turkey-daily-yasa/stories_tr.js', {
      cwd: 'c:/Users/manja/Desktop/Workspace/haru-hanjul',
      maxBuffer: 20 * 1024 * 1024,
      encoding: 'utf8'
    });
    const oldArr = extractArrayFromJs(oldCode, 'TR_STORIES');
    for (const s of oldArr) {
      const lines = (s.yasaStory || '').split('\n\n');
      const fullKo = (lines[1] || s.title || '').trim();
      if (s.officialRecord && /[가-힣]/.test(fullKo)) {
        map.set(s.officialRecord.trim(), fullKo);
      }
    }
  } catch (e) {
    console.warn('Could not load HEAD stories_tr.js:', e.message);
  }
  return map;
}

async function fetchLanglinksKo(trTitles) {
  const map = new Map();
  const unique = [...new Set(trTitles)];
  for (let i = 0; i < unique.length; i += 50) {
    const batch = unique.slice(i, i + 50);
    const url = `https://tr.wikipedia.org/w/api.php?action=query&prop=langlinks&lllang=ko&lllimit=500&redirects=1&format=json&titles=${encodeURIComponent(batch.join('|'))}`;
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'HaruHanjulHistoryBot/1.0 (https://manjaedo.github.io/haru-hanjul/)' } });
      if (r.ok) {
        const d = await r.json();
        const norm = new Map((d.query?.normalized || []).map(x => [x.to, x.from]));
        const redir = new Map((d.query?.redirects || []).map(x => [x.to, x.from]));
        for (const p of Object.values(d.query?.pages || {})) {
          const ko = p.langlinks?.[0]?.['*'];
          if (!ko) continue;
          map.set(p.title, ko);
          if (redir.has(p.title)) map.set(redir.get(p.title), ko);
          if (norm.has(p.title)) map.set(norm.get(p.title), ko);
        }
      }
    } catch (e) {}
    await sleep(380);
  }
  return map;
}

async function fetchKoExtracts(koTitles) {
  const map = new Map();
  const unique = [...new Set(koTitles)];
  for (let i = 0; i < unique.length; i += 20) {
    const batch = unique.slice(i, i + 20);
    const url = `https://ko.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&exchars=550&redirects=1&format=json&titles=${encodeURIComponent(batch.join('|'))}`;
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'HaruHanjulHistoryBot/1.0 (https://manjaedo.github.io/haru-hanjul/)' } });
      if (r.ok) {
        const d = await r.json();
        const norm = new Map((d.query?.normalized || []).map(x => [x.to, x.from]));
        const redir = new Map((d.query?.redirects || []).map(x => [x.to, x.from]));
        for (const p of Object.values(d.query?.pages || {})) {
          if (!p.extract) continue;
          const clean = p.extract.replace(/\s+/g, ' ').trim();
          if (clean.length < 40) continue;
          const info = { extract: clean, finalTitle: p.title };
          map.set(p.title, info);
          if (redir.has(p.title)) map.set(redir.get(p.title), info);
          if (norm.has(p.title)) map.set(norm.get(p.title), info);
        }
      }
    } catch (e) {}
    await sleep(320);
  }
  return map;
}

function trimToSentences(text, maxChars = 420) {
  if (text.length <= maxChars) return text;
  const cut = text.slice(0, maxChars);
  const lastDot = cut.lastIndexOf('.');
  return lastDot > 100 ? cut.slice(0, lastDot + 1) : cut;
}

let myMemoryExhausted = false;
async function translateMyMemory(text) {
  if (myMemoryExhausted || !text) return null;
  const q = trimToSentences(text, 430);
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=tr|ko`;
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    const d = await r.json();
    const out = d?.responseData?.translatedText || '';
    if (/MYMEMORY WARNING|LIMIT/i.test(out) || d.responseStatus === 429) {
      myMemoryExhausted = true;
      return null;
    }
    return /[가-힣]/.test(out) ? out.trim() : null;
  } catch {
    return null;
  }
}

async function main() {
  const trPath = path.join('c:/Users/manja/Desktop/Workspace/haru-hanjul/turkey-daily-yasa', 'stories_tr.js');
  const currentCode = fs.readFileSync(trPath, 'utf8');
  const items = extractArrayFromJs(currentCode, 'TR_STORIES');
  console.log(`Loaded ${items.length} TR stories.`);

  const oldKoMap = loadOldKoSummaries();
  console.log(`Loaded ${oldKoMap.size} existing Korean event summaries from HEAD.`);

  const trDocTitles = items.map(x => x.source.replace(/^터키어 위키백과 \((.+)\)$/, '$1'));
  console.log('Fetching Korean Wikipedia langlinks...');
  const langMap = await fetchLanglinksKo(trDocTitles);
  console.log(`Found ${langMap.size} TR->KO Wikipedia links.`);

  console.log('Fetching Korean Wikipedia extracts...');
  const koExtractMap = await fetchKoExtracts([...langMap.values()]);
  console.log(`Fetched ${koExtractMap.size} Korean Wikipedia extracts.`);

  let koWikiCount = 0;
  let myMemCount = 0;
  let droppedCount = 0;
  const enriched = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const [trEventRaw, trExtractRaw] = (item.officialRecord || '').split(' — ');
    const trEvent = (trEventRaw || '').trim();
    const trExtract = (trExtractRaw || '').trim();
    const trDocTitle = item.source.replace(/^터키어 위키백과 \((.+)\)$/, '$1');

    let koSummary = oldKoMap.get(trEvent) || null;
    if (!koSummary && !myMemoryExhausted) {
      koSummary = await translateMyMemory(trEvent);
      await sleep(180);
    }
    if (!koSummary) {
      droppedCount++;
      continue;
    }

    const koTitle = langMap.get(trDocTitle);
    const koWikiInfo = koTitle ? koExtractMap.get(koTitle) : null;

    let koDetail = null;
    let finalUrl = item.sillokUrl;
    let finalSource = item.source;

    if (koWikiInfo && koWikiInfo.extract.length >= 45) {
      koDetail = koWikiInfo.extract;
      finalUrl = `https://ko.wikipedia.org/wiki/${encodeURIComponent(koWikiInfo.finalTitle.replace(/ /g, '_'))}`;
      finalSource = `위키백과 · ${koWikiInfo.finalTitle} (터키 연표)`;
      koWikiCount++;
    } else if (trExtract && !myMemoryExhausted) {
      const translatedDetail = await translateMyMemory(trExtract);
      await sleep(200);
      if (translatedDetail && translatedDetail.length >= 40) {
        koDetail = translatedDetail;
        myMemCount++;
      }
    }

    if (!koDetail) {
      droppedCount++;
      continue;
    }

    enriched.push({
      ...item,
      title: koSummary.length > 56 ? koSummary.slice(0, 54) + '…' : koSummary,
      source: finalSource,
      sillokUrl: finalUrl,
      yasaStory: `${koSummary}\n\n[역사 상세 기록]\n${koDetail}`
    });

    if ((i + 1) % 100 === 0) {
      console.log(`Progress ${i + 1}/${items.length} | koWiki=${koWikiCount}, myMem=${myMemCount}, dropped=${droppedCount}`);
    }
  }

  const coveredDates = new Set(enriched.map(s => `${s.month}-${s.day}`)).size;
  console.log(`Done! Total enriched=${enriched.length}, coveredDates=${coveredDates}, koWiki=${koWikiCount}, myMem=${myMemCount}, dropped=${droppedCount}`);

  const outContent = `// 터키·오스만 실제 날짜별 사건 + 한국어 상세 본문 (${enriched.length}편, ${coveredDates}일)
const TR_STORIES = ${JSON.stringify(enriched, null, 2)};

if (typeof CURATED_STORIES !== 'undefined') {
  TR_STORIES.forEach(story => {
    const key = \`\${String(story.month).padStart(2, '0')}-\${String(story.day).padStart(2, '0')}\`;
    if (!CURATED_STORIES[key]) CURATED_STORIES[key] = [];
    if (!CURATED_STORIES[key].some(e => e.id === story.id || e.officialRecord === story.officialRecord)) {
      CURATED_STORIES[key].push(story);
    }
  });
}
`;
  fs.writeFileSync(trPath, outContent, 'utf8');
}

main();
