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
    // console.log("index de l'opérateur + : " + opeIndex);
    let result = 0;
    if (operator == "+") {
        // console.log("test : calculation[0:1] --> " + calculation.substr(0,opeIndex));
        result = add(calculation.substr(fromIndex,opeIndex), calculation.substr(opeIndex+1,toIndex));
        // console.log("premier nb : " + calculation.substr(fromIndex,opeIndex));
        // console.log("deuxieme nb : " + calculation.substr(opeIndex+1,toIndex));
        // console.log("resultat : " + result);
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


// console.log("resultat : " + operation(calculation,"+",0,7));
// console.log("add des deux nb : " + add(1,531));

// Function which check if there is an ope after an ope
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
    thereIsOtherOpe = calculation.substr(0,indexOperator+1).length + thereIsOtherOpe;
    return thereIsOtherOpe;
}

// console.log(checkNextOperator(calculation, 3));

// Function which check if there is an ope before an ope
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

// Function which finds an operator
function findOperator(calculation) {
    let operatorsArray = ["*", "/", "+", "-"];
    for (let i=0; i<calculation.length; i++) {
        if (operatorsArray.includes(calculation[i])) {
            return calculation[i];
        }
    }
}

// console.log(countOperators(calculation));

// let calculation = "1+5.31561652*1*2-1";
let calculation = "15.31561652*12*2-1";
let result;
let calculationPart;
// let calculation = "1+5";
console.log("The calculation : " + calculation);

let opeNbFromCalculation = countOperators(calculation);
console.log("The number of operators : " + opeNbFromCalculation);

if (opeNbFromCalculation == 1) {
    console.log("Cas 1 -> résultat de l'opération" + operation(calculation, findOperator(calculation), 0, calculation.length));
}
else {
    console.log("Cas 2 :");
    let multOrDivOpe = checkMultOrDivOpe(calculation,0,calculation.length);
    console.log("The index of the operator * or / : " + multOrDivOpe);
    console.log("We check if there is an other operator before this operator :");
    if (checkPreviousOperator(calculation,multOrDivOpe) == -1) {
        console.log("If there isn't an ope before this one, we check if there is an ope after this one :");
        let theNextOpe = checkNextOperator(calculation,multOrDivOpe);
        console.log("Index of the next operator : " + theNextOpe);
        calculationPart = calculation.substr(0,theNextOpe);
        console.log("We select a part of the calculation : " + calculationPart);
        result = operation(calculationPart, findOperator(calculationPart), 0, calculationPart.length);
        console.log("We do the operation and the result is : " + result);
        calculation = result + calculation.substring(calculationPart.length, calculation.length);
        console.log("The new calculation : " + calculation);
    }
}

