const API_KEY = "e309c86e167948bd964c7add5e43695a";

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

  // 👉 🔥 한글 → 영어 변환
  const ingredients = translateToEnglish(userInput);

  // 👉 URL은 사용자가 입력한 그대로 유지 (UX 좋음)
  history.pushState(
    null,
    "",
    `?ingredients=${encodeURIComponent(userInput)}`
  );

  // 👉 API에는 변환된 값 전달
  getRecipes(ingredients);
});
// 👉 엔터 검색
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

function getRecipes(ingredients) {
  result.innerHTML = "<p>레시피 찾는 중...</p>";

  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=6&apiKey=${API_KEY}`,
  )
    .then((res) => res.json())
    .then((apiData) => {
      const localData = filterMyRecipes(ingredients);

      // 👉 합치기
      const combined = [...localData, ...apiData];

      displayRecipes(combined);
    })
    .catch(() => {
      result.innerHTML = "<p>에러 발생 😢</p>";
    });
}
function filterMyRecipes(ingredients) {
  const inputArr = ingredients.split(",").map((i) => i.trim());

  return myRecipes.filter((recipe) =>
    recipe.ingredients.some((ing) => inputArr.includes(ing)),
  );
}

// 👉 결과 출력
function displayRecipes(recipes) {
  if (!recipes || recipes.length === 0) {
    result.innerHTML = "<p>레시피가 없습니다 😢</p>";
    return;
  }

  result.innerHTML = "";

  recipes.forEach((recipe) => {
    // 👉 내 레시피 vs API 구분
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

// 👉 상세 페이지 이동 (🔥 추가 핵심)
function goDetail(id) {
  location.href = `recipe-detail.html?id=${id}`;
}