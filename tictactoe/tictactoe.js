var SESSION_ID;     // Game session ID
var IS_MACH_TURN;   // Flag to indicate if it's machine's turn to play
var HMAN_SYMBOL;    // Human symbol
var MACH_SYMBOL;    // Machine symbol
var GAMEBOARD;      // Game board table
var BOARD_LENGTH = 3;

function machPlay() {
  console.log("machine playing");
  var randX = Math.floor((Math.random() * 3));
  var randY = Math.floor((Math.random() * 3));
  while(typeof GAMEBOARD[randX][randY] !== 'undefined') {
    randX = Math.floor((Math.random() * 3));
    randY = Math.floor((Math.random() * 3));
  }
  
  GAMEBOARD[randX][randY] = MACH_SYMBOL;
  //$(".cell").find(`[data-position='{"x":${randX}, "y":${randY}}']`).html(MACH_SYMBOL);
  //var cell = $(".cell").find(`[data-x='0']`).html(MACH_SYMBOL); //[data-y='${randY}']`); //.html(MACH_SYMBOL);
  var cell = $(`button[data-x='${randX}'][data-y='${randY}']`).html(MACH_SYMBOL);
  //var cell = $('button[data-position={"x":0, "y":0}]').html(MACH_SYMBOL);
  if (cell.length > 0)  {
    console.log(`cell = ${cell}`);
  }
  console.log(`randX, randY = ${randX}, ${randY}`);
  IS_MACH_TURN = false;
}

function startGame() {
  console.log("playing game");
  if (IS_MACH_TURN)  {
    machPlay();
  }
}

function init() {
  $("#xoSelector").bootstrapSwitch({
    onSwitchChange: function(e, state) {
      console.log(`switch toggling: ${state}`);
      HMAN_SYMBOL  = (state ? 'X' : 'O' ); 
      MACH_SYMBOL  = (state ? 'O' : 'X');
    }
  });
  $("#xoSelector").bootstrapSwitch('state', true);
  
  IS_MACH_TURN = false;
  
  // Declare game board
  GAMEBOARD = new Array(BOARD_LENGTH);
  for (var i = 0; i < GAMEBOARD.length; i++) {
    GAMEBOARD[i] = new Array(BOARD_LENGTH);
  }  
}

function isAWin() {
  // horizontal
  for (var j = 0; j < BOARD_LENGTH; j++)  {
    if ( typeof GAMEBOARD[0][j] !== 'undefined' && 
         GAMEBOARD[0][j] == GAMEBOARD[1][j] &&
         GAMEBOARD[1][j] == GAMEBOARD[2][j] )  {
      return true;
    }
  }
  
  // vertical
  for (var i = 0; i < BOARD_LENGTH; i++)  {
    if ( typeof GAMEBOARD[i][0] !== 'undefined' && 
         GAMEBOARD[i][0] == GAMEBOARD[i][1] &&
         GAMEBOARD[i][1] == GAMEBOARD[i][2] )  {
      return true;
    }
  }
  
  // diagonal upper-left to down-right
  if ( typeof GAMEBOARD[0][0] !== 'undefined' && 
       GAMEBOARD[0][0] == GAMEBOARD[1][1] &&
       GAMEBOARD[1][1] == GAMEBOARD[2][2] ) {
    return true;
  }
  
  // diagonal upper-right to down-left
  if ( typeof GAMEBOARD[2][0] !== 'undefined' && 
       GAMEBOARD[2][0] == GAMEBOARD[1][1] &&
       GAMEBOARD[1][1] == GAMEBOARD[0][2] ) {
    return true;
  }
  
  return false;
}

$(document).ready(function() {
  init();
  
  $(".cell").click(function(event) {  
    if (IS_MACH_TURN) {
      return;
    }
    
    //var pos = $(this).data('position');
    var x = $(this).data('x');
    var y = $(this).data('y');
    console.log(`pos.x = ${x}`);
    console.log(`pos.y = ${y}`);
    
    if ( typeof GAMEBOARD[x][y] !== 'undefined' ) { 
      console.log("This cell is already occupied.");
      return; 
    }
    
    GAMEBOARD[x][y] = HMAN_SYMBOL;
    $(this).html(HMAN_SYMBOL);
    /*
    for(var i = 0; i < GAMEBOARD.length; i++) {
      for (var j = 0; j < GAMEBOARD[i].length; j++)  {
        console.log(`GAMEBOARD[${i}][${j}] = ${GAMEBOARD[i][j]}`);
      }
    }*/
    
    if (isAWin())  {
      console.log("You WIN!");
    }
    
    IS_MACH_TURN = true;
  });
       
  $("#startGame").click(function(event)  {
    
    SESSION_ID = setInterval(startGame, 1000);
  });

  $("#cancelGame").click(function(event)  {
    clearInterval(SESSION_ID);
    console.log("Game cancelled.");
  });

  

});
