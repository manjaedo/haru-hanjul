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

function parseYear(line) {
  const bc = line.match(/MÖ\s*(\d+)/i);
  if (bc) return -parseInt(bc[1], 10);
  const ad = line.match(/^(\d{3,4})\b/);
  if (ad) return parseInt(ad[1], 10);
  return null;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

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
  }
  return out;
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
        if (pickedForDay >= 4) break;
        const cleaned = cleanWikiText(l);
        const year = parseYear(cleaned);
        if (year === null || year < 1000 || year > 1990) continue;
        if (!TURKEY_REGEX.test(cleaned)) continue;

        const trText = cleaned.replace(/^(\d{3,4})\s*[-–—:]?\s*/, '').trim();
        if (trText.length < 15) continue;

        rawItems.push({ month, day, year, trText, pageTitle: p.title });
        pickedForDay++;
      }
    }
    console.log(`TR Wiki batch ${i / 50 + 1}/${Math.ceil(allTitles.length / 50)}, collected=${rawItems.length}`);
    await sleep(800);
  }

  console.log(`Translating ${rawItems.length} Turkish events to Korean...`);
  const stories = [];
  for (let i = 0; i < rawItems.length; i += 15) {
    const chunk = rawItems.slice(i, i + 15);
    const translated = await translateBatch(chunk.map(x => x.trText));
    chunk.forEach((item, idx) => {
      const koText = translated[idx] || item.trText;
      const kingLabel = item.year < 1923 ? '오스만 제국' : '튀르키예 공화국';
      const cat = /deprem|yangın|fırtına/i.test(item.item || item.trText)
        ? 'mystery'
        : /suikast|darbe|idam|isyan|antlaşma|devrim/i.test(item.trText)
          ? 'scandal'
          : /savaş|fetih|zafer|kuşatma|muharebe/i.test(item.trText)
            ? 'folklore'
            : 'episode';

      stories.push({
        id: `trwiki-${String(item.month).padStart(2, '0')}${String(item.day).padStart(2, '0')}-${item.year}-${i + idx}`,
        month: item.month,
        day: item.day,
        year: item.year,
        king: kingLabel,
        lunarDate: `양력 ${item.month}월 ${item.day}일 (${item.pageTitle})`,
        category: cat,
        interestScore: 90,
        title: koText.length > 56 ? koText.slice(0, 54) + '…' : koText,
        source: `터키어 위키백과 (${item.pageTitle})`,
        sillokUrl: `https://tr.wikipedia.org/wiki/${encodeURIComponent(item.pageTitle.replace(/ /g, '_'))}`,
        officialRecord: item.trText,
        yasaStory: `${item.year}년 ${item.month}월 ${item.day}일 터키·오스만 역사 기록입니다.\n\n${koText}\n\n(※ 아래 원문 인용에서 터키어 원문을 함께 확인하실 수 있습니다.)`
      });
    });
    if ((i / 15) % 10 === 0) console.log(`Translated ${Math.min(i + 15, rawItems.length)}/${rawItems.length}`);
    await sleep(250);
  }

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
