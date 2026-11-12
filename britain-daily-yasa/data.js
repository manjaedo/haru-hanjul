// 오늘의 영국·알프레드 연대기 — 《앵글로색슨 연대기》 및 영국 왕조사 (연도별 사료·야사)

const CATEGORIES = {
  mystery: { id: "mystery", label: "기이한 일", shortLabel: "기이한 일" },
  scandal: { id: "scandal", label: "궁중 비화", shortLabel: "궁중 비화" },
  folklore: { id: "folklore", label: "야담·영웅", shortLabel: "야담·영웅" },
  episode: { id: "episode", label: "왕의 일상", shortLabel: "왕의 일상" }
};

const CURATED_STORIES = {
  "02-14": [
    {
      id: "britain-0214-1016-cnut",
      month: 2,
      day: 14,
      year: 1016,
      king: "크누트 대왕",
      lunarDate: "《앵글로색슨 연대기》 & 헨리 오브 헌팅던",
      category: "episode",
      interestScore: 96,
      title: "아첨하는 신하들을 꾸짖기 위해 바닷가에 옥좌를 놓고 '파도야 멈춰라!' 명령한 크누트 대왕",
      source: "《앵글로색슨 연대기》 & 중세 영국 연대기",
      sillokUrl: "https://en.wikipedia.org/wiki/King_Canute_and_the_tide",
      officialRecord: "크누트 왕은 밀물이 밀려오는 바닷가에 의자를 놓게 하고 '바다야, 내 명령이니 감히 내 옷을 적시지 말라' 외쳤으나 파도가 발을 적시자 신하들에게 '하늘 아래 왕의 권세도 자연 앞에서는 헛되다'고 일갈하였다.",
      yasaStory: `11세기 잉글랜드와 덴마크·노르웨이를 동시에 다스리던 북해 제국의 황제 크누트 대왕은 날마다 "전하께서는 세상 모든 것을 마음대로 하실 수 있사옵니다"라고 아부하는 신하들이 꼴 보기 싫었다.\n\n어느 날 크누트 대왕은 신하들을 바닷가로 불러 밀물이 들어오는 모래사장 한가운데 왕좌를 놓게 했다. 그리고 위엄 있는 목소리로 파도를 향해 외쳤다. "바다야! 너도 내 땅의 일부이니 감히 내 발을 적시지 말고 당장 물러가라!" 하지만 파도는 왕의 발과 옷자락을 무심히 적셨다. 크누트는 자리를 박차고 일어나 "보아라! 세상의 어떤 왕도 자연의 법칙과 신의 섭리는 거스를 수 없느니라. 다시는 내게 헛된 아첨을 하지 말라"고 꾸짖었다.`
    },
    {
      id: "britain-0214-1542-howard",
      month: 2,
      day: 14,
      year: 1542,
      king: "튜더 왕조 · 헨리 8세",
      lunarDate: "튜더 궁중 비화",
      category: "scandal",
      interestScore: 93,
      title: "여섯 번 결혼한 헨리 8세와 10대 왕비 캐서린 하워드의 런던탑 비극",
      source: "튜더 왕실 기록",
      sillokUrl: "https://en.wikipedia.org/wiki/Henry_VIII",
      officialRecord: "헨리 8세의 다섯 번째 왕비 캐서린 하워드가 과거의 연애와 불륜 혐의로 고발되어 런던탑에서 처형당하였다.",
      yasaStory: `아들 후계자를 얻기 위해 여섯 번이나 결혼을 거듭하며 로마 가톨릭에서 떨어져 나와 영국 국교회를 세운 헨리 8세.\n\n나이 오십을 바라보던 헨리 8세는 스무 살도 안 된 젊은 왕비 캐서린 하워드를 맞이해 '가시 없는 장미'라 부르며 끔찍이 아꼈다. 하지만 결혼 전후의 비밀 연애가 신하들의 밀고로 들통나자 헨리 8세는 배신감에 치를 떨며 결국 두 번째 왕비 앤 불린과 마찬가지로 런던탑 사형장으로 보내고 말았다.`
    }
  ],
  "05-15": [
    {
      id: "britain-0515-0878-harp",
      month: 5,
      day: 15,
      year: 878,
      king: "웨식스 · 알프레드 대왕",
      lunarDate: "《앵글로색슨 연대기》 878년",
      category: "folklore",
      interestScore: 98,
      title: "하프 악사로 변장해 바이킹 적진 한복판으로 걸어 들어간 알프레드 대왕의 담력",
      source: "《앵글로색슨 연대기》 & 윌리엄 오브 맘즈베리 연대기",
      sillokUrl: "https://en.wikipedia.org/wiki/Alfred_the_Great",
      officialRecord: "878년 봄, 알프레드는 아셀니 늪지에서 군사를 다시 모은 뒤 에딩턴에서 구스룸의 바이킹 대군을 격파하고 항복을 받아내었다. (《앵글로색슨 연대기》)",
      yasaStory: `878년 초, 데인족 바이킹의 기습으로 잉글랜드 전체가 함락 위기에 놓이자 알프레드 대왕은 서머싯의 작은 늪지대 섬 '아셀니'로 피신해 반격을 준비했다.\n\n전설에 따르면 알프레드는 적의 병력과 약점을 직접 파악하기 위해 하프를 메고 음유시인으로 변장한 뒤 혼자 바이킹 진영으로 걸어 들어갔다! 뛰어난 하프 연주와 노래 실력으로 바이킹 장수들의 술자리에까지 불려 들어간 알프레드는 적의 배치가 허술한 곳을 낱낱이 외워 돌아왔고, 며칠 뒤 에딩턴 전투에서 바이킹 군대를 대파하며 잉글랜드를 구해냈다.`
    },
    {
      id: "britain-0515-1588-armada",
      month: 5,
      day: 15,
      year: 1588,
      king: "튜더 왕조 · 엘리자베스 1세",
      lunarDate: "스페인 무적함대 격파",
      category: "folklore",
      interestScore: 96,
      title: "'내 몸은 약한 여인이나 심장은 왕의 심장이라!' — 무적함대를 맞선 엘리자베스 1세",
      source: "튜더 왕실 틸버리 연설문",
      sillokUrl: "https://en.wikipedia.org/wiki/Spanish_Armada",
      officialRecord: "1588년 스페인의 130척 무적함대가 침공하자 엘리자베스 1세는 틸버리 군영에 갑옷을 입고 나타나 병사들을 독려하였고, 화공선과 폭풍으로 대승을 거두었다.",
      yasaStory: `1588년, 세계 최강 스페인 제국의 무적함대 130척이 영국 해협으로 몰려오자 런던은 공포에 휩싸였다.\n\n그때 엘리자베스 1세 여왕은 백마를 타고 은빛 흉갑을 입은 채 틸버리 군영 병사들 앞에 서서 역사적인 연설을 남겼다. "나는 연약한 여인의 몸을 가졌으나, 내 안에는 잉글랜드의 왕, 아니 어떤 왕보다도 강한 심장과 위장이 있노라!" 여왕의 결의에 사기가 하늘을 찌른 영국 해군은 프랜시스 드레이크의 지휘 아래 불을 붙인 화공선을 적 함대 속으로 밀어 넣어 무적함대를 격파하고 대영제국 해양 패권의 문을 열었다.`
    }
  ],
  "06-15": [
    {
      id: "britain-0615-1215-magna-carta",
      month: 6,
      day: 15,
      year: 1215,
      king: "플랜태저넷 · 존 왕",
      lunarDate: "양력 1215년 6월 15일",
      category: "scandal",
      interestScore: 99,
      title: "무능하고 탐욕스러운 존 왕이 귀족들에게 포위당해 서명한 인류 자유의 초석, '마그나 카르타'",
      source: "영국 대헌장(Magna Carta) 사료",
      sillokUrl: "https://en.wikipedia.org/wiki/Magna_Carta",
      officialRecord: "1215년 6월 15일, 러니미드 초원에서 잉글랜드 존 왕은 귀족들의 요구를 받아들여 '왕도 법 아래 있으며 정당한 재판 없이 누구도 가둘 수 없다'는 대헌장에 옥새를 찍었다.",
      yasaStory: `형 리처드 사자심왕의 뒤를 이은 존 왕은 전쟁마다 패하고 무리한 세금을 뜯어내 '실지왕(땅을 잃은 왕)'이라 불리며 백성과 귀족의 원성을 샀다.\n\n결국 참다못한 영국 귀족들이 군대를 이끌고 런던을 점령한 뒤, 1215년 6월 15일 템스강 변 러니미드 초원에서 존 왕을 에워싸고 문서 하나를 내밀었다. 바로 '왕이라 할지라도 법 위에 군림할 수 없다'는 마그나 카르타(대헌장)였다. 존 왕은 씩씩거리며 옥새를 찍고 돌아가자마자 무효를 선언했지만, 이 문서는 훗날 의회 민주주의와 법치주의의 위대한 출발점이 되었다.`
    }
  ],
  "08-15": [
    {
      id: "britain-0815-1192-richard",
      month: 8,
      day: 15,
      year: 1192,
      king: "플랜태저넷 · 리처드 1세(사자심왕)",
      lunarDate: "제3차 십자군 원정",
      category: "folklore",
      interestScore: 95,
      title: "적장 살라딘이 감탄해 명마를 선물로 보낸 사자심왕 리처드와 귀국길 납치 야사",
      source: "중세 영국·십자군 연대기",
      sillokUrl: "https://en.wikipedia.org/wiki/Richard_I_of_England",
      officialRecord: "리처드 1세는 팔레스타인에서 이슬람의 영웅 살라딘과 명승부를 벌인 뒤, 귀국길에 오스트리아에서 체포되어 막대한 몸값을 내고 풀려났다.",
      yasaStory: `용맹함 때문에 '사자심왕(Lionheart)'이라 불린 리처드 1세와 이슬람의 영웅 살라딘의 대결은 중세 기사도의 꽃이었다.\n\n전투 도중 리처드의 말이 쓰러지자, 적장 살라딘은 "저렇게 용감한 기사가 걸어서 싸우게 할 수는 없다"며 즉시 아랍 명마 두 마리를 선물로 보내주었고, 리처드가 열병에 걸렸을 때는 눈(얼음)과 과일을 보내 쾌유를 빌어주었다. 그러나 정작 평화협정을 맺고 집으로 돌아가던 리처드는 오스트리아 공작에게 붙잡혀 갇혔는데, 충성스러운 음유시인 블론델이 성들을 돌며 노래를 불러 왕을 찾아냈다는 유명한 야사가 전해진다.`
    }
  ],
  "10-14": [
    {
      id: "britain-1014-1066-hastings",
      month: 10,
      day: 14,
      year: 1066,
      king: "노르만 왕조 · 정복왕 윌리엄",
      lunarDate: "양력 1066년 10월 14일",
      category: "scandal",
      interestScore: 99,
      title: "영국 역사를 송두리째 바꾼 단 하루의 혈투, 1066년 10월 14일 '헤이스팅스 전투'",
      source: "《앵글로색슨 연대기》 1066년 & 바이외 태피스트리",
      sillokUrl: "https://en.wikipedia.org/wiki/Battle_of_Hastings",
      officialRecord: "1066년 10월 14일, 노르망디 공작 윌리엄이 잉글랜드 해롤드 왕과 헤이스팅스에서 격돌하여 해롤드 왕이 전사하고 잉글랜드의 새 왕이 되었다. (《앵글로색슨 연대기》)",
      yasaStory: `《앵글로색슨 연대기》에서 가장 극적이고 비극적인 날이 바로 1066년 10월 14일이다.\n\n잉글랜드의 해롤드 왕은 불과 보름 전 북부에서 바이킹 침략군을 물리친 직후, 남부 해안에 상륙한 노르망디 공작 윌리엄을 막기 위해 강행군으로 달려왔다. 하루 종일 치열하게 맞서던 전투 끝에 노르망디군이 쏜 화살이 해롤드 왕의 눈에 꽂히며 전세가 기울었고, 그날로 앵글로색슨 왕조가 막을 내리고 프랑스어권 노르만 귀족들이 잉글랜드를 지배하는 노르만 왕조가 시작되었다.`
    }
  ],
  "11-12": [
    {
      id: "britain-1112-0871-alfred-king",
      month: 11,
      day: 12,
      year: 871,
      king: "웨식스 · 알프레드 대왕 즉위",
      lunarDate: "《앵글로색슨 연대기》 871년",
      category: "episode",
      interestScore: 96,
      title: "아홉 번의 전투를 치른 '전투의 해' 871년, 스물두 살 알프레드가 왕위에 오르다",
      source: "《앵글로색슨 연대기》 871년 & 아세르 《알프레드 대왕전》",
      sillokUrl: "https://en.wikipedia.org/wiki/Anglo-Saxon_Chronicle",
      officialRecord: "871년, 에설레드 왕이 세상을 떠나자 그의 동생 알프레드가 웨식스의 왕위를 이어받았으며, 그해에만 이교도(바이킹) 대군과 아홉 차례의 큰 싸움을 벌였다. (《앵글로색슨 연대기》)",
      yasaStory: `871년은 《앵글로색슨 연대기》에서 '피와 불꽃의 해'로 기록되어 있다. 바이킹 대군이 잉글랜드 왕국들을 차례로 무너뜨리고 마지막 남은 웨식스마저 집어삼키려 할 때, 스물두 살의 젊은 왕자 알프레드가 형의 뒤를 이어 왕위에 올랐다.\n\n알프레드는 어린 시절 병약했지만 책 읽기를 유독 좋아해, 어머니가 "이 아름다운 시집을 가장 먼저 외우는 아들에게 주겠다"고 하자 형들을 제치고 책을 통째로 외워버렸다는 천재 소년이었다. 왕이 되자마자 지독한 만성 복통을 앓으면서도 아홉 번의 전투를 치러내며 나라를 지켜낸 불굴의 군주였다.`
    },
    {
      id: "britain-1112-0878-burnt-cakes",
      month: 11,
      day: 12,
      year: 878,
      king: "웨식스 · 알프레드 대왕",
      lunarDate: "피란 시절 전설",
      category: "folklore",
      interestScore: 98,
      title: "소작농 아낙네의 '오트 케이크'를 태워 먹었다가 등짝을 맞고 꾸중 들은 알프레드 대왕",
      source: "《성 네오트 전》 & 영국 구전 야사",
      sillokUrl: "https://en.wikipedia.org/wiki/Alfred_the_Great#Legend_of_the_burnt_cakes",
      officialRecord: "늪지대로 피신해 정체를 숨기고 농가에 머물던 알프레드 왕은 화덕의 빵을 지키다 나라 걱정에 빠져 빵을 새까맣게 태우고 말았다.",
      yasaStory: `영국 사람이라면 어린 시절 누구나 듣는 알프레드 대왕의 가장 유명한 인간미 넘치는 일화다.\n\n바이킹에게 쫓겨 누더기 옷을 입고 늪지대 농가에 숨어 지내던 알프레드에게 집주인 아낙네가 외출하며 부탁했다. "여보게 나그네, 내가 돌아올 때까지 화덕 위의 밀빵(케이크)이 타지 않게 잘 뒤집어 주시오!" 하지만 알프레드는 화살을 다듬으며 나라를 되찾을 전략에 골몰하다 그만 빵을 시커멓게 태워버렸다.\n\n돌아온 아낙네는 그가 임금인지도 모르고 "이 게으름뱅이 같으니! 먹을 때는 제일 먼저 달려들면서 빵 하나 못 지켜!"라며 불호령을 내렸다. 알프레드 대왕은 화를 내기는커녕 자신의 잘못을 조용히 사과하며 고개를 숙였다고 전해진다.`
    },
    {
      id: "britain-1112-0886-london-candle",
      month: 11,
      day: 12,
      year: 886,
      king: "웨식스 · 알프레드 대왕",
      lunarDate: "《앵글로색슨 연대기》 886년",
      category: "episode",
      interestScore: 95,
      title: "하루 24시간을 8시간씩 쪼개 쓰기 위해 '눈금 양초 시계'를 발명한 알프레드 대왕의 시간 관리",
      source: "《앵글로색슨 연대기》 886년 & 아세르 《알프레드 대왕전》",
      sillokUrl: "https://en.wikipedia.org/wiki/Alfred_the_Great",
      officialRecord: "886년 알프레드 대왕이 런던을 수복하고 백성들의 충성을 받았으며, 시간을 정확히 재기 위해 12인치 양초를 만들어 4시간마다 타들어가게 하였다.",
      yasaStory: `886년 바이킹에게 빼앗겼던 런던을 되찾고 '앵글로색슨족의 왕'으로 추대된 알프레드 대왕은 누구보다 시간을 아끼는 워커홀릭이었다.\n\n하루를 기도·학문, 국정·전쟁, 수면·휴식 각각 8시간씩 정확히 나누어 쓰기 위해, 그는 똑같은 무게의 밀랍으로 12인치 길이의 양초 6개를 만들어 1인치마다 눈금을 새겼다. 바람에 촛불이 흔들려 타는 속도가 달라지자 얇게 깎은 소 뿔(horn)로 바람막이 등롱(랜턴)까지 직접 고안해 냈으니, 실로 중세 영국의 세종대왕이라 부를 만하다.`
    },
    {
      id: "britain-1112-0892-chronicle",
      month: 11,
      day: 12,
      year: 892,
      king: "웨식스 · 알프레드 대왕",
      lunarDate: "《앵글로색슨 연대기》 편찬",
      category: "episode",
      interestScore: 99,
      title: "'우리의 말로 역사를 써라!' — 알프레드 대왕이 《앵글로색슨 연대기》 편찬을 명한 이유",
      source: "《앵글로색슨 연대기》 원본 서문",
      sillokUrl: "https://en.wikipedia.org/wiki/Anglo-Saxon_Chronicle",
      officialRecord: "알프레드 대왕은 라틴어를 모르는 백성과 성직자들도 역사와 지혜를 읽을 수 있도록 고대 영어로 《앵글로색슨 연대기》를 편찬하여 전국 수도원에 배포하였다.",
      yasaStory: `당시 유럽의 모든 책과 역사서는 소수의 성직자만 읽을 수 있는 라틴어로 쓰였다. 하지만 알프레드 대왕은 "왜 우리 백성들은 자기 나라의 역사와 학문을 우리 말로 읽지 못하느냐"며 한탄했다.\n\n890년대 초, 그는 궁정 학자들과 함께 《앵글로색슨 연대기》를 고대 영어(올드 잉글리시)로 편찬하게 해 해마다 일어난 사건을 기록하고, 필사본을 만들어 윈체스터·캔터베리·피터버러 등 전국 주요 수도원에 보내 계속 이어 적도록 명했다. 덕분에 영국은 유럽에서 가장 먼저 자국어로 쓰인 생생한 연대기 역사를 보유한 나라가 되었다.`
    },
    {
      id: "britain-1112-1086-domesday",
      month: 11,
      day: 12,
      year: 1086,
      king: "노르만 왕조 · 정복왕 윌리엄",
      lunarDate: "《둠즈데이 북》 완성",
      category: "mystery",
      interestScore: 94,
      title: "잉글랜드의 소·돼지 한 마리까지 빠짐없이 기록해 백성들이 '최후의 심판 책'이라 부른 장부",
      source: "《앵글로색슨 연대기》 1085~1086년",
      sillokUrl: "https://en.wikipedia.org/wiki/Domesday_Book",
      officialRecord: "왕이 전국에 조사관을 보내 땅이 얼마나 되고 가축이 몇 마리인지 낱낱이 적게 하니, 소 한 마리 돼지 한 마리도 빠진 것이 없었다. (《앵글로색슨 연대기》)",
      yasaStory: `1085년 크리스마스, 잉글랜드를 정복한 윌리엄 1세는 전국의 토지와 재산을 철저히 조사해 세금을 매기기로 결심했다.\n\n《앵글로색슨 연대기》의 사관은 당시의 놀라움을 이렇게 적었다. "왕의 관리들이 온 나라를 샅샅이 뒤져서 땅 한 뙈기, 소 한 마리, 암소 한 마리, 돼지 한 마리까지도 빼놓지 않고 기록했으니 참으로 말하기조차 부끄러울 지경이었다!" 한 번 적히면 절대 바꿀 수 없고 빠져나갈 구멍이 없다 하여, 백성들은 이 무서운 토지 대장을 성경의 최후의 심판 날에 빗대어 '둠즈데이 북(Domesday Book)'이라 불렀다.`
    }
  ],
  "12-25": [
    {
      id: "britain-1225-1066-westminster",
      month: 12,
      day: 25,
      year: 1066,
      king: "노르만 왕조 · 정복왕 윌리엄",
      lunarDate: "양력 1066년 12월 25일",
      category: "scandal",
      interestScore: 95,
      title: "성탄절 대관식 도중 밖에서 불길과 비명이 터져 나온 웨스트민스터 사원의 소동",
      source: "《앵글로색슨 연대기》 & 오더릭 바이탈리스",
      sillokUrl: "https://en.wikipedia.org/wiki/William_the_Conqueror",
      officialRecord: "1066년 크리스마스 날 웨스트민스터 사원에서 윌리엄의 대관식이 열렸을 때, 밖을 지키던 노르만 병사들이 백성들의 환호 소리를 반란으로 착각해 주변 가옥에 불을 질렀다. (연대기)",
      yasaStory: `1066년 크리스마스 날, 헤이스팅스 전투에서 승리한 노르망디 공작 윌리엄이 웨스트민스터 사원에서 잉글랜드 국왕 대관식을 치르고 있었다.\n\n대주교가 "윌리엄을 왕으로 받아들이겠소?" 묻자 사원 안의 영국인과 노르만 귀족들이 일제히 "예!"라고 외쳤다. 그런데 사원 밖을 경비하던 노르만 기병들이 안에서 들려온 거대한 함성을 '잉글랜드인들의 폭동'으로 착각하고 주변 민가에 불을 질러버렸다. 사원 안으로 연기가 자욱하게 밀려들자 귀족들이 모두 도망쳐 나갔고, 정복왕 윌리엄은 공포에 떨며 남은 사제 몇 명 앞에서 서둘러 왕관을 썼다는 웃지 못할 일화가 전해진다.`
    },
    {
      id: "britain-1225-1837-victoria",
      month: 12,
      day: 25,
      year: 1840,
      king: "하노버 왕조 · 빅토리아 여왕",
      lunarDate: "빅토리아 시대 성탄절 풍경",
      category: "episode",
      interestScore: 92,
      title: "오늘날의 '화이트 웨딩드레스'와 '크리스마스 트리'를 전 세계에 유행시킨 빅토리아 여왕과 알버트 공",
      source: "영국 왕실 아카이브",
      sillokUrl: "https://en.wikipedia.org/wiki/Queen_Victoria",
      officialRecord: "1840년 빅토리아 여왕이 결혼식에서 순백의 레이스 드레스를 입고, 1848년 왕실 가족이 크리스마스 트리 앞에 모인 판화가 신문에 실리며 세계적인 풍습이 되었다.",
      yasaStory: `원래 유럽에서 결혼식 드레스는 빨간색이나 파란색 등 화려한 색상이 흔했다. 하지만 1840년 빅토리아 여왕이 사촌 알버트 공과 결혼할 때 순백의 하얀 실크와 레이스 드레스를 입자, 전 유럽과 세계 신부들이 이를 따라 입기 시작해 오늘날의 '웨딩드레스' 공식이 탄생했다.\n\n또한 1848년 겨울, 독일 출신 남편 알버트 공이 윈저 성에 장식해 준 전나무 크리스마스 트리 앞에 여왕 가족이 둘러선 그림이 《런던 뉴스》에 실리자, 영국 가정마다 크리스마스 트리를 세우는 풍습이 순식간에 퍼져나갔다.`
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

  const toDayOfYear = (m, d) => {
    const dt = new Date(2026, m - 1, d);
    const start = new Date(2026, 0, 1);
    return Math.round((dt - start) / 86400000);
  };

  const target = toDayOfYear(month, day);
  let bestKey = keys[0];
  let bestDiff = 999;

  keys.forEach(k => {
    const [km, kd] = k.split('-').map(Number);
    const doy = toDayOfYear(km, kd);
    const rawDiff = Math.abs(doy - target);
    const wrapDiff = Math.min(rawDiff, 365 - rawDiff);
    if (wrapDiff > 0 && wrapDiff < bestDiff) {
      bestDiff = wrapDiff;
      bestKey = k;
    }
  });

  const [m, d] = bestKey.split('-').map(Number);
  return { month: m, day: d, key: bestKey, count: CURATED_STORIES[bestKey].length };
}

function getAllLegendStories() {
  const all = [];
  Object.values(CURATED_STORIES).forEach(list => {
    list.forEach(item => all.push(item));
  });
  return all.sort((a, b) => b.interestScore - a.interestScore);
}
