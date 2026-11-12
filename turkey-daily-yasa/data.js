// 오늘의 터키·오스만 연대기 — 1299년 오스만 건국 ~ 1923년 튀르키예 공화국
const CATEGORIES = {
  mystery: { id: "mystery", label: "기이한 일", shortLabel: "기이한 일" },
  scandal: { id: "scandal", label: "궁중 비화", shortLabel: "궁중 비화" },
  folklore: { id: "folklore", label: "야담·영웅", shortLabel: "야담·영웅" },
  episode: { id: "episode", label: "술탄의 일상", shortLabel: "술탄의 일상" }
};

const CURATED_STORIES = {
  "05-29": [
    {
      id: "turkey-0529-1453-mehmed",
      month: 5,
      day: 29,
      year: 1453,
      king: "오스만 제국 · 메흐메트 2세(정복왕)",
      lunarDate: "1453년 5월 29일",
      category: "folklore",
      interestScore: 100,
      title: "바다에 쇠사슬이 쳐지자 배 70척을 산 위로 끌어올린 메흐메트 2세와 콘스탄티노플 정복",
      source: "오스만 제국 연대기",
      sillokUrl: "https://en.wikipedia.org/wiki/Fall_of_Constantinople",
      officialRecord: "1453년 5월 29일, 21세의 젊은 술탄 메흐메트 2세가 비잔틴 제국의 난공불락 수도 콘스탄티노플을 함락시키고 아야 소피아를 제국의 심장으로 삼았다.",
      yasaStory: `천 년 넘게 무너지지 않던 콘스탄티노플의 테오도시우스 성벽과, 골든혼(금각만) 입구를 가로막은 거대한 쇠사슬 앞에서 수많은 정복자들이 발길을 돌렸다.\n\n하지만 21세의 젊은 술탄 메흐메트 2세는 기상천외한 작전을 실행했다. 밤사이 언덕길에 기름칠한 통나무 레일을 깔고 황소와 병사 수천 명을 동원해 오스만 함대 70여 척을 통째로 산 너머로 끌고 가 골든혼 바다에 띄워버린 것이다! 아침에 눈을 뜬 비잔틴 수비대는 내항 한가운데 떠 있는 오스만 함대를 보고 경악했고, 결국 1453년 5월 29일 동로마 제국은 역사 속으로 사라졌다.`
    }
  ],
  "10-29": [
    {
      id: "turkey-1029-1923-ataturk",
      month: 10,
      day: 29,
      year: 1923,
      king: "튀르키예 공화국 · 아타튀르크",
      lunarDate: "1923년 10월 29일",
      category: "episode",
      interestScore: 98,
      title: "오스만 제국의 폐허 위에서 공화국을 선포하고 아랍 문자를 로마자로 바꾼 아타튀르크",
      source: "튀르키예 현대사 사료",
      sillokUrl: "https://en.wikipedia.org/wiki/Mustafa_Kemal_Atat%C3%BCrk",
      officialRecord: "1923년 10월 29일 무스타파 케말(아타튀르크)이 앙카라에서 튀르키예 공화국 수립을 선포하고 초대 대통령에 취임하였다.",
      yasaStory: `제1차 세계대전 패배 후 열강에 의해 갈기갈기 찢길 위기에 놓였던 터키를 구해낸 영웅 무스타파 케말은 1923년 10월 29일 공화국을 선포했다.\n\n그는 나라를 근대화하기 위해 문자 개혁을 단행하며 직접 칠판과 분필을 들고 전국의 공원과 학교를 돌아다니며 국민들에게 새 알파벳을 가르쳤다. 국민들은 그에게 '터키인의 아버지(아타튀르크)'라는 존칭을 바쳤고, 한국전쟁 때는 형제의 나라 한국을 돕기 위해 대규모 파병을 결정하기도 했다.`
    }
  ],
  "11-12": [
    {
      id: "turkey-1112-1299-osman",
      month: 11,
      day: 12,
      year: 1299,
      king: "초대 술탄 오스만 1세",
      lunarDate: "오스만 건국 설화",
      category: "mystery",
      interestScore: 95,
      title: "오스만의 가슴에서 자라나 온 세상을 덮은 거대한 플라타너스 나무의 꿈",
      source: "오스만 초기 연대기",
      sillokUrl: "https://en.wikipedia.org/wiki/Osman%27s_Dream",
      officialRecord: "오스만 1세가 셰이크 에데발리의 집에서 잠을 자다 가슴에서 커다란 나무가 자라 세 대륙을 덮는 꿈을 꾸고 600년 오스만 제국을 열었다.",
      yasaStory: `아나톨리아의 작은 변경 부족장이었던 오스만 1세가 스승 셰이크 에데발리의 집에 머물던 밤, 놀라운 꿈을 꾸었다.\n\n스승의 품에서 떠오른 보름달이 오스만의 가슴속으로 들어가더니, 곧 그의 배꼽에서 거대한 플라타너스 나무가 자라나 아시아·유럽·아프리카 세 대륙과 네 개의 강(티그리스·유프라테스·나일·다뉴브)을 그늘로 덮는 것이었다. 꿈 이야기를 들은 스승은 "네 후손이 세계를 호령할 대제국을 세울 것"이라며 딸을 오스만에게 시집보냈고, 실제로 623년간 이어진 오스만 제국이 탄생했다.`
    },
    {
      id: "turkey-1112-1534-suleiman-hurrem",
      month: 11,
      day: 12,
      year: 1534,
      king: "제10대 술탄 슐레이만 대제",
      lunarDate: "톱카프 궁전 비화",
      category: "scandal",
      interestScore: 98,
      title: "노예 출신에서 대제국의 황후로 — 슐레이만 대제가 200년 관례를 깨고 결혼한 '후렘 술탄'",
      source: "오스만 궁정 기록 & 베네치아 대사 보고서",
      sillokUrl: "https://en.wikipedia.org/wiki/Hurrem_Sultan",
      officialRecord: "오스만 술탄들은 정식 결혼을 하지 않는 것이 200년 관례였으나, 슐레이만 대제는 노예 출신 후렘(록셀라나)을 자유인으로 해방시킨 뒤 성대한 정식 혼례를 올렸다.",
      yasaStory: `오스만 제국의 전성기를 이끈 슐레이만 대제는 수많은 정복 전쟁의 영웅이었지만, 궁궐 안에서는 오직 한 여인에게 마음을 빼앗겼다.\n\n동유럽 출신 포로로 톱카프 궁전 하렘에 들어온 후렘(서양명 록셀라나)은 뛰어난 지성과 유머로 슐레이만을 사로잡았다. 대제는 "술탄은 특정 여인과 혼인하지 않는다"는 200년 왕실 불문율을 깨고 후렘과 정식 결혼식을 올렸으며, 전쟁터에 나갈 때마다 그녀에게 애틋한 연애시 편지를 보냈다. 이때부터 오스만 궁정에서 여인들이 막강한 정치력을 발휘하는 '여인들의 술탄국' 시대가 열렸다.`
    },
    {
      id: "turkey-1112-1557-sinan",
      month: 11,
      day: 12,
      year: 1557,
      king: "슐레이만 대제 · 건축가 미마르 시난",
      lunarDate: "슐레이마니예 모스크 완공",
      category: "episode",
      interestScore: 96,
      title: "이스탄불의 스카이라인을 만든 천재 건축가 미마르 시난과 물담배 거품의 진실",
      source: "《테즈키레튈 뷔니얀》 (시난 자서전)",
      sillokUrl: "https://en.wikipedia.org/wiki/Mimar_Sinan",
      officialRecord: "예니체리 군인 출신 건축가 미마르 시난은 평생 300여 개의 모스크와 다리, 궁전을 지었으며 1557년 이스탄불 슐레이마니예 모스크를 완공하였다.",
      yasaStory: `50세에 수석 궁정 건축가가 되어 99세까지 살며 이스탄불의 가장 아름다운 모스크들을 지은 천재 미마르 시난.\n\n야사에 따르면 슐레이마니예 모스크 공사가 길어지자 시기하던 신하들이 "시난이 모스크 한가운데 앉아 물담배만 피우고 일을 안 한다"고 고자질했다. 술탄이 직접 모스크에 들이닥쳐 보니, 시난은 담배 연기 대신 거대한 돔 내부의 음향 울림을 확인하기 위해 물담배 물병이 보글거리는 소리까지 50m 밖에서 똑똑히 들리는지 음향 실험을 하고 있었다고 한다.`
    },
    {
      id: "turkey-1112-1609-blue-mosque",
      month: 11,
      day: 12,
      year: 1616,
      king: "제14대 술탄 아흐메트 1세",
      lunarDate: "블루 모스크 완공",
      category: "episode",
      interestScore: 94,
      title: "'황금(Altın)'을 '여섯(Altı)'으로 잘못 알아들어 6개 첨탑으로 지어진 블루 모스크의 비밀",
      source: "이스탄불 구전 야사",
      sillokUrl: "https://en.wikipedia.org/wiki/Blue_Mosque,_Istanbul",
      officialRecord: "술탄 아흐메트 1세가 세운 술탄 아흐메트 모스크(블루 모스크)는 내부를 수만 장의 푸른 이즈니크 타일로 장식하고 이례적으로 6개의 미나레트(첨탑)를 세웠다.",
      yasaStory: `이스탄불의 상징 블루 모스크에는 세계에서 유일하게 6개의 첨탑(미나레트)이 솟아 있다. 원래 이슬람 최고 성지 메카의 대모스크도 첨탑이 6개뿐이었기에 왕실에서도 조심스러운 일이었다.\n\n재미있는 야사에 따르면, 젊은 술탄 아흐메트 1세가 건축가 메흐메트 아가에게 "황금(터키어로 알튼, Altın)으로 첨탑을 장식하라"고 명했는데, 건축가가 이를 "여섯 개(알트, Altı)의 첨탑을 세우라"고 잘못 알아듣고 6개를 세워버렸다고 한다. 이후 메카 성지보다 첨탑이 같다는 비난이 일자, 술탄은 메카 모스크에 7번째 첨탑을 선물해 문제를 해결했다는 유쾌한 이야기가 전해진다.`
    },
    {
      id: "turkey-1112-1718-tulip",
      month: 11,
      day: 12,
      year: 1718,
      king: "제23대 술탄 아흐메트 3세",
      lunarDate: "튤립 시대(랄레 데브리)",
      category: "episode",
      interestScore: 93,
      title: "유럽으로 '튤립'을 전파한 오스만 궁전의 튤립 광풍 — 거북이 등껍질에 촛불을 켠 밤 연회",
      source: "오스만 '튤립 시대' 기록",
      sillokUrl: "https://en.wikipedia.org/wiki/Tulip_period",
      officialRecord: "1718~1730년 아흐메트 3세 치세는 예술과 평화를 숭상하며 궁전 정원마다 수만 송이의 튤립을 심어 '튤립 시대'라 불렸다.",
      yasaStory: `네덜란드의 상징처럼 알려진 튤립의 원산지는 사실 터키(오스만 제국)였다. 오스만인들은 '랄레(Lale)'라 부르며 튤립을 신성한 꽃으로 아꼈고, 16세기 네덜란드로 건너간 뒤 18세기 오스만 궁전에서도 폭발적인 '튤립 시대'가 열렸다.\n\n야사에 따르면 아흐메트 3세의 궁전 정원에서 밤마다 튤립 축제가 열릴 때면, 수많은 거북이 등껍질 위에 작은 촛불을 올려놓고 튤립 꽃밭 사이를 걸어 다니게 해 마치 꽃밭 속을 별빛이 떠다니는 듯한 환상적인 풍경을 연출했다고 한다.`
    }
  ]
};

function getStoriesForDate(month, day) {
  const key = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const list = CURATED_STORIES[key] ? [...CURATED_STORIES[key]] : [];
  return list.sort((a, b) => (a.year - b.year) || (b.interestScore - a.interestScore));
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

function getAllLegendStories() {
  const all = [];
  Object.values(CURATED_STORIES).forEach(list => list.forEach(item => all.push(item)));
  return all.sort((a, b) => b.interestScore - a.interestScore);
}
