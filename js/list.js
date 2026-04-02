const API_KEY = CONFIG.API_KEY;

// 👉 jQuery 선택자
const $result = $("#result");
const $input = $("#ingredients");
const $searchBtn = $("#searchBtn");

// 👉 URL 파라미터
const params = new URLSearchParams(window.location.search);
const initialIngredients = params.get("ingredients");

// 👉 최초 실행
if (initialIngredients) {
  $input.val(initialIngredients);
  getRecipes(initialIngredients);
}

// 👉 검색 버튼 클릭
$searchBtn.on("click", function () {
  const userInput = $input.val().trim();

  if (!userInput) {
    alert("재료를 입력해주세요!");
    return;
  }

  const ingredients = translateToEnglish(userInput);

  // 👉 URL 유지 (UX)
  history.pushState(null, "", `?ingredients=${encodeURIComponent(userInput)}`);

  getRecipes(ingredients);
});

// 👉 엔터 검색
$input.on("keypress", function (e) {
  if (e.key === "Enter") {
    $searchBtn.click();
  }
});

// 👉 핵심: fetch → $.ajax
function getRecipes(ingredients) {
  $result.html("<p>레시피 찾는 중...</p>");

  $.ajax({
    url: "https://api.spoonacular.com/recipes/findByIngredients",
    method: "GET",
    data: {
      ingredients: ingredients,
      number: 6,
      apiKey: API_KEY,
    },
    success: function (apiData) {
      const localData = filterMyRecipes(ingredients);

      const combined = [...localData, ...apiData];

      displayRecipes(combined);
    },
    error: function () {
      $result.html("<p>에러 발생 😢</p>");
    },
  });
}

// 👉 내 레시피 필터
function filterMyRecipes(ingredients) {
  const inputArr = ingredients.split(",").map((i) => i.trim());

  return myRecipes.filter((recipe) =>
    recipe.ingredients.some((ing) => inputArr.includes(ing)),
  );
}

// 👉 결과 출력
function displayRecipes(recipes) {
  if (!recipes || recipes.length === 0) {
    $result.html("<p>레시피가 없습니다 😢</p>");
    return;
  }

  $result.empty();

  recipes.forEach((recipe) => {
    const isLocal = recipe.source === "local";

    const card = `
      <div class="card" data-id="${recipe.id}" data-link="${recipe.link || ""}" data-local="${isLocal}">
        <img src="${recipe.image}" width="100%">
        <h3>${recipe.title}</h3>
        <span style="color:${isLocal ? "gold" : "gray"}">
          ${isLocal ? "내 레시피" : "API 레시피"}
        </span>
      </div>
    `;

    $result.append(card);
  });
}

// 👉 카드 클릭 (이벤트 위임 👍)
$result.on("click", ".card", function () {
  const isLocal = $(this).data("local");

  if (isLocal) {
    location.href = $(this).data("link");
  } else {
    const id = $(this).data("id");
    location.href = `recipe-detail.html?id=${id}`;
  }
});
