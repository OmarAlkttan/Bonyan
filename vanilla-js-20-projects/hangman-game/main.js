const stand = '<line x1="0" y1="250" x2="70" y2="250" stroke="white"stroke-width="2"/><line x1="35" y1="250" x2="35" y2="0" stroke="white" stroke-width="2"/><line x1="35" y1="0" x2="105" y2="0" stroke="white" stroke-width="2" /><line x1="105" y1="0" x2="105" y2="40" stroke="white" stroke-width="2"/>'

const words = ["programming", "Omar", "coding", "javascript", "node", "spring", "boot"];

let hangman = stand;
let hanged = false;
let hangState = "Head";
var word;

const hangmanContainer = document.getElementById("hangman-svg");
const hiddenWord = document.getElementById("hidden-word");
const wrongLettersContainer = document.getElementById("wrong-letters");

const alreadyEntered = document.getElementById("already-entered");

var alreadyPressed = [];
var wrongLetters = [];

var wordCount = 0;

// Get the modal
var modal = document.getElementById("myModal");
var modalMsg = document.getElementById("modal-msg");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var playAgainButton = document.getElementById("try-again");

playAgainButton.addEventListener('click', reset);

document.addEventListener('keypress', function(event){
  console.log("shownLetters -> " + alreadyPressed);
  if(alreadyPressed.includes(event.key)){
    alreadyEntered.className = "show";
    setTimeout(function(){ alreadyEntered.className = alreadyEntered.className.replace("show", "")}, 3000);
  }else{
    checkLetter(event.key);
  }
});

changeWord();

function changeWord(){
  word  = words[Math.floor(Math.random() * 7)];
  let text = "<p>"
  for(let i = 0; i < word.length; i++){
      text += `<span id="letter-${i}" class="letter"></span>`;
  }
  text += '</p>';
  hiddenWord.innerHTML = text;
}

function checkLetter(key){
  let flag = false;
  for(let i = 0; i < word.length; i++){
    if(key === word.charAt(i)){
      document.getElementById(`letter-${i}`).innerHTML = key;
      console.log(document.getElementById(`letter-${i}`));
      flag = true;
      wordCount++;
      if(wordCount === word.length){
        modal.style.display = "block";
      }
    }
  }

  if(!flag){
    hangControl();
    wrongLetters.push(key);
    renderWrongLetters();
  }
  alreadyPressed.push(key);
}

function renderWrongLetters(){
  if(wrongLetters.length < 1) return;
  console.log("wrongLetters -> " + wrongLetters)
  let text = "<p>Wrong Letters</p><p>";

  for(let i = 0; i < wrongLetters.length; i++){
    if(i === (wrongLetters.length-1)){
      text += `${wrongLetters[i]}`
    }else{
      text += `${wrongLetters[i]}, `
    }
    
  }
  text += '</p>';
  wrongLettersContainer.innerHTML = text;

}

function addHead(){
  let text = '<circle cx="105" cy="60" r="20" stroke="white"stroke-width="2"fill="#1e4553"/>'

  hangman += text;
  console.log("hangman -> " + hangman)
  hangmanContainer.innerHTML = hangman;
  hangState = "Backbone";
}

function addBackbone(){
  let text = '<line x1="105" y1="80" x2="105" y2="160" stroke="white" stroke-width="2"/>'

  hangman += text;
  hangmanContainer.innerHTML = hangman;
  hangState = "RightHand";
}

function addRightHand(){
  let text = '<line x1="105" y1="120" x2="70" y2="90" stroke="white" stroke-width="2"/>'

  hangman += text;
  hangmanContainer.innerHTML = hangman;
  hangState = "LeftHand";
}

function addLeftHand(){
  let text = '<line x1="105" y1="120" x2="140" y2="90" stroke="white" stroke-width="2"/>'

  hangman += text;
  hangmanContainer.innerHTML = hangman;
  hangState = "RightLeg";
}

function addRightLeg(){
  let text = '<line x1="105" y1="160" x2="70" y2="195" stroke="white" stroke-width="2"/>'

  hangman += text;
  hangmanContainer.innerHTML = hangman;
  hangState = "LeftLeg";
}

function addLeftLeg(){
  let text = '<line x1="105" y1="160" x2="140" y2="195" stroke="white" stroke-width="2"/>'

  hangman += text;
  hangmanContainer.innerHTML = hangman;
  hanged = true;
  hangState = "Reset";
  lose();
}

function lose(){
  modalMsg.innerHTML = "Sorry you lose!";
  modal.style.display = "block";
}

function reset(){
  hangman = stand;
  hangmanContainer.innerHTML = hangman;
  hangState = "Head";
  changeWord();
  renderWrongLetters();
  wrongLetters = [];
  wrongLettersContainer.innerHTML = "";
  alreadyPressed = [];
  modal.style.display = "none";
  wordCount = 0;
}

function hangControl(){
  console.log("in hangControl");
  console.log("hangState -> " + hangState);
  switch (hangState) {
    case "Head":
      addHead();
      break;
    case "Backbone":
      addBackbone();
      break;
    case "RightHand":
      addRightHand();
      break;
    case "LeftHand":
      addLeftHand();
      break;
    case "RightLeg":
      addRightLeg();
      break;
    case "LeftLeg":
      addLeftLeg();
      break;
    case "Reset":
      Reset();
      break;
  }
}