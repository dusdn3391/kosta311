// 🔥 이걸 main.js 맨 위에 넣어
const translateMap = {
  우유: "milk",
  계란: "egg",
  달걀: "egg",
  버터: "butter",
  설탕: "sugar",
  밀가루: "flour",
  소금: "salt",
  크림: "cream",
  치즈: "cheese",
  초콜릿: "chocolate",
  바닐라: "vanilla",
  오일: "oil",

  케이크: "cake",
  빵: "bread",
  쿠키: "cookie",
  머핀: "muffin",
  파스타: "pasta",
  피자: "pizza",

  닭고기: "chicken",
  소고기: "beef",
  돼지고기: "pork",
  쌀: "rice",
};

function translateToEnglish(text) {
  if (!text) return "";

  let result = text;

  Object.keys(translateMap).forEach((key) => {
    if (result.includes(key)) {
      result = result.replaceAll(key, translateMap[key]);
    }
  });

  return result;
}