// 오늘의 로마 제국 연대기 — 기원전 753년 건국 ~ 서로마 멸망 476년
const CATEGORIES = {
  mystery: { id: "mystery", label: "기이한 일", shortLabel: "기이한 일" },
  scandal: { id: "scandal", label: "궁중 비화", shortLabel: "궁중 비화" },
  folklore: { id: "folklore", label: "야담·영웅", shortLabel: "야담·영웅" },
  episode: { id: "episode", label: "황제의 일상", shortLabel: "황제의 일상" }
};

const CURATED_STORIES = {
  "01-10": [
    {
      id: "rome-0110-b049-rubicon",
      month: 1,
      day: 10,
      year: -49,
      king: "율리우스 카이사르",
      lunarDate: "기원전 49년 1월 10일",
      category: "folklore",
      interestScore: 99,
      title: "'주사위는 던져졌다(Alea iacta est)' — 루비콘 강을 건넌 카이사르의 운명적 결단",
      source: "플루타르코스 《영웅전》 & 수에토니우스 《황제전》",
      sillokUrl: "https://en.wikipedia.org/wiki/Crossing_the_Rubicon",
      officialRecord: "기원전 49년 1월 10일, 율리우스 카이사르가 군단을 이끌고 갈리아와 로마 본토의 경계인 루비콘 강을 건너며 내전을 시작하였다.",
      yasaStory: `당시 로마 법상 장군이 군대를 거느리고 루비콘 강을 넘어 이탈리아 본토로 들어오는 것은 곧 국가에 대한 반역이었다.\n\n강가에 멈춰 서서 깊은 고민에 잠겼던 카이사르는 마침내 말에 박차를 가하며 외쳤다. "주사위는 던져졌다!" 이 한마디와 함께 로마 공화정은 끝을 맺고 제정 로마의 서막이 열렸다.`
    },
    {
      id: "rome-0110-0037-caligula",
      month: 1,
      day: 10,
      year: 39,
      king: "제3대 황제 칼리굴라",
      lunarDate: "《황제전》 칼리굴라 편",
      category: "scandal",
      interestScore: 94,
      title: "사랑하는 애마 '인키타투스'에게 대리석 마구간을 지어주고 집정관으로 임명하려 한 칼리굴라",
      source: "수에토니우스 《황제전》",
      sillokUrl: "https://en.wikipedia.org/wiki/Incitatus",
      officialRecord: "칼리굴라 황제는 자신의 말 인키타투스에게 상아 구유와 자주색 망토, 노예들을 붙여주고 원로원 의석과 집정관직까지 주려 하였다. (수에토니우스)",
      yasaStory: `광기의 황제 칼리굴라는 원로원 귀족들을 조롱하기 위해 자신이 아끼던 경주마 '인키타투스'를 대리석 마구간에 모시고 금박을 입힌 귀리를 먹였다.\n\n심지어 경기가 있는 전날 밤에는 말이 시끄러워서 잠을 설칠까 봐 근위대를 시켜 동네 전체에 침묵령을 내렸고, 끝내 말을 로마 최고 관직인 집정관에 임명하겠다고 선언해 원로원을 아연실색하게 만들었다.`
    }
  ],
  "03-15": [
    {
      id: "rome-0315-b044-ides",
      month: 3,
      day: 15,
      year: -44,
      king: "율리우스 카이사르",
      lunarDate: "기원전 44년 3월 15일",
      category: "scandal",
      interestScore: 100,
      title: "'브루투스, 너마저...' — 기원전 44년 3월 15일 폼페이우스 회랑에서 암살당한 카이사르",
      source: "플루타르코스 《영웅전》 & 수에토니우스",
      sillokUrl: "https://en.wikipedia.org/wiki/Assassination_of_Julius_Caesar",
      officialRecord: "기원전 44년 3월 15일, 원로원 회의장에 들어선 카이사르가 브루투스와 카시우스 등 공화파 의원들의 칼에 23군데를 찔려 숨졌다.",
      yasaStory: `그날 아침 점술가가 "3월 15일을 조심하십시오"라고 경고했지만 카이사르는 웃어넘기며 원로원으로 향했다.\n\n의원들이 청원을 올리는 척 둘러싸더니 순식간에 단검을 뽑아 들었다. 필사적으로 저항하던 카이사르는 자신이 친아들처럼 아꼈던 브루투스가 칼을 들고 서 있는 것을 보자 망토로 얼굴을 가린 채 조용히 쓰러졌다.`
    }
  ],
  "04-21": [
    {
      id: "rome-0421-b753-romulus",
      month: 4,
      day: 21,
      year: -753,
      king: "초대 왕 로물루스",
      lunarDate: "기원전 753년 4월 21일",
      category: "mystery",
      interestScore: 98,
      title: "늑대의 젖을 먹고 자란 쌍둥이 로물루스와 레무스, 천년 제국 로마 건국의 날",
      source: "리비우스 《로마사》 1권",
      sillokUrl: "https://en.wikipedia.org/wiki/Founding_of_Rome",
      officialRecord: "테베레 강가에 버려졌던 쌍둥이 형제가 암늑대의 보살핌 속에 자라 기원전 753년 4월 21일 팔라티노 언덕에 로마를 세웠다. (리비우스)",
      yasaStory: `전쟁의 신 마르스의 아들로 태어났으나 바구니에 담겨 강물에 버려진 쌍둥이 로물루스와 레무스를 살린 것은 뜻밖에도 산에서 내려온 어미 늑대 한 마리였다.\n\n장성한 형제는 새 도시를 세우기로 했으나 위치 다툼 끝에 로물루스가 성벽을 쌓고 로마(Roma)라는 이름을 붙였다. 오늘날에도 매년 4월 21일은 '로마 탄생일'로 기념된다.`
    }
  ],
  "08-24": [
    {
      id: "rome-0824-0079-pompeii",
      month: 8,
      day: 24,
      year: 79,
      king: "티투스 황제 1년",
      lunarDate: "서기 79년 베수비오 화산",
      category: "mystery",
      interestScore: 98,
      title: "한낮의 하늘이 암흑으로 변하며 도시 전체가 화산재에 봉인된 폼페이 최후의 날",
      source: "소 플리니우스 서한집",
      sillokUrl: "https://en.wikipedia.org/wiki/Eruption_of_Mount_Vesuvius_in_79_AD",
      officialRecord: "79년 베수비오 화산이 대폭발하여 거대한 소나무 모양의 화산재 구름이 솟구치고 폼페이와 헤르쿨라네움이 순식간에 매몰되었다. (플리니우스)",
      yasaStory: `휴양 도시 폼페이의 시민들은 그날도 목욕탕과 빵집을 오가며 평온한 하루를 보내고 있었다. 하지만 정오 무렵, 800년 동안 잠들어 있던 베수비오 화산이 거대한 굉음과 함께 폭발했다.\n\n하늘에서 붉은 돌과 뜨거운 화산재가 비처럼 쏟아졌고, 2,000년이 지난 뒤 발굴된 폼페이의 빵집 화덕 속에는 그날 아침 굽던 81개의 빵이 탄 채로 그대로 남아 있었다.`
    }
  ],
  "11-12": [
    {
      id: "rome-1112-b218-hannibal",
      month: 11,
      day: 12,
      year: -218,
      king: "로마 공화정 · 제2차 포에니 전쟁",
      lunarDate: "초겨울 알프스 횡단",
      category: "folklore",
      interestScore: 98,
      title: "눈보라 치는 알프스 산맥을 코끼리 부대로 넘어 로마를 공포에 떨게 한 한니발",
      source: "리비우스 《로마사》 21권 & 폴리비오스",
      sillokUrl: "https://en.wikipedia.org/wiki/Hannibal%27s_crossing_of_the_Alps",
      officialRecord: "카르타고 명장 한니발이 보병·기병과 37마리의 전투 코끼리를 이끌고 초겨울 눈 덮인 알프스를 넘어 이탈리아 북부에 출현하니 로마가 경악하였다.",
      yasaStory: `로마인들은 알프스 산맥이라는 천연 요새가 있으니 카르타고가 감히 이탈리아 본토로 쳐들어오지 못할 거라 방심하고 있었다.\n\n하지만 한니발은 11월 초겨울 눈보라가 몰아치는 험준한 알프스 고개를 전투 코끼리까지 끌고 15일 만에 돌파했다. 바위가 길을 막자 나무를 쌓아 불을 지핀 뒤 식초를 부어 바위를 깨뜨렸다는 놀라운 일화가 전해지며, 이후 로마 어머니들은 아이가 울면 "한니발이 온다!"며 달랬다고 한다.`
    },
    {
      id: "rome-1112-b014-augustus",
      month: 11,
      day: 12,
      year: -14,
      king: "초대 황제 아우구스투스",
      lunarDate: "팍스 로마나 시대",
      category: "episode",
      interestScore: 96,
      title: "'나는 벽돌의 로마를 물려받아 대리석의 로마로 남겼다' — 아우구스투스의 소박한 밥상",
      source: "수에토니우스 《황제전》 아우구스투스 편",
      sillokUrl: "https://en.wikipedia.org/wiki/Augustus",
      officialRecord: "아우구스투스 황제는 40여 년간 로마의 평화(팍스 로마나)를 열었으나, 평생 검소한 옷과 소박한 치즈·무화과 식사를 즐겼다.",
      yasaStory: `권력을 잡은 뒤에도 '황제'라는 호칭 대신 겸손하게 '제1시민(프린켑스)'이라 불리길 원했던 아우구스투스.\n\n그는 로마 시내를 웅장한 대리석 신전과 광장으로 꾸몄지만, 정작 본인은 팔라티노 언덕의 소박한 집에서 지내며 아내 리비아와 딸 율리아가 직접 짠 모직 옷만 입었다. 식사 역시 호화로운 연회 대신 거친 빵, 작은 생선, 치즈와 무화과 몇 알로 때우는 일이 다반사였다고 한다.`
    },
    {
      id: "rome-1112-0064-nero",
      month: 11,
      day: 12,
      year: 64,
      king: "제5대 황제 네로",
      lunarDate: "로마 대화재 그 후",
      category: "scandal",
      interestScore: 95,
      title: "로마 시내를 불태우고 그 자리에 회전식 천장이 달린 '황금 궁전(도무스 아우레아)'을 지은 네로",
      source: "타키투스 《연대기》 & 수에토니우스",
      sillokUrl: "https://en.wikipedia.org/wiki/Domus_Aurea",
      officialRecord: "64년 로마 대화재 이후 네로 황제는 폐허가 된 시내 중심부에 거대한 정원과 인공 호수, 황금 궁전을 건설하였다. (타키투스)",
      yasaStory: `64년 로마의 14개 구역 중 10개 구역을 잿더미로 만든 대화재 직후, 네로 황제는 시민들이 살 집보다 자신의 새 궁전 '도무스 아우레아(황금 궁전)'부터 먼저 지었다.\n\n황금과 보석, 상아로 도배된 이 궁전의 연회장 천장은 밤하늘의 별처럼 빙글빙글 돌아가며 손님들 머리 위로 꽃잎과 향수를 뿌려주도록 설계되어 있었다. 네로 사후 로마인들은 이 독재의 흔적을 지우기 위해 인공 호수를 메우고 그 위에 거대한 '콜로세움'을 세워 시민들에게 돌려주었다.`
    },
    {
      id: "rome-1112-0175-marcus",
      month: 11,
      day: 12,
      year: 175,
      king: "5현제 · 마르쿠스 아우렐리우스",
      lunarDate: "게르만 전선 막사",
      category: "episode",
      interestScore: 97,
      title: "차가운 전선 천막 안에서 밤마다 자신에게 편지를 쓰던 철학자 황제의 《명상록》",
      source: "마르쿠스 아우렐리우스 《명상록》",
      sillokUrl: "https://en.wikipedia.org/wiki/Meditations",
      officialRecord: "마르쿠스 아우렐리우스 황제는 도나우 강 전선에서 게르만족과 싸우는 틈틈이 그리스어로 내면의 성찰을 기록해 《명상록》을 남겼다.",
      yasaStory: `로마 5현제 시대의 마지막 현군 마르쿠스 아우렐리우스는 평생 제국의 국경을 지키기 위해 추운 북방 전선의 야전 천막에서 살다시피 했다.\n\n하루 종일 전투와 반란, 역병 보고를 처리한 뒤 모두가 잠든 깊은 밤, 그는 촛불 아래서 누구에게 보여줄 목적이 아니라 오직 스스로를 다잡기 위한 일기 《명상록》을 적었다. "아침에 일어나기 싫거든 이렇게 생각하라. 나는 인간으로서 할 일을 하러 일어나는 것이다." 천하를 호령하던 절대 군주의 가장 인간적이고 철학적인 고백이다.`
    },
    {
      id: "rome-1112-0313-constantine",
      month: 11,
      day: 12,
      year: 313,
      king: "콘스탄티누스 대제",
      lunarDate: "밀라노 칙령",
      category: "mystery",
      interestScore: 96,
      title: "하늘에 떠오른 십자가 환시와 '밀라노 칙령', 로마 제국의 운명을 바꾼 신앙의 대전환",
      source: "에우세비우스 《교회사》",
      sillokUrl: "https://en.wikipedia.org/wiki/Edict_of_Milan",
      officialRecord: "콘스탄티누스 황제는 밀비우스 다리 전투 전날 하늘의 빛나는 표적을 보고 승리한 뒤 313년 밀라노 칙령으로 기독교 박해를 중단하였다.",
      yasaStory: `312년 로마 제국의 패권을 두고 막센티우스와 운명의 결전을 앞둔 콘스탄티누스는 대낮 하늘 태양 위에 빛나는 십자가 모양과 "이 표적으로 승리하리라"는 문구를 보았다고 전해진다.\n\n방패마다 그리스도 상징을 새겨 대승을 거둔 그는 이듬해 313년 '밀라노 칙령'을 선포해 모든 종교의 자유를 허용했고, 훗날 콘스탄티노플로 수도를 옮기며 천년 동로마 제국의 기틀을 닦았다.`
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
