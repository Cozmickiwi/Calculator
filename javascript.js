//make screen display the content of a variable
let screen = document.getElementById('screen');
let mainScreen = document.getElementById('mainScreen');
let upperScreen = document.getElementById('topScreen');
let button = document.querySelectorAll(".button");
let calcContainer = document.querySelector(".calculatorContainer");
let id;
let screenContent = "";
let upperScreenContent = "";
let operater;
let chosenOperator = "";
let output;
let ans = false;
let equ = false;
let decimal = false;
//function that takes in the value of clicked button and adds to screen
//if operator is clicked, returns to math function
function buttonDetect(a) {
    console.log(a);
    console.log(screenContent);
    if(screenContent.length > 0 || a != 0){
        if(a == 'AC' || a == '%' || a == '÷' || a == 'x' 
        || a == '-' || a == '+' || a == '='){
            return maths(a);
        }
        console.log(String(screenContent).length);
        if(String(screenContent).length < 11){
            console.log("Here!")
            if(a == '⌫'){
                if(mainScreen.textContent == '0') return('')
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
            console.log(screenContent)
            if (a == "." && decimal == false){
                 screenContent += a;
                 decimal = true;
            }
            else if (a != ".") {
            screenContent += Number(a);
            }
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
    decimal = false;
    console.log(operator);
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
    else if (operator != "="){
        chosenOperator = operator;
    }
    else if(operator == "=") equ = true;
    if(upperScreenContent.length == 0){
        //convert chosen operater symbol to js math operator
        if(operator == "=" && upperScreenContent == "") return('');
        if(operator == '/' || operator == '÷'){
            upperScreen.textContent = (screenContent + " " + "÷");
        }
        else {
            upperScreen.textContent = (screenContent + " " + operator);
        }
        upperScreenContent = screenContent;
        mainScreen.textContent = '0';
        screenContent = '';
        operater = chosenOperator;
    }
    else if(String(upperScreenContent).length > 0){
        return calculate()
    }
}
function calculate(){
    if(operater == "+"){
        output = (Number(upperScreenContent) + Number(screenContent));
        console.log(output);
    }
    else if(operater == "-"){
        output = (Number(upperScreenContent) - Number(screenContent));
        console.log(output);
    }
    else if(operater == "*"){
        output = ((Number(upperScreenContent)) * (Number(screenContent)));
        console.log(output);
    }
    else if(operater == "/"){
        output = (Number(upperScreenContent) / Number(screenContent));
        console.log(output);
    }
    else if(operater == "%"){
        output = ((Number(upperScreenContent) / Number(screenContent)) * 100);
        console.log(output);
    }
    if ((output.toFixed()) > 999999999999 && output != Infinity){
        return notationCalc(output.toFixed());
    }
    if (String(output).length > 10){
        output = output.toFixed((String(output).length - 12));
    }
    operater = chosenOperator;
    if (operater == "=" || equ == true){
        //if(upperScreenContent == "~") return('');
        screenContent = output;
        upperScreenContent = "";
        mainScreen.textContent = screenContent;
        upperScreen.textContent = "~";
        equ = false;
        decimal = false;
    }
    else {
        console.log(output);
        upperScreenContent = String(output);
        screenContent = "";
        console.log('hi');
        mainScreen.textContent = '0';
        upperScreen.textContent = (upperScreenContent + chosenOperator);
        decimal = false;
    }
}
function notationCalc(num){
    let start = "1";
    for(let i = 1; i < num.length; i++){
        start += "0"
    }
    let outputDivider = Number(start);
    let outputFloat = (num / outputDivider)
    if(outputFloat.toFixed(5) == 10) outputFloat -= 0.00001;
    screenContent = (`${(outputFloat.toFixed(5))}e+${num.length - 1}`);
    mainScreen.textContent = screenContent;
    upperScreen.textContent = "~";
    upperScreenContent = num;
    console.log(upperScreenContent);
    return('');
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


//keyboard support "will be long but idk how else"
const supportedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '+', '-', '=', '%', 'x', '*', '.', 'Backspace', 'Escape']
let keyPress;
document.addEventListener('keydown', keyPressed);
function keyPressed(e){
    if(supportedKeys.includes(e.key)){
        if(e.key == '*'){
            return(buttonDetect('x'));
        }
        else if(e.key == '/'){
            return(buttonDetect('%'));
        }
        else if(e.key == 'Backspace'){
            return(buttonDetect('⌫'));
        }
        else if(e.key == 'Escape'){
            return(buttonDetect('AC'));
        }
        buttonDetect(e.key);
    }
}