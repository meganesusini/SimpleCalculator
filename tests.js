// Calculation test
// 1+1 = 2
// 1*2 = 2
// 1+1*2 = 3
// 1*3+1 = 4
// 1+2+3 = 6
// 1*2*3 = 6
// 12+10*10 = 112
// 12*12-10 = 134
// 10*11*21/2 = 1155

let input = document.getElementById("input"); // select the input (display of the result)

let calculation = ""; // typeof calculation > string
let calculationArray; // typeof calculationArray > array()

let nbCollection = document.getElementsByClassName("btn btn-light waves-effect"); // select the numbers
let opeCollection = document.getElementsByClassName("operator btn btn-info"); // select the operators

// We stock the operators and the numbers in an only collection
let opeAndNbCollection = Array();

for (let i=0; i<opeCollection.length; i++) {
    opeAndNbCollection.push(opeCollection[i]);
}

for (let i=0; i<nbCollection.length; i++) {
    opeAndNbCollection.push(nbCollection[i]);
}
//***//

// When we press the AC button, input.value = 0 and calculation = ""
let ac = document.getElementById("ac");
ac.onclick = function() {
    input.value = 0;
    calculation = "";
}

// When we press the point button, this value is added to the calculation
let point = document.getElementById("point");
point.onclick = function() {
    if (calculation[calculation.length-1] != ".") {
        calculation += point.value.toString();
        input.value = calculation;
    }
}

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

// When we press the equals button, we do the calculation > the result is displayed > then, calculation = ""
let equal = document.getElementById("equal");
let theResult;
equal.onclick = function() {
    console.log("Calculation = " + calculation);
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
    let newCalculation = calculation.substr(indexOperator+1); // select a part of the calculation from indexOperator+1 to the end
    let thereIsOtherOpe = -1;
    let operatorsArray = ["*", "/", "+", "-"];
    for (let i=0; i<operatorsArray.length; i++) { // for each ope 
        if (newCalculation.indexOf(operatorsArray[i]) != -1) { // if there is an other ope after this one
            thereIsOtherOpe = newCalculation.indexOf(operatorsArray[i]); // select the index of this other ope
            break;
        }
    }
    if (thereIsOtherOpe != -1) { // if there is an other ope
        thereIsOtherOpe = calculation.substr(0,indexOperator+1).length + thereIsOtherOpe; // we recalculate the index of the other ope according to the entire calculation
    }
    
    return thereIsOtherOpe;
}

// function checkNextOperator(calculation, indexOperator) {
//     let newCalculation = calculation.substr(indexOperator+1);
//     let thereIsOtherOpe = -1;
    
//     if (["*", "/", "+", "-"].includes(findOperator(newCalculation))) { // if there is an other ope after this one
//         thereIsOtherOpe = newCalculation.indexOf(findOperator(newCalculation));;
//     }
//     if (thereIsOtherOpe != -1) {
//         thereIsOtherOpe = calculation.substr(0,indexOperator+1).length + thereIsOtherOpe;
//     }
    
//     return thereIsOtherOpe;
// }


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

// console.log("Calculation = " + calculation);

