$(document).ready(onClick);

function onClick() {
	var count = null; //Number of digits before a decimal point
	var indicator = false; // To test if screen is empty
	var prevNum = null;
	var currNum = 0;
	var tempNum = null;// Intermediate number
	var tempOp = null; // Intermediate operator
	var nextOp = null;
	var currOp = null; // Operation between prevNum and currNum

	$("#decimal").on("click", function(event) {
		if(count === null) {
			count = 0;
		}
		$("#cal").append(".");
	});

 	$(".num").on( "click", function(event) {
 		if(indicator) {
 			count = null; numInt = 0; prevNum = null; currNum = 0; tempNum = null; tempOp = null; nextOp = null; currOp = null; 
			$("#screen").html(0);
			$("#cal").html(' ');
			indicator = false;
 		}

 		if(count === null) {
 			currNum = currNum * 10 + parseInt(event.target.innerHTML);
 		}
 		if(count !== null) {
 			count++;
 			currNum = currNum  + parseInt(event.target.innerHTML) / Math.pow(10,count);	
 		} 
 		$("#cal").append(event.target.innerHTML);
	});

	$(".sym").on("click", function(event) {
		nextOp = event.target.innerHTML;
		$("#cal").append(' ' + nextOp + ' ');

		if(count !== null) {
			count = null;
		}

		if(currOp === null) {
			prevNum = currNum;
			currNum = 0;
			currOp = nextOp;
			return;			
		}	
		if(tempOp !== null) {
			currNum = calculate(tempOp, tempNum, currNum);
			tempNum = null;
			tempOp = null;
		}

		if(isAdditive(nextOp) || !isAdditive(currOp) || isEqual(nextOp)) {
			prevNum = calculate(currOp, prevNum, currNum);
			currOp = nextOp;
			currNum = 0;
			$("#screen").html(prevNum);
			if(prevNum.toString().length >= 10) {
				$('#screen').css({
					fontSize: '28px'
				});
			}			
			return;
		}
		// Multiplicative operation following an additive operation:
		tempNum = currNum; tempOp = nextOp; currNum = 0; nextOp = null;
	});

	$("#equal").on("click", function(event) {
		indicator = true;
		if(prevNum.toString().length >= 10) {
			$('#screen').css({
				fontSize: '24px'
			});
		}	
	});

	$("#clear").on("click", function() {
		count = null; numInt = 0; prevNum = null; currNum = 0; tempNum = null; tempOp = null; nextOp = null; currOp = null; 
		$("#screen").html(0);
		$("#cal").html(' ');
		indicator = false;
	});

}

function isEqual(operator) {
	return operator === "=";
}

function isAdditive(operator) {
	return operator === "+" || operator === "-";
}

function calculate(operator, x, y) {
	if(operator === "x") {
		return x * y;
	}
	if (operator === "÷") {
		return x / y;
	}
	if (operator === "+") {
		return x + y;
	}
	if (operator === "-") {
		return x - y;
	}
}
	

