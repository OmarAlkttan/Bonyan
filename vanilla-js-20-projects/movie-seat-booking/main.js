const movies = new Map([
  ["joker", 12],
  ["avengers", 10],
  ["toy-story", 9],
  ["lion-king", 8]
]);
let selectedMovie = document.getElementById("movie");
let selected = 0;
const total_price = document.getElementById("total-price");
const selectedSeats = document.getElementById("selected-seats");
const chairs = document.querySelectorAll(".chairs .half-circle");
console.log(localStorage.getItem("chairs"))
if(localStorage.getItem("chairs") != undefined){
  GetValuesFromStorage();
  renderSelectedChairs();
}


SetValuesToStorage();





// add onClick event listener for all chairs except occupid chairs
addEventListenerToNodeList(chairs, 'click', function(element){
  console.log("element -> " + element.className)
  if(element.className.includes("occupid")){
    return;
  }else if(element.className.includes("selected")){
    element.className = "half-circle empty";
    selected--;
    renderSelectedChairs();
    SetValuesToStorage();
    console.log(localStorage.getItem("chairs"))
  }else{
    element.className = "half-circle selected";
    selected++;
    renderSelectedChairs();
  }
})

// render number of selected chairs
function renderSelectedChairs(){
  selectedSeats.innerHTML = selected;
  renderTotalPrice();
}

// render total-price to screen
function renderTotalPrice(){
  total_price.innerHTML = movies.get(selectedMovie.value) * selected;
  SetValuesToStorage();
}

// listen to change of movies
selectedMovie.addEventListener('change', renderTotalPrice, false);

// add event listener for every node on a node list
function addEventListenerToNodeList(nodelist, event, fn){
  const len = nodelist.length;
  for(let i = 0; i < len; i++){
    if(nodelist[i].className.includes("occupid")){
      continue;
    }
    nodelist[i].addEventListener(event, function(){ fn(nodelist[i])}, false);
  }
}

// set values to local storage
function SetValuesToStorage(){
  const len = chairs.length;
  const arr = [];
  for(let i = 0; i < len; i++){
    arr.push(chairs[i].className);
  }

  localStorage.setItem("chairs", JSON.stringify(arr));
  localStorage.setItem("selected", String(selected));
  localStorage.setItem("movie", selectedMovie.value);
} 

// get values from local storage
function GetValuesFromStorage(){
  const arr = JSON.parse(localStorage.getItem("chairs"));
  for(let i = 0; i < arr.length; i++){
    chairs[i].className = arr[i];
  }
  selected = localStorage.getItem("selected");
  selectedMovie.value = localStorage.getItem("movie");
}
