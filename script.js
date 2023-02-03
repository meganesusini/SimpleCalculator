// Allows to only display the numbers on the calculator

let nbCollection = document.getElementsByClassName("btn btn-light waves-effect");
let input = document.getElementById("input");

let opeCollection = document.getElementsByClassName("operator btn btn-info");

// When we press the AC button, input.value = 0
let ac = document.getElementById("ac");
ac.onclick = function() {
    input.value = 0;
}

// When we press the point button, this value is added to the calculation
let point = document.getElementById("point");
point.onclick = function() {
    if (calculation[calculation.length-1] != ".") {
        calculation += point.value.toString();
        input.value = calculation;
    }
}

let calculation = "";

// We stock the operators and the numbers in an only collection
let opeAndNbCollection = Array();

for (let i=0; i<opeCollection.length; i++) {
    opeAndNbCollection.push(opeCollection[i]);
}

for (let i=0; i<nbCollection.length; i++) {
    opeAndNbCollection.push(nbCollection[i]);
}

let calculationArray;
// When we press the operators button or the numbers button, their value is added to the calculation
for (let i=0; i<opeAndNbCollection.length; i++) {
    opeAndNbCollection[i].onclick = function() {
        // If the button pressed is an ope > check if there is not an other ope at the end of the calculation
        if (["+","-","*","/"].includes(opeAndNbCollection[i].value)) {
            // If there is an ope at the end of the calculation > replace the previous ope by the new one
            if (["+","-","*","/"].includes(calculation[calculation.length-1])) {
                calculationArray = calculation.split("");
                calculationArray[calculationArray.length-1] = opeAndNbCollection[i].value.toString();
                calculation = calculationArray.join("");
                input.value = calculation;
            }
            else {
                calculation += opeAndNbCollection[i].value.toString();
                input.value = calculation;
            }
        }
        else {
            calculation += opeAndNbCollection[i].value.toString();
            input.value = calculation;
        }
        
    }
}

// When we press the equals button, we do the calculation > the result is displayed
let equal = document.getElementById("equal");
let theResult;
equal.onclick = function() {
    theResult = calculate(calculation);
    input.value = theResult;
    calculation = "";
}

// function add
function add(nb1,nb2) {
    return (parseFloat(nb1)+parseFloat(nb2));
}

// function sub
function sub(nb1,nb2) {
    return (parseFloat(nb1)-parseFloat(nb2));
}

// function mult
function mult(nb1,nb2) {
    return (parseFloat(nb1)*parseFloat(nb2));
}

// function div
function div(nb1,nb2) {
    return (parseFloat(nb1)/parseFloat(nb2));
}

// function which do the operation
function operation(calculation, operator, fromIndex, toIndex) {
    let opeIndex = calculation.indexOf(operator);
    let result = 0;
    if (operator == "+") {
        result = add(calculation.substr(fromIndex,opeIndex), calculation.substr(opeIndex+1,toIndex));
    }
    else if (operator == "-") {
        result = sub(calculation.substr(fromIndex,opeIndex), calculation.substr(opeIndex+1,toIndex));
    }
    else if (operator == "*") {
        result = mult(calculation.substr(fromIndex,opeIndex), calculation.substr(opeIndex+1,toIndex));
    }
    else {
        result = div(calculation.substr(fromIndex,opeIndex), calculation.substr(opeIndex+1,toIndex));
    }
    return Math.round(result*10000)/10000;
}



// Function which check if there is an ope after an ope
// Return -1 if there isn't an ope after this ope
// Return the index of the ope if there is an ope after this ope
function checkNextOperator(calculation, indexOperator) {
    let newCalculation = calculation.substr(indexOperator+1);
    let thereIsOtherOpe = -1;
    let operatorsArray = ["*", "/", "+", "-"];
    for (let i=0; i<operatorsArray.length; i++) {
        if (newCalculation.indexOf(operatorsArray[i]) != -1) {
            thereIsOtherOpe = newCalculation.indexOf(operatorsArray[i]);;
            break;
        }
    }
    if (thereIsOtherOpe != -1) {
        thereIsOtherOpe = calculation.substr(0,indexOperator+1).length + thereIsOtherOpe;
    }
    
    return thereIsOtherOpe;
}


// Function which check if there is an ope before an ope
// Return -1 if there isn't an ope before this ope
// Return the index of the ope if there is an ope before this ope
function checkPreviousOperator(calculation, indexOperator) {
    let newCalculation = calculation.substr(0,indexOperator); 
    let thereIsOtherOpe = -1;
    let operatorsArray = ["*", "/", "+", "-"];
    for (let i=0; i<newCalculation.length; i++) {
        if (operatorsArray.includes(newCalculation[newCalculation.length -(i+1)])) {
            thereIsOtherOpe = newCalculation.length -(i+1);
            break;
        }
    }
    return thereIsOtherOpe;
}

// Function which check if there is an ope * or /
// Return -1 if there isn't an ope * or /
// Return the index of the ope if there is an ope * or /
function checkMultOrDivOpe(calculation, fromIndex, toIndex) {
    let newCalculation1 = calculation.substr(0, toIndex); 
    let newCalculation2 = newCalculation1.substr(fromIndex);
    let thereIsOtherOpe = -1;
    let operatorsArray = ["*", "/"];
    for (let i=0; i<newCalculation2.length; i++) {
        if (operatorsArray.includes(newCalculation2[i])) {
            thereIsOtherOpe = i;
            break;
        }
    }
    return thereIsOtherOpe;
}

