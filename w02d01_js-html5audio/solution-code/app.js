// window.addEventListener("DOMContentLoaded", function(event) {
//
//   var audio = document.getElementById("audio");
//   audio.src = "http://soundbible.com/mp3/Audience_Applause-Matthiew11-1206899159.mp3";
//   audio.play();
//
// });

function init(){
  var playButton = document.getElementById("play");
  playButton.addEventListener("click", play);
}

function play(){
  var audio = document.getElementById("audio");
  audio.src = "http://soundbible.com/mp3/Audience_Applause-Matthiew11-1206899159.mp3";
  audio.play();
}

window.addEventListener("DOMContentLoaded", init);
