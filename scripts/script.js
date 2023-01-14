
//Currently displayed value
const currLabel = document.querySelector("#curr");
const DEFAULT_VALUE = currLabel.innerHTML;
let currValue = currLabel.innerHTML;

let nextValue = "";
const DEFAULT_NEXT = "";

//Operator tracking
let currOper = "";
const DEFAULT_OPER = "";

const getCurrValue = () => {
    return currLabel.innerHTML;
}

const changeCurrValue = (newVal) => {
    currValue = newVal;
}

const appendToCurrValue = (newVal) => {
    currValue += newVal;
}

//Select all the num buttons
const numButtons = document.querySelectorAll(".number");

//Assign event listener to num buttons
//Upon clicking, their inner HTML value is stored in the currValue variable
numButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currOper !== "") {
            nextValue = button.innerHTML;
            return;
        }
        updateCurrValue(button.innerHTML);
    })
});

const updateCurrValue = (pressedVal) => {
    if (currValue === DEFAULT_VALUE && pressedVal === DEFAULT_VALUE) return;
    currValue = (currValue === DEFAULT_VALUE) ? pressedVal : currValue+= pressedVal;
    currLabel.innerHTML = currValue;
}

//Select all operator buttons
const operButtons = document.querySelectorAll(".calcOperator");

//Assign event listener to operator buttons
//Upon clicking, their inner HTML is stored in the currOperator variable
operButtons.forEach(button => {
    button.addEventListener("click", () => {
        updateCurrOperator(button.innerHTML);
    })
});

const updateCurrOperator = (pressedOper) => {

    currOper = pressedOper;
}

//Calculation
const calculate = () => {
    let num1 = Number(currValue);
    let num2 = Number(nextValue);

    let result = defineOperation()(num1, num2);
    console.log(result);
}

const defineOperation = () => {
    switch (currOper) {
        case "+": return sum;
        case "-": return subtract;
        case "*": return multiply;
        case "/": return divide;
        default: alert("Error in defining calc operation");
    }
}

const sum = (num1, num2) => {return num1 + num2};
const subtract = (num1, num2) => {return num1 - num2};
const multiply = (num1, num2) => {return num1 * num2};
const divide = (num1, num2) => {return num1 / num2};

//Selecting equals button
const equalsButton = document.querySelector("#equals-button");
equalsButton.addEventListener("click", () => calculate());

//Selecting clear button
const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", () => clearAll());

const clearAll = () => {
    debugger;
    currValue = DEFAULT_VALUE;
    currLabel.innerHTML = currValue;
    currOper = DEFAULT_OPER;
    nextValue = DEFAULT_NEXT
}