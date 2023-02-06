const cardsDiv = document.getElementById("cards");
const synth = window.speechSynthesis;
const voiceSelect = document.getElementById("voice");
console.log(synth.getVoices());
const readCustomText = document.getElementById("read-custom-text");
const closeBtn = document.getElementById("close");
const toggleBtn = document.getElementById("toggle-box");

let voices =[];

let selectedVoice;

const cards = [{title: "I'M THIRSTY", img: "/img/drink.jpg"}, {title: "I'M HUNGRY", img: "/img/food.jpg"}, {title: "I'M TIRED", img: "/img/tired.jpg"}, {title: "I'M HURT", img: "/img/hurt.jpg"}, {title: "I'M HAPPY", img: "/img/happy.jpg"}, {title: "I'M ANGRY", img: "/img/angry.jpg"}, {title: "I'M SAD", img: "/img/sad.jpg"}, {title: "I'm SCARED", img: "/img/scared.jpg"}, {title: "I WANT TO GO OUTSIDE", img: "/img/outside.jpg"}, {title: "I WANT TO GO HOME", img: "/img/home.jpg"}, {title: "I WANT TO GO TO SCHOOL", img: "/img/school.jpg"}, {title: "I WANT TO GO TO GRANDMAS", img: "/img/grandma.jpg"}]

function displayCards(){
  let inner = "";
  for(const card of cards){
    inner += `<div class="card" onclick="readCard(this)">
    <img class="card-img" src="${card.img}" alt="card-image">
    <p class="card-title">${card.title}</p>
  </div>`
  }
  cardsDiv.innerHTML = inner;

}

displayCards();

function readCard(card){
  const text = card.children[1].innerHTML;
  console.log(text);
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = selectedVoice;
  synth.speak(utterThis);
}

async function populateVoiceList() {
  console.log(voices)
  function setSpeech() {
    return new Promise(
        function (resolve, reject) {
            let synth = window.speechSynthesis;
            let id;
  
            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }
    )
  }
  
  let s = setSpeech();
  await s.then((apiVoices) => voices = apiVoices);
  console.log(voices)
  for (const voice of voices) {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += ' — DEFAULT';
    }
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();

voiceSelect.onchange = function(){
  selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for (const voice of voices) {
    if (voice.name === selectedOption) {
      selectedVoice = voice;
    }
  }
}

readCustomText.onclick = function(){
  const customText = document.getElementById("custom-text");
  const utterThis = new SpeechSynthesisUtterance(customText.value);
  utterThis.voice = selectedVoice;
  synth.speak(utterThis);
}

toggleBtn.onclick = function(){
  const modal = document.getElementById("modal");
  console.log(modal.className)
  if(modal.className.includes("show")){
    modal.className = "hide"
  }else{
    console.log("show")
    modal.className = "show";
  }
}

closeBtn.onclick = function(){
  console.log("close")
  const modal = document.getElementById("modal");
  modal.className = "hide"
}