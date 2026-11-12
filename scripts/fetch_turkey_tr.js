const fs = require('fs');
const path = require('path');

const TR_MONTHS = [
  '', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];
const DAYS_IN_MONTH = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const TURKEY_REGEX = /Osmanlı|Türkiye|Türk|İstanbul|Konstantiniyye|Ankara|Atatürk|Mustafa Kemal|Sultan|Padişah|Paşa|Selçuklu|Anadolu|Fatih|Kanuni|Yeniçeri|Bursa|Edirne|İzmir|TBMM|Cumhuriyet|Çanakkale|Plevne|Mohaç|Kurtuluş|İstiklal|Malazgirt|Topkapı|Bizans/i;

function cleanWikiText(line) {
  return line
    .replace(/^\*\s*/, '')
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\{\{[^}]+\}\}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const GENERIC_TR_TITLES = new Set([
  'Türkiye', 'Osmanlı İmparatorluğu', 'İstanbul', 'Ankara', 'İzmir', 'Bursa',
  'Türkiye Büyük Millet Meclisi', 'Türkler', 'Anadolu'
]);

const TR_MONTH_REGEX = new RegExp(`^\\d{1,2}\\s+(${TR_MONTHS.slice(1).join('|')})$`, 'i');

function extractMainWikiLink(line) {
  const matches = [...line.matchAll(/\[\[([^|\]]+)(?:\|[^\]]+)?\]\]/g)].map(m => m[1].trim());
  const candidates = [];
  for (const target of matches) {
    if (/^(MÖ\s*)?\d{1,4}$/i.test(target)) continue;
    if (TR_MONTH_REGEX.test(target)) continue;
    if (/^(Dosya|Resim|Kategori|Şablon|File|Category):/i.test(target)) continue;
    if (target.includes('#')) continue;
    candidates.push(target);
  }
  if (!candidates.length) return null;
  const specific = candidates.find(t => !GENERIC_TR_TITLES.has(t));
  return specific || candidates[0];
}

function parseYear(line) {
  const bc = line.match(/MÖ\s*(\d+)/i);
  if (bc) return -parseInt(bc[1], 10);
  const ad = line.match(/^(\d{3,4})\b/);
  if (ad) return parseInt(ad[1], 10);
  return null;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchTrExtracts(docTitles) {
  const map = new Map();
  const unique = [...new Set(docTitles)];
  for (let i = 0; i < unique.length; i += 20) {
    const batch = unique.slice(i, i + 20);
    const url = `https://tr.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&exchars=520&redirects=1&format=json&titles=${encodeURIComponent(batch.join('|'))}`;
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
        if (!page.extract) continue;
        const cleanExtract = page.extract.replace(/\s+/g, ' ').trim();
        if (cleanExtract.length < 50) continue;
        const info = { extract: cleanExtract, finalTitle: page.title };
        map.set(page.title, info);
        if (redirects.has(page.title)) map.set(redirects.get(page.title), info);
        if (normalized.has(page.title)) map.set(normalized.get(page.title), info);
      }
    } catch (e) {}
    await sleep(250);
  }
  return map;
}

