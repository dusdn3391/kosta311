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
  이스트: "yeast",
  치즈: "cheese",
  초콜릿: "chocolate",
  바닐라: "vanilla",
  오일: "oil",
  생크림: "whipped cream",
  코코아파우더: "cocoa powder",
  과일: "fruit",
  커피: "coffee",

  케이크: "cake",
  빵: "bread",
  쿠키: "cookie",
  머핀: "muffin",
  파스타: "pasta",
  피자: "pizza",
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
