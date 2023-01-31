const search = document.getElementById("search-btn");

const input = document.getElementById("meal-input");
const mealsContainer = document.getElementById("meals-container");
const mealLarge = document.getElementById("meal-large");
const random = document.getElementById("random-btn");

let searchedMeals = [];


search.addEventListener('click', searchMeal)
input.addEventListener('keypress', (event) => {
  if(event.key === 'Enter'){
    event.preventDefault;
    search.click();
  }
})
random.addEventListener('click', ()=>{
  fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(response => response.json()).then(data => {
    console.log(data);
    searchedMeals = data.meals;
    console.log(searchedMeals);
    displayMeal(0);
  })
})

async function searchMeal(){
  const value = input.value;
  console.log("value -> ", value);

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);

  const json = await response.json();
  if(json.meals == null){
    mealsContainer.innerHTML = `<h3>no search results for '${value}' : </h3>`
    return;
  }

  searchedMeals = json.meals;
  console.log(searchedMeals);
  displayMeals(json.meals, value)
}

function displayMeals(meals, searchText){
  mealLarge.innerHTML = "";
  let inner = `<h3>search results for '${searchText}' : </h3><div class='meals-content'>`; 
   for(const [index, meal] of meals.entries()){
    inner += displaySmallMeal(meal.strMeal, meal.strMealThumb, index);
   }
   inner += '</div>'
   mealsContainer.innerHTML = inner;
}

function displaySmallMeal(text, image, index){
  /*const meal = document.createElement("div");
  meal.className = "meal-small"
  const img = document.createElement("img");
  img.src = image;
  img.alt = "small-meal-img"
  const span = document.createElement("span");
  const textNode = document.createTextNode("Water");*/
  let meal = `<div class='meal-small' 
  id='meal-${index}' onmouseover='displayMealName(this)' onclick='displayMeal(${index})' onmouseout='hideMealName(this)'> <img src=${image} alt='small-meal-img'><span>${text}</span></div>`

  return meal;
}

function displayMealName(meal){
  meal.children[0].style.filter = 'brightness(0.3)';
  meal.children[1].style.display = "block";
}

function hideMealName(meal){
  meal.children[0].style.filter = 'brightness(1)';
  meal.children[1].style.display = "none";
}

function displayMeal(index){
  /*const index = clickedMeal.id.slice(5);*/
  const meal = searchedMeals[index];
  console.log(meal);
  let inner = `<h3>${meal.strMeal}</h3><img src=${meal.strMealThumb} alt='meal-large'><div class='meal-category'><p>${meal.strCategory}</p><p>${meal.strArea}</p></div><p class='meal-instructions'>${meal.strInstructions}</p><h3>Ingredients</h3><div class='meal-ingredients'>`
  for(let i = 1; i <= 20; i++){
    if(meal["strIngredient" + i] == null || meal["strIngredient" + i] == "") break;
    inner += `<span>${meal["strIngredient" + i]} - ${meal["strMeasure" + i]}</span>`
  }
  inner += `</div>`
  mealLarge.innerHTML = inner;
}
