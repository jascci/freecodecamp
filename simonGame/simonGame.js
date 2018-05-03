var NUM_CUR_STEPS;
var SESSION_ID;
var IS_SIMON_TURN;
var IS_HUMAN_TURN;
var SIMON_SERIES;
var HUMAN_SERIES;
var PLAYLIST;
var TUNE_MIN = 0;
var TUNE_MAX = 3;
var AUDIOS = [
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
];

function playNext() {
  console.log("audio ended.  playing next");
  if (PLAYLIST.length)  {
    var audioPlayer = $('#audioPlayer')[0];
    audioPlayer.src = AUDIOS[PLAYLIST.shift()];
    audioPlayer.load();
    audioPlayer.play();
  }
}

function checkInput() {
  // Beep if user input is too slow
  if ( arraysEqual(SIMON_SERIES, HUMAN_SERIES) ) {
    console.log("you got it right");
  } else {
    console.log("wrong. try again");
  }
  IS_SIMON_TURN = true;
  
}

function startGame() {
  console.log("playing game");
  if (IS_SIMON_TURN)  {
    // create random series
    for (var i=0; i < NUM_CUR_STEPS; i++)  {
      var rand = getRandomTune();
      console.log(`rand = ${rand}`);
      SIMON_SERIES.push(rand);
    }
    PLAYLIST = SIMON_SERIES.slice();
    console.log(`PLAYLIST = ${PLAYLIST}`);
    // play tune series
    playNext();


    IS_SIMON_TURN = false;
    // wait for human inputs, with a timeout
    setTimeout(checkInput, 10000);
  } else {


  }
}

function getRandomTune() {
  min = Math.ceil(TUNE_MIN);
  max = Math.floor(TUNE_MAX);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function init() {
  NUM_CUR_STEPS = 5;
  IS_SIMON_TURN = true;
  SIMON_SERIES = [];
  PLAYLIST = [];
  HUMAN_SERIES = [];
}

$(document).ready(function() {
  init();

  $(".cell").click(function(event) {  
    var pos = $(this).data('position');
    HUMAN_SERIES.push(pos);
    
    /*
    if (HUMAN_SERIES.length == SIMON_SERIES.length)  {
      // check series
      if ( arraysEqual(SIMON_SERIES, HUMAN_SERIES) ) {
        console.log("you got it right");
      } else {
        console.log("wrong. try again");
      }
      IS_SIMON_TURN = true;
    }*/
  });

  $("#startGame").click(function(event)  {
    SESSION_ID = setInterval(startGame, 1000);
  });

  $("#cancelGame").click(function(event)  {
    clearInterval(SESSION_ID);
    console.log("Game cancelled.");
  });

  //$('#audioPlayer')[0].addEventListener("ended", function() {
  //  console.log("ended event listener");});
  $('#audioPlayer')[0].onended = function() {playNext()};
  //$('#audioPlayer').on("ended", function() {console.log("on ended");});
       
});

