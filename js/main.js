document.getElementById("searchBtn").addEventListener("click", () => {
  const input = document.getElementById("ingredients").value.trim();

  if (!input) {
    alert("재료를 입력해주세요!");
    return;
  }

  location.href = `list.html?ingredients=${encodeURIComponent(input)}`;
});
// ─── SLIDER ───
const track = document.getElementById("sliderTrack");
const cards = track.querySelectorAll(".cake-card");
const total = cards.length;
const countEl = document.getElementById("countDisplay");
const progressEl = document.getElementById("sliderProgress");
const wrapper = document.getElementById("sliderWrapper");

let current = 0;
const gap = 24;

// 카드 하나 너비
function cardW() {
  return cards[0].offsetWidth + gap;
}

// 화면에 보이는 카드 개수
function visibleCount() {
  return Math.floor(wrapper.offsetWidth / cardW());
}

// 이동 가능한 최대 index
function maxIndex() {
  return Math.max(0, total - visibleCount());
}

// 슬라이드 이동
function goTo(i) {
  current = Math.max(0, Math.min(i, maxIndex()));

  track.style.transform = `translateX(-${current * cardW()}px)`;

  const totalPage = maxIndex() + 1;

  // 숫자 표시 (페이지 기준)
  countEl.textContent = `${current + 1} / ${totalPage}`;

  progressEl.style.width = `${((current + 1) / totalPage) * 100}%`;
}

// 버튼 이벤트
document.getElementById("prev").addEventListener("click", () => {
  goTo(current - 1);
});

document.getElementById("next").addEventListener("click", () => {
  goTo(current + 1);
});

// ─── 마우스 드래그 ───
let startX = 0;
let dragging = false;

wrapper.addEventListener("mousedown", (e) => {
  dragging = true;
  startX = e.clientX;
});

wrapper.addEventListener("mouseup", (e) => {
  if (!dragging) return;
  dragging = false;

  const d = startX - e.clientX;

  if (d > 60) goTo(current + 1);
  else if (d < -60) goTo(current - 1);
});

wrapper.addEventListener("mouseleave", () => {
  dragging = false;
});

// ─── 터치 스와이프 ───
wrapper.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

wrapper.addEventListener("touchend", (e) => {
  const d = startX - e.changedTouches[0].clientX;

  if (d > 50) goTo(current + 1);
  else if (d < -50) goTo(current - 1);
});

window.addEventListener("resize", () => {
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
