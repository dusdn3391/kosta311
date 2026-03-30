const API_KEY = "e309c86e167948bd964c7add5e43695a";

const result = document.getElementById("result");
const input = document.getElementById("ingredients");

// 👉 1. URL에서 값 받아서 최초 실행
const params = new URLSearchParams(window.location.search);
const initialIngredients = params.get("ingredients");

if (initialIngredients) {
  input.value = initialIngredients;
  getRecipes(initialIngredients);
}

// 👉 2. 검색 버튼 (재검색)
document.getElementById("searchBtn").addEventListener("click", () => {
  const ingredients = input.value.trim();

  if (!ingredients) {
    alert("재료를 입력해주세요!");
    return;
  }

  // 👉 URL도 같이 바꿔주기 (좋은 UX🔥)
  history.pushState(
    null,
    "",
    `?ingredients=${encodeURIComponent(ingredients)}`,
  );

  getRecipes(ingredients);
});

// 👉 3. API 호출 함수
function getRecipes(ingredients) {
  result.innerHTML = "<p>레시피 찾는 중...</p>";

  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=6&apiKey=${API_KEY}`,
  )
    .then((res) => res.json())
    .then((data) => {
      displayRecipes(data);
    })
    .catch(() => {
      result.innerHTML = "<p>에러 발생 😢</p>";
    });
}

// 👉 4. 결과 출력
function displayRecipes(recipes) {
  if (!recipes || recipes.length === 0) {
    result.innerHTML = "<p>레시피가 없습니다 😢</p>";
    return;
  }

  result.innerHTML = "";

  recipes.forEach((recipe) => {
    result.innerHTML += `
      <div class="card">
        <img src="${recipe.image}" width="100%">
        <h3>${recipe.title}</h3>
        <p>사용 재료: ${recipe.usedIngredientCount}</p>
        <p>부족 재료: ${recipe.missedIngredientCount}</p>
      </div>
    `;
  });
}
