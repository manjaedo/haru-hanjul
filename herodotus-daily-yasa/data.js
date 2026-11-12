// 오늘의 헤로도토스 《역사》 — 전 9권 고대 지중해·그리스·이집트·페르시아 야사
const CATEGORIES = {
  mystery: { id: "mystery", label: "기이한 일", shortLabel: "기이한 일" },
  scandal: { id: "scandal", label: "궁중 비화", shortLabel: "궁중 비화" },
  folklore: { id: "folklore", label: "야담·영웅", shortLabel: "야담·영웅" },
  episode: { id: "episode", label: "풍속·기문", shortLabel: "풍속·기문" }
};

const CURATED_STORIES = {
  "05-15": [
    {
      id: "hero-0515-b560-solon",
      month: 5,
      day: 15,
      year: -560,
      king: "리디아 · 크로이소스 왕",
      lunarDate: "헤로도토스 《역사》 제1권",
      category: "episode",
      interestScore: 99,
      title: "'죽기 전에는 아무도 행복하다 말하지 마라' — 황금 부자 크로이소스 왕과 아테네 현자 솔론",
      source: "헤로도토스 《역사》 제1권 (클리오)",
      sillokUrl: "https://en.wikipedia.org/wiki/Croesus",
      officialRecord: "리디아의 왕 크로이소스가 보물 창고를 자랑하며 '세상에서 가장 행복한 사람이 누구냐'고 묻자, 솔론은 '사람의 생애가 끝날 때까지는 행복하다 말할 수 없다'고 답하였다.",
      yasaStory: `황금 모래가 흐르는 강을 끼고 당대 최고의 부를 누렸던 리디아의 크로이소스 왕은 아테네의 현자 솔론을 궁전으로 초대해 산더미 같은 황금을 보여주며 물었다. "그대가 본 사람 중 가장 행복한 이가 누구인가?" (당연히 자기 이름을 말할 거라 기대하면서.)\n\n하지만 솔론은 묵묵히 아테네의 평범한 시민 텔로스와 효자 형제 클레오비스·비톤을 꼽으며 말했다. "인간의 삶은 70년, 하루도 같은 날이 없사옵니다. 왕이시여, 지금 아무리 부유해도 끝을 보기 전에는 누구도 행복하다고 부를 수 없습니다."\n\n훗날 크로이소스는 키루스 대제에게 패해 화형대 장작더미 위에 올라서야 비로소 "아아, 솔론이여!" 하고 탄식하며 그의 지혜를 깨달았다.`
    },
    {
      id: "hero-0515-b547-oracle",
      month: 5,
      day: 15,
      year: -547,
      king: "리디아 · 크로이소스 왕",
      lunarDate: "헤로도토스 《역사》 제1권",
      category: "mystery",
      interestScore: 96,
      title: "'강을 건너면 큰 제국이 멸망하리라' — 델포이 신탁의 아찔한 말장난에 속은 왕",
      source: "헤로도토스 《역사》 제1권",
      sillokUrl: "https://en.wikipedia.org/wiki/Delphic_oracle",
      officialRecord: "크로이소스가 페르시아를 공격해도 좋을지 델포이 신탁에 묻자 '할리스 강을 건너면 위대한 제국 하나가 멸망할 것'이라는 답이 돌아왔다.",
      yasaStory: `페르시아의 키루스 대제가 무섭게 커가자 불안해진 크로이소스는 신탁을 시험하기 위해 사신들을 보내 "지금 내가 무엇을 하고 있느냐"고 묻게 했다. 아폴론 신전의 델포이 무녀는 그가 몰래 거북이와 양고기를 청동 솥에 삶고 있는 것까지 정확히 맞혔다.\n\n완전히 신탁을 믿어버린 크로이소스는 황금 사자를 바치며 "페르시아를 치면 이기겠느냐"고 물었고, 신탁은 "강을 건너면 큰 제국이 무너지리라"고 답했다. 기뻐하며 진격한 크로이소스는 참패한 뒤에야 그 '큰 제국'이 페르시아가 아니라 바로 자기 나라 리디아였음을 깨달았다.`
    }
  ],
  "08-15": [
    {
      id: "hero-0815-b480-thermopylae",
      month: 8,
      day: 15,
      year: -480,
      king: "스파르타 · 레오니다스 왕",
      lunarDate: "헤로도토스 《역사》 제7권",
      category: "folklore",
      interestScore: 100,
      title: "'그늘에서 싸우면 좋지!' — 테르모필레 협곡에서 100만 페르시아군을 막아선 300명의 스파르타인",
      source: "헤로도토스 《역사》 제7권 (폴리힘니아)",
      sillokUrl: "https://en.wikipedia.org/wiki/Battle_of_Thermopylae",
      officialRecord: "크세르크세스의 대군이 테르모필레 협곡에 이르러 무기를 내놓으라 요구하자 스파르타 왕 레오니다스는 '와서 가져가라(Molon labe)'고 답하며 최후의 일인까지 싸웠다.",
      yasaStory: `기원전 480년 여름, 페르시아 크세르크세스 대제의 수십만 대군이 그리스로 들어가는 좁은 산악 길목 테르모필레 협곡에 들이닥쳤다.\n\n전투 직전 한 병사가 "페르시아군의 화살이 너무 많아 쏘면 해가 가려집니다!"라고 겁에 질려 말하자, 스파르타 전사 디에네케스는 태연히 웃으며 "그럼 우리가 시원한 그늘에서 싸울 수 있겠군!"이라고 대꾸했다. 사흘 동안 좁은 협곡을 철벽같이 지키던 레오니다스와 300명의 스파르타 용사들은 내통자의 배신으로 포위당하자 끝까지 도망치지 않고 전사해 자유의 전설로 남았다.`
    },
    {
      id: "hero-0815-b480-artemisia",
      month: 8,
      day: 15,
      year: -480,
      king: "할리카르나소스 · 아르테미시아 여왕",
      lunarDate: "헤로도토스 《역사》 제8권",
      category: "scandal",
      interestScore: 95,
      title: "'남자들은 여자가 되고, 여자는 남자가 되었구나!' — 살라미스 해전의 여걸 아르테미시아",
      source: "헤로도토스 《역사》 제8권 (우라니아)",
      sillokUrl: "https://en.wikipedia.org/wiki/Artemisia_I_of_Caria",
      officialRecord: "살라미스 해전에서 페르시아 편으로 참전한 아르테미시아 여왕이 그리스 함선의 추격을 피하려고 아군 배를 들이받아 침몰시키자, 이를 본 크세르크세스가 크게 감탄하였다.",
      yasaStory: `살라미스 해전에서 페르시아 함대가 좁은 해협에 갇혀 그리스 함대에 참패하던 날, 높은 언덕 황금 옥좌에서 전투를 지켜보던 크세르크세스 대제의 눈에 가장 빛난 지휘관은 자신의 고향 할리카르나소스의 여왕 아르테미시아였다.\n\n그리스 함선에 쫓겨 퇴로가 막히자 아르테미시아는 대담하게도 앞길을 막던 아군 페르시아 배를 그대로 들이받아 침몰시켜 버렸다. 그리스 배는 그녀가 같은 편인 줄 알고 추격을 멈췄고, 멀리서 이 장면을 본 크세르크세스는 그녀가 적선을 부순 줄로 착각해 "오늘 내 남자 장수들은 여자가 되었고, 여자 장수는 남자가 되었구나!"라고 극찬했다고 한다.`
    }
  ],
  "09-12": [
    {
      id: "hero-0912-b490-marathon",
      month: 9,
      day: 12,
      year: -490,
      king: "아테네 · 밀티아데스 장군",
      lunarDate: "헤로도토스 《역사》 제6권",
      category: "folklore",
      interestScore: 99,
      title: "페르시아 정예군을 물리친 마라톤 평원의 대첩과 42.195km 전령 전설의 탄생",
      source: "헤로도토스 《역사》 제6권 (에라토)",
      sillokUrl: "https://en.wikipedia.org/wiki/Battle_of_Marathon",
      officialRecord: "기원전 490년 마라톤 평원에서 아테네와 플라타이아의 1만 중장보병이 페르시아 대군을 향해 전력 질주 돌격하여 대승을 거두었다.",
      yasaStory: `다리우스 대제가 보낸 페르시아 대군이 마라톤 해변에 상륙하자, 수적으로 크게 열세였던 아테네군은 밀티아데스의 지휘 아래 화살 사거리를 돌파하기 위해 무거운 청동 갑옷을 입은 채 약 1.5km 거리를 전속력으로 달려 적진에 부딪쳤다.\n\n중앙을 일부러 약하게 두고 양 날개로 적을 포위한 아테네군은 대승을 거두었고, 승전보를 전하기 위해 마라톤에서 아테네까지 쉬지 않고 달려간 전령 페이디피데스("우리가 이겼다!"고 외치고 숨을 거두었다는 후대 전승)는 오늘날 올림픽 마라톤 경기의 유래가 되었다.`
    }
  ],
  "11-12": [
    {
      id: "hero-1112-b650-psammetichus",
      month: 11,
      day: 12,
      year: -650,
      king: "이집트 · 프삼메티코스 1세",
      lunarDate: "헤로도토스 《역사》 제2권",
      category: "mystery",
      interestScore: 97,
      title: "갓난아기 두 명에게 말 한마디 들려주지 않고 키운 이집트 왕의 '인류 최초의 언어' 실험",
      source: "헤로도토스 《역사》 제2권 (에우테르페)",
      sillokUrl: "https://en.wikipedia.org/wiki/Psamtik_I",
      officialRecord: "이집트 왕 프삼메티코스가 세상에서 가장 오래된 민족을 가리기 위해 갓난아기 둘을 목동에게 맡겨 말 없이 키우게 하니, 두 살 무렵 아기들이 처음으로 '베코스(Becos)'라 외쳤다.",
      yasaStory: `헤로도토스 《역사》 제2권 '이집트 편' 첫머리에 등장하는 세계 최초의 언어학(?) 실험이다.\n\n프삼메티코스 왕은 "이집트인과 프리지아인 중 누가 인류 최초의 민족인가"를 알아내기 위해 갓 태어난 아기 두 명을 외딴 오두막 목동에게 보내 "절대 아기들 앞에서 사람의 말을 하지 말고 염소 젖만 먹이라"고 명했다. 2년이 지난 어느 날 목동이 문을 열자 두 아기가 두 팔을 뻗으며 똑같이 **"베코스!"**라고 소리쳤다.\n\n왕이 온 나라를 뒤져 알아보니 '베코스'는 프리지아어로 '빵'을 뜻하는 단어였고, 결국 이집트 왕은 "프리지아인이 우리보다 더 오래된 민족"임을 인정할 수밖에 없었다고 한다. *(후대 학자들은 염소 울음소리를 따라 한 게 아니냐고 웃기도 한다.)*`
    },
    {
      id: "hero-1112-b530-polycrates",
      month: 11,
      day: 12,
      year: -530,
      king: "사모스 · 폴리크라테스",
      lunarDate: "헤로도토스 《역사》 제3권",
      category: "mystery",
      interestScore: 98,
      title: "불행을 피하려 바다에 던진 보석 반지가 며칠 뒤 물고기 뱃속에서 돌아온 기이한 비극",
      source: "헤로도토스 《역사》 제3권 (탈리아)",
      sillokUrl: "https://en.wikipedia.org/wiki/Polycrates",
      officialRecord: "너무나 승승장구하는 폴리크라테스를 걱정한 이집트 왕이 '가장 아끼는 보물을 버리라' 조언해 금반지를 바다에 던졌으나, 어부가 바친 큰 물고기 배 속에서 반지가 그대로 나왔다.",
      yasaStory: `사모스 섬의 지배자 폴리크라테스는 하는 일마다 100% 성공해 두려울 것이 없었다. 하지만 그의 절친 이집트 왕 아마시스는 편지를 보내 경고했다. "신들은 인간이 지나치게 완벽한 행운을 누리는 것을 질투하오. 큰 불행이 닥치기 전에 그대가 가장 아끼는 물건을 스스로 버려 슬픔을 맛보시오."\n\n고민 끝에 폴리크라테스는 배를 타고 먼바다로 나가 자신이 가장 사랑하던 에메랄드 금반지를 바다에 던져버렸다. 그런데 닷새 뒤, 한 어부가 "임금님께 바칠 만큼 거대한 물고기를 잡았다"며 궁궐로 가져왔는데, 요리사가 생선 배를 가르자 그 안에서 바로 그 금반지가 반짝이며 나왔던 것이다! 이 기이한 소식을 들은 이집트 왕은 "이제 그대의 비극은 피할 수 없다"며 즉시 동맹을 끊었고, 얼마 뒤 폴리크라테스는 처참한 최후를 맞았다.`
    },
    {
      id: "hero-1112-b513-scythia",
      month: 11,
      day: 12,
      year: -513,
      king: "스키타이 · 다리우스 원정",
      lunarDate: "헤로도토스 《역사》 제4권",
      category: "episode",
      interestScore: 95,
      title: "페르시아 대왕에게 '새·생쥐·개구리·화살 다섯 개'를 선물로 보낸 스키타이 유목민의 암호",
      source: "헤로도토스 《역사》 제4권 (멜포메네)",
      sillokUrl: "https://en.wikipedia.org/wiki/Scythian_campaign_of_Darius_I",
      officialRecord: "다리우스 대제가 스키타이를 정벌하러 갔으나 유목민들이 싸우지 않고 도망만 치다 어느 날 새·쥐·개구리와 화살 다섯 개를 사신 편에 보내왔다.",
      yasaStory: `아케메네스 제국의 다리우스 대제가 흑해 북쪽 스키타이 유목민을 정복하려고 대군을 몰고 갔지만, 성도 도시도 없는 스키타이인들은 말만 타고 끝없이 후퇴하며 페르시아군을 지치게 만들었다.\n\n어느 날 스키타이 사신이 다리우스 앞에 네 가지 선물을 내려놓고 말없이 사라졌다. **새 한 마리, 생쥐 한 마리, 개구리 한 마리, 그리고 화살 다섯 개.** 다리우스는 "땅(쥐)과 물(개구리)과 하늘(새)과 무기(화살)를 바치며 항복한다는 뜻이로구나!" 하고 기뻐했지만, 현명한 신하 고브리아스가 정반대로 해석했다. "아닙니다, 대왕이시여! '너희 페르시아군이 새처럼 날아가거나, 쥐처럼 땅을 파고 숨거나, 개구리처럼 물속에 뛰어들지 않는 한 우리 화살을 맞고 못 돌아갈 것'이라는 경고입니다!" 결국 다리우스는 이 암호의 무서움을 깨닫고 서둘러 철수했다.`
    },
    {
      id: "hero-1112-b486-pyramid",
      month: 11,
      day: 12,
      year: -450,
      king: "역사가 헤로도토스 견문",
      lunarDate: "헤로도토스 《역사》 제2권",
      category: "episode",
      interestScore: 94,
      title: "2,400년 전 이집트 피라미드를 직접 보고 '무·양파·마늘 값만 은 1,600달란트!'라 놀란 헤로도토스",
      source: "헤로도토스 《역사》 제2권",
      sillokUrl: "https://en.wikipedia.org/wiki/Histories_(Herodotus)",
      officialRecord: "헤로도토스는 쿠푸 왕의 대피라미드 벽에 인부들이 먹은 무·양파·마늘 비용이 은 1,600달란트라고 적혀 있었다는 안내인의 설명을 기록하였다.",
      yasaStory: `역사의 아버지 헤로도토스는 오늘날 우리보다 무려 2,400년이나 앞서 이집트 여행을 떠났는데, 그때조차 기자의 대피라미드는 이미 지어진 지 2,000년이 넘은 초고대 유적이었다!\n\n피라미드 앞에서 입을 다물지 못한 헤로도토스는 현지 통역사가 피라미드 외벽의 상형문자를 가리키며 "여기 적힌 글자가 공사 인부들에게 먹인 무, 양파, 마늘 값만 은 1,600달란트(수백억 원)라는 뜻이오"라고 설명하는 걸 그대로 받아 적었다. 사실과 과장이 섞여 있을지언정, 인류 최초의 르포 기자 같은 헤로도토스의 호기심과 발품이 고스란히 느껴지는 대목이다.`
    },
    {
      id: "hero-1112-b479-mycale",
      month: 11,
      day: 12,
      year: -479,
      king: "그리스 연합군 · 파우사니아스",
      lunarDate: "헤로도토스 《역사》 제9권 대미",
      category: "folklore",
      interestScore: 96,
      title: "페르시아 장군의 호화로운 금식탁 옆에 초라한 스파르타 검정 수프를 차려놓고 웃은 장군",
      source: "헤로도토스 《역사》 제9권 (칼리오페)",
      sillokUrl: "https://en.wikipedia.org/wiki/Battle_of_Plataea",
      officialRecord: "플라타이아 전투에서 대승을 거둔 스파르타 장군 파우사니아스는 적장 마르도니오스의 황금 천막에서 성대한 페르시아 요리와 소박한 스파르타 식사를 나란히 차리게 하였다.",
      yasaStory: `《역사》 마지막 제9권의 명장면이다. 기원전 479년 플라타이아 전투에서 페르시아 대군을 완파한 스파르타 사령관 파우사니아스는 적장 마르도니오스가 쓰던 눈부신 황금 천막과 은접시, 호화로운 페르시아 요리사들을 보고 기가 막혔다.\n\n그는 페르시아 요리사들에게 평소 적장에게 바치던 최고급 진수성찬을 차리게 한 뒤, 자기 부하들에게는 보리와 돼지 피로 끓인 밍밍한 스파르타식 검정 수프와 보리빵을 나란히 차려오게 했다. 그리고 그리스 장수들을 불러 모아 크게 웃으며 말했다. "페르시아인들의 어리석음을 보시오! 이토록 진수성찬을 매일 먹고 살면서, 고작 이런 보리죽 먹고 사는 우리 가난한 그리스인들의 땅을 빼앗겠다고 여기까지 쳐들어왔단 말이오!"`
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
