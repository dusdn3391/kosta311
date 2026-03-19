// ── 파티클 생성 (황금빛 먼지) ────────────────────────────
function createParticles(count = 18) {
  const container = document.getElementById('particles');

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 3 + 1.5;
    const hue  = 35 + Math.random() * 20;
    const sat  = 60 + Math.random() * 20;
    const lit  = 55 + Math.random() * 20;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${40 + Math.random() * 50}%;
      background: hsl(${hue}, ${sat}%, ${lit}%);
      animation-delay: ${Math.random() * 6}s;
      animation-duration: ${5 + Math.random() * 4}s;
    `;
    container.appendChild(p);
  }
}

// ── 촛불 끄기 ─────────────────────────────────────────
function blowOutCandles() {
  document.querySelectorAll('.flame-group').forEach(flame => {
    flame.style.animation  = 'none';
    flame.style.opacity    = '0';
    flame.style.transition = 'opacity 0.35s';
  });

  document.querySelectorAll('.glow-ring').forEach(glow => {
    glow.style.animation = 'none';
    glow.style.opacity   = '0';
  });

  document.getElementById('smoke-g').style.display = 'block';
}

// ── 안내 메시지 전환 ───────────────────────────────────
function showRedirectMessage() {
  document.querySelector('.hint').style.display = 'none';
  document.getElementById('redirect-msg').style.display = 'block';
}

// ── main.html로 이동 ───────────────────────────────────
function goToMain() {
  window.location.href = 'main.html';
}

// ── 클릭 이벤트 ───────────────────────────────────────
function handleClick() {
  let blown = false;

  document.body.addEventListener('click', () => {
    if (blown) return;
    blown = true;

    blowOutCandles();

    setTimeout(showRedirectMessage, 450);
    setTimeout(goToMain, 3000);
  });
}

// ── 초기화 ────────────────────────────────────────────
createParticles(18);
handleClick();