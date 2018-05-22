var NUM_CUR_STEPS;
var SESSION_ID;
var TIMER_ID;
var IS_SIMON_TURN;
var IS_HUMAN_TURN;
var SIMON_SERIES;
var HUMAN_SERIES;
var PLAYLIST;
var TUNE_MIN = 0;
var TUNE_MAX = 3;
/*var AUDIOS = [
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
];*/
var AUDIOS = [
  "https://cui.unige.ch/~chopard/joanna/simonGame/sound/xylophone-c.mp3",
  "https://cui.unige.ch/~chopard/joanna/simonGame/sound/xylophone-d.mp3",
  "https://cui.unige.ch/~chopard/joanna/simonGame/sound/xylophone-e.mp3",
  "https://cui.unige.ch/~chopard/joanna/simonGame/sound/xylophone-f.mp3",
  "https://cui.unige.ch/~chopard/joanna/simonGame/sound/xylophone-a.mp3",
  "https://cui.unige.ch/~chopard/joanna/simonGame/sound/xylophone-b.mp3",
  "https://cui.unige.ch/~chopard/joanna/simonGame/sound/xylophone-c2.mp3",
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

function replay() {
  clearArray(PLAYLIST);
  PLAYLIST = SIMON_SERIES.slice();
  console.log(`replaying PLAYLIST = ${PLAYLIST}`);
  playNext();
}

function checkInput() {
  // Beep if user input is too slow
  if ( arraysEqual(SIMON_SERIES, HUMAN_SERIES) ) {
    console.log("you got it right");
  } else {
    console.log("sorry, time out.");
  }
  clearTimeout(TIMER_ID);
}

function startGame() {
  console.log("playing game");
  if (IS_SIMON_TURN)  {
    // create random tune and append to the series
    var rand = getRandomTune();
    console.log(`rand = ${rand}`);
    SIMON_SERIES.push(rand);
   
    PLAYLIST = SIMON_SERIES.slice();
    console.log(`PLAYLIST = ${PLAYLIST}`);
    // play tune series
    playNext();


    IS_SIMON_TURN = false;
    // wait for human inputs, with a timeout
    TIMER_ID = setTimeout(checkInput, 15000);
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

function clearArray(array) {
  while (array.length) {
    array.pop();
  }
}

function init() {
  NUM_CUR_STEPS = 1;
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
    


    if (HUMAN_SERIES.length == SIMON_SERIES.length)  {
      clearTimeout(TIMER_ID);
      // check series
      if ( arraysEqual(SIMON_SERIES, HUMAN_SERIES) ) {
        console.log("you got it right");
        NUM_CUR_STEPS++;
        IS_SIMON_TURN = true;
        clearArray(HUMAN_SERIES);

      } else {
        console.log("wrong. try again");
        replay();
        clearArray(HUMAN_SERIES);
      }
    } else {
      // check for correctness up to the current input length
      for (var i = 0; i < HUMAN_SERIES.length; i++)  {
        if (HUMAN_SERIES[i] != SIMON_SERIES[i])  {
          console.log("wrong.  try again");
          replay();
          clearArray(HUMAN_SERIES);
        } 
      }

    }



  });

  $("#startGame").click(function(event)  {
    SESSION_ID = setInterval(startGame, 1000);
  });

  $("#cancelGame").click(function(event)  {
    clearInterval(SESSION_ID);
    console.log("Game cancelled.");
  });

  $("#test").click(function(event)  {
    $("#ripple_a1")
      //.velocity({ opacity: 1.0 }, "EaseInOutElastic")
      .velocity("transition.expandIn", { stagger: 300 })
      .velocity({ opacity: 0.0 });
    $("#ripple_b1")
      //.velocity({ opacity: 1.0 }, "EaseInOutElastic")
      .velocity("transition.expandIn", { stagger: 300 })
      .velocity({ opacity: 0.0 });

    $("#ripple_c1")
      //.velocity({ opacity: 1.0 }, "EaseInOutElastic")
      .velocity("transition.expandIn", { stagger: 300 })
      .velocity({ opacity: 0.0 });

    $("#ripple_d1")
      //.velocity({ opacity: 1.0 }, "EaseInOutElastic")
      .velocity("transition.expandIn", { stagger: 300 })
      .velocity({ opacity: 0.0 });

  });


  //$('#audioPlayer')[0].addEventListener("ended", function() {
  //  console.log("ended event listener");});
  $('#audioPlayer')[0].onended = function() {playNext()};
  //$('#audioPlayer').on("ended", function() {console.log("on ended");});
       
});

