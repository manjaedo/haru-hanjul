// 오늘의 터키·오스만 연대기 — 1299년 오스만 건국 ~ 1923년 튀르키예 공화국
const CATEGORIES = {
  mystery: { id: "mystery", label: "기이한 일", shortLabel: "기이한 일" },
  scandal: { id: "scandal", label: "궁중 비화", shortLabel: "궁중 비화" },
  folklore: { id: "folklore", label: "야담·영웅", shortLabel: "야담·영웅" },
  episode: { id: "episode", label: "궁중·서민 일상", shortLabel: "궁중·서민 일상" }
};

// 모든 이야기는 stories/NN.js(월별)와 stories_extra.js에서 addStories()로 등록된다.
const CURATED_STORIES = {};

// 월별 이야기 파일이 쓰는 간결한 작성 형식을 앱이 쓰는 형식으로 풀어 등록한다.
//   d:'MM-DD'  y:연도  id:짧은 식별자  k:시대·인물  c:카테고리  s:흥미도
//   t:제목  r:한 줄 기록  src:출처  url:더 읽을 곳  b:본문
//   u:true → 날짜가 전해지지 않는 전승·풍속 (가짜 날짜를 붙이지 않고 그대로 밝힌다)
function addStories(list) {
  list.forEach(o => {
    const [m, d] = o.d.split('-').map(Number);
    const story = {
      id: `tk-${o.d.replace('-', '')}-${o.id}`,
      month: m, day: d, year: o.y,
      king: o.k, category: o.c, interestScore: o.s || 80,
      title: o.t, source: o.src, sillokUrl: o.url || '',
      imageUrl: o.img || o.imageUrl || '',
      officialRecord: o.r, yasaStory: o.b.trim(),
      undated: Boolean(o.u)
    };
    if (!CURATED_STORIES[o.d]) CURATED_STORIES[o.d] = [];
    if (!CURATED_STORIES[o.d].some(e => e.id === story.id)) CURATED_STORIES[o.d].push(story);
  });
}

function getStoriesForDate(month, day) {
  const key = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const list = CURATED_STORIES[key] ? [...CURATED_STORIES[key]] : [];
  // 날짜가 확실한 기록을 먼저, 날짜 없는 전승·풍속은 그 뒤에 곁들인다.
  return list.sort((a, b) => (Number(Boolean(a.undated)) - Number(Boolean(b.undated))) || (a.year - b.year) || (b.interestScore - a.interestScore));
}

function getNearestRecordDate(month, day) {
  const keys = Object.keys(CURATED_STORIES).filter(k => CURATED_STORIES[k] && CURATED_STORIES[k].length > 0);
  if (!keys.length) return null;
  const toDayOfYear = (m, d) => Math.round((new Date(2026, m - 1, d) - new Date(2026, 0, 1)) / 86400000);
  const target = toDayOfYear(month, day);
  let bestKey = keys[0], bestDiff = 999;
  keys.forEach(k => {
    const [km, kd] = k.split('-').map(Number);
    const diff = Math.min(Math.abs(toDayOfYear(km, kd) - target), 365 - Math.abs(toDayOfYear(km, kd) - target));
    if (diff > 0 && diff < bestDiff) { bestDiff = diff; bestKey = k; }
  });
  const [m, d] = bestKey.split('-').map(Number);
  return { month: m, day: d, key: bestKey, count: CURATED_STORIES[bestKey].length };
}

function getAllStoriesByCategory(category) {
  const map = new Map();
  if (typeof CURATED_STORIES !== 'undefined') {
    Object.values(CURATED_STORIES).forEach(list => {
      list.forEach(item => {
        if (!map.has(item.id)) map.set(item.id, item);
      });
    });
  }
  const all = [...map.values()];
  if (!category || category === 'all') {
    return all.sort((a, b) => (b.interestScore - a.interestScore) || (a.year - b.year));
  }
  return all
    .filter(s => s.category === category)
    .sort((a, b) => (b.interestScore - a.interestScore) || (a.year - b.year));
}

function getAllLegendStories() {
  return getAllStoriesByCategory().slice(0, 50);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CATEGORIES, CURATED_STORIES, addStories, getStoriesForDate, getAllStoriesByCategory };
}
