// ─── 번역 ─────────────────────────────
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

// ─── 검색 버튼 (jQuery) ─────────────────────────────
$("#searchBtn").on("click", function () {
  const input = $("#ingredients").val().trim();

  if (!input) {
    alert("재료를 입력해주세요!");
    return;
  }

  const translated = translateToEnglish(input);

  location.href = `list.html?ingredients=${encodeURIComponent(translated)}`;
});
addEventListener
$("#ingredients").on("keypress", function (e) {
  if (e.key === "Enter") {
    $("#searchBtn").click();
  }
});
// ─── SLIDER ─────────────────────────────
const $track = $("#sliderTrack");
const $cards = $track.find(".cake-card");
const total = $cards.length;
const $countEl = $("#countDisplay");
const $progressEl = $("#sliderProgress");
const $wrapper = $("#sliderWrapper");

let current = 0;
const gap = 24;

// 카드 너비
function cardW() {
  return $cards.eq(0).outerWidth() + gap;
}

// 보이는 카드 개수
function visibleCount() {
  return Math.floor($wrapper.width() / cardW());
}

// 최대 index
function maxIndex() {
  return Math.max(0, total - visibleCount());
}

// 이동
function goTo(i) {
  current = Math.max(0, Math.min(i, maxIndex()));

  $track.css("transform", `translateX(-${current * cardW()}px)`);

  const totalPage = maxIndex() + 1;

  $countEl.text(`${current + 1} / ${totalPage}`);
  $progressEl.css("width", `${((current + 1) / totalPage) * 100}%`);
}

// 버튼 이벤트
$("#prev").on("click", () => goTo(current - 1));
$("#next").on("click", () => goTo(current + 1));

// ─── 마우스 드래그 ─────────────────────────────
let startX = 0;
let dragging = false;

$wrapper.on("mousedown", function (e) {
  dragging = true;
  startX = e.clientX;
});

$wrapper.on("mouseup", function (e) {
  if (!dragging) return;
  dragging = false;

  const d = startX - e.clientX;

  if (d > 60) goTo(current + 1);
  else if (d < -60) goTo(current - 1);
});

$wrapper.on("mouseleave", function () {
  dragging = false;
});

// ─── 터치 스와이프 (이건 JS 유지 👍) ─────────────────────────────

$wrapper[0].addEventListener("touchend", (e) => {
  const d = startX - e.changedTouches[0].clientX;

  if (d > 50) goTo(current + 1);
  else if (d < -50) goTo(current - 1);
});

// ─── resize ─────────────────────────────
$(window).on("resize", function () {
  goTo(current);
});

goTo(0);

const revealEls = document.querySelectorAll(".reveal");

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((el) => obs.observe(el));
