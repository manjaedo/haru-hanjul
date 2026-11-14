// 오늘의 헤로도토스 《역사》 — 전 9권 24절기 기반 데이터
const CATEGORIES = {
  mystery: { id: "mystery", label: "기이한 일", shortLabel: "기이한 일" },
  scandal: { id: "scandal", label: "궁중 비화", shortLabel: "궁중 비화" },
  folklore: { id: "folklore", label: "야담·영웅", shortLabel: "야담·영웅" },
  episode: { id: "episode", label: "풍속·기문", shortLabel: "풍속·기문" }
};

const SOLAR_TERMS = [
  { index: 0,  name: "입춘", hanja: "立春", m: 2,  d: 4,  range: "2월 4일 ~ 2월 18일" },
  { index: 1,  name: "우수", hanja: "雨水", m: 2,  d: 19, range: "2월 19일 ~ 3월 5일" },
  { index: 2,  name: "경칩", hanja: "驚蟄", m: 3,  d: 6,  range: "3월 6일 ~ 3월 20일" },
  { index: 3,  name: "춘분", hanja: "春分", m: 3,  d: 21, range: "3월 21일 ~ 4월 4일" },
  { index: 4,  name: "청명", hanja: "清明", m: 4,  d: 5,  range: "4월 5일 ~ 4월 19일" },
  { index: 5,  name: "곡우", hanja: "穀雨", m: 4,  d: 20, range: "4월 20일 ~ 5월 5일" },
  { index: 6,  name: "입하", hanja: "立夏", m: 5,  d: 6,  range: "5월 6일 ~ 5월 20일" },
  { index: 7,  name: "소만", hanja: "小滿", m: 5,  d: 21, range: "5월 21일 ~ 6월 5일" },
  { index: 8,  name: "망종", hanja: "芒種", m: 6,  d: 6,  range: "6월 6일 ~ 6월 20일" },
  { index: 9,  name: "하지", hanja: "夏至", m: 6,  d: 21, range: "6월 21일 ~ 7월 6일" },
  { index: 10, name: "소서", hanja: "小暑", m: 7,  d: 7,  range: "7월 7일 ~ 7월 22일" },
  { index: 11, name: "대서", hanja: "大暑", m: 7,  d: 23, range: "7월 23일 ~ 8월 7일" },
  { index: 12, name: "입추", hanja: "立秋", m: 8,  d: 8,  range: "8월 8일 ~ 8월 22일" },
  { index: 13, name: "처서", hanja: "處暑", m: 8,  d: 23, range: "8월 23일 ~ 9월 7일" },
  { index: 14, name: "백로", hanja: "白露", m: 9,  d: 8,  range: "9월 8일 ~ 9월 22일" },
  { index: 15, name: "추분", hanja: "秋分", m: 9,  d: 23, range: "9월 23일 ~ 10월 7일" },
  { index: 16, name: "한로", hanja: "寒露", m: 10, d: 8,  range: "10월 8일 ~ 10월 22일" },
  { index: 17, name: "상강", hanja: "霜降", m: 10, d: 23, range: "10월 23일 ~ 11월 6일" },
  { index: 18, name: "입동", hanja: "立冬", m: 11, d: 7,  range: "11월 7일 ~ 11월 21일" },
  { index: 19, name: "소설", hanja: "小雪", m: 11, d: 22, range: "11월 22일 ~ 12월 6일" },
  { index: 20, name: "대설", hanja: "大雪", m: 12, d: 7,  range: "12월 7일 ~ 12월 21일" },
  { index: 21, name: "동지", hanja: "冬至", m: 12, d: 22, range: "12월 22일 ~ 1월 5일" },
  { index: 22, name: "소한", hanja: "小寒", m: 1,  d: 6,  range: "1월 6일 ~ 1월 19일" },
  { index: 23, name: "대한", hanja: "大寒", m: 1,  d: 20, range: "1월 20일 ~ 2월 3일" }
];

function getSolarTermByIndex(idx) {
  return SOLAR_TERMS.find(t => t.index === idx) || SOLAR_TERMS[0];
}

function getSolarTermForDate(month, day) {
  const md = month * 100 + day;
  if (md >= 1222 || md <= 105) return SOLAR_TERMS[21]; // 동지
  if (md >= 106 && md <= 119) return SOLAR_TERMS[22];  // 소한
  if (md >= 120 && md <= 203) return SOLAR_TERMS[23];  // 대한
  for (let i = 20; i >= 0; i--) {
    const t = SOLAR_TERMS[i];
    if (md >= t.m * 100 + t.d) return t;
  }
  return SOLAR_TERMS[0];
}

function getAllHerodotusStories() {
  return typeof HERODOTUS_TERM_STORIES !== 'undefined' ? HERODOTUS_TERM_STORIES : [];
}

function getAllLegendStories() {
  return [...getAllHerodotusStories()]
    .sort((a, b) => (b.interestScore || 0) - (a.interestScore || 0))
    .slice(0, 24);
}
