const difficulty = document.getElementById("difficulty");

const settings = document.getElementById("settings");

const timerSpan = document.getElementById("time");
const levelDropdown = document.getElementById("level");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const game = document.getElementById("game");
const again = document.getElementById("again");
const input = document.getElementById("input");
const wordSpan = document.getElementById("word");
const realodBtn = document.getElementById("reload");

let level = "easy";

let timer = 10;
let score = 0;

const words = ["omar", "mohamed", "alktan", "mahmoud", "manar", "esraa", "mohab", "hooba", "hooda", "noora", "soso", "ekram", "mostafa", "salma", "alaa", "mostafa", "zbady", "karizma", "aly", "ayman"];

let testWord = words[0];

settings.onclick = function(){
  if(difficulty.style.top == "0px"){
    difficulty.style.top = "-20%";
  }else{
    difficulty.style.top = "0";
  }
}

setInterval(updateTimer, 1000);

function updateTimer(){
  if(timer == 1){
    gameOver();
  }
  timer--;
  timerSpan.innerHTML = `Time left: ${timer}s`;
}

function gameOver(){
  game.style.display = "none";
  again.style.display = "block";
  finalScoreSpan.innerHTML = `Your final score is ${score}`;
}

input.onkeyup = function(){
  if(input.value == testWord){
    testWord = words[Math.floor(Math.random() * 20)];
    input.value = "";
    switch (level) {
      case "easy":
        timer += 5;
        break;
      case "medium":
        timer += 3;
        break;
      case "hard":
        timer += 2;
        break;
    }
    wordSpan.innerHTML = testWord;
    score++;
    scoreSpan.innerHTML = `Score: ${score}`;
  }
}

realodBtn.onclick = function(){
  timer = 10;
  score = 0;
  game.style.display = "block";
  again.style.display = "none";
}

levelDropdown.onchange = function(){
  level = levelDropdown.value;
  console.log(level);
}