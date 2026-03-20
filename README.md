# 🎂 The Baker's Atelier

유럽풍 베이지 & 초콜릿 테마로 케이크와 빵 레시피가 있는 웹페이지입니다.  
케이크 위 촛불이 일렁이고, 화면을 클릭하면 촛불이 꺼지며 메인 페이지로 자연스럽게 전환됩니다.

---

## 📁 파일 구조

```
📁 프로젝트 폴더
├── index.html      # 인트로 페이지 구조 (SVG 케이크 + 텍스트)
├── intro.css       # 스타일 (촛불 애니메이션, 파티클, 배경 등)
├── intro.js        # 로직 (파티클 생성, 클릭 이벤트, 페이지 이동)
├── main.html       # 메인 페이지 (별도 제작)
├── recipe-*.html   # 레시피 페이지 등등
└── README.md
```

---

## 🎨 CSS 특징

| 애니메이션 | 설명 |
|------------|------|
| `flicker` | 촛불이 불규칙하게 일렁이는 효과. 각 불꽃마다 duration을 다르게 설정해 자연스러움 연출 |
| `glow-pulse` | 촛불 주변 빛이 맥박처럼 은은하게 커졌다 작아짐 |
| `float-up` | 황금빛 파티클이 아래에서 위로 서서히 떠오르며 사라짐 |
| `smoke-rise` | 촛불이 꺼진 후 연기가 위로 퍼지며 사라짐 |
| `pulse` | 하단 힌트 텍스트가 부드럽게 깜빡임 |
| `fade-in` | 이동 안내 메시지가 아래에서 위로 페이드인 |

- 배경은 `radial-gradient`로 중앙이 밝은 짙은 초콜릿 분위기 연출
- 케이크 SVG에 `drop-shadow` 필터로 황금빛 그림자 추가

---

## ⚙️ JS 특징

| 함수 | 역할 |
|------|------|
| `createParticles(count)` | 황금빛 먼지 파티클을 동적으로 생성. 크기·위치·색상·딜레이를 랜덤으로 설정 |
| `blowOutCandles()` | 불꽃 애니메이션 정지 및 opacity 0으로 페이드아웃, 연기 요소 표시 |
| `showRedirectMessage()` | 힌트 텍스트 숨기고 이동 안내 메시지 표시 |
| `goToMain()` | `window.location.href`로 main.html 이동 |
| `handleClick()` | 클릭 이벤트 등록. `blown` 플래그로 중복 클릭 방지 |

- `setTimeout`으로 촛불 끄기(즉시) → 메시지 전환(0.45초) → 페이지 이동(3초) 순서로 타이밍 제어

---

## 🖥️ 화면 구성도
### 🕯️ 인트로
<img src="https://github.com/user-attachments/assets/e2b3f64e-5b53-4866-a2c2-ad56d0563c12" width="50%"/>
 
### 🏠 메인
<img src="https://github.com/user-attachments/assets/4681f7bc-f695-4e6f-8599-0ff2995566e7" width="50%"/>
 
### 🍰 레시피
<img src="https://github.com/user-attachments/assets/1a8529bb-5789-4ee1-ba37-9a4c24cc0a64" width="50%"/>

---

## 🚀 배포

🔗 [https://dusdn3391.github.io/kosta311/](https://dusdn3391.github.io/kosta311/)

---

## 🎨 색상 테마

유럽풍 베이지 & 초콜릿 팔레트를 사용합니다.

| 요소 | 헥스 코드 |
|------|-----------|
| 배경 (어두운 초콜릿) | `#2c1a0e` |
| 텍스트 (따뜻한 크림) | `#f0ddb0` |
