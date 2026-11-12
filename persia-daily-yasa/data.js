// 오늘의 이란·페르시아 야사 — 기원전 550년 아케메네스 제국 ~ 현대 이란 왕조사 (연도별 사료·야사)

const CATEGORIES = {
  mystery: { id: "mystery", label: "기이한 일", shortLabel: "기이한 일" },
  scandal: { id: "scandal", label: "궁중 비화", shortLabel: "궁중 비화" },
  folklore: { id: "folklore", label: "야담·영웅", shortLabel: "야담·영웅" },
  episode: { id: "episode", label: "왕의 일상", shortLabel: "왕의 일상" }
};

const CURATED_STORIES = {
  "01-16": [
    {
      id: "persia-0116-0530-cyrus",
      month: 1,
      day: 16,
      year: -530,
      king: "아케메네스 · 키루스 2세",
      lunarDate: "고대 페르시아",
      category: "folklore",
      interestScore: 95,
      title: "바빌론을 무혈 정복한 키루스 대제, 마지막 원정에서 마사게타이 여왕 토미리스와 맞붙다",
      source: "헤로도토스 《역사》",
      sillokUrl: "https://en.wikipedia.org/wiki/Cyrus_the_Great",
      officialRecord: "키루스 대제는 중앙아시아 유목 민족 마사게타이의 여왕 토미리스와 치열한 전투 끝에 전사하며 위대한 제국을 남겼다. (헤로도토스)",
      yasaStory: `메소포타미아와 아나톨리아를 통일하며 인류 최초의 세계 제국을 세운 키루스 대제는 노년에도 정복을 멈추지 않았다.\n\n중앙아시아 스텝 지역의 여왕 토미리스는 키루스의 청혼과 정복 야심을 단호히 거절했고, 두 영웅의 군대는 아랄해 인근 평원에서 최후의 결전을 벌였다. 전설에 따르면 키루스의 전사 소식을 들은 페르시아 전역이 슬픔에 잠겼고, 그의 유해는 수도 파사르가다에의 소박한 돌무덤에 안치되었다. 훗날 알렉산드로스 대왕조차 이 무덤 앞에서 경의를 표했다고 전해진다.`
    },
    {
      id: "persia-0116-1979-pahlavi",
      month: 1,
      day: 16,
      year: 1979,
      king: "팔라비 왕조 · 모하마드 레자 샤",
      lunarDate: "양력 1979년 1월 16일",
      category: "scandal",
      interestScore: 97,
      title: "2,500년 이란 왕조의 마지막 비행기 — 눈물 속에 테헤란 공항을 떠난 마지막 샤",
      source: "현대 이란사 기록",
      sillokUrl: "https://en.wikipedia.org/wiki/Mohammad_Reza_Pahlavi",
      officialRecord: "1979년 1월 16일 모하마드 레자 팔라비 국왕이 혁명의 물결 속에 '휴양'을 명분으로 이란을 떠나며 2,500년 군주제가 막을 내렸다.",
      yasaStory: `1979년 1월 16일, 테헤란 메흐라바드 공항 활주로에는 마지막 국왕 모하마드 레자 샤가 탄 전용기가 대기하고 있었다.\n\n왕비 파라와 함께 이란의 흙 한 줌을 작은 상자에 담아 비행기에 오른 샤는, 조종석 창밖으로 설산이 덮인 테헤란을 내려다보며 끝내 눈물을 흘렸다. 그날 테헤란 거리에는 "샤가 떠났다!"는 호외가 뿌려지며 2,500년 이어진 페르시아 군주제의 마지막 페이지가 닫혔다.`
    }
  ],
  "03-21": [
    {
      id: "persia-0321-0500-nowruz",
      month: 3,
      day: 21,
      year: -500,
      king: "아케메네스 · 다리우스 대제",
      lunarDate: "춘분 새해 노루즈(Nowruz)",
      category: "episode",
      interestScore: 98,
      title: "28개 속국의 사신들이 페르세폴리스에 모여 새해 '노루즈'를 축하하던 춘분의 대축제",
      source: "페르세폴리스 아파다나 계단 부조",
      sillokUrl: "https://en.wikipedia.org/wiki/Nowruz",
      officialRecord: "춘분이 되면 페르세폴리스 궁전 계단에 바빌론·이집트·인도·그리스에서 온 사절들이 각국의 특산물을 들고 줄지어 서서 새해를 축하하였다.",
      yasaStory: `오늘날에도 이란 최대의 명절인 춘분 새해 '노루즈(새로운 날)'는 이미 2,500년 전 아케메네스 페르시아 제국 시절부터 왕실의 가장 성대한 축제였다.\n\n페르세폴리스의 거대한 아파다나 알현실 계단에는 사자, 낙타, 황금 그릇, 비단 옷을 바치러 온 각국 사신들의 모습이 돌에 생생히 새겨져 있다. 흥미롭게도 사신들은 무기를 찬 채가 아니라 서로의 손을 꼭 잡고 걸어가는 모습으로 조각되어, 다리우스 대제가 강조한 '평화로운 다민족 제국'의 이상을 보여준다.`
    },
    {
      id: "persia-0321-1600-abbas-nowruz",
      month: 3,
      day: 21,
      year: 1600,
      king: "사파비 왕조 · 샤 아바스 1세",
      lunarDate: "춘분 노루즈 궁중 연회",
      category: "episode",
      interestScore: 94,
      title: "사파비의 대왕 샤 아바스 1세, 평민 복장으로 이스파한 시장을 돌며 백성들과 새해를 나누다",
      source: "《타리크-에 알람아라예 아바시》",
      sillokUrl: "https://en.wikipedia.org/wiki/Abbas_the_Great",
      officialRecord: "샤 아바스는 밤마다 평복 차림으로 이스파한 찻집과 바자르를 거닐며 상인들의 가격과 백성들의 원성을 직접 살폈다. (사파비 연대기)",
      yasaStory: `이스파한을 '네스페 자한(세상의 절반)'이라 불릴 만큼 찬란하게 건설한 샤 아바스 1세에게는 아주 독특한 취미가 있었다.\n\n바로 밤이나 새해 노루즈 명절에 평범한 상인 복장을 하고 이스파한의 찻집과 대바자르(시장)에 몰래 잠입하는 것이었다. 어느 날 한 빵집 주인이 저울을 속여 빵 무게를 적게 파는 것을 직접 목격한 샤 아바스는 즉석에서 정체를 밝혀 상인들을 벌벌 떨게 만들었다는 유쾌한 야사가 전해진다.`
    }
  ],
  "05-15": [
    {
      id: "persia-0515-0550-khosrow",
      month: 5,
      day: 15,
      year: 550,
      king: "사산 왕조 · 호스로 1세",
      lunarDate: "6세기 사산 페르시아",
      category: "folklore",
      interestScore: 96,
      title: "인도에서 온 '체스(샤트란지)'의 비밀을 단숨에 풀어낸 페르시아 재상 보조르그메흐르",
      source: "피르다우시 《샤나메(왕서)》",
      sillokUrl: "https://en.wikipedia.org/wiki/Khosrow_I",
      officialRecord: "인도 왕이 규칙을 알려주지 않은 채 체스판을 보내며 '풀지 못하면 조공을 바치라' 도전하자, 현자 보조르그메흐르가 사흘 만에 규칙을 완벽히 풀어내었다. (《샤나메》)",
      yasaStory: `사산 왕조 최고의 성군 호스로 1세 시절, 인도의 라자가 신기한 64칸 나무판과 조각상(체스의 원형 차투랑가)을 사신 편에 보내왔다.\n\n"이 놀이의 규칙을 알아내면 우리가 조공을 바치겠지만, 못 알아내면 페르시아가 조공을 바쳐야 할 것이오!" 신하들이 어쩔 줄 몰라 할 때 현명한 재상 보조르그메흐르가 나서서 사흘 밤낮을 연구한 끝에 모든 말의 움직임과 '샤 마트(왕이 막혔다 → 체크메이트)'의 원리를 완벽히 풀어냈다. 반대로 그는 인도에 '백개먼(나르드)'을 만들어 보내 인도 학자들을 당황시켰다는 통쾌한 이야기가 전해진다.`
    },
    {
      id: "persia-0515-1010-shahnameh",
      month: 5,
      day: 15,
      year: 1010,
      king: "피르다우시 《샤나메》 완성",
      lunarDate: "페르시아 대서사시",
      category: "episode",
      interestScore: 95,
      title: "30년 동안 6만 행의 시를 써서 페르시아어와 민족의 혼을 지켜낸 시인 피르다우시",
      source: "《샤나메(왕서)》",
      sillokUrl: "https://en.wikipedia.org/wiki/Shahnameh",
      officialRecord: "시인 피르다우시는 30여 년의 세월을 바쳐 고대 이란의 신화와 50여 왕조의 역사를 6만 구절의 페르시아어 시로 완성하였다.",
      yasaStory: `아랍 제국의 지배 이후 이란의 고유 언어와 역사가 사라질 위기에 처했을 때, 호라산의 시인 피르다우시는 오직 순수 페르시아어로만 이란 고대 왕조의 대서사시 《샤나메(왕들의 책)》를 쓰기로 결심했다.\n\n30년간 전 재산을 쏟아부으며 6만 행의 시를 완성한 뒤 마흐무드 술탄에게 바쳤으나, 약속했던 금화 대신 은화가 오자 피르다우시는 모욕감을 느껴 그 은화를 목욕탕 주인과 술장수에게 다 나누어 주었다. 뒤늦게 후회한 술탄이 금화를 실은 낙타 행렬을 보냈을 때는 이미 피르다우시의 장례 행렬이 성문을 나서던 순간이었다고 한다.`
    }
  ],
  "07-15": [
    {
      id: "persia-0715-0260-shapur",
      month: 7,
      day: 15,
      year: 260,
      king: "사산 왕조 · 샤푸르 1세",
      lunarDate: "에데사 전투 승리",
      category: "folklore",
      interestScore: 97,
      title: "로마 황제 발레리아누스를 생포해 무릎 꿇린 사산 제국의 군주 샤푸르 1세",
      source: "낙셰 로스탐 암벽 부조 & 로마 사료",
      sillokUrl: "https://en.wikipedia.org/wiki/Shapur_I",
      officialRecord: "샤푸르 1세는 에데사 전투에서 로마 황제 발레리아누스와 7만 로마군을 포로로 잡았으며, 그 위업을 낙셰 로스탐 절벽에 거대한 부조로 새겼다.",
      yasaStory: `로마 제국 역사상 현직 황제가 적국에 생포된 것은 오직 단 한 번, 바로 260년 페르시아 사산 왕조의 샤푸르 1세에게 패한 발레리아누스 황제뿐이었다.\n\n오늘날 이란 시라즈 인근 '낙셰 로스탐'의 거대한 바위 절벽에는 말 위에 당당히 올라탄 샤푸르 1세 앞에서 로마 황제가 무릎을 꿇고 항복하는 장면이 2천 년 가까운 세월을 넘어 생생하게 새겨져 있다.`
    },
    {
      id: "persia-0715-1739-nadir",
      month: 7,
      day: 15,
      year: 1739,
      king: "아프샤르 왕조 · 나디르 샤",
      lunarDate: "델리 원정 귀환",
      category: "scandal",
      interestScore: 94,
      title: "무굴 제국의 '공작 왕좌'와 전설의 다이아몬드 코이누르를 실어 온 나디르 샤의 전리품",
      source: "《자한고샤-예 나데리》",
      sillokUrl: "https://en.wikipedia.org/wiki/Nader_Shah",
      officialRecord: "나디르 샤는 인도 델리를 정복한 뒤 막대한 보물과 공작 왕좌, 코이누르 다이아몬드를 노획하여 이란 국민들의 세금을 3년간 면제해 주었다.",
      yasaStory: `'페르시아의 나폴레옹'이라 불린 아프샤르 왕조의 군주 나디르 샤는 뛰어난 군사적 재능으로 오스만 제국과 무굴 제국을 연파했다.\n\n1739년 인도 델리에서 돌아올 때 그가 끌고 온 보물 수레에는 황금과 보석으로 장식된 무굴 황제의 '공작 왕좌'와, 빛이 너무 강렬해 '빛의 산(코이누르)'이라 불린 거대 다이아몬드가 실려 있었다. 나디르 샤는 이 전리품 덕분에 무려 3년 동안 이란 전역의 세금을 면제해 주는 통 큰 결정을 내렸다.`
    }
  ],
  "09-20": [
    {
      id: "persia-0920-0490-darius-royal-road",
      month: 9,
      day: 20,
      year: -515,
      king: "아케메네스 · 다리우스 1세",
      lunarDate: "페르시아 왕의 길 개통",
      category: "episode",
      interestScore: 96,
      title: "눈도 비도 밤도 막지 못한 2,700km '왕의 길' — 고대 페르시아의 초고속 우편 시스템",
      source: "헤로도토스 《역사》 8권",
      sillokUrl: "https://en.wikipedia.org/wiki/Royal_Road",
      officialRecord: "다리우스 대제는 수사(Susa)에서 사르디스까지 2,700km의 포장 도로와 111개 역참을 건설하여 일반 여행자가 석 달 걸리던 거리를 파발마로 단 7일 만에 주파하게 하였다. (헤로도토스)",
      yasaStory: `넓은 제국을 다스리기 위해 다리우스 대제는 수도 수사에서 지중해 연안 사르디스까지 2,700km에 달하는 '왕의 길(Royal Road)'을 닦고 일정한 간격마다 역참과 여관을 세웠다.\n\n구간마다 신선한 말과 기수가 대기하고 있다가 릴레이처럼 편지를 넘겨주는 방식 덕분에, 일반 상단이 석 달 넘게 걸리던 거리를 단 일주일 만에 통과했다. 그리스 역사가 헤로도토스가 이 페르시아 전령들을 보고 감탄하며 남긴 "눈도, 비도, 더위도, 밤의 어둠도 이 전령들의 임무를 막지 못한다"는 문장은 오늘날 미국 뉴욕 중앙우체국 정면에도 새겨져 있다.`
    },
    {
      id: "persia-0920-1880-qajar-photo",
      month: 9,
      day: 20,
      year: 1880,
      king: "카자르 왕조 · 나세르 알딘 샤",
      lunarDate: "19세기 테헤란 골레스탄 궁전",
      category: "scandal",
      interestScore: 93,
      title: "사진기 발명 직후 궁궐에 암실을 차리고 직접 셔터를 누른 '사진광' 이란 국왕",
      source: "골레스탄 궁전 사진 아카이브",
      sillokUrl: "https://en.wikipedia.org/wiki/Naser_al-Din_Shah_Qajar",
      officialRecord: "카자르 왕조의 나세르 알딘 샤는 유럽에서 사진술이 도입되자마자 궁궐 안에 직접 사진 현상실을 만들고 왕실 가족과 궁녀, 자신의 일상을 수천 장 촬영하였다.",
      yasaStory: `19세기 카자르 왕조의 나세르 알딘 샤는 이란 역사상 가장 별난 취미를 가진 국왕이었다. 유럽에서 사진기가 발명된 지 얼마 되지도 않았을 때, 그는 궁궐인 골레스탄 궁전 한복판에 직접 암실을 차려놓고 화학 약품을 만지며 사진을 인화했다.\n\n그가 직접 찍은 셀프 카메라(?)와 후궁들의 사진, 심지어 궁궐에서 키우던 애완 고양이 사진까지 수천 장이 오늘날까지 보존되어 있어 19세기 이란 궁중 생활을 엿보는 귀중한 타임캡슐이 되고 있다.`
    }
  ],
  "11-12": [
    {
      id: "persia-1112-b539-cyrus-cylinder",
      month: 11,
      day: 12,
      year: -539,
      king: "아케메네스 · 키루스 대제",
      lunarDate: "기원전 539년 바빌론 입성",
      category: "episode",
      interestScore: 99,
      title: "노예를 해방하고 모든 민족의 종교를 존중하다 — 세계 최초의 인권 선언 '키루스 실린더'",
      source: "대영박물관 소장 키루스 실린더 & 구약성경 에스라",
      sillokUrl: "https://en.wikipedia.org/wiki/Cyrus_Cylinder",
      officialRecord: "키루스 대제는 바빌론을 점령한 뒤 포로로 끌려와 있던 유대인과 여러 민족들을 고향으로 돌려보내고, 각자의 신전을 재건하도록 점토 원통에 칙령을 새겼다.",
      yasaStory: `고대 세계에서 정복자는 패배한 도시를 불태우고 백성을 노예로 삼는 것이 당연한 시절이었다. 하지만 기원전 539년 바빌론을 정복한 페르시아의 키루스 대제는 완전히 다른 길을 택했다.\n\n그는 군사들에게 약탈을 엄금한 뒤, 바빌론에 강제로 끌려와 노예처럼 살던 유대인 등 수많은 이민족들을 해방시켜 고향으로 돌아갈 수 있게 해주었다. 심지어 그들의 신전과 문화까지 존중하겠다는 내용을 진흙 원통(키루스 실린더)에 쐐기문자로 새겼는데, 훗날 유엔(UN)은 이를 인류 최초의 인권 선언문으로 기리며 본부 건물에 복제품을 전시해 두었다.`
    },
    {
      id: "persia-1112-b480-xerxes-hellespont",
      month: 11,
      day: 12,
      year: -480,
      king: "아케메네스 · 크세르크세스 1세",
      lunarDate: "그리스 원정 출정",
      category: "mystery",
      interestScore: 95,
      title: "폭풍에 다리가 무너지자 바다에 채찍 300대를 치며 호통친 크세르크세스 대왕의 기행",
      source: "헤로도토스 《역사》 7권",
      sillokUrl: "https://en.wikipedia.org/wiki/Xerxes_I",
      officialRecord: "헬레스폰투스 해협에 놓은 배다리가 폭풍으로 끊어지자, 분노한 크세르크세스는 바다에 300번의 채찍질을 가하고 쇠사슬을 던지게 하였다. (헤로도토스)",
      yasaStory: `다리우스 대제의 아들 크세르크세스 1세는 그리스 정복을 위해 아시아와 유럽을 잇는 좁은 바다(헬레스폰투스 해협)에 배 수백 척을 엮어 거대한 부교(배다리)를 만들었다.\n\n그런데 대군이 건너기 직전 거센 폭풍이 몰아쳐 다리를 산산조각 내버리자, 대왕은 불같이 화를 내며 기상천외한 명령을 내렸다. "저 건방진 바다가 내 다리를 부수었으니 바다에 채찍 300대를 내리치고 쇠고랑을 던져라!" 이후 더욱 튼튼하게 다시 지어진 배다리 위로 수십만 페르시아 대군이 7일 밤낮으로 바다를 건넜다는 장대한 이야기가 전해진다.`
    },
    {
      id: "persia-1112-0224-ardashir",
      month: 11,
      day: 12,
      year: 224,
      king: "사산 왕조 · 아르다시르 1세",
      lunarDate: "사산 제국 건국",
      category: "folklore",
      interestScore: 93,
      title: "사막을 뚫는 지하 수로 '카나트'와 사산 페르시아 제국을 세운 아르다시르 1세의 부흥",
      source: "《카르나마그 이 아르다시르》",
      sillokUrl: "https://en.wikipedia.org/wiki/Ardashir_I",
      officialRecord: "아르다시르 1세는 파르티아를 무너뜨리고 사산 왕조 페르시아를 세워 조로아스터교와 고대 페르시아의 영광을 되살렸다.",
      yasaStory: `메마른 고원과 사막이 많은 이란 땅에서 수천 년 동안 문명이 번영할 수 있었던 비결은 바로 산맥의 눈 녹은 물을 수십 킬로미터 지하 터널로 끌어오는 '카나트(Qanat)' 관개 기술 덕분이었다.\n\n224년 사산 왕조를 세운 아르다시르 1세는 이 전통 수리 기술을 국가적으로 정비하고, 로마 제국과 대등하게 맞서는 강력한 제국을 재건했다. 야사에서는 그가 달빛 아래 숫양의 수호를 받으며 왕좌에 올랐다는 신비로운 건국 설화가 전해진다.`
    },
    {
      id: "persia-1112-1598-isfahan",
      month: 11,
      day: 12,
      year: 1598,
      king: "사파비 왕조 · 샤 아바스 1세",
      lunarDate: "이스파한 천도",
      category: "episode",
      interestScore: 96,
      title: "'세상의 절반(네스페 자한)' 이스파한 — 40개 기둥 궁전과 청록색 돔을 세운 샤 아바스",
      source: "사파비 왕조 연대기 & 여행기",
      sillokUrl: "https://en.wikipedia.org/wiki/Naqsh-e_Jahan_Square",
      officialRecord: "1598년 샤 아바스 1세는 도읍을 이스파한으로 옮기고 세계 최대 규모의 이맘 광장과 알리 카푸 궁전, 샤 모스크를 건설하였다.",
      yasaStory: `1598년, 사파비 왕조의 전성기를 연 샤 아바스 1세는 내륙의 아름다운 오아시스 도시 이스파한으로 수도를 옮겼다.\n\n그가 지은 '체헬 소툰(40개 기둥) 궁전'은 실제로는 나무 기둥이 20개뿐이지만, 궁전 앞 거울처럼 맑은 연못에 비친 20개의 그림자와 합쳐져 40개의 기둥으로 보인다는 낭만적인 건축미를 자랑한다. 당시 유럽과 아시아에서 온 상인들은 이 도시의 웅장함에 압도되어 "이스파한을 보았다면 세상의 절반을 본 것이다(에스파한 네스페 자한)"라고 극찬했다.`
    },
    {
      id: "persia-1112-1906-constitution",
      month: 11,
      day: 12,
      year: 1906,
      king: "카자르 왕조 · 모자파르 알딘 샤",
      lunarDate: "이란 입헌 혁명",
      category: "scandal",
      interestScore: 92,
      title: "중동 최초의 헌법과 의회를 탄생시킨 1906년 이란 입헌 혁명과 궁궐 앞 시민 농성",
      source: "이란 근현대사 사료",
      sillokUrl: "https://en.wikipedia.org/wiki/Persian_Constitutional_Revolution",
      officialRecord: "상인과 성직자, 지식인들이 영국 공사관 뜰과 사원에서 대규모 농성을 벌이자 모자파르 알딘 샤가 마침내 의회 설립과 헌법 제정을 승인하였다.",
      yasaStory: `1906년, 부패한 왕실의 빚과 외세의 이권 침탈에 분노한 이란의 상인·학자·시민 1만 4천여 명이 테헤란 주재 외국 공사관 마당과 바자르에서 평화적인 총파업과 농성을 벌였다.\n\n결국 병석에 누워 있던 모자파르 알딘 샤는 국민들의 요구를 받아들여 중동·아시아 지역에서 가장 앞선 시기 중 하나인 '이란 입헌 헌법'에 서명하고 의회(마즐리스)를 열었다. 이란 민중의 뜨거운 민주주의 열망이 타올랐던 역사적 순간이었다.`
    }
  ],
  "12-21": [
    {
      id: "persia-1221-0100-yalda",
      month: 12,
      day: 21,
      year: 100,
      king: "파르티아 · 고대 이란 풍속",
      lunarDate: "동지 밤 야르다(Shab-e Yalda)",
      category: "episode",
      interestScore: 95,
      title: "1년 중 가장 긴 밤, 석류와 수박을 먹으며 시집을 펼치는 이란의 동지 축제 '야르다'",
      source: "고대 페르시아 세시풍속 기록",
      sillokUrl: "https://en.wikipedia.org/wiki/Yald%C4%81_Night",
      officialRecord: "고대 이란인들은 동짓날 밤(샤베 야르다)에 어둠의 세력을 물리치고 빛의 태양이 다시 태어남을 축하하며 밤새 불을 밝히고 과일과 시를 나누었다.",
      yasaStory: `한국에 동지 팥죽이 있다면, 이란에는 2,000년 넘게 이어져 온 동지 밤 축제 '샤베 야르다(Shab-e Yalda)'가 있다.\n\n12월 21일경 일 년 중 가장 긴 밤이 오면 온 가족과 친지들이 모여 붉은 석류와 여름부터 보관해 둔 수박, 견과류를 먹으며 밤을 지새운다. 붉은 과일은 새벽의 붉은 태양과 생명을 상징하며, 밤이 깊으면 페르시아 국민 시인 하페즈의 시집을 아무 페이지나 펼쳐 새해의 운세를 점치는 낭만적인 전통이 오늘날까지도 이어지고 있다.`
    },
    {
      id: "persia-1221-1925-pahlavi-start",
      month: 12,
      day: 21,
      year: 1925,
      king: "팔라비 왕조 · 레자 샤 팔라비",
      lunarDate: "팔라비 왕조 개창",
      category: "scandal",
      interestScore: 91,
      title: "카자르 왕조를 끝내고 군인 출신으로 황제에 오른 레자 샤, '페르시아'에서 '이란'으로",
      source: "이란 근대사 사료",
      sillokUrl: "https://en.wikipedia.org/wiki/Reza_Shah",
      officialRecord: "1925년 12월 이란 의회가 카자르 왕조를 폐하고 레자 칸을 새 국왕으로 추대하였으며, 1935년에는 국호를 공식적으로 '이란(Iran)'이라 부르게 하였다.",
      yasaStory: `1925년 12월, 부패와 무능으로 무너진 카자르 왕조를 대신해 코사크 여단 장교 출신 레자 칸이 새 왕조(팔라비 왕조)를 열었다.\n\n그는 철도와 도로를 닦고 테헤란 대학을 세우며 급진적인 근대화를 밀어붙였는데, 특히 1935년에는 전 세계 외교 사절단에 "우리나라는 서구인들이 부르는 '페르시아'가 아니라 고대부터 우리가 불러온 이름 '이란(고귀한 이들의 땅)'으로 불러 달라"고 공식 요청하여 오늘날의 국호 '이란'을 세계에 각인시켰다.`
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
