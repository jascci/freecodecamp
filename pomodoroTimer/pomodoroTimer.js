var DURATION;     // Pomodoro session duration in seconds
var TIMER_ID;     // Windows interval/timeout id
var INCR;         // Delta increment for tomatometer animation
var RECT_DELTA_Y; // Current total accumulated translateY value (for reset)
var IS_TICKING;   // Flag to indicate whether timer is running or paused
var IS_BREAK;     // Flag to indicate if current session is a break or a pomodoro session
var IS_AUDIO_ON;  // Flag for the audio on/off
var AUDIO_CLIP;   // Variable for the bell audio clip
var RED_TOMATO_COLOR    = "#ff0000";
var GREEN_TOMATO_COLOR  = "#7cb342";

function rewindTomatometer(color) {
  // Set tomato color
  $("#fruitOutline").css({stroke: color}); 
  $("#fruitBody").css({fill: color}); 
  // Reposition white rect
  if ( RECT_DELTA_Y > 0 )  {
    $("#whiteRect").velocity({ 
      translateY: "+=" + RECT_DELTA_Y
      }, "easeOutExpo"); 
    RECT_DELTA_Y = 0;
  }
} 

function startTimer() {

  if ( DURATION < 0 )  {
    if (IS_AUDIO_ON)  {
      AUDIO_CLIP.play();
    }
    
    clearInterval(TIMER_ID);
    
    // Start break session once pom session is over
    if ( !IS_BREAK )  {
      rewindTomatometer(GREEN_TOMATO_COLOR);      
      DURATION = $("#breakKnob").val() * 60;
      TIMER_ID = setInterval(startTimer, 1000);
      IS_TICKING = true;
      IS_BREAK = true;
    // else reset tomatometer to starting point
    } else {
      rewindTomatometer(RED_TOMATO_COLOR);
      DURATION = undefined;
      IS_TICKING = false;
      IS_BREAK = false;
      $("#timerText").html('START');      
    }
  } else {
    var minutesLeft = Math.floor(DURATION/60);
    var secondsLeft = DURATION % 60;
    secondsLeft = secondsLeft.toString().padStart(2, '0');
    TIME_REMAINING = minutesLeft + ":" + secondsLeft;
  
    $("#timerText").html(`${minutesLeft}:${secondsLeft}`);
    $("#timeRemaining").html('');
    // animate tomatometer
    $("#whiteRect")
      .velocity({ 
        translateY: "-=" + INCR}, 
        "easeOutExpo");
    RECT_DELTA_Y += INCR;      
    DURATION -= 1; 
  }
}

/* Initialize all necessary vars
*/
function init() {
  IS_TICKING = false;
  IS_BREAK = false;
  RECT_DELTA_Y = 0;
    $('#pomodoroKnob').knob({
    'min': 0,
    'max': 60,
    'fgColor': 'red'
  });
  
  $('#breakKnob').knob({
    'min': 0,
    'max': 60,
    'fgColor': 'green'
  });
  
  $('[data-toggle="tooltip"]').tooltip({ container: 'body'});
  AUDIO_CLIP = $("#bellsound")[0];
  IS_AUDIO_ON = true;
}

$(document).ready(function() {
  
  init();
  
  $("#pomodoroTimer").click(function(event) {
    console.log('Timer clicked!');

    if ( IS_TICKING == false )  {
      // Start the timer first time
      if ( typeof DURATION === 'undefined' || DURATION < 0 ) {
        var duration = ( IS_BREAK ? $("#breakKnob").val() :     $("#pomodoroKnob").val() );
        DURATION = duration * 60;
        INCR = ($("#whiteRect").attr('height'))/DURATION;
      }
      TIMER_ID = setInterval(startTimer, 1000);
      IS_TICKING = true;
    } else {
      // Pause the timer
      $("#timerText").html('PAUSED');
      $("#timeRemaining").html(`${TIME_REMAINING}`);
      clearInterval(TIMER_ID);
      IS_TICKING = false;
    }

    // Cancel and reset if double-clicked
    $("#pomodoroTimer").dblclick(function(event) {
      rewindTomatometer(RED_TOMATO_COLOR);
      $("#timerText").html('START');
      $("#timeRemaining").html('');
      clearInterval(TIMER_ID);
      DURATION = undefined;      
      IS_TICKING = false;
      IS_BREAK = false;

    });

  });
  
  // Toggle audio option
  $("#myaudio").click(function(event) {
    if (IS_AUDIO_ON)  {
      $("#soundicon").removeClass('fa-volume-up').addClass('fa-volume-off');
      IS_AUDIO_ON = false;
    } else {
      $("#soundicon").removeClass('fa-volume-off').addClass('fa-volume-up');
      IS_AUDIO_ON = true;
    }
  });
});

