# 🎂 The Baker's Atelier
유럽풍 베이지 & 초콜릿 테마로 케이크와 빵 레시피가 있는 웹페이지입니다.  
케이크 위 촛불이 일렁이고, 화면을 클릭하면 촛불이 꺼지며 메인 페이지로 자연스럽게 전환됩니다.

---

## 📁 파일 구조
```
📁 KOSTA311
├── index.html                  # 인트로 페이지 (SVG 케이크 + 촛불 애니메이션)
├── .gitignore
├── README.md
│
├── 📁 css
│   ├── intro.css               # 인트로 스타일 (촛불 애니메이션, 파티클, 배경)
│   ├── list.css                # 레시피 목록 페이지 스타일
│   ├── main.css                # 메인 페이지 스타일
│   └── recipe.css              # 레시피 상세 페이지 스타일
│
├── 📁 html
│   ├── main.html               # 메인 페이지
│   ├── list.html               # 레시피 목록 (Spoonacular API 연동)
│   ├── recipe-detail.html      # 레시피 상세 페이지
│   ├── recipe-chocolate.html   # 초콜릿 레시피
│   ├── recipe-normalcake.html  # 일반 케이크 레시피
│   ├── recipe-tiramisu.html    # 티라미수 레시피
│   ├── chocolate.html          # 초콜릿 소개 페이지
│   ├── chocomuffin.html        # 초코 머핀 소개 페이지
│   ├── madulen.html            # 마들렌 소개 페이지
│   └── pepero.html             # 빼빼로 소개 페이지
│
├── 📁 js
│   ├── intro.js                # 인트로 로직 (파티클 생성, 클릭 이벤트, 페이지 이동)
│   ├── main.js                 # 메인 페이지 로직
│   ├── list.js                 # 레시피 목록 로직 (AJAX, 데이터 병합)
│   ├── myrecipe.js             # 자체 작성 레시피 데이터
│   ├── translate.js            # 번역 기능 (Papago API 시도)
│   └── config.js               # API 키 등 환경 설정
│
└── 📁 img
    └── (이미지 리소스)
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

## 🌐 외부 API 연동

### 🥐 Spoonacular API + AJAX — 레시피 동적 로딩

레시피 목록 페이지에서 **Spoonacular API**를 AJAX로 호출해 제과 레시피 데이터를 가져옵니다.  
가져온 외부 데이터는 직접 작성한 자체 레시피 데이터와 병합되어 하나의 리스트로 출력됩니다.

```
[Spoonacular API] ──AJAX──▶ 외부 레시피 fetch
       +
[로컬 데이터]              ──▶ 자체 작성 레시피
       │
       ▼
  통합 레시피 리스트 렌더링
```

| 항목 | 내용 |
|------|------|
| 사용 API | [Spoonacular Recipe API](https://spoonacular.com/food-api) |
| 호출 방식 | `XMLHttpRequest` / `fetch` (AJAX 비동기 처리) |
| 검색 키워드 | `dessert`, `cake`, `bread` 등 제과·제빵 카테고리 |
| 데이터 병합 | API 응답 결과 + 로컬 배열을 `concat` 후 리스트 렌더링 |
| 출력 정보 | 레시피명, 이미지, 소요시간, 재료 수 등 |

> **참고:** Spoonacular 무료 플랜은 일일 요청 횟수(150 points/day) 제한이 있습니다.

---

### 🌏 Papago API — 번역 기능 (미구현)

레시피 제목·설명을 **한국어로 자동 번역**하기 위해 Naver Papago API 연동을 시도했으나,  
**서버리스 환경의 한계**로 최종 적용에 실패했습니다.

| 항목 | 내용 |
|------|------|
| 시도한 API | Naver Papago Translation API |
| 목적 | Spoonacular 영문 레시피 → 한국어 자동 번역 |
| 실패 원인 | Papago API는 **서버 사이드에서만** Client ID/Secret 키를 안전하게 사용할 수 있음. 순수 정적 페이지(GitHub Pages)에서는 CORS 정책 및 키 노출 문제로 직접 호출 불가 |
| 대안 검토 | 프록시 서버(Node.js/Express) 구성 또는 번역 결과를 수동으로 JSON에 미리 저장하는 방식 |

> 💡 **개선 방향:** 추후 백엔드(Node.js, Flask 등)를 추가하거나, Google Apps Script를 프록시로 활용하면 번역 기능 구현이 가능합니다.

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
