// Allows to only display the numbers on the calculator

let nbCollection = document.getElementsByClassName("btn btn-light waves-effect");
let input = document.getElementById("input");

// for (let i=0; i<= nbCollection.length; i++) {
//     nbCollection[i].onclick = function() {
//         input.value = nbCollection[i].value;
//     }
// }

// let opeCollection = document.getElementsByClassName("operator btn btn-info");

// When we press the equals button, the result is displayed
// let equal = document.getElementById("equal");
// equal.onclick = function() {

// }

// When we press the AC button, input.value = 0
let ac = document.getElementById("ac");
ac.onclick = function() {
    input.value = 0;
}

