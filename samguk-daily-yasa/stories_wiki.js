// 한국어 위키백과 366일 실제 날짜별 사건 보강 (11편, 11일)
const WIKI_STORIES = [
  {
    "id": "wiki-samguk-0311-527-0",
    "month": 3,
    "day": 11,
    "year": 527,
    "king": "삼국시대",
    "lunarDate": "양력 3월 11일 실제 기록",
    "category": "episode",
    "interestScore": 88,
    "title": "신라가 불교를 공인하다.",
    "source": "한국어 위키백과 (3월 11일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/3%EC%9B%94_11%EC%9D%BC",
    "officialRecord": "신라가 불교를 공인하다.",
    "yasaStory": "527년 3월 11일에 실제로 기록된 역사 사건입니다.\n\n신라가 불교를 공인하다."
  },
  {
    "id": "wiki-samguk-0428--57-1",
    "month": 4,
    "day": 28,
    "year": -57,
    "king": "삼국 초기",
    "lunarDate": "양력 4월 28일 실제 기록",
    "category": "scandal",
    "interestScore": 88,
    "title": "혁거세 거서간이 즉위함으로써 신라가 건국되었다.",
    "source": "한국어 위키백과 (4월 28일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/4%EC%9B%94_28%EC%9D%BC",
    "officialRecord": "혁거세 거서간이 즉위함으로써 신라가 건국되었다.",
    "yasaStory": "기원전 57년 4월 28일에 실제로 기록된 역사 사건입니다.\n\n혁거세 거서간이 즉위함으로써 신라가 건국되었다."
  },
  {
    "id": "wiki-samguk-0503-189-2",
    "month": 5,
    "day": 3,
    "year": 189,
    "king": "삼국시대",
    "lunarDate": "양력 5월 3일 실제 기록",
    "category": "mystery",
    "interestScore": 88,
    "title": "백제에서 일식 발생.",
    "source": "한국어 위키백과 (5월 3일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/5%EC%9B%94_3%EC%9D%BC",
    "officialRecord": "백제에서 일식 발생.",
    "yasaStory": "189년 5월 3일에 실제로 기록된 역사 사건입니다.\n\n백제에서 일식 발생."
  },
  {
    "id": "wiki-samguk-0526-752-3",
    "month": 5,
    "day": 26,
    "year": 752,
    "king": "통일신라·남북국",
    "lunarDate": "양력 5월 26일 실제 기록",
    "category": "episode",
    "interestScore": 88,
    "title": "일본 동대사(東大寺) 대불(大佛)이 완성된 직후 열린 점안식에 신라 왕자 한아찬(韓阿湌) …",
    "source": "한국어 위키백과 (5월 26일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/5%EC%9B%94_26%EC%9D%BC",
    "officialRecord": "일본 동대사(東大寺) 대불(大佛)이 완성된 직후 열린 점안식에 신라 왕자 한아찬(韓阿湌) 김태렴(金泰廉) 등 사신단이 배를 타고 와서 참석하였다는 기록이 일본에 전해진다(《속일본기》 천평승보 4년(752년) 4월 9일). 단, 이 기록은 일본에만 전하며, 신라에는 전하지 않는다.",
    "yasaStory": "752년 5월 26일에 실제로 기록된 역사 사건입니다.\n\n일본 동대사(東大寺) 대불(大佛)이 완성된 직후 열린 점안식에 신라 왕자 한아찬(韓阿湌) 김태렴(金泰廉) 등 사신단이 배를 타고 와서 참석하였다는 기록이 일본에 전해진다(《속일본기》 천평승보 4년(752년) 4월 9일). 단, 이 기록은 일본에만 전하며, 신라에는 전하지 않는다."
  },
  {
    "id": "wiki-samguk-0718-645-4",
    "month": 7,
    "day": 18,
    "year": 645,
    "king": "삼국시대",
    "lunarDate": "양력 7월 18일 실제 기록",
    "category": "episode",
    "interestScore": 88,
    "title": "고구려-당 전쟁 중, 당의 장수 이적이 안시성을 포위하였다.",
    "source": "한국어 위키백과 (7월 18일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/7%EC%9B%94_18%EC%9D%BC",
    "officialRecord": "고구려-당 전쟁 중, 당의 장수 이적이 안시성을 포위하였다.",
    "yasaStory": "645년 7월 18일에 실제로 기록된 역사 사건입니다.\n\n고구려-당 전쟁 중, 당의 장수 이적이 안시성을 포위하였다."
  },
  {
    "id": "wiki-samguk-0608--57-5",
    "month": 6,
    "day": 8,
    "year": -57,
    "king": "삼국 초기",
    "lunarDate": "양력 6월 8일 실제 기록",
    "category": "scandal",
    "interestScore": 88,
    "title": "혁거세 거서간이 즉위함으로써 신라가 건국되었다.",
    "source": "한국어 위키백과 (6월 8일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/6%EC%9B%94_8%EC%9D%BC",
    "officialRecord": "혁거세 거서간이 즉위함으로써 신라가 건국되었다.",
    "yasaStory": "기원전 57년 6월 8일에 실제로 기록된 역사 사건입니다.\n\n혁거세 거서간이 즉위함으로써 신라가 건국되었다."
  },
  {
    "id": "wiki-samguk-0820-660-6",
    "month": 8,
    "day": 20,
    "year": 660,
    "king": "삼국시대",
    "lunarDate": "양력 8월 20일 실제 기록",
    "category": "folklore",
    "interestScore": 88,
    "title": "백제의 황산벌에서 백제군과 신라군 사이에 황산벌 전투가 발발하다.",
    "source": "한국어 위키백과 (8월 20일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/8%EC%9B%94_20%EC%9D%BC",
    "officialRecord": "백제의 황산벌에서 백제군과 신라군 사이에 황산벌 전투가 발발하다.",
    "yasaStory": "660년 8월 20일에 실제로 기록된 역사 사건입니다.\n\n백제의 황산벌에서 백제군과 신라군 사이에 황산벌 전투가 발발하다."
  },
  {
    "id": "wiki-samguk-0831-548-7",
    "month": 8,
    "day": 31,
    "year": 548,
    "king": "삼국시대",
    "lunarDate": "양력 8월 31일 실제 기록",
    "category": "episode",
    "interestScore": 88,
    "title": "백제 사신 약엽례(掠葉禮)가 백제로 귀환함.",
    "source": "한국어 위키백과 (8월 31일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/8%EC%9B%94_31%EC%9D%BC",
    "officialRecord": "백제 사신 약엽례(掠葉禮)가 백제로 귀환함.",
    "yasaStory": "548년 8월 31일에 실제로 기록된 역사 사건입니다.\n\n백제 사신 약엽례(掠葉禮)가 백제로 귀환함."
  },
  {
    "id": "wiki-samguk-0917-253-8",
    "month": 9,
    "day": 17,
    "year": 253,
    "king": "삼국시대",
    "lunarDate": "양력 9월 17일 실제 기록",
    "category": "scandal",
    "interestScore": 88,
    "title": "금관가야에서 마품왕이 제3대 왕으로 즉위.",
    "source": "한국어 위키백과 (9월 17일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/9%EC%9B%94_17%EC%9D%BC",
    "officialRecord": "금관가야에서 마품왕이 제3대 왕으로 즉위.",
    "yasaStory": "253년 9월 17일에 실제로 기록된 역사 사건입니다.\n\n금관가야에서 마품왕이 제3대 왕으로 즉위."
  },
  {
    "id": "wiki-samguk-1008-32-9",
    "month": 10,
    "day": 8,
    "year": 32,
    "king": "삼국시대",
    "lunarDate": "양력 10월 8일 실제 기록",
    "category": "episode",
    "interestScore": 88,
    "title": "신라에서 한가위의 가배(嘉俳)놀이 시작됨. 회소곡(會蘇曲)을 부름.",
    "source": "한국어 위키백과 (10월 8일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/10%EC%9B%94_8%EC%9D%BC",
    "officialRecord": "신라에서 한가위의 가배(嘉俳)놀이 시작됨. 회소곡(會蘇曲)을 부름.",
    "yasaStory": "32년 10월 8일에 실제로 기록된 역사 사건입니다.\n\n신라에서 한가위의 가배(嘉俳)놀이 시작됨. 회소곡(會蘇曲)을 부름."
  },
  {
    "id": "wiki-samguk-1211-220-10",
    "month": 12,
    "day": 11,
    "year": 220,
    "king": "삼국시대",
    "lunarDate": "양력 12월 11일 실제 기록",
    "category": "scandal",
    "interestScore": 88,
    "title": "조비가 무력으로 후한 헌제를 폐위시키고 위나라를 세우다. 삼국 시대가 시작되다.",
    "source": "한국어 위키백과 (12월 11일 연표)",
    "sillokUrl": "https://ko.wikipedia.org/wiki/12%EC%9B%94_11%EC%9D%BC",
    "officialRecord": "조비가 무력으로 후한 헌제를 폐위시키고 위나라를 세우다. 삼국 시대가 시작되다.",
    "yasaStory": "220년 12월 11일에 실제로 기록된 역사 사건입니다.\n\n조비가 무력으로 후한 헌제를 폐위시키고 위나라를 세우다. 삼국 시대가 시작되다."
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
