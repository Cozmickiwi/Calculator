//make screen display the content of a variable
let screen = document.getElementById('screen');
let mainScreen = document.getElementById('mainScreen');
let upperScreen = document.getElementById('topScreen');
let button = document.querySelectorAll(".button");
let id;
let screenContent = "";
let upperScreenContent = "";
let chosenOperator = "";
//function that takes in the value of clicked button and adds to screen
//if operator is clicked, returns to math function
function buttonDetect(a) {
    if(screenContent.length > 0 || a != 0){
        if(a == 'AC' || a == '⌫' || a == '%' || a == '÷' || a == 'x' 
        || a == '-' || a == '+' || a == '='){
            return maths(a);
        }
        screenContent += a;
        mainScreen.textContent = screenContent;
        console.log(screenContent);
    }
};
//make function which adds previous main screen content to top of screen if upperscreen is empty
//then after next user input, calculates answer and adds to main screen

function maths(operator){
    if(upperScreenContent.length == 0){
        chosenOperator = operator;
        upperScreen.textContent = (screenContent + " " + operator);
        upperScreenContent = screenContent;
        mainScreen.textContent = '0';
        screenContent = "";
    }
}

//convert nodelist of elements with id "button" to an array
let arr = Array.from(button);
//create new array from arr containing only the id of each button element
let buttonList = arr.map(item => item.id);
//create event listener for each button, which sends the inner text to function
let buttonAsign = buttonList.map(item => {
    id = item;
    let element = document.getElementById(id);
    element.addEventListener('click', function(){
        buttonDetect(element.innerText);
    })
})
