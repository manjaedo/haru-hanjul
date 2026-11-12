// 오늘의 고려 야사 — 고려 474년(918~1392) 연도별 사료·야사 데이터

const CATEGORIES = {
  mystery: { id: "mystery", label: "기이한 일", shortLabel: "기이한 일" },
  scandal: { id: "scandal", label: "궁중 비화", shortLabel: "궁중 비화" },
  folklore: { id: "folklore", label: "야담·기인", shortLabel: "야담·기인" },
  episode: { id: "episode", label: "왕의 일상", shortLabel: "왕의 일상" }
};

const CURATED_STORIES = {
  // ==========================================
  // 1월 ~ 3월
  // ==========================================
  "01-15": [
    {
      id: "goryeo-0115-1011-hyeonjong",
      month: 1,
      day: 15,
      year: 1011,
      king: "현종 2년",
      lunarDate: "정월(1월) 중순",
      category: "scandal",
      interestScore: 95,
      title: "개경이 불타던 1011년 겨울, 나주까지 피란한 현종과 밤중에 일어난 반란의 그림자",
      source: "《고려사》 현종 세가 & 《고려사절요》",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "거란의 성종이 친히 대군을 이끌고 개경에 들어와 궁궐을 불태우니, 왕이 남쪽으로 나주까지 피란하여 고초를 겪었다. (《고려사》)",
      yasaStory: `1011년 1월, 거란 40만 대군이 개경을 점령하자 19세의 젊은 임금 현종은 눈보라를 뚫고 남쪽 나주까지 험난한 피란길에 올랐다.\n\n피란길의 고단함은 말로 다할 수 없었다. 공주 절도사 김은부는 헐벗고 굶주린 임금 일행에게 따뜻한 옷과 밥을 올리고 큰딸을 왕후로 바치며 끝까지 충성을 다했다. 이 시련을 이겨낸 현종은 훗날 개경으로 돌아와 강감찬과 함께 거란을 물리치고 초조대장경 조판을 시작하며 고려의 황금기를 열었다.`
    }
  ],
  "02-15": [
    {
      id: "goryeo-0215-1145-samguk",
      month: 2,
      day: 15,
      year: 1145,
      king: "인종 23년",
      lunarDate: "음력 2월",
      category: "episode",
      interestScore: 93,
      title: "김부식이 왕명을 받아 《삼국사기》를 완성한 해, 고려 지식인들의 역사 자부심",
      source: "《고려사》 인종 세가 & 《삼국사기》 진삼국사표",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "김부식 등이 왕명을 받들어 신라·고구려·백제 삼국의 역사를 엮어 《삼국사기》 50권을 완성하여 바쳤다. (《고려사》)",
      yasaStory: `1145년, 인종은 "우리나라 선비들이 중국의 역사는 줄줄 외우면서 정작 우리 삼국의 역사를 모르니 안타깝다"며 당대 최고 문장가 김부식에게 역사서 편찬을 명했다.\n\n김부식은 젊은 학사들과 함께 흩어진 사료를 모아 기전체 역사서 《삼국사기》를 완성했다. 이 책 덕분에 오늘날 우리가 김유신·을지문덕·계백·온달과 평강공주의 이야기를 생생히 읽을 수 있게 되었다.`
    },
    {
      id: "goryeo-0215-1231-yeondeunghoe",
      month: 2,
      day: 15,
      year: 1197,
      king: "명종 27년",
      lunarDate: "음력 2월 보름 연등회",
      category: "episode",
      interestScore: 92,
      title: "개경 밤거리를 대낮처럼 밝힌 수만 개의 연등, 고려 최대 봄축제 '연등회'",
      source: "《고려사》 예지 & 《고려도경》",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "매년 2월 보름이면 왕궁으로부터 도성 큰길과 사찰에 이르기까지 오색 등불을 달고 임금이 백성과 함께 풍악을 즐겼다. (《고려사》)",
      yasaStory: `고려 사람들에게 1년 중 가장 설레는 봄날은 바로 음력 2월 보름 '연등회'였다.\n\n해가 지면 개경 만월대 궁궐에서부터 시전 거리까지 집집마다 붉고 푸른 비단 등불을 내걸어 온 도시가 불야성을 이루었다. 임금은 봉은사로 행차해 부처님께 공양을 올리고, 도성 백성들은 밤새 떡과 차를 나누며 춤과 노래, 줄타기 묘기를 구경했다. 태조 왕건이 "연등과 팔관회는 절대 폐하지 말라"고 훈요십조에 남길 만큼 고려인의 삶 그 자체였다.`
    }
  ],
  "03-10": [
    {
      id: "goryeo-0310-1019-gwiju",
      month: 3,
      day: 10,
      year: 1019,
      king: "현종 10년",
      lunarDate: "음력 2월~3월 귀주대첩 개선",
      category: "folklore",
      interestScore: 99,
      title: "여든을 바라보는 노장 강감찬, 귀주 들판에서 거란 10만 대군을 쓸어버린 날",
      source: "《고려사》 강감찬 열전",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "강감찬이 귀주에서 거란군을 크게 격파하니, 적병 가운데 살아서 돌아간 자가 겨우 수천 명뿐이었다. 왕이 영파역까지 나가 친히 맞으며 금화 여덟 가지를 머리에 꽂아주었다. (《고려사》)",
      yasaStory: `1019년 초봄, 거란 소배압의 10만 대군이 개경 문턱까지 밀고 들어왔다가 고려군의 청야전술에 막혀 지친 채 북으로 퇴각하고 있었다.\n\n그들의 퇴로를 막아선 이는 칠순이 넘은 노장 강감찬이었다. 귀주 들판에서 최후의 결전이 벌어지던 순간, 하늘마저 고려의 편이었는지 갑자기 남쪽에서 거센 돌풍이 몰아치며 모래바람이 거란군의 눈을 가렸고, 매복해 있던 김종현의 별동대가 측면에서 들이닥쳐 거란군은 궤멸되었다. 개경으로 돌아온 강감찬의 머리에 현종이 직접 금으로 만든 꽃을 꽂아주며 감격해 마지않았다.`
    }
  ],

  // ==========================================
  // 4월 ~ 6월
  // ==========================================
  "04-12": [
    {
      id: "goryeo-0412-1170-musin",
      month: 4,
      day: 12,
      year: 1170,
      king: "의종 24년",
      lunarDate: "춘삼월~사월 보현원",
      category: "scandal",
      interestScore: 97,
      title: "젊은 문신이 늙은 대장군의 수염을 불태운 밤, 피의 '무신정변'이 폭발하다",
      source: "《고려사》 정중부 열전",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "의종이 보현원에 거둥하자 정중부·이의방 등이 반란을 일으켜 호종하던 문신들을 모두 죽이고 왕을 거제도로 폐위시켰다. (《고려사》)",
      yasaStory: `고려 중기 문신들의 무신 차별은 도를 넘었다. 한 번은 젊은 문신 한뢰가 대장군 이소응과 수박희(맨손 격투)를 하던 중 이소응이 지자 뺨을 때려 쫓아냈고, 김부식의 아들 김돈중은 연회 자리에서 대장군 정중부의 긴 수염을 촛불로 태우며 조롱했다.\n\n참을 대로 참은 무신들의 분노는 1170년 보현원 행차길에서 폭발했다. 정중부와 이의방은 "문관을 쓴 자는 서리(아전)라도 남기지 말고 죽여라!"며 칼을 뽑아 들었고, 이날부터 고려는 무신이 정권을 쥐는 100년 무신집권기로 접어들었다.`
    }
  ],
  "05-15": [
    {
      id: "goryeo-0515-0958-gwageo",
      month: 5,
      day: 15,
      year: 958,
      king: "광종 9년",
      lunarDate: "음력 5월",
      category: "episode",
      interestScore: 95,
      title: "쌍기의 건의로 시작된 한국 최초의 '과거시험', 호족들의 콧대를 꺾은 광종의 승부수",
      source: "《고려사》 선거지 & 광종 세가",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "후주 사람 쌍기의 건의를 받아들여 처음으로 과거 제도를 시행하여 시·부·송과 시무책으로 인재를 뽑았다. (《고려사》)",
      yasaStory: `건국 초기 고려 조정은 공신과 지방 호족들이 자리를 독차지해 임금도 함부로 손을 댈 수 없었다.\n\n958년, 광종은 중국 후주에서 온 귀화인 쌍기의 재능을 알아보고 마침내 한국 역사상 최초의 '과거제도'를 도입했다. 집안 배경이나 무력이 아니라 글과 실력으로만 관리를 뽑자 호족 자제들은 충격에 빠졌고, 왕에게 충성하는 신진 문신들이 조정에 대거 들어오며 왕권이 단숨에 강화되었다.`
    }
  ],
  "06-15": [
    {
      id: "goryeo-0615-0918-wanggeon",
      month: 6,
      day: 15,
      year: 918,
      king: "태조 1년",
      lunarDate: "음력 6월 (고려 건국)",
      category: "episode",
      interestScore: 99,
      title: "궁예의 폭정을 끝내고 918년 여름 개국한 고려, 태조 왕건의 첫 번째 눈물과 맹세",
      source: "《고려사》 태조 세가",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "신숭겸·배현경·홍유·복지겸 등이 왕건을 추대하니 마침내 포정전(궁궐)에서 즉위하고 국호를 고려, 연호를 천수라 하였다. (《고려사》)",
      yasaStory: `태봉의 왕 궁예가 관심법으로 신하와 백성을 마구 죽이자, 기둥 같은 장수 홍유·배현경·신숭겸·복지겸이 한밤중에 왕건의 집을 찾아갔다.\n\n왕건은 처음에는 "충신이 어찌 역심을 품겠소"라며 거절했으나, 부인 유씨(신혜왕후)가 손수 갑옷을 챙겨 입혀주며 "의로운 일을 행하는 데 어찌 주저하십니까"라고 독려하자 마침내 결단을 내렸다. 918년 6월, 태조 왕건은 국호를 '고려'로 정하고 고구려의 기상을 잇겠다는 원대한 꿈을 선포했다.`
    }
  ],

  // ==========================================
  // 7월 ~ 9월
  // ==========================================
  "07-10": [
    {
      id: "goryeo-0710-1270-sambyeolcho",
      month: 7,
      day: 10,
      year: 1270,
      king: "원종 11년",
      lunarDate: "음력 6월~7월",
      category: "folklore",
      interestScore: 96,
      title: "몽골 항복을 거부한 배중손과 삼별초, 강화도에서 진도·제주로 이어진 불굴의 항전",
      source: "《고려사》 원종 세가 & 배중손 열전",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "개경 환도에 반대한 배중손 등이 삼별초를 이끌고 배 천여 척에 백성과 재물을 싣고 남쪽으로 내려가 진도 용장성에 진을 쳤다. (《고려사》)",
      yasaStory: `1270년, 원종이 몽골과 강화를 맺고 강화도에서 개경으로 돌아가려 하자, 40년간 대몽 항쟁의 최전선에 섰던 정예 부대 삼별초가 분연히 일어섰다.\n\n배중손이 지휘하는 삼별초는 왕족 승화후 온을 새 임금으로 추대한 뒤 천여 척의 배를 몰아 진도 용장성으로 내려갔고, 진도가 함락되자 김통정의 지휘 아래 다시 제주도 항파두리로 건너가 1273년까지 끝까지 맞서 싸우며 자주 정신의 불꽃을 태웠다.`
    }
  ],
  "08-15": [
    {
      id: "goryeo-0815-1126-ijagyeom",
      month: 8,
      day: 15,
      year: 1126,
      king: "인종 4년",
      lunarDate: "음력 8월",
      category: "scandal",
      interestScore: 94,
      title: "사위 인종에게 독이 든 떡을 보낸 외할아버지 이자겸과, 왕을 살린 작은딸의 기지",
      source: "《고려사》 이자겸 열전",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "이자겸이 떡 속에 독약을 넣어 왕에게 바치니, 왕비가 몰래 아뢰어 임금이 먹지 않고 까마귀에게 던져주니 까마귀가 먹고 즉사하였다. (《고려사》)",
      yasaStory: `자신의 두 딸을 모두 조카이자 사위인 인종의 왕비로 들여보내며 '왕 위의 왕'으로 군림하던 문벌 귀족 이자겸.\n\n인종이 자신의 권력을 꺾으려 하자 이자겸은 반란을 일으켜 궁궐을 불태우고, 급기야 떡과 국에 독을 타 임금을 독살하려 했다. 이때 아버지 이자겸의 끔찍한 음모를 눈치챈 넷째 딸(폐비 이씨)이 인종에게 몰래 "절대 잡수시지 마십시오!"라고 귀띔했다. 인종이 떡을 떼어 창밖 까마귀에게 던져주자 까마귀가 그 자리에서 떨어져 죽고 말았다.`
    }
  ],
  "09-12": [
    {
      id: "goryeo-0912-1377-jikji",
      month: 9,
      day: 12,
      year: 1377,
      king: "우왕 3년",
      lunarDate: "음력 7월~9월",
      category: "episode",
      interestScore: 98,
      title: "청주 흥덕사에서 찍어낸 세계 최초 금속활자본 《직지심체요절》의 경이로운 탄생",
      source: "《직지심체요절》 간기 & 《고려사》",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "1377년 청주목 밖 흥덕사에서 백운 화상이 엮은 《불조직지심체요절》을 주조한 금속활자로 인쇄하였다. (《직지》 간기)",
      yasaStory: `독일의 구텐베르크가 금속활자 성경을 찍어내기 무려 78년 전인 1377년, 고려 충청도 청주 흥덕사에서는 승려 석찬과 달잠이 놋쇠 활자를 하나하나 깎고 배열해 책을 찍어내고 있었다.\n\n그 책이 바로 현존하는 세계 최고(最古)의 금속활자 인쇄본 《백운화상초록불조직지심체요절》이다. 비록 전란과 세월 속에 하권 1책만이 프랑스 국립도서관에 남아 있으나, 고려인의 뛰어난 금속 공예와 인쇄 기술은 유네스코 세계기록유산으로 세계가 인정한 보물이다.`
    }
  ],

  // ==========================================
  // 10월 ~ 12월 (11월 12일 집중 포함)
  // ==========================================
  "10-18": [
    {
      id: "goryeo-1018-0993-seohee",
      month: 10,
      day: 18,
      year: 993,
      king: "성종 12년",
      lunarDate: "음력 10월",
      category: "folklore",
      interestScore: 99,
      title: "거란 장수 소손녕의 80만 대군 위협을 세 치 혀로 물리치고 강동 6주를 얻은 서희",
      source: "《고려사》 서희 열전",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "서희가 소손녕과 마주 앉아 '우리 나라는 고구려의 옛 땅을 이어받아 국호를 고려라 하였소'라며 당당히 논파하니 소손녕이 감복하여 회군하고 강동 6주를 넘겨주었다. (《고려사》)",
      yasaStory: `993년 거란의 소손녕이 대군을 몰고 쳐들어오자 고려 조정에서는 땅을 떼어주고 항복하자는 항복론이 우세했다.\n\n하지만 중군사 서희만은 달랐다. 직접 적진으로 걸어 들어가 소손녕과 마주 앉은 서희는, 소손녕이 "너희는 신라 땅에서 일어났으면서 왜 고구려 땅을 차지하느냐"고 호통치자 눈 하나 깜짝 않고 대답했다. "무슨 소리요! 우리 국호가 바로 고려이고 도읍도 평양(서경)이니 고구려의 적통은 우리요! 여진이 가로막아 거란과 교류하지 못할 뿐, 압록강 안팎을 우리에게 주면 친교를 맺겠소!" 이 완벽한 외교 담판으로 고려는 피 한 방울 안 흘리고 압록강 동쪽 강동 6주를 손에 넣었다.`
    }
  ],
  "11-12": [
    {
      id: "goryeo-1112-0943-hunyo",
      month: 11,
      day: 12,
      year: 943,
      king: "태조 26년",
      lunarDate: "초겨울 11월",
      category: "episode",
      interestScore: 95,
      title: "태조 왕건이 자손들에게 남긴 비밀 유언 《훈요십조》와 고려 팔관회",
      source: "《고려사》 태조 세가",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "태조께서 박술희를 불러 친히 《훈요십조》를 전하시며 '후대의 왕들이 이 열 가지 가르침을 아침저녁으로 읽고 거울로 삼으라' 당부하셨다. (《고려사》)",
      yasaStory: `943년 겨울, 고려를 세운 태조 왕건은 임종을 앞두고 충신 박술희를 침상으로 불렀다. 왕건은 500년 사직을 이어갈 후손들을 위해 열 가지 핵심 유언인 《훈요십조》를 내렸다.\n\n"불교와 연등회·팔관회를 소중히 여기되, 무분별하게 절을 너무 많이 짓지는 마라. 거란의 풍습은 본받지 말고, 백성의 세금을 가볍게 하며 인재를 고루 등용하라." 이 유언은 고려 왕조가 위기를 맞을 때마다 왕들이 되새기는 나침반이 되었다.`
    },
    {
      id: "goryeo-1112-1135-myocheong",
      month: 11,
      day: 12,
      year: 1135,
      king: "인종 13년",
      lunarDate: "초겨울 11월",
      category: "mystery",
      interestScore: 96,
      title: "대동강에 기름 떡을 띄워 용의 침이라 속인 묘청과 '칭제건원' 서경천도운동",
      source: "《고려사》 묘청 열전",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "묘청이 큰 떡 속에 기름을 넣어 대동강에 띄워 오색 기름이 물 위에 번지게 하고 '용이 침을 토한 상서로운 징조'라 속여 천도를 주장하였다. (《고려사》)",
      yasaStory: `1135년, 서경(평양) 출신 승려 묘청은 "개경은 지덕이 다했으니 서경으로 도읍을 옮겨 황제를 칭하고 금나라를 정벌하자!"고 외치며 인종의 마음을 사로잡았다.\n\n묘청은 백성들과 왕을 믿게 만들기 위해 대동강 물속에 몰래 기름을 채운 큰 떡을 가라앉혀 수면 위로 무지갯빛 기름 띠가 피어오르게 만든 뒤 "신룡이 침을 뱉어 서경이 길지임을 증명했다!"고 선전했다. 그러나 개경파 김부식의 반격과 토벌로 묘청의 난은 진압되었고, 사학자 신채호는 이를 '조선 역사상 일천 년래 제일 대사건'이라 평했다.`
    },
    {
      id: "goryeo-1112-1236-tripitaka",
      month: 11,
      day: 12,
      year: 1236,
      king: "고종 23년",
      lunarDate: "초겨울 11월",
      category: "folklore",
      interestScore: 97,
      title: "몽골군에 불탄 대장경을 8만여 장 목판에 다시 새겨낸 고려인의 기적, 팔만대장경",
      source: "《고려사》 고종 세가 & 《동국이상국집》",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "대장도감을 설치하여 부처의 힘으로 몽골의 침략을 물리치고자 16년에 걸쳐 8만여 장의 경판을 새로 새겼다. (《고려사》)",
      yasaStory: `1232년 몽골군의 침입으로 대구 부인사에 보관 중이던 초조대장경이 잿더미로 변하자, 강화도로 옮겨간 고려 조정과 백성들은 절망 대신 나무를 깎기 시작했다.\n\n1236년 시작된 재조대장경(팔만대장경) 조판은 무려 16년이 걸렸다. 남해안 산벚나무와 자작나무를 베어 바닷물에 3년이나 담가 썩지 않게 찐 뒤, 글자 한 획마다 나라의 평화를 빌며 절을 올리고 새겼다. 놀랍게도 오탈자가 거의 없을 뿐 아니라 오늘날까지도 단 한 장도 뒤틀리지 않고 해인사 장경판전에 고스란히 남아 있다.`
    },
    {
      id: "goryeo-1112-1356-gongmin",
      month: 11,
      day: 12,
      year: 1356,
      king: "공민왕 5년",
      lunarDate: "초겨울 11월",
      category: "scandal",
      interestScore: 96,
      title: "친원파 기철 일당을 연회 자리에서 철퇴로 쳐부수고 쌍성총관부를 되찾은 공민왕의 결단",
      source: "《고려사》 공민왕 세가",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "왕이 기철·권겸 등을 궁중 연회에 불러들여 철퇴로 격살하고, 유인우를 보내 100년간 빼앗겼던 쌍성총관부를 수복하였다. (《고려사》)",
      yasaStory: `원나라 황후가 된 누이 기황후를 믿고 고려 임금마저 우습게 보며 횡포를 부리던 기철 일파.\n\n오랫동안 원나라에서 볼모 생활을 하며 이를 갈았던 공민왕은 1356년 마침내 칼을 빼 들었다. 기철 등을 궁궐 연회에 초대한 뒤 기습적으로 철퇴를 내리쳐 처단하고, 동시에 군사를 보내 원나라에 빼앗겼던 동북면 땅(쌍성총관부)을 되찾았다. 이때 쌍성총관부 수복에 결정적 공을 세운 인물이 바로 함경도 출신 장수 이자춘과 그의 아들 이성계였다.`
    },
    {
      id: "goryeo-1112-1365-palkwanhoe",
      month: 11,
      day: 12,
      year: 1122,
      king: "예종 17년",
      lunarDate: "동짓달(11월) 팔관회",
      category: "episode",
      interestScore: 93,
      title: "송나라·여진·아라비아 상인까지 모여 선물 올리던 고려의 국제 축제 '팔관회'",
      source: "《고려사》 예지 & 《고려도경》",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "11월 보름 팔관회에 임금이 의봉루에 오르시니, 송나라와 탐라·여진·대식국(아라비아) 사신과 상인들이 보물을 바치며 춤추고 하례하였다. (《고려사》)",
      yasaStory: `초겨울 11월 중순이면 개경은 세계 각국의 상인들이 몰려드는 국제 무역 도시로 변했다. 바로 고려 최대 국가 축제 '팔관회'가 열렸기 때문이다.\n\n예성강 벽란도를 통해 들어온 송나라 비단과 서적, 아라비아(대식국)의 향료와 유리그릇이 개경 거리에 쏟아졌고, 대가로 고려의 푸른 비취색 '고려청자'와 인삼이 세계로 팔려 나갔다. 오늘날 대한민국의 영문 이름 '코리아(Korea)'가 바로 이 역동적인 개방 국가 고려(Goryeo)에서 유래했다.`
    }
  ],
  "12-15": [
    {
      id: "goryeo-1215-1392-jeongmongju",
      month: 12,
      day: 15,
      year: 1392,
      king: "공양왕 4년",
      lunarDate: "초봄~겨울 고려 말 야사",
      category: "scandal",
      interestScore: 98,
      title: "'이 몸이 죽고 죽어 일백 번 고쳐 죽어' — 선죽교 붉은 피로 남긴 정몽주의 단심가",
      source: "《고려사》 정몽주 열전 & 《연려실기술》",
      sillokUrl: "https://db.history.go.kr/goryeo/",
      officialRecord: "정몽주가 이성계의 병문안을 마치고 돌아가던 길에 선지교(선죽교) 위에서 조영규 등의 철퇴에 맞아 순절하였다. (《고려사》)",
      yasaStory: `고려의 운명이 바람 앞의 등불 같던 1392년, 이방원은 마지막 걸림돌이었던 충신 정몽주를 자기 편으로 끌어들이기 위해 술자리를 마련하고 유명한 '하여가'를 읊었다.\n\n"이런들 어떠하리 저런들 어떠하리, 만수산 드렁칡이 얽어진들 어떠하리." 그러자 정몽주는 술잔을 내려놓고 단호히 '단심가'로 답했다. "이 몸이 죽고 죽어 일백 번 고쳐 죽어, 백골이 진토 되어 넋이라도 있고 없고, 님 향한 일편단심이야 가실 줄이 있으랴." 집으로 돌아가는 개경 선죽교 위에서 조영규의 철퇴를 맞고 쓰러진 정몽주의 죽음과 함께 474년 고려 왕조도 막을 내렸다.`
    }
  ]
};

// 연도순 조회
function getStoriesForDate(month, day) {
  const key = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const list = CURATED_STORIES[key] ? [...CURATED_STORIES[key]] : [];
  return list.sort((a, b) => (a.year - b.year) || (b.interestScore - a.interestScore));
}

// 기록이 없는 날짜일 때 가장 가까운 실제 기록 날짜(MM-DD) 탐색
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

// 명장면 모음 전체 리스트
function getAllLegendStories() {
  const all = [];
  Object.values(CURATED_STORIES).forEach(list => {
    list.forEach(item => all.push(item));
  });
  return all.sort((a, b) => b.interestScore - a.interestScore);
}
