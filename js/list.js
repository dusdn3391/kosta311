const API_KEY = CONFIG.API_KEY;

const result = document.getElementById("result");
const input = document.getElementById("ingredients");
const searchBtn = document.getElementById("searchBtn");

// ─── URL 파라미터 초기 실행 ─────────────────────────────
const params = new URLSearchParams(window.location.search);
const initialIngredients = params.get("ingredients");

if (initialIngredients) {
  input.value = initialIngredients;
  getRecipes(initialIngredients);
}

// ─── 검색 버튼 ─────────────────────────────
searchBtn.addEventListener("click", () => {
  const userInput = input.value.trim();

  if (!userInput) {
    alert("재료를 입력해주세요!");
    return;
  }

  // URL 유지
  history.pushState(
    null,
    "",
    `?ingredients=${encodeURIComponent(userInput)}`
  );

  getRecipes(userInput);
});

// ─── 엔터 검색 ─────────────────────────────
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchBtn.click();
  }
});

// ─── API 호출 ─────────────────────────────
function getRecipes(ingredients) {
  result.innerHTML = "<p>레시피 찾는 중...</p>";

  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=6&apiKey=${API_KEY}`
  )
    .then((res) => {
      if (!res.ok) throw new Error("API 오류");
      return res.json();
    })
    .then((apiData) => {
      const inputArr = ingredients.split(",").map((i) => i.trim());

      // 👉 API AND 조건 필터링
      const filteredApi = apiData.filter((recipe) =>
        inputArr.every((ing) =>
          recipe.usedIngredients.some((r) =>
            r.name.toLowerCase().includes(ing)
          )
        )
      );

      const localData = filterMyRecipes(ingredients);

      const combined = [...localData, ...filteredApi];

      displayRecipes(combined);
    })
    .catch(() => {
      result.innerHTML = "<p>API 에러 😢 (쿼터 초과 가능)</p>";
    });
}

// ─── 로컬 레시피 필터 (AND 조건) ─────────────────────────────
function filterMyRecipes(ingredients) {
  const inputArr = ingredients.split(",").map((i) => i.trim());

  return myRecipes.filter((recipe) =>
    inputArr.every((ing) => recipe.ingredients.includes(ing))
  );
}

// ─── 결과 출력 ─────────────────────────────
function displayRecipes(recipes) {
  if (!recipes || recipes.length === 0) {
    result.innerHTML = "<p>레시피가 없습니다 😢</p>";
    return;
  }

  result.innerHTML = "";

  recipes.forEach((recipe) => {
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
  });
}

// ─── 상세 페이지 이동 ─────────────────────────────
function goDetail(id) {
  location.href = `recipe-detail.html?id=${id}`;
}