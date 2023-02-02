// // Allows to only display the numbers on the calculator

// let nbCollection = document.getElementsByClassName("btn btn-light waves-effect");
// let input = document.getElementById("input");

// let opeCollection = document.getElementsByClassName("operator btn btn-info");

// // When we press the AC button, input.value = 0
// let ac = document.getElementById("ac");
// ac.onclick = function() {
//     input.value = 0;
// }

// let calculation = "";

// // We stock the operators and the numbers in an only collection
// let opeAndNbCollection = Array();

// for (let i=0; i<opeCollection.length; i++) {
//     opeAndNbCollection.push(opeCollection[i]);
// }

// for (let i=0; i<nbCollection.length; i++) {
//     opeAndNbCollection.push(nbCollection[i]);
// }

// // When we press the operators button or the numbers button, their value is added to the calculation
// for (let i=0; i<opeAndNbCollection.length; i++) {
//     opeAndNbCollection[i].onclick = function() {
//         calculation += opeAndNbCollection[i].value;
//         input.value = calculation;
//     }
// }

// // When we press the equals button, the calculation is deleted
// let equal = document.getElementById("equal");
// equal.onclick = function() {
//     // calculation = "";
//     // input.value = 0;
//     console.log(calculation);

// }

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
    console.log("In the checkNextOperator function :_");
    console.log("calculation = " + calculation);
    console.log("indexOperator = " + indexOperator);
    let newCalculation = calculation.substr(indexOperator+1);
    console.log("newCalculation = " + newCalculation);
    let thereIsOtherOpe = -1;
    let operatorsArray = ["*", "/", "+", "-"];
    for (let i=0; i<operatorsArray.length; i++) {
        console.log(newCalculation.indexOf(operatorsArray[i]));
        if (newCalculation.indexOf(operatorsArray[i]) != -1) {
            thereIsOtherOpe = newCalculation.indexOf(operatorsArray[i]);;
            console.log("loop : thereIsOtherOpe = " + thereIsOtherOpe);
            break;
        }
    }
    if (thereIsOtherOpe != -1) {
        thereIsOtherOpe = calculation.substr(0,indexOperator+1).length + thereIsOtherOpe;
    }
    
    console.log("thereIsOtherOpe = " + thereIsOtherOpe);
    console.log("End of the function_");
    return thereIsOtherOpe;
}

// console.log(checkNextOperator(calculation, 3));

// Function which check if there is an ope before an ope
// Return -1 if there isn't an ope before this ope
// Return the index of the ope if there is an ope before this ope
function checkPreviousOperator(calculation, indexOperator) {
    // console.log("Calculation = " + calculation);
    let newCalculation = calculation.substr(0,indexOperator); 
    // console.log("Newcalculation = " + newCalculation);
    let thereIsOtherOpe = -1;
    let operatorsArray = ["*", "/", "+", "-"];
    for (let i=0; i<newCalculation.length; i++) {
        if (operatorsArray.includes(newCalculation[newCalculation.length -(i+1)])) {
            thereIsOtherOpe = newCalculation.length -(i+1);
            // console.log(newCalculation[newCalculation.length -(i+1)]);
            break;
        }
    }
    return thereIsOtherOpe;
}

// console.log(checkPreviousOperator(calculation, 12))

// Function which check if there is an ope * or /
// Return -1 if there isn't an ope * or /
// Return the index of the ope if there is an ope * or /
function checkMultOrDivOpe(calculation, fromIndex, toIndex) {
    // console.log("Calculation = " + calculation);
    let newCalculation1 = calculation.substr(0, toIndex); 
    // console.log("Newcalculation1 = " + newCalculation1);
    let newCalculation2 = newCalculation1.substr(fromIndex);
    // console.log("Newcalculation2 = " + newCalculation2);
    let thereIsOtherOpe = -1;
    let operatorsArray = ["*", "/"];
    for (let i=0; i<newCalculation2.length; i++) {
        if (operatorsArray.includes(newCalculation2[i])) {
            thereIsOtherOpe = i;
            // console.log(newCalculation2[i]);
            break;
        }
    }
    return thereIsOtherOpe;
}
// console.log(checkMultOrDivOpe(calculation, 0, 1));

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
    // console.log("Nb of operators = " + nbOfOpe);
    let result, theNextOpe, theCalculPart;
    if (nbOfOpe == 1) {
        // console.log("There is ONE operator");
        result = operation(calculation, findOperator(calculation), 0, calculation.length);
    }
    else {
        // console.log("There is MANY operators");
        while (nbOfOpe > 0) {
            if(nbOfOpe == 1) {
                // console.log("There is ONE ope :_")
                result = operation(calculation, findOperator(calculation), 0, calculation.length);
                // console.log("The result is : " + result);
                nbOfOpe -= 1;
            }
            else {
                // console.log("We search the next operator :_");
                theNextOpe = checkNextOperator(calculation, calculation.indexOf(findOperator(calculation)));
                // console.log("The next ope is at the index : " + theNextOpe);
                theCalculPart = calculation.substring(0,theNextOpe);
                // console.log("The part of the calculation is : " + theCalculPart);
                result = operation(theCalculPart, findOperator(theCalculPart),0,theCalculPart.length);
                // console.log("The result is : " + result);
                calculation = result.toString() + calculation.substr(theCalculPart.length,calculation.length);
                // console.log("The new calculation is : " + calculation);
                nbOfOpe -= 1;
                // console.log("The nb of operators is : " + nbOfOpe);
            }
            
        }
    }
    return result;
}

// console.log(countOperators(calculation));

// let calculation = "1+5.31561652*1*2-1";
// let calculation = "15.31561652*12*2-1";

// simpleCalcul test
// let result;
// let calculationPart;
let calculation = "12+5*1";
console.log("The calculation : " + calculation);
// console.log("res : " + simpleOperation(calculation))
// end test

let opeNbFromCalculation = countOperators(calculation);
console.log("The number of operators : " + opeNbFromCalculation);
let multDivOpeFromCalculation = countMultOrDivOpe(calculation);
console.log("The number of mult or div operators : " + multDivOpeFromCalculation);
let theNextOpe, thePreviousOpe, multOrDivOpeIndex;

// WHILE the number of ope > 0
// // while (opeNbFromCalculation > 0) {

    // IF there is ONE OPE > display result > end
    if (opeNbFromCalculation == 1) {
        console.log("There is ONE OPERATOR :_");
        result = operation(calculation, findOperator(calculation), 0, calculation.length);
        console.log("The result of the operation is : " + result);
        calculation = result;
        opeNbFromCalculation = 0;
    }
    // IF there is MANY OPE
    else {
        // CHECK if there is a DIV OR MULT OPE
        console.log("There is MANY OPERATORS :_");
        console.log("We check is there is an * or / ope :_");

        multOrDivOpeIndex = checkMultOrDivOpe(calculation,0,calculation.length);

        console.log("The index of the operator * or / : " + multOrDivOpeIndex);

        // IF there is NOT MULT OR DIV OPE > one calc > display result > end
        if (multOrDivOpeIndex == -1) {
            console.log("If there ISN'T an * or / ope :_");
            result = simpleOperation(calculation);
            calculation = result;
            opeNbFromCalculation = 0;
            console.log("The result of the operation is : " + result);
        }
        // IF there is AT LEAST ONE DIV OR MULT OPE
        else {
            // WHILE the number of div or mult ope > 0
            // while (multDivOpeFromCalculation > 0) {
                // CHECK if there is an ope BEFORE this one
                console.log("If THERE IS an * or / ope :_");
                console.log("We check if there is an other operator BEFORE this operator :_");    

                // IF there is NOT an ope BEFORE this one
                if (checkPreviousOperator(calculation,multOrDivOpeIndex) == -1) {
                    // SO, there is AT LEAST ONE ope AFTER this one > SELECT this ope

                    console.log("If THERE ISN'T an ope before this one, we check if there is an ope AFTER this one :_");
                    // There are MANY ope
                    // There is an * or / ope
                    // There isn't an ope before this * or / ope
                    // So, there is necessarily an ope after this one

                    theNextOpe = checkNextOperator(calculation,multOrDivOpeIndex);

                    console.log("Index of the next operator : " + theNextOpe);

                    // SELECT the part of the calc from 0 to theNextOpe > DO A CALCULATION
                    console.log("We select a part of the calculation from the beggining to the index of the next ope -1 :_");

                    calculationPart = calculation.substr(0,theNextOpe);

                    console.log("The part of the calculation : " + calculationPart);

                    result = operation(calculationPart, findOperator(calculationPart), 0, calculationPart.length);

                    console.log("We do the operation and the result is : " + result);

                    calculation = result + calculation.substring(calculationPart.length, calculation.length);

                    console.log("The new calculation : " + calculation);

                    opeNbFromCalculation -= 1;
                    console.log("Number of operators : " + opeNbFromCalculation);
                    multDivOpeFromCalculation -= 1;
                    console.log("The number of mult or div operators : " + multDivOpeFromCalculation);
                }
                // IF there is AT LEAST ONE ope before this one
                else {
                    // SELECT this ope
                    console.log("If there is an ope before this ope :_");

                    thePreviousOpe = checkPreviousOperator(calculation, multOrDivOpeIndex);

                    console.log("Index of the previous operator : " + thePreviousOpe);

                    // CHECK if there is AT LEAST ONE ope after this one
                    console.log("We check if there is an other ope after this ope :_");

                    // calculationPart = calculation.substring(multDivOpeFromCalculation+1,calculation.length);

                    // console.log("calculationPart = " + calculationPart);

                    theNextOpe = checkNextOperator(calculation, multOrDivOpeIndex);

                    console.log("Index of the next operator :  " + theNextOpe);

                    // IF there is NOT an ope AFTER this one > SELECT a part of the calculation from thePreviousOpe+1 to the end > DO THE CALCULATION
                    if (theNextOpe == -1) {
                        console.log("Is there isn't an ope after this ope :_");
                        console.log("We select a part of the calculation from thePreviousOpe+1 to the end");

                        calculationPart = calculation.substring(thePreviousOpe+1,calculation.length);

                        console.log("The part of the calculation : " + calculationPart);

                        result = operation(calculationPart, findOperator(calculationPart), 0, calculationPart.length);

                        console.log("We do the operation and the result is : " + result);

                        calculation = calculation.substring(0,multOrDivOpeIndex-1) + result.toString();

                        console.log("The new calculation : " + calculation);

                        opeNbFromCalculation -= 1;
                        console.log("Number of operators : " + opeNbFromCalculation);
                        multDivOpeFromCalculation -= 1;
                        console.log("The number of mult or div operators : " + multDivOpeFromCalculation);
                    }
                    // IF there is AT LEAST ONE ope AFTER this one > SELECT a part of the calculation from thePreviousOpe+1 to theNextOpe > DO THE CALCULATION
                    else {
                        console.log("If there is an ope after this one :_");
                        console.log("We select a part of the calculation from thePreviousOpe+1 to theNextOpe");
                        
                        calculationPart = calculation.substring(thePreviousOpe+1,theNextOpe);
                    }
                    
                    
                    
                }
            // }
        }
    }
// }
console.log("end");


