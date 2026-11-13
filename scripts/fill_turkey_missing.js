const fs = require('fs');
const path = require('path');

const TR_MONTHS = ['', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const EN_MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_IN_MONTH = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const OTTOMAN_TR_REGEX = /Osmanlı|Türk|İstanbul|Konstantiniyye|Sultan|Padişah|Paşa|Selçuklu|Anadolu|Fatih|Kanuni|Yeniçeri|Bursa|Edirne|İzmir|Çanakkale|Plevne|Mohaç|Topkapı|Bizans|Harem|Sadrazam|Şehzade|Kırım|Viyana|Rodos|Belgrad|Mısır|Bağdat|Tebriz/i;
const BORING_TR_REGEX = /kanun|antlaşma|anlaşma|meclis|seçim|diplomatik|elçilik|kongre|demiryolu|pul|banka/i;
const OTTOMAN_EN_REGEX = /Ottoman|Constantinople|Istanbul|Sultan|Seljuk|Anatolia|Byzantine|Mehmed|Suleiman|Janissary|Topkapi|Gallipoli|Bursa|Edirne|Gallipoli|Pasha|Grand Vizier/i;
const BORING_EN_REGEX = /treaty|parliament|election|railway|ambassador|bank|constitution|diplomatic/i;

const GENERIC_TITLES = new Set([
  'Türkiye', 'Osmanlı İmparatorluğu', 'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Bizans İmparatorluğu',
  'Ottoman Empire', 'Turkey', 'Istanbul', 'Constantinople', 'Byzantine Empire', 'Anatolia'
]);

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function cleanWikiText(line) {
  return line
    .replace(/^\*\s*/, '')
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\{\{[^}]+\}\}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractMainWikiLink(line, lang) {
  const matches = [...line.matchAll(/\[\[([^|\]]+)(?:\|[^\]]+)?\]\]/g)].map(m => m[1].trim());
  const monthPat = lang === 'tr'
    ? new RegExp(`^\\d{1,2}\\s+(${TR_MONTHS.slice(1).join('|')})$`, 'i')
    : new RegExp(`^(${EN_MONTHS.slice(1).join('|')})\\s+\\d{1,2}$`, 'i');
  const candidates = [];
  for (const target of matches) {
    if (/^(MÖ\s*|BC\s*)?\d{1,4}$/i.test(target)) continue;
    if (monthPat.test(target)) continue;
    if (/^(Dosya|Resim|Kategori|Şablon|File|Category|Image):/i.test(target)) continue;
    if (target.includes('#')) continue;
    candidates.push(target);
  }
  if (!candidates.length) return null;
  return candidates.find(t => !GENERIC_TITLES.has(t)) || candidates[0];
}

function parseYear(line) {
  const bc = line.match(/(?:MÖ|BC)\s*(\d+)/i);
  if (bc) return -parseInt(bc[1], 10);
  const ad = line.match(/^(\d{3,4})\b/);
  if (ad) return parseInt(ad[1], 10);
  return null;
}

async function fetchExtractsAndKoLinks(domain, titles) {
  const map = new Map();
  const unique = [...new Set(titles)];
  for (let i = 0; i < unique.length; i += 20) {
    const batch = unique.slice(i, i + 20);
    const url = `https://${domain}/w/api.php?action=query&prop=extracts|langlinks&exintro=1&explaintext=1&exchars=520&lllang=ko&lllimit=500&redirects=1&format=json&titles=${encodeURIComponent(batch.join('|'))}`;
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'HaruHanjulHistoryBot/1.0' } });
      if (r.ok) {
        const d = await r.json();
        const norm = new Map((d.query?.normalized || []).map(x => [x.to, x.from]));
        const redir = new Map((d.query?.redirects || []).map(x => [x.to, x.from]));
        for (const p of Object.values(d.query?.pages || {})) {
          const clean = (p.extract || '').replace(/\s+/g, ' ').trim();
          if (clean.length < 50) continue;
          const koTitle = p.langlinks?.[0]?.['*'] || null;
          const info = { extract: clean, finalTitle: p.title, koTitle };
          map.set(p.title, info);
          if (redir.has(p.title)) map.set(redir.get(p.title), info);
          if (norm.has(p.title)) map.set(norm.get(p.title), info);
        }
      }
    } catch (e) {}
    await sleep(350);
  }
  return map;
}

