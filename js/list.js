const API_KEY = CONFIG.API_KEY;

const result = document.getElementById("result");
const input = document.getElementById("ingredients");
const searchBtn = document.getElementById("searchBtn");

// 👉 URL에서 값 받아서 최초 실행
const params = new URLSearchParams(window.location.search);
const initialIngredients = params.get("ingredients");

if (initialIngredients) {
  input.value = initialIngredients;
  getRecipes(initialIngredients);
}

// 👉 검색 버튼
searchBtn.addEventListener("click", () => {
  const userInput = input.value.trim();

  if (!userInput) {
    alert("재료를 입력해주세요!");
    return;
  }

  // 👉 한글 → 영어 변환
  const ingredients = translateToEnglish(userInput);

  // 👉 URL 유지 (UX)
  history.pushState(
    null,
    "",
    `?ingredients=${encodeURIComponent(userInput)}`
  );

  getRecipes(ingredients);
});

// 👉 엔터 검색
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// 👉 레시피 가져오기
function getRecipes(ingredients) {
  result.innerHTML = "<p>레시피 찾는 중...</p>";

  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=6&apiKey=${API_KEY}`
  )
    .then((res) => res.json())
    .then((apiData) => {
      const localData = filterMyRecipes(ingredients);

      const combined = [...localData, ...apiData];

      displayRecipes(combined); // 👉 async 함수 호출
    })
    .catch(() => {
      result.innerHTML = "<p>에러 발생 😢</p>";
    });
}

// 👉 내 레시피 필터
function filterMyRecipes(ingredients) {
  const inputArr = ingredients.split(",").map((i) => i.trim());

  return myRecipes.filter((recipe) =>
    recipe.ingredients.some((ing) => inputArr.includes(ing))
  );
}


// 👉 🔥 결과 출력 (번역 적용)
async function displayRecipes(recipes) {
  if (!recipes || recipes.length === 0) {
    result.innerHTML = "<p>레시피가 없습니다 😢</p>";
    return;
  }

  result.innerHTML = "";

  for (const recipe of recipes) {
    const isLocal = recipe.source === "local";

    
    result.innerHTML += `
      <div class="card" onclick="${
        isLocal
          ? `location.href='${recipe.link}'`
          : `location.href='recipe-detail.html?id=${recipe.id}'`
      }">
        <img src="${recipe.image}" width="100%">
        <h3>${recipe.title}</h3>
        <span style="color:${isLocal ? "gold" : "gray"}">
          ${isLocal ? "내 레시피" : "API 레시피"}
        </span>
      </div>
    `;
  }
}

// 👉 상세 페이지 이동
function goDetail(id) {
  location.href = `recipe-detail.html?id=${id}`;
}