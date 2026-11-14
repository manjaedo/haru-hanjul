// 오늘의 로마 제국 연대기 — 데이터 관리 모듈
const CATEGORIES = {
  mystery: { id: "mystery", label: "기이한 일", shortLabel: "기이한 일" },
  scandal: { id: "scandal", label: "궁중 비화", shortLabel: "궁중 비화" },
  folklore: { id: "folklore", label: "야담·영웅", shortLabel: "야담·영웅" },
  episode: { id: "episode", label: "풍속·기문", shortLabel: "풍속·기문" }
};

const CURATED_STORIES = {};

// 월별 이야기 파일 등록 함수
function addStories(list) {
  list.forEach(o => {
    const [m, d] = o.d.split('-').map(Number);
    const story = {
      id: `rm-${o.d.replace('-', '')}-${o.id}`,
      month: m, day: d, year: o.y,
      king: o.k, category: o.c, interestScore: o.s || 85,
      title: o.t, source: o.src, sillokUrl: o.url || '',
      imageUrl: o.img || o.imageUrl || '',
      officialRecord: o.r, yasaStory: o.b.trim(),
      undated: Boolean(o.u)
    };
    if (!CURATED_STORIES[o.d]) CURATED_STORIES[o.d] = [];
    if (!CURATED_STORIES[o.d].some(e => e.id === story.id)) {
      CURATED_STORIES[o.d].push(story);
    }
  });
}

function getStoriesForDate(month, day) {
  const key = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return CURATED_STORIES[key] ? [...CURATED_STORIES[key]] : [];
}

function getAllStoriesByCategory(category) {
  const all = [];
  if (typeof CURATED_STORIES !== 'undefined') {
    Object.values(CURATED_STORIES).forEach(list => {
      list.forEach(item => {
        if (!all.some(e => e.id === item.id)) all.push(item);
      });
    });
  }
  if (!category || category === 'all') return all;
  return all.filter(s => s.category === category);
}

function getAllLegendStories() {
  return getAllStoriesByCategory('all')
    .sort((a, b) => (b.interestScore || 0) - (a.interestScore || 0))
    .slice(0, 30);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CATEGORIES, CURATED_STORIES, addStories, getStoriesForDate, getAllStoriesByCategory, getAllLegendStories };
}