// Function which count how many operators there are
function countOperators(calculation) {
    let opeNb = 0;
    let operatorsArray = ["*", "/", "+", "-"];
    for (let i=0; i<calculation.length; i++) {
        if (operatorsArray.includes(calculation[i])) {
            opeNb += 1;
        }
    }
    return opeNb;
}

// Function which finds an operator -> return the operator symbol
function findOperator(calculation) {
    let operatorsArray = ["*", "/", "+", "-"];
    for (let i=0; i<calculation.length; i++) {
        if (operatorsArray.includes(calculation[i])) {
            return calculation[i];
        }
    }
}

// Function which count the * or / operators
function countMultOrDivOpe(calculation) {
    let nb = 0;
    let operatorsArray = ["*", "/"];
    for (let i=0; i<calculation.length; i++) {
        if (operatorsArray.includes(calculation[i])) {
            nb += 1;
        }
    }
    return nb;
}

// Function which calculate from left to right
function simpleOperation(calculation) {
    let nbOfOpe = countOperators(calculation);
    let result, theNextOpe, theCalculPart;
    if (nbOfOpe == 1) {
        result = operation(calculation, findOperator(calculation), 0, calculation.length);
    }
    else {
        while (nbOfOpe > 0) {
            if(nbOfOpe == 1) {
                result = operation(calculation, findOperator(calculation), 0, calculation.length);
                nbOfOpe -= 1;
            }
            else {
                theNextOpe = checkNextOperator(calculation, calculation.indexOf(findOperator(calculation)));
                theCalculPart = calculation.substring(0,theNextOpe);
                result = operation(theCalculPart, findOperator(theCalculPart),0,theCalculPart.length);
                calculation = result.toString() + calculation.substr(theCalculPart.length,calculation.length);
                nbOfOpe -= 1;
            }
            
        }
    }
    return result;
}

// let calculation = "12.5+5*1/2";
// let opeNbFromCalculation, multDivOpeFromCalculation, theNextOpe, thePreviousOpe, multOrDivOpeIndex;
function calculate(calculation) {
    let opeNbFromCalculation = countOperators(calculation);
    let multDivOpeFromCalculation = countMultOrDivOpe(calculation);
    let theNextOpe, thePreviousOpe, multOrDivOpeIndex;

    // WHILE the number of ope > 0
    while (opeNbFromCalculation > 0) {

        // IF there is ONE OPE > display result > end
        if (opeNbFromCalculation == 1) {
            result = operation(calculation, findOperator(calculation), 0, calculation.length);
            console.log("The result of the operation is : " + result);
            calculation = result;
            opeNbFromCalculation = 0;
        }
        // IF there is MANY OPE
        else {
            // CHECK if there is a DIV OR MULT OPE
            multOrDivOpeIndex = checkMultOrDivOpe(calculation,0,calculation.length);

            // IF there is NOT MULT OR DIV OPE > one calc > display result > end
            if (multOrDivOpeIndex == -1) {
                result = simpleOperation(calculation);
                calculation = result;
                opeNbFromCalculation = 0;
                console.log("The result of the operation is : " + result);
            }
            // IF there is AT LEAST ONE DIV OR MULT OPE
            else {
                // WHILE the number of div or mult ope > 0
                while (multDivOpeFromCalculation > 0) {
                    // CHECK if there is an ope BEFORE this one

                    // IF there is NOT an ope BEFORE this one
                    if (checkPreviousOperator(calculation,multOrDivOpeIndex) == -1) {
                        // SO, there is AT LEAST ONE ope AFTER this one > SELECT this ope

                        theNextOpe = checkNextOperator(calculation,multOrDivOpeIndex);

                        // SELECT the part of the calc from 0 to theNextOpe > DO A CALCULATION

                        calculationPart = calculation.substring(0,theNextOpe);

                        result = operation(calculationPart, findOperator(calculationPart), 0, calculationPart.length);

                        console.log("The result is : " + result);

                        calculation = result + calculation.substring(calculationPart.length, calculation.length);

                        opeNbFromCalculation -= 1;
                        multDivOpeFromCalculation -= 1;
                    }
                    // IF there is AT LEAST ONE ope before this one
                    else {
                        // SELECT this ope
                        thePreviousOpe = checkPreviousOperator(calculation, multOrDivOpeIndex);

                        // CHECK if there is AT LEAST ONE ope after this one
                        theNextOpe = checkNextOperator(calculation, multOrDivOpeIndex);

                        // IF there is NOT an ope AFTER this one > SELECT a part of the calculation from thePreviousOpe+1 to the end > DO THE CALCULATION
                        if (theNextOpe == -1) {

                            calculationPart = calculation.substring(thePreviousOpe+1,calculation.length);

                            result = operation(calculationPart, findOperator(calculationPart), 0, calculationPart.length);

                            console.log("The result is : " + result);

                            calculation = calculation.substring(0,multOrDivOpeIndex-1) + result.toString();

                            opeNbFromCalculation -= 1;
                            multDivOpeFromCalculation -= 1;
                        }
                        // IF there is AT LEAST ONE ope AFTER this one > SELECT a part of the calculation from thePreviousOpe+1 to theNextOpe > DO THE CALCULATION
                        else {
                            
                            calculationPart = calculation.substring(thePreviousOpe+1,theNextOpe);

                            result = operation(calculationPart, findOperator(calculationPart), 0, calculationPart.length);

                            console.log("The result is : " + result);

                            calculation = calculation.substring(0,multOrDivOpeIndex-1) + result.toString() + calculation.substring(theNextOpe, calculation.length);

                            opeNbFromCalculation -= 1;
                            multDivOpeFromCalculation -= 1;
                        }
                        
                    }
                }
            }
        }
    }
    return result;
}