function calculate(calculation) {
    let opeNbFromCalculation = countOperators(calculation);
    console.log("Number of operators = " + opeNbFromCalculation);

    let multDivOpeFromCalculation = countMultOrDivOpe(calculation);
    console.log("Number of mult or div operators = " + multDivOpeFromCalculation);

    let theNextOpe, thePreviousOpe, multOrDivOpeIndex;

    // WHILE the number of ope > 0
    while (opeNbFromCalculation > 0) {
        console.log("WHILE 1");

        // IF there is ONE OPE > display result > end
        if (opeNbFromCalculation == 1) {
            console.log("There is ONE OPE :_");
            result = operation(calculation, findOperator(calculation), 0, calculation.length);
            console.log("The result of the operation is : " + result);
            calculation = result;
            opeNbFromCalculation = 0;
        }
        // IF there is MANY OPE
        else {
            console.log("There is MANY OPE :_");
            // CHECK if there is a DIV OR MULT OPE
            multOrDivOpeIndex = checkMultOrDivOpe(calculation,0,calculation.length);
            console.log("INDEX of the mult or div ope = " + multOrDivOpeIndex);

            // IF there is NOT MULT OR DIV OPE > one calc > display result > end
            if (multOrDivOpeIndex == -1) {
                console.log("There is NOT mult or div ope :_");
                result = simpleOperation(calculation);
                calculation = result;
                opeNbFromCalculation = 0;
                console.log("The result of the operation is : " + result);
            }
            // IF there is AT LEAST ONE DIV OR MULT OPE
            else {
                console.log("There is AS LEAST ONE div or mult ope :_");
                // WHILE the number of div or mult ope > 0
                while (opeNbFromCalculation > 1) {
                    console.log("WHILE 2");
                    // CHECK if there is an ope BEFORE this one
                    thePreviousOpe = checkPreviousOperator(calculation,multOrDivOpeIndex);
                    console.log("Index of thePreviousOpe = " + thePreviousOpe);

                    // IF there is NOT an ope BEFORE this one
                    if (thePreviousOpe == -1) {
                        console.log("There is NOT ope BEFORE this one :_");
                        // SO, there is AT LEAST ONE ope AFTER this one > SELECT this ope

                        theNextOpe = checkNextOperator(calculation,multOrDivOpeIndex);
                        console.log("Index of theNextOpe = " + theNextOpe);

                        // SELECT the part of the calc from 0 to theNextOpe > DO A CALCULATION
                        console.log("There is necessarily AT LEAST ONE ope AFTER this one :_");
                        
                        calculationPart = calculation.substring(0,theNextOpe);
                        console.log("We select a part of the calculation which is : " + calculationPart);

                        result = operation(calculationPart, findOperator(calculationPart), 0, calculationPart.length);

                        console.log("The result is : " + result);

                        calculation = result + calculation.substring(calculationPart.length, calculation.length);
                        console.log("The new calculation is : " + calculation);

                        opeNbFromCalculation -= 1;
                        console.log("Number of ope = " + opeNbFromCalculation);

                        multDivOpeFromCalculation -= 1;
                        console.log("Number of * or / ope = " + multDivOpeFromCalculation);
                    }
                    // IF there is AT LEAST ONE ope before this one
                    else {
                        console.log("There is AT LEAST ONE ope BEFORE this one :_");
                        // SELECT this ope
                        thePreviousOpe = checkPreviousOperator(calculation, multOrDivOpeIndex);
                        console.log("Index of thePreviousOpe = " + thePreviousOpe);

                        // CHECK if there is AT LEAST ONE ope after this one
                        theNextOpe = checkNextOperator(calculation, multOrDivOpeIndex);
                        console.log("Index of theNextOpe = " + theNextOpe);

                        // IF there is NOT an ope AFTER this one > SELECT a part of the calculation from thePreviousOpe+1 to the end > DO THE CALCULATION
                        if (theNextOpe == -1) {
                            console.log("There is NOT ope AFTER this one :_");

                            calculationPart = calculation.substring(thePreviousOpe+1,calculation.length);
                            console.log("We select a part of the calculation which is : " + calculationPart);

                            result = operation(calculationPart, findOperator(calculationPart), 0, calculationPart.length);

                            console.log("The result is : " + result);

                            calculation = calculation.substring(0,multOrDivOpeIndex-1) + result.toString();
                            console.log("The new calculation is : " + calculation);

                            opeNbFromCalculation -= 1;
                            console.log("Number of ope = " + opeNbFromCalculation);

                            multDivOpeFromCalculation -= 1;
                            console.log("Number of * or / ope = " + multDivOpeFromCalculation);
                        }
                        // IF there is AT LEAST ONE ope AFTER this one > SELECT a part of the calculation from thePreviousOpe+1 to theNextOpe > DO THE CALCULATION
                        else {
                            console.log("There is AT LEAST ONE ope AFTER this one :_");

                            calculationPart = calculation.substring(thePreviousOpe+1,theNextOpe);
                            console.log("We select a part of the calculation which is : " + calculationPart);

                            result = operation(calculationPart, findOperator(calculationPart), 0, calculationPart.length);

                            console.log("The result is : " + result);

                            calculation = calculation.substring(0,multOrDivOpeIndex-1) + result.toString() + calculation.substring(theNextOpe, calculation.length);
                            console.log("The new calculation is : " + calculation);

                            opeNbFromCalculation -= 1;
                            console.log("Number of ope = " + opeNbFromCalculation);

                            multDivOpeFromCalculation -= 1;
                            console.log("Number of * or / ope = " + multDivOpeFromCalculation);
                        }
                        
                    }
                }
            }
        }
    }
    console.log("THE RESULT IS : " + result);
    return result;
}

