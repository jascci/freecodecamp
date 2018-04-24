var SESSION_ID;     // Game session ID
var IS_MACH_TURN;   // Flag to indicate if it's machine's turn to play
var HMAN_SYMBOL;    // Human symbol
var MACH_SYMBOL;    // Machine symbol
var GAMEBOARD;      // Game board table
var BOARD_LENGTH = 3;
var FC;

function getEmptySquares(board)  {
  var emptySquares = [];
  for(var i = 0; i < BOARD_LENGTH; i++ )  {
    for(var j = 0; j < BOARD_LENGTH; j++ )  {
      if ( board[i][j] == '' )  {
        emptySquares.push({x:i, y:j});
      }
    }
  }
  return emptySquares;
}

function minimax(curBoard, curPlayer)  {
  FC++;
  var emptySquares = getEmptySquares(curBoard);

  // Check for terminal states: win, loss, tie
  if (isAWin(curBoard, MACH_SYMBOL))  {
    return {score:10};
  } else if (isAWin(curBoard, HMAN_SYMBOL))  {
    return {score:-10};
  } else if ( emptySquares.length == 0 )  {
    return {score: 0};
  }

  // Try out all the empty squares and subsequent scenarios
  var allMoves = [];
  for(var i = 0; i < emptySquares.length; i++ )  {
    // Set the empty square to the current player
    curBoard[emptySquares[i].x][emptySquares[i].y] = curPlayer;
    var move = {};
    move.x = emptySquares[i].x;
    move.y = emptySquares[i].y;
    var result;
    if ( curPlayer == MACH_SYMBOL )  {
      result = minimax(curBoard, HMAN_SYMBOL );
      
    } else {
      result = minimax(curBoard, MACH_SYMBOL );
    }
    move.score = result.score;

    // Reset the square to undefined
    curBoard[emptySquares[i].x][emptySquares[i].y] = '';
    allMoves.push(move);
  }

  // Select the best move according to the curPlayer:
  // if curPlayer is MACH, get the move with the highest score
  // if curPlayer is HMAN, get the move with the lowest score 
  var bestMoveIndex;
  if (curPlayer == MACH_SYMBOL)  {
    bestScore = -1000;
    for(var k = 0; k < allMoves.length; k++ ) {
      if ( allMoves[k].score > bestScore )  {
        bestMoveIndex = k;
        bestScore = allMoves[k].score;
      }
    }
  
    /*bestMove = allMoves.reduce(function(acc, curMove)  {
      if (curMove.score > acc.score)  {
        return curMove;
      } else {
        return acc;
      }
    }, {score:-1000});*/
  } else {
    bestScore = 1000;
    for(var k = 0; k < allMoves.length; k++ ) {
      if ( allMoves[k].score < bestScore )  {
        bestMoveIndex = k;
        bestScore = allMoves[k].score;
      }
    }

     /*bestMove = allMoves.reduce(function(acc, curMove)  {
      if (curMove.score < acc.score)  {
        return curMove;
      } else {
        return acc;
      }
    }, {score:1000});*/
  }

  return allMoves[bestMoveIndex];
}

function copy(origBoard)  {
  var copy =  new Array(origBoard.length);
  for(var i = 0; i < origBoard.length; i++)  {
    copy[i] = new Array(origBoard[i].length);
    for(var j = 0; j < origBoard[i].length; j++)  {
      copy[i][j] = origBoard[i][j];
    }
  }
  return copy;
}

function machPlay() {
  FC = 0;
  console.log("machine playing");
  var boardCopy = copy(GAMEBOARD);

  var bestMove = minimax(boardCopy, MACH_SYMBOL);
  var randX = bestMove.x;
  var randY = bestMove.y;
  console.log(`bestMove = ${bestMove.x} , ${bestMove.y}, ${bestMove.score}`);
  console.log(`function calls = ${FC}`);

  /*
  var randX = Math.floor((Math.random() * 3));
  var randY = Math.floor((Math.random() * 3));
  while(typeof GAMEBOARD[randX][randY] !== 'undefined') {
    randX = Math.floor((Math.random() * 3));
    randY = Math.floor((Math.random() * 3));
  }*/
  
  GAMEBOARD[randX][randY] = MACH_SYMBOL;
  var cell = $(`button[data-x='${randX}'][data-y='${randY}']`).html(MACH_SYMBOL);
  if (cell.length > 0)  {
    console.log(`cell = ${cell}`);
  }
  console.log(`randX, randY = ${randX}, ${randY}`);
  if(isAWin(GAMEBOARD, MACH_SYMBOL))  {
    console.log('MACH wins!');
  }
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
    for (var j = 0; j < BOARD_LENGTH; j++)  {
      GAMEBOARD[i][j] = '';
    }
  }  
}

function isAWin(board, symbol) {
  // horizontal
  for (var j = 0; j < BOARD_LENGTH; j++)  {
    if ( board[0][j] == symbol && board[1][j] == symbol && board[2][j] == symbol )  {
      return true;
    }
  }
  
  // vertical
  for (var i = 0; i < BOARD_LENGTH; i++)  {
    if ( board[i][0] == symbol && board[i][1] == symbol && board[i][2] == symbol )  {
      return true;
    }
  }
  
  // diagonal upper-left to down-right
  if ( board[0][0] == symbol && board[1][1] == symbol && board[2][2] == symbol) {
    return true;
  }
  
  // diagonal upper-right to down-left
  if ( board[2][0] == symbol && board[1][1] == symbol && board[0][2] == symbol) {
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
    
    var x = $(this).data('x');
    var y = $(this).data('y');
    console.log(`pos.x = ${x}`);
    console.log(`pos.y = ${y}`);
    
    if ( GAMEBOARD[x][y] != '' ) { 
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
