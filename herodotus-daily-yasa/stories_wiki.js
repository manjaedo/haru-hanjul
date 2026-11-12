// 한국어 위키백과 366일 실제 날짜별 사건 보강 (4편, 4일)
const WIKI_STORIES = [
  {
    "id": "wiki-herodotus-0301--86-0",
    "month": 3,
    "day": 1,
    "year": -86,
    "king": "헬레니즘 시대",
    "lunarDate": "양력 3월 1일 실제 기록",
    "category": "episode",
    "interestScore": 88,
    "title": "로마 공화정 군대의 수장 루키우스 코르넬리우스 술라가 아테네에 입성, 미트리다테스 6세의 …",
    "source": "한국어 위키백과 (3월 1일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/3%EC%9B%94_1%EC%9D%BC",
    "officialRecord": "로마 공화정 군대의 수장 루키우스 코르넬리우스 술라가 아테네에 입성, 미트리다테스 6세의 지원을 받은 폭군 아리스티온(Aristion)을 제거하다.",
    "yasaStory": "기원전 86년 3월 1일에 실제로 기록된 역사 사건입니다.\n\n로마 공화정 군대의 수장 루키우스 코르넬리우스 술라가 아테네에 입성, 미트리다테스 6세의 지원을 받은 폭군 아리스티온(Aristion)을 제거하다."
  },
  {
    "id": "wiki-herodotus-0611--1184-1",
    "month": 6,
    "day": 11,
    "year": -1184,
    "king": "고대 그리스·지중해",
    "lunarDate": "양력 6월 11일 실제 기록",
    "category": "episode",
    "interestScore": 88,
    "title": "트로이아 전쟁: 트로이아가 그리스의 오디세우스에게 함락되다.",
    "source": "한국어 위키백과 (6월 11일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/6%EC%9B%94_11%EC%9D%BC",
    "officialRecord": "트로이아 전쟁: 트로이아가 그리스의 오디세우스에게 함락되다.",
    "yasaStory": "기원전 1184년 6월 11일에 실제로 기록된 역사 사건입니다.\n\n트로이아 전쟁: 트로이아가 그리스의 오디세우스에게 함락되다."
  },
  {
    "id": "wiki-herodotus-0922--480-2",
    "month": 9,
    "day": 22,
    "year": -480,
    "king": "고대 그리스·지중해",
    "lunarDate": "양력 9월 22일 실제 기록",
    "category": "folklore",
    "interestScore": 88,
    "title": "살라미스 해전: 테미스토클레스의 그리스 연합 함대가 크세르크세스 1세의 페르시아 함대를 격…",
    "source": "한국어 위키백과 (9월 22일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/9%EC%9B%94_22%EC%9D%BC",
    "officialRecord": "살라미스 해전: 테미스토클레스의 그리스 연합 함대가 크세르크세스 1세의 페르시아 함대를 격파하다.",
    "yasaStory": "기원전 480년 9월 22일에 실제로 기록된 역사 사건입니다.\n\n살라미스 해전: 테미스토클레스의 그리스 연합 함대가 크세르크세스 1세의 페르시아 함대를 격파하다."
  },
  {
    "id": "wiki-herodotus-1012--539-3",
    "month": 10,
    "day": 12,
    "year": -539,
    "king": "고대 그리스·지중해",
    "lunarDate": "양력 10월 12일 실제 기록",
    "category": "episode",
    "interestScore": 88,
    "title": "페르시아의 키루스 대왕이 바빌론에 입성하다.(율리우스력)",
    "source": "한국어 위키백과 (10월 12일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/10%EC%9B%94_12%EC%9D%BC",
    "officialRecord": "페르시아의 키루스 대왕이 바빌론에 입성하다.(율리우스력)",
    "yasaStory": "기원전 539년 10월 12일에 실제로 기록된 역사 사건입니다.\n\n페르시아의 키루스 대왕이 바빌론에 입성하다.(율리우스력)"
  }
];

if (typeof CURATED_STORIES !== 'undefined') {
  WIKI_STORIES.forEach(story => {
    const key = `${String(story.month).padStart(2, '0')}-${String(story.day).padStart(2, '0')}`;
    if (!CURATED_STORIES[key]) CURATED_STORIES[key] = [];
    if (!CURATED_STORIES[key].some(e => e.officialRecord === story.officialRecord || e.id === story.id)) {
      CURATED_STORIES[key].push(story);
    }
  });
}
