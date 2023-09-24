//make screen display the content of a variable
let screen = document.getElementById('screen');
let mainScreen = document.getElementById('mainScreen');
let upperScreen = document.getElementById('topScreen');
let button = document.querySelectorAll(".button");
let id;
let screenContent = "";
let upperScreenContent = "";
let chosenOperator = "";
let output;
//function that takes in the value of clicked button and adds to screen
//if operator is clicked, returns to math function
function buttonDetect(a) {
    if(screenContent.length > 0 || a != 0){
        if(a == 'AC' || a == '%' || a == '÷' || a == 'x' 
        || a == '-' || a == '+' || a == '='){
            return maths(a);
        }
        if(screenContent.length < 11){
            if(a == '⌫'){
                if (screenContent.length == 1){
                    screenContent = "";
                    mainScreen.textContent = "0";
                    return('');
                }
                let backSpace = screenContent.slice(0, -1);
                screenContent = backSpace;
                mainScreen.textContent = screenContent;
                console.log(screenContent);
                return('');
            }
            screenContent += a;
            mainScreen.textContent = screenContent;
            console.log(screenContent);
        }
    }
};
function removeTransition(e){
    if(e.propertyName !== 'transform') return;
    e.target.classList.remove('clicked');
}
//make function which adds previous main screen content to top of screen if upperscreen is empty
//then after next user input, calculates answer and adds to main screen

function maths(operator){
    if(operator == 'x'){
        chosenOperator = '*';
    }
    else if(operator == '÷'){
        chosenOperator = '/';
    }
    else if (operator == 'AC'){
        screenContent = "";
        upperScreenContent = "";
        mainScreen.textContent = "0";
        upperScreen.textContent = "~";
        return('');
    }
    else if (operator != '='){
        chosenOperator = operator;
    }
    if(upperScreenContent.length == 0){
        //convert chosen operater symbol to js math operator
        if(operator == "=") return('');
        upperScreen.textContent = (screenContent + " " + operator);
        upperScreenContent = screenContent;
        mainScreen.textContent = '0';
        screenContent = "";
    }
    else if(upperScreenContent.length > 0){
        return calculate()
    }
}
function calculate(){
    if(chosenOperator == "+"){
        output = (Number(upperScreenContent) + Number(screenContent));
        console.log(output);
    }
    else if(chosenOperator == "-"){
        output = (Number(upperScreenContent) - Number(screenContent));
        console.log(output);
    }
    else if(chosenOperator == "*"){
        output = ((Number(upperScreenContent)) * (Number(screenContent)));
        console.log(output);
    }
    else if(chosenOperator == "/"){
        output = (Number(upperScreenContent) / Number(screenContent));
        console.log(output);
    }
    else if(chosenOperator == "%"){
        output = (((Number(upperScreenContent) / Number(screenContent)) * 100) + "%");
        console.log(output);
    }
    screenContent = output;
    upperScreenContent = "~";
    mainScreen.textContent = screenContent;
    upperScreen.textContent = upperScreenContent;
}

//convert nodelist of elements with id "button" to an array
let arr = Array.from(button);
//create new array from arr containing only the id of each button element
let buttonList = arr.map(item => item.id);
//create event listener for each button, which sends the inner text to function
let buttonAsign = buttonList.map(item => {
    id = item;
    let element = document.getElementById(id);
    element.addEventListener('transitionend', removeTransition)
    element.addEventListener('click', function(){
        element.classList.add('clicked');
        buttonDetect(element.innerText);
    })
})
