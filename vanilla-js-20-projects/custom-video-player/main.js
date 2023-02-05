const media = document.getElementById("video");
const playPause = document.getElementById("play-pause");
const stop = document.getElementById("stop");
const timeBar = document.getElementById("time-bar");
const timeDigit = document.getElementById("time-digit");
const timeCursor = document.querySelector("#time-cursor");
const timeProgress = document.getElementById("time-progress");
const playedBar = document.querySelector("#time-progress div");

// play pause video
function playPauseVideo(){
  if(media.paused){
    playPause.className = "fa-solid fa-pause";
    media.play();
  }else{
    playPause.className = "fa-solid fa-play";
    media.pause();
  }
}
playPause.addEventListener('click', playPauseVideo);

// stop the video
function stopVideo(){
  media.pause();
  media.currentTime = 0;
  playPause.className = "fa-solid fa-play";
}
stop.addEventListener('click', stopVideo);

// update video time progress bar
function setTime(){
  const minutes = Math.floor(media.currentTime / 60);
  const seconds = Math.floor(media.currentTime - minutes * 60);

  const minutesValue = minutes.toString().padStart(2, '0');
  const secondsValue = seconds.toString().padStart(2, '0');

  timeDigit.innerHTML = `${minutesValue}:${secondsValue}`;

  timeBar.value = Math.floor((media.currentTime / media.duration) * 100);
  setCursor();
  
}
media.addEventListener('timeupdate', setTime);


// change time of the video by clicking on progress bar
function changeTimeBarValue(event){
  console.log("event.pageX -> ", event.pageX);
  console.log("this -> ", this)
  console.log("offset -> ", this.offsetLeft)
  let x = event.pageX - this.offsetLeft;
  console.log("x-> ", x);
  media.currentTime = Math.floor((x / this.offsetWidth) * media.duration);
  setCursor();
}
timeProgress.addEventListener('click', changeTimeBarValue, false);

// change time cursor
function setCursor(event){
  timeBar.value = (media.currentTime / media.duration) * 100;
  timeCursor.style.left = `${(media.currentTime / media.duration) * 100}%`;
  playedBar.style.width = `${(media.currentTime / media.duration) * 100}%`;
  console.log(timeCursor.style.left);
}