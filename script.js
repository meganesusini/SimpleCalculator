// Allows to only display the numbers on the calculator

let nbCollection = document.getElementsByClassName("btn btn-light waves-effect");
let input = document.getElementById("input");

let opeCollection = document.getElementsByClassName("operator btn btn-info");

// When we press the AC button, input.value = 0
let ac = document.getElementById("ac");
ac.onclick = function() {
    input.value = 0;
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

// When we press the operators button or the numbers button, their value is added to the calculation
for (let i=0; i<opeAndNbCollection.length; i++) {
    opeAndNbCollection[i].onclick = function() {
        calculation += opeAndNbCollection[i].value;
        input.value = calculation;
    }
}

// When we press the equals button, the calculation is deleted
let equal = document.getElementById("equal");
equal.onclick = function() {
    calculation = "";
    input.value = 0;
}

// function add
function add(nb1,nb2) {
    return (nb1+nb2);
}

// function sub
function sub(nb1,nb2) {
    return (nb1-nb2);
}

// function mult
function mult(nb1,nb2) {
    return (nb1*nb2);
}

// function div
function add(nb1,nb2) {
    return (nb1/nb2);
}