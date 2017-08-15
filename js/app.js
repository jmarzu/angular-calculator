var app = angular.module('calculator', []);

app.controller('CalcCtrl', function($scope) {
	$scope.output = "0";
	$scope.newNumber = true;
	$scope.pendingOperation = null;
	$scope.operationToken = "";
	$scope.runningTotal = null;
	$scope.pendingValue = null;
	$scope.lastOperation = null;

	var ADD = "adding";
  	var SUBTRACT = "subtracting";
  	var MULTIPLY = "multipling";
  	var DIVIDE = "dividing";

  	var ADD_TOKEN = "+";
  	var SUBTRACT_TOKEN = "-";
  	var MULTIPLY_TOKEN = "*";
  	var DIVIDE_TOKEN = "/";

	$scope.outputNumber = function(value) {
		if($scope.output == "0" || $scope.newNumber) {
			$scope.output = value;
			$scope.newNumber = false;
		} else {
			$scope.output += String(value);
		}
		$scope.pendingValue = parseInt($scope.output);
	};

	$scope.add = function() {
    if($scope.pendingValue) {  
      if($scope.runningTotal && $scope.pendingOperation == ADD ) {
        $scope.runningTotal += $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == SUBTRACT ) {
        $scope.runningTotal -= $scope.pendingValue;
      }
      else {
        $scope.runningTotal = $scope.pendingValue;
      }
    } 
    setOperationToken(ADD);
    setOutput(String($scope.runningTotal));
    $scope.pendingOperation = ADD;
    $scope.newNumber = true;
    $scope.pendingValue = null;
  };
  
  /*
  * Runs every time the subtract button is clicked.
  * If a number has been entered before the subtract
  * button was clicked we set the number as a pendingValue,
  * set subtract as a pendingOperation, and set the token. 
  * If no number was entered but an existing calculated
  * number is in the output display we subtract the last added
  * value from the total.
  */
  $scope.subtract = function() {
    if($scope.pendingValue) {
      if($scope.runningTotal && ($scope.pendingOperation == SUBTRACT) ) {
        $scope.runningTotal -= $scope.pendingValue;
      } else if($scope.runningTotal && $scope.pendingOperation == ADD ) {
        $scope.runningTotal += $scope.pendingValue;
      } else {
        $scope.runningTotal = $scope.pendingValue;
      }
    }
    setOperationToken(SUBTRACT);
    setOutput(String($scope.runningTotal));
    $scope.pendingOperation = SUBTRACT;
    $scope.newNumber = true;
    $scope.pendingValue = null;
  };

  $scope.multiply = function() {
  	if($scope.pendingValue) {
  		if($scope.runningTotal && ($scope.pendingOperation == MULTIPLY) ) {
  			$scope.runningTotal * $scope.pendingValue;
  		} else if ($scope.runningTotal && ($scope.pendingOperation == DIVIDE) ) {
  			$scope.runningTotal / $scope.pendingValue;
  		} else {
  			$scope.runningTotal = $scope.pendingValue;
  		}
  	}

  	setOperationToken(MULTIPLY);
  	setOutput(String($scope.runningTotal));
  	$scope.pendingOperation = MULTIPLY;
  	$scope.newNumber = true;
  	$scope.pendingValue = null;
  };

  $scope.divide = function() {
  	if($scope.pendingValue) {
  		if($scope.runningTotal && ($scope.pendingOperation == DIVIDE) ) {
  			$scope.runningTotal / $scope.pendingValue;
  		} else if ($scope.runningTotal && ($scope.pendingOperation == MULTIPLY) ) {
  			$scope.runningTotal * $scope.pendingValue;
  		} else {
  			$scope.runningTotal = $scope.pendingValue;
  		}
  	}

  	setOperationToken(DIVIDE);
  	setOutput(String($scope.runningTotal));
  	$scope.pendingOperation = DIVIDE;
  	$scope.newNumber = true;
  	$scope.pendingValue = null;
  };
  
  /*
  * Runs when the equals (=) button is clicked.
  * If a number has been entered before the equals
  * button was clicked we perform the calculation
  * based on the pendingOperation.
  * If no number was entered but an existing calculated
  * number is in the output display we repeat the last
  * operation. For example, if 8+2 was entered we will
  * continue to add 2 every time the equals button is clicked.
  */
  $scope.calculate = function() {
    if(!$scope.newNumber) {
      $scope.pendingValue = parseInt($scope.output);
      $scope.lastValue = $scope.pendingValue;
    } 
    if($scope.pendingOperation == ADD) {
      $scope.runningTotal += $scope.pendingValue;
      $scope.lastOperation = ADD;
    } else if($scope.pendingOperation == SUBTRACT) {
      $scope.runningTotal -= $scope.pendingValue;
      $scope.lastOperation = SUBTRACT;
    } else if($scope.pendingOperation == MULTIPLY) {
      $scope.runningTotal *= $scope.pendingValue;
      $scope.lastOperation = MULTIPLY;
    } else if($scope.pendingOperation == DIVIDE) {
      $scope.runningTotal /= $scope.pendingValue;
      $scope.lastOperation = DIVIDE;
    } else {
      if($scope.lastOperation) {
        if($scope.lastOperation == ADD) {
          if($scope.runningTotal) {
            $scope.runningTotal += $scope.lastValue;
          } else {
            $scope.runningTotal = 0;
          }
        } else if($scope.lastOperation == SUBTRACT) {
          if($scope.runningTotal) {
            $scope.runningTotal -= $scope.lastValue;
          } else {
            $scope.runningTotal = 0;
          }
        } else if($scope.lastOperation == MULTIPLY) {
          if($scope.runningTotal) {
            $scope.runningTotal * $scope.lastValue;
          } else {
            $scope.runningTotal = 0;
          }
        } else if($scope.lastOperation == DIVIDE) {
          if($scope.runningTotal) {
            $scope.runningTotal / $scope.lastValue;
          } else {
            $scope.runningTotal = 0;
          }
        } 
      } else {
        $scope.runningTotal = 0;
      }
    }
    setOutput($scope.runningTotal);
    setOperationToken();
    $scope.pendingOperation = null;
    $scope.pendingValue = null;
  };
  
  /* 
  * Initializes the appropriate values
  * when the clear button is clicked.
  */
  $scope.clear = function() {
    $scope.runningTotal = null;
    $scope.pendingValue = null;
    $scope.pendingOperation = null;
    setOutput("0");
  };
  
  /* 
  * Updates the display output and resets the
  * newNumber flag.
  */
  setOutput = function(outputString) {
    $scope.output = outputString;
    $scope.newNumber = true;
  };
  
  /* 
  * Sets the operation token to let the user know
  * what the pendingOperation is
  */
  setOperationToken = function(operation) {
    if(operation == ADD) {
      $scope.operationToken = ADD_TOKEN;
    } else if (operation == SUBTRACT) {
      $scope.operationToken = SUBTRACT_TOKEN;
    } else if (operation == MULTIPLY) {
      $scope.operationToken = MULTIPLY_TOKEN;
    } else if (operation == DIVIDE) {
    	$scope.operationToken = DIVIDE_TOKEN;
    } else {
    	$scope.operationToken = "";
    }
  };
  
  /* Converts a string to a number so we can
  * perform calculations. Simply multiplies
  * by one to do so
  */
  // toNumber = function(numberString) {
  //   var result = 0;
  //   if(numberString) {
  //     result = numberString*1;
  //   }
  //   return result;
  // };

	
});