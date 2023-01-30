// Allows to only display the numbers on the calculator

let nbCollection = document.getElementsByClassName("btn btn-light waves-effect");
let input = document.getElementById("input");

for (let i=0; i<= nbCollection.length; i++) {
    nbCollection[i].onclick = function() {
        input.value = nbCollection[i].value;
    }
}