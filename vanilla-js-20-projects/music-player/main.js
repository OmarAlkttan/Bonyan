const audio = document.getElementById("audio");

const play = document.getElementById("play");
const pause = document.getElementById("pause");

const next = document.getElementById("next");
const previous = document.getElementById("previous");

const spinner = document.getElementById("spinner");

const timer = document.getElementById("title-timer");

const title = document.getElementById("title");

const timeBar = document.getElementById("timer");

const songs = [{"name": "واحر قلباه", "url" : "/7r qlbah.mp3", "photo": "/7r qlbah.jpg"}, {"name": "ضادية ابن زيدون", "url": "/ibn zaydon.mp3", "photo": "/ibn zaydon.jpg"}, {"name": "عمر الفاروق", "url": "3mr.mp3", "photo": "/3mr.jpg"}];

let songCount = 0;

play.addEventListener('click',()=>{
  console.log(play.innerHTML)
  if(play.innerHTML.trim() == "play_arrow"){
    console.log("hey")
    playFun();
  }else{
    console.log("hello")
    pauseFun();
  }
});

function playFun(){
  audio.play();
  toggle = true;
  play.innerHTML = "pause";
  spinner.style.animation = 'rotateCircle 2s linear infinite';
  timer.style.transform = 'translateY(0)';
  title.innerHTML = songs[songCount]["name"];
}
next.addEventListener('click', nextFun);

function pauseFun(){
  audio.pause();
  play.innerHTML = "play_arrow"
  spinner.style.animation = "";
  timer.style.transform = 'translateY(3rem)';
  title.innerHTML = songs[songCount]["name"];
}
previous.addEventListener('click', previousFun);

function nextFun(){
  console.log(audio.paused);
  songCount = (songCount + 1) % 3;
  if(!audio.paused){
  audio.src = songs[songCount]["url"];
    playFun();
  }else{
  audio.src = songs[songCount]["url"];
  }
  
  console.log(audio.paused);
  title.innerHTML = songs[songCount]["name"];
  spinner.src = songs[songCount]["photo"];
}

function previousFun(){
  console.log(audio.paused);
  songCount = songCount == 0? (songs.length - 1) : (songCount- 1);
  songCount = songCount % 3;
  if(!audio.paused){
    audio.src = songs[songCount]["url"];
    playFun();
  }else{
    audio.src = songs[songCount]["url"];
  }
  title.innerHTML = songs[songCount]["name"];
  spinner.src = songs[songCount]["photo"];
}

// update video time progress bar
function setTime(){
  if(audio.currentTime == audio.duration){
    audio.currentTime = 0;
    pauseFun();
  }
  setCursor();
}
audio.addEventListener('timeupdate', setTime);


// change time of the video by clicking on progress bar
function changeTimeBarValue(event){
  const x = event.pageX - getOffsetLeft(this);
  audio.currentTime = Math.floor((x / this.offsetWidth) * audio.duration);
  setCursor();
}
timeBar.addEventListener('click', changeTimeBarValue, false);

// change time cursor
function setCursor(){
  const cursor = ((audio.currentTime / audio.duration) * 100).toFixed(0);
  timeBar.style.backgroundImage = `linear-gradient(90deg
    , pink 0%, pink ${cursor}%, white ${cursor}%, white 100%)`;
}


function getOffsetLeft( elem )
{
    var offsetLeft = 0;
    do {
      if ( !isNaN( elem.offsetLeft ) )
      {
          offsetLeft += elem.offsetLeft;
      }
    } while( elem = elem.offsetParent );
    return offsetLeft;
}