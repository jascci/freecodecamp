var NUM_CUR_STEPS;
var SESSION_ID;
var IS_SIMON_TURN;
var IS_HUMAN_TURN;
var TUNE_SERIES;
var TUNE_MIN = 1;
var TUNE_MAX = 4;

function playTune(tune)  {
  if ( tune == '1' )  {
    $('#audio1')[0].load()
    $('#audio1')[0].play();
    $('#audio1')[0].currentTime=0;
  } else if ( tune == '2' )  {
    $('#audio2')[0].load()
    $('#audio2')[0].play();
    $('#audio2')[0].currentTime=0;
  } else if ( tune == '3' )  {
    $('#audio3')[0].load()
    $('#audio3')[0].play();
    $('#audio3')[0].currentTime=0;
  } else if ( tune == '4' )  {
    $('#audio4')[0].load()
    $('#audio4')[0].play();
    $('#audio4')[0].currentTime=0;
  } 

}

function startGame() {
  console.log("playing game");
  if (IS_SIMON_TURN)  {
    // create random series
    for (var i=0; i < NUM_CUR_STEPS; i++)  {
      var rand = getRandomTune();
      console.log(`rand = ${rand}`);
      TUNE_SERIES.push(rand);
    }
    // play tune series
    var j = 0;
    while ( j < TUNE_SERIES.length )  {
      //var curAudio = $(`'audio[data-id]="${TUNE_SERIES[j]}"'`);
      var curAudio = $(`#audio${TUNE_SERIES[j]}`);
      console.log(`curAudio length = ${curAudio.length}`);
      /*
      curAudio.load()
      curAudio.play();
      curAudio.on("ended", function(){ 
        // next
        j++;
        curAudio.currentTime=0;
      });
      */
      j++;
    }
    /*TUNE_SERIES.forEach(function(tune)  {
      playTune(tune);
    });*/

    IS_SIMON_TURN = false;

  }
}

function getRandomTune() {
  min = Math.ceil(TUNE_MIN);
  max = Math.floor(TUNE_MAX);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function init() {
  NUM_CUR_STEPS = 5;
  IS_SIMON_TURN = true;
  TUNE_SERIES = [];
}

$(document).ready(function() {
  init();
  


  $("#redButton").click(function(event) {  
    var buttonColor = $(this).data('color');
    console.log(`color = ${buttonColor}`);
    $('#audio1')[0].load()
    $('#audio1')[0].play();
    //$('#audio1')[0].pause();
    $('#audio1')[0].currentTime=0;
  });
  $("#greenButton").click(function(event) {  
    var buttonColor = $(this).data('color');
    console.log(`color = ${buttonColor}`);
    $('#audio2')[0].load()
    $('#audio2')[0].play();
    $('#audio2')[0].currentTime=0;
  });
  $("#blueButton").click(function(event) {  
    var buttonColor = $(this).data('color');
    console.log(`color = ${buttonColor}`);
    $('#audio3')[0].load()
    $('#audio3')[0].play();
    $('#audio3')[0].currentTime=0;
  });
  $("#yellowButton").click(function(event) {  
    var buttonColor = $(this).data('color');
    console.log(`color = ${buttonColor}`);
    $('#audio4')[0].load()
    $('#audio4')[0].play();
    $('#audio4')[0].currentTime=0;
  });

  $("#startGame").click(function(event)  {
    SESSION_ID = setInterval(startGame, 1000);
  });

  $("#cancelGame").click(function(event)  {
    clearInterval(SESSION_ID);
    console.log("Game cancelled.");
  });

       
});