async function fetchKoExtracts(koTitles) {
  const map = new Map();
  const unique = [...new Set(koTitles.filter(Boolean))];
  for (let i = 0; i < unique.length; i += 20) {
    const batch = unique.slice(i, i + 20);
    const url = `https://ko.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&exchars=550&redirects=1&format=json&titles=${encodeURIComponent(batch.join('|'))}`;
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'HaruHanjulHistoryBot/1.0' } });
      if (r.ok) {
        const d = await r.json();
        const norm = new Map((d.query?.normalized || []).map(x => [x.to, x.from]));
        const redir = new Map((d.query?.redirects || []).map(x => [x.to, x.from]));
        for (const p of Object.values(d.query?.pages || {})) {
          const clean = (p.extract || '').replace(/\s+/g, ' ').trim();
          if (clean.length < 50) continue;
          const info = { extract: clean, finalTitle: p.title };
          map.set(p.title, info);
          if (redir.has(p.title)) map.set(redir.get(p.title), info);
          if (norm.has(p.title)) map.set(norm.get(p.title), info);
        }
      }
    } catch (e) {}
    await sleep(350);
  }
  return map;
}

async function translateGtx(text, sl) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=ko&dt=t&q=${encodeURIComponent(text.slice(0, 1400))}`;
  try {
    const r = await fetch(url);
    if (r.status === 200) {
      const d = await r.json();
      const out = (d[0] || []).map(x => x[0]).join('').trim();
      if (/[가-힣]/.test(out)) return out;
    }
  } catch (e) {}
  // fallback MyMemory
  try {
    const q = text.slice(0, 420);
    const r2 = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${sl}|ko`);
    if (r2.ok) {
      const d2 = await r2.json();
      const out2 = d2?.responseData?.translatedText || '';
      if (!/MYMEMORY WARNING/i.test(out2) && /[가-힣]/.test(out2)) return out2.trim();
    }
  } catch (e) {}
  return null;
}

