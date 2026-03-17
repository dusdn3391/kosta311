// ─── SLIDER ───
const track = document.getElementById("sliderTrack");
const cards = track.querySelectorAll(".cake-card");
const total = cards.length;
const countEl = document.getElementById("countDisplay");
const progressEl = document.getElementById("sliderProgress");
const wrapper = document.getElementById("sliderWrapper");

let current = 0;
const gap = 24;

function cardW() {
  return cards[0].offsetWidth + gap;
}

function goTo(i) {
  current = Math.max(0, Math.min(i, total - 1));
  track.style.transform = `translateX(-${current * cardW()}px)`;
  countEl.textContent = `${current + 1} / ${total}`;
  progressEl.style.width = `${((current + 1) / total) * 100}%`;
}

document
  .getElementById("prev")
  .addEventListener("click", () => goTo(current - 1));
document
  .getElementById("next")
  .addEventListener("click", () => goTo(current + 1));

// 마우스 드래그
let startX = 0,
  dragging = false;
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

// 터치 스와이프
wrapper.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
wrapper.addEventListener("touchend", (e) => {
  const d = startX - e.changedTouches[0].clientX;
  if (d > 50) goTo(current + 1);
  else if (d < -50) goTo(current - 1);
});

// ─── SCROLL REVEAL ───
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