async function translateBatch(texts) {
  if (!texts.length) return [];
  const joined = texts.join('\n|||SEP|||\n');
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=ko&dt=t&q=${encodeURIComponent(joined)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const full = (data[0] || []).map(x => x[0]).join('');
    const parts = full.split(/\s*\|\|\|SEP\|\|\|\s*/);
    if (parts.length === texts.length) return parts.map(p => p.trim());
  } catch (e) {}

  // fallback: 개별 번역
  const out = [];
  for (const t of texts) {
    try {
      const r = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=ko&dt=t&q=${encodeURIComponent(t)}`);
      const d = await r.json();
      out.push((d[0] || []).map(x => x[0]).join('').trim());
    } catch {
      out.push(t);
    }
    await sleep(100);
  }
  return out;
}

async function translateAll(texts) {
  const results = new Array(texts.length);
  let i = 0;
  while (i < texts.length) {
    const batch = [];
    let charLen = 0;
    while (i < texts.length && batch.length < 10 && charLen + texts[i].length < 1800) {
      batch.push({ idx: i, text: texts[i] });
      charLen += texts[i].length + 15;
      i++;
    }
    if (!batch.length && i < texts.length) {
      batch.push({ idx: i, text: texts[i].slice(0, 1500) });
      i++;
    }
    const translated = await translateBatch(batch.map(b => b.text));
    batch.forEach((b, k) => {
      results[b.idx] = translated[k] || b.text;
    });
    if (i % 100 < 10) console.log(`Translated ${i}/${texts.length} texts...`);
    await sleep(220);
  }
  return results;
}

async function main() {
  const titleToDate = new Map();
  const allTitles = [];
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= DAYS_IN_MONTH[m]; d++) {
      const t = `${d} ${TR_MONTHS[m]}`;
      allTitles.push(t);
      titleToDate.set(t, { month: m, day: d });
    }
  }

  const rawItems = [];
  for (let i = 0; i < allTitles.length; i += 50) {
    const batch = allTitles.slice(i, i + 50);
    const url = `https://tr.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&titles=${encodeURIComponent(batch.join('|'))}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'HaruHanjulHistoryBot/1.0 (https://manjaedo.github.io/haru-hanjul/)' }
    });
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {});

    for (const p of pages) {
      const dateInfo = titleToDate.get(p.title);
      if (!dateInfo) continue;
      const { month, day } = dateInfo;
      const raw = p.revisions?.[0]?.slots?.main?.['*'] || '';
      const eventPart = raw.split(/==\s*Doğumlar\s*==|==\s*Ölümler\s*==/i)[0] || raw;
      const lines = eventPart.split('\n').filter(l => /^\*\s*/.test(l));

      let pickedForDay = 0;
      for (const l of lines) {
        if (pickedForDay >= 6) break;
        const cleaned = cleanWikiText(l);
        const year = parseYear(cleaned);
        if (year === null || year < 1000 || year > 1990) continue;
        if (!TURKEY_REGEX.test(cleaned)) continue;

        const trText = cleaned.replace(/^(\d{3,4})\s*[-–—:]?\s*/, '').trim();
        if (trText.length < 15) continue;

        const docTitle = extractMainWikiLink(l);
        if (!docTitle) continue;

        rawItems.push({ month, day, year, trText, pageTitle: p.title, docTitle });
        pickedForDay++;
      }
    }
    console.log(`TR Wiki batch ${i / 50 + 1}/${Math.ceil(allTitles.length / 50)}, raw candidates=${rawItems.length}`);
    await sleep(600);
  }

  console.log(`Fetching detailed Turkish Wikipedia extracts for ${rawItems.length} candidates...`);
  const extractMap = await fetchTrExtracts(rawItems.map(x => x.docTitle));

  const perDayCount = new Map();
  const validItems = [];
  for (const item of rawItems) {
    const info = extractMap.get(item.docTitle);
    if (!info || !info.extract || info.extract.length < 50) continue;
    const key = `${item.month}-${item.day}`;
    const c = perDayCount.get(key) || 0;
    if (c >= 4) continue;
    perDayCount.set(key, c + 1);
    validItems.push({ ...item, extract: info.extract, finalTitle: info.finalTitle });
  }

  console.log(`Filtered to ${validItems.length} rich events with extracts. Translating summaries & extracts to Korean...`);
  const koSummaries = await translateAll(validItems.map(x => x.trText));
  const koExtracts = await translateAll(validItems.map(x => x.extract));

  const stories = validItems.map((item, idx) => {
    const koText = koSummaries[idx] || item.trText;
    const koDetail = koExtracts[idx] || item.extract;
    const kingLabel = item.year < 1923 ? '오스만 제국' : '튀르키예 공화국';
    const cat = /deprem|yangın|fırtına/i.test(item.trText)
      ? 'mystery'
      : /suikast|darbe|idam|isyan|antlaşma|devrim/i.test(item.trText)
        ? 'scandal'
        : /savaş|fetih|zafer|kuşatma|muharebe/i.test(item.trText)
          ? 'folklore'
          : 'episode';

    return {
      id: `trwiki-${String(item.month).padStart(2, '0')}${String(item.day).padStart(2, '0')}-${item.year}-${idx}`,
      month: item.month,
      day: item.day,
      year: item.year,
      king: kingLabel,
      lunarDate: `양력 ${item.month}월 ${item.day}일 (${item.pageTitle})`,
      category: cat,
      interestScore: 90,
      title: koText.length > 56 ? koText.slice(0, 54) + '…' : koText,
      source: `터키어 위키백과 (${item.finalTitle})`,
      sillokUrl: `https://tr.wikipedia.org/wiki/${encodeURIComponent(item.finalTitle.replace(/ /g, '_'))}`,
      officialRecord: `${item.trText} — ${item.extract}`,
      yasaStory: `${koText}\n\n[역사 상세 기록: ${item.finalTitle}]\n${koDetail}`
    };
  });

  const coveredDates = new Set(stories.map(s => `${s.month}-${s.day}`)).size;
  console.log(`Done! Total Turkish stories: ${stories.length}, covered dates: ${coveredDates}`);

  const outPath = path.join('c:/Users/manja/Desktop/Workspace/haru-hanjul/turkey-daily-yasa', 'stories_tr.js');
  const content = `// 터키어 위키백과(tr.wikipedia.org) 366일 오스만·튀르키예 실제 날짜별 사건 (${stories.length}편, ${coveredDates}일)
const TR_STORIES = ${JSON.stringify(stories, null, 2)};

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
  fs.writeFileSync(outPath, content, 'utf8');
}

main();
