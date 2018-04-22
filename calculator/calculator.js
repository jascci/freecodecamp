var INPUT = [];

function clearArray(array) {
  while ( array.length > 0 ) {
    array.pop();
  }
}

function updateHistoryText(val)  {
  var hist = $("#historyText").val();
  $("#historyText").val(hist + val);  
}

function calculate() {
  var curDigit = '';
  var expression = INPUT.reduce((acc, curVal, currentIndex, array) => {
    var re = /[0-9.]/
    if (re.test(curVal)) {
      curDigit += curVal;
      console.log(`curVal is ${curVal}`);
    } else {
      //console.log(`curDigit = ${curDigit}`);
      var operand = parseFloat(curDigit);
      //console.log(`operand = ${operand}`);
      var operator = curVal;
      acc.push(operand);
      acc.push(operator)
      curDigit = '';
    }
    return acc;
  },[]);
  console.log(`expression is ${expression}`);

  /* Order of operation: Perform all multiplications/divisions first, from left to right,
     before additions/subtractions */
  var multiDivIndex = expression.findIndex(function(elem) {
    return /[x/]/.test(elem);
  });
  
  while (multiDivIndex != -1)  {
    var operator = expression[multiDivIndex];
    var left = expression[multiDivIndex-1];
    var right = expression[multiDivIndex+1];
    var newValue;
    if (operator == 'x') {
      newValue = left * right;
    } else {
      newValue = left / right;
    }
    expression.splice(multiDivIndex-1, 3, newValue);
    multiDivIndex = expression.findIndex(function(elem) {
      return /[x/]/.test(elem);
    });
  }
  console.log(`expression post mult/div is ${expression}`);
  
  // Perform additions/subtractions
  var skip = false;
  var result = expression.reduce((accumulator, currentValue, currentIndex, array) => {
    if (currentValue == '+') {
      accumulator += array[currentIndex+1];
      skip = true;
    } else if (currentValue == '-') {
      accumulator -= array[currentIndex+1];
      skip = true;       
    } else if ( skip == false ) {
      accumulator += currentValue;
    } else if ( currentValue == '=' ) {
      return accumulator;
    }    
    return accumulator;
  });
  
  console.log(`result = ${result}`);
  $("#inputText").val(result);
  INPUT.push(result);
  $("#historyText").val(INPUT.join(''));

  //empty INPUT array
  clearArray(INPUT);
  INPUT.push(result);
  console.log(`INPUT array cleared and pushed ${result} on to it.  Current length is `+ INPUT.length);
};

$(document).ready(function() {
  // init
  INPUT = [];
  $("#inputText").val('0');
  $("#historyText").val('0');  
  
  $("button").click(function(event) {   
    var name = $(event.target).closest('button').data('name');
    console.log(`name = ${name}`);
    
    if (name == 'AC')  {
      clearArray(INPUT);
      $("#inputText").val('0');
      $("#historyText").val('0');
      return;
    }
    
    if (name == 'CE')  {
      var lastIndex;
      var j = INPUT.length - 1;
      for ( ; j > 0 ; j-- )  {
        var re_a = /[0-9.]/;
        if (re_a.test(INPUT[j]) == false) {
          lastIndex = j;
          break;
        }
      }
      console.log(`lastIndex = ${lastIndex}`);
      var tmp = INPUT.slice(0, lastIndex + 1);
      INPUT = tmp;
      $("#historyText").val(INPUT.join(''));
      return;
    }
    
    var re_b = /^[+-/x=]$/;
    // Prepend '.' with 0 if the integer number is implied to be 0. 
    if ( name == '.' && (INPUT.length == 0 || re_b.test(INPUT[INPUT.length-1])))  {
      INPUT.push('0');
    }
    
    // Return if an operator is repeatedly clicked.
    // Return if an operator is first clicked without an operand.
    if ( re_b.test(name) && (INPUT.length == 0 || re_b.test(INPUT[INPUT.length-1]))) {
      return;
    }
    
    // Return if '=' is clicked with incomplete expression.
    if ( name == '=' && INPUT.length == 1 )  {
      return;
    }
    
    // if '+/-' is pressed, change the sign of the last input.
    if ( name == '!' )  {
      var last = INPUT.pop();
      name = last * -1;
    }
    
    INPUT.push(name);
    $("#inputText").val(name);
    $("#historyText").val(INPUT.join(''));
    if (name == '=')  {
      calculate();    
    }
  });
});