async function main() {
  const dir = 'c:/Users/manja/Desktop/Workspace/haru-hanjul/turkey-daily-yasa/';
  const fn = new Function(
    fs.readFileSync(dir + 'data.js', 'utf8') + '\n' +
    fs.readFileSync(dir + 'stories_extra.js', 'utf8') + '\n' +
    fs.readFileSync(dir + 'stories_wiki.js', 'utf8') + '\n' +
    fs.readFileSync(dir + 'stories_tr.js', 'utf8') + '\nreturn CURATED_STORIES;'
  );
  const curated = fn();

  const missing = [];
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= DAYS_IN_MONTH[m]; d++) {
      const key = String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      if (!curated[key] || !curated[key].length) missing.push({ m, d, key });
    }
  }
  console.log(`Missing dates to fill: ${missing.length}`);

  // 1. TR Wikipedia에서 빈 날짜의 <= 1922 오스만/아나톨리아 후보 수집
  const candidates = new Map(); // key -> array
  const trTitles = missing.map(x => `${x.d} ${TR_MONTHS[x.m]}`);
  const trTitleMap = new Map(missing.map(x => [`${x.d} ${TR_MONTHS[x.m]}`, x]));

  for (let i = 0; i < trTitles.length; i += 50) {
    const batch = trTitles.slice(i, i + 50);
    const url = `https://tr.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&titles=${encodeURIComponent(batch.join('|'))}`;
    const r = await fetch(url, { headers: { 'User-Agent': 'HaruHanjulHistoryBot/1.0' } });
    const d = await r.json();
    for (const p of Object.values(d.query?.pages || {})) {
      const info = trTitleMap.get(p.title);
      if (!info) continue;
      const raw = p.revisions?.[0]?.slots?.main?.['*'] || '';
      const eventPart = raw.split(/==\s*Doğumlar\s*==|==\s*Ölümler\s*==/i)[0] || raw;
      const lines = eventPart.split('\n').filter(l => /^\*\s*/.test(l));
      for (const l of lines) {
        const cleaned = cleanWikiText(l);
        const year = parseYear(cleaned);
        if (year === null || year < 500 || year > 1922) continue;
        if (!OTTOMAN_TR_REGEX.test(cleaned) || BORING_TR_REGEX.test(cleaned)) continue;
        const text = cleaned.replace(/^(\d{3,4})\s*[-–—:]?\s*/, '').trim();
        if (text.length < 15) continue;
        const docTitle = extractMainWikiLink(l, 'tr');
        if (!docTitle) continue;
        if (!candidates.has(info.key)) candidates.set(info.key, []);
        if (candidates.get(info.key).length < 3) {
          candidates.get(info.key).push({ lang: 'tr', m: info.m, d: info.d, key: info.key, year, text, docTitle, pageTitle: p.title });
        }
      }
    }
    await sleep(450);
  }
  console.log(`Found TR candidates for ${candidates.size}/${missing.length} missing days.`);

  // 2. 아직 남은 빈 날짜는 EN Wikipedia에서 <= 1922 오스만/콘스탄티노플 후보 수집
  const stillMissing = missing.filter(x => !candidates.has(x.key));
  const enTitles = stillMissing.map(x => `${EN_MONTHS[x.m]} ${x.d}`);
  const enTitleMap = new Map(stillMissing.map(x => [`${EN_MONTHS[x.m]} ${x.d}`, x]));

  for (let i = 0; i < enTitles.length; i += 50) {
    const batch = enTitles.slice(i, i + 50);
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&titles=${encodeURIComponent(batch.join('|'))}`;
    const r = await fetch(url, { headers: { 'User-Agent': 'HaruHanjulHistoryBot/1.0' } });
    const d = await r.json();
    for (const p of Object.values(d.query?.pages || {})) {
      const info = enTitleMap.get(p.title);
      if (!info) continue;
      const raw = p.revisions?.[0]?.slots?.main?.['*'] || '';
      const eventPart = raw.split(/==\s*Births\s*==|==\s*Deaths\s*==/i)[0] || raw;
      const lines = eventPart.split('\n').filter(l => /^\*\s*/.test(l));
      for (const l of lines) {
        const cleaned = cleanWikiText(l);
        const year = parseYear(cleaned);
        if (year === null || year < 500 || year > 1922) continue;
        if (!OTTOMAN_EN_REGEX.test(cleaned) || BORING_EN_REGEX.test(cleaned)) continue;
        const text = cleaned.replace(/^(\d{3,4})\s*[-–—:]?\s*/, '').trim();
        if (text.length < 15) continue;
        const docTitle = extractMainWikiLink(l, 'en');
        if (!docTitle) continue;
        if (!candidates.has(info.key)) candidates.set(info.key, []);
        if (candidates.get(info.key).length < 3) {
          candidates.get(info.key).push({ lang: 'en', m: info.m, d: info.d, key: info.key, year, text, docTitle, pageTitle: p.title });
        }
      }
    }
    await sleep(450);
  }
  console.log(`After EN Wiki, candidates cover ${candidates.size}/${missing.length} missing days.`);

  const allCands = [...candidates.values()].flat();
  const trDocInfo = await fetchExtractsAndKoLinks('tr.wikipedia.org', allCands.filter(c => c.lang === 'tr').map(c => c.docTitle));
  const enDocInfo = await fetchExtractsAndKoLinks('en.wikipedia.org', allCands.filter(c => c.lang === 'en').map(c => c.docTitle));

  const koTitlesToFetch = [];
  for (const c of allCands) {
    const info = (c.lang === 'tr' ? trDocInfo : enDocInfo).get(c.docTitle);
    if (info?.koTitle) koTitlesToFetch.push(info.koTitle);
  }
  const koExtractMap = await fetchKoExtracts(koTitlesToFetch);

  // 각 빈 날짜마다 최대 1~2개씩 고품질 항목 번역 및 확정
  const addedStories = [];
  const filledKeys = new Set();

  for (const c of allCands) {
    if (filledKeys.has(c.key)) continue;
    const docInfo = (c.lang === 'tr' ? trDocInfo : enDocInfo).get(c.docTitle);
    if (!docInfo) continue;

    const koSummary = await translateGtx(c.text, c.lang);
    await sleep(450);
    if (!koSummary) continue;

    let koDetail = null;
    let finalUrl = `https://${c.lang}.wikipedia.org/wiki/${encodeURIComponent(docInfo.finalTitle.replace(/ /g, '_'))}`;
    let finalSource = `${c.lang === 'tr' ? '터키어' : '영어'} 위키백과 (${docInfo.finalTitle})`;

    if (docInfo.koTitle && koExtractMap.has(docInfo.koTitle)) {
      const kInfo = koExtractMap.get(docInfo.koTitle);
      koDetail = kInfo.extract;
      finalUrl = `https://ko.wikipedia.org/wiki/${encodeURIComponent(kInfo.finalTitle.replace(/ /g, '_'))}`;
      finalSource = `위키백과 · ${kInfo.finalTitle}`;
    } else {
      koDetail = await translateGtx(docInfo.extract, c.lang);
      await sleep(500);
    }

    if (!koDetail || koDetail.length < 40) continue;

    const kingLabel = c.year < 1299 ? '비잔틴·셀주크 아나톨리아' : '오스만 제국';
    const cat = /deprem|yangın|fırtına|earthquake|fire/i.test(c.text)
      ? 'mystery'
      : /suikast|darbe|idam|isyan|assassination|executed|rebellion|deposed/i.test(c.text)
        ? 'scandal'
        : /savaş|fetih|zafer|kuşatma|muharebe|battle|siege|capture|conquest/i.test(c.text)
          ? 'folklore'
          : 'episode';

    addedStories.push({
      id: `trfill-${String(c.m).padStart(2, '0')}${String(c.d).padStart(2, '0')}-${c.year}`,
      month: c.m,
      day: c.d,
      year: c.year,
      king: kingLabel,
      lunarDate: `양력 ${c.m}월 ${c.d}일`,
      category: cat,
      interestScore: 88,
      title: koSummary.length > 56 ? koSummary.slice(0, 54) + '…' : koSummary,
      source: finalSource,
      sillokUrl: finalUrl,
      officialRecord: `${c.text} — ${docInfo.extract}`,
      yasaStory: `${koSummary}\n\n[역사 상세 기록]\n${koDetail}`
    });
    filledKeys.add(c.key);
  }

  console.log(`Filled ${addedStories.length} missing days!`);

  // stories_tr.js에 병합
  const trPath = path.join(dir, 'stories_tr.js');
  const existingArr = JSON.parse(fs.readFileSync(trPath, 'utf8').match(/const TR_STORIES = (\[[\s\S]*?\n\]);/)[1]);
  const merged = [...existingArr, ...addedStories];
  const totalDays = new Set(merged.map(s => `${s.month}-${s.day}`)).size;

  fs.writeFileSync(trPath, `// 터키·오스만 제국(~1922) 실제 날짜별 사건 + 한국어 상세 본문 (${merged.length}편, ${totalDays}일)
const TR_STORIES = ${JSON.stringify(merged, null, 2)};

if (typeof CURATED_STORIES !== 'undefined') {
  TR_STORIES.forEach(story => {
    const key = \`\${String(story.month).padStart(2, '0')}-\${String(story.day).padStart(2, '0')}\`;
    if (!CURATED_STORIES[key]) CURATED_STORIES[key] = [];
    if (!CURATED_STORIES[key].some(e => e.id === story.id || e.officialRecord === story.officialRecord)) {
      CURATED_STORIES[key].push(story);
    }
  });
}
`, 'utf8');
}

main();
