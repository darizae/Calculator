
//Currently displayed value
const currLabel = document.querySelector("#curr");
const DEFAULT_VALUE = currLabel.innerHTML;
let currValue = currLabel.innerHTML;

const EMPTY = "";
let nextValue = EMPTY;

const DECIMAL_DOT = ".";

//Operator tracking
let currOper = EMPTY;

//Upper result tracking
const ongoingResult = document.querySelector("#result");

const updateResultsDisplay = (content) => {
    ongoingResult.innerHTML = content;
}

const changeCurrValue = (newVal) => {
    if (dotOverflow(newVal)) return;
    currValue = newVal;
    currLabel.innerHTML = newVal;
}

//Select all the num buttons
const numButtons = document.querySelectorAll(".number");

//Assign event listener to num buttons
//Upon clicking, their inner HTML value is stored in the currValue variable
numButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currOper !== EMPTY) {
            nextValue = button.innerHTML;
            currLabel.innerHTML = nextValue;
            return;
        }
        updateCurrValue(button.innerHTML);
    })
});

const updateCurrValue = (pressedVal) => {
    debugger;
    if (dotOverflow(pressedVal)) return;
    if (currValue === DEFAULT_VALUE && pressedVal === DEFAULT_VALUE) return;
    currValue = (currValue === DEFAULT_VALUE) ? pressedVal : currValue += pressedVal;
    currLabel.innerHTML = currValue;
}

//Select all operator buttons
const operButtons = document.querySelectorAll(".calcOperator");

//Assign event listener to operator buttons
//Upon clicking, their inner HTML is stored in the currOperator variable
operButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (button.innerHTML === currOper) {
            nextValue = currValue;
            calculate();
        }

        updateCurrOperator(button.innerHTML);
        updateResultsDisplay(`${currValue} ${currOper}`);
    })
});

const updateCurrOperator = (pressedOper) => {

    currOper = pressedOper;
}

//Calculation
const calculate = () => {
    if (currOper === EMPTY) return;

    let num1 = Number(currValue);
    let num2 = Number(nextValue);

    let result = round(defineOperation()(num1, num2));

    updateResultsDisplay(`${currValue} + ${nextValue} =`);
    changeCurrValue(result);
    setNextOper();
}

const defineOperation = () => {
    switch (currOper) {
        case "+": return sum;
        case "-": return subtract;
        case "*": return multiply;
        case "/": return divide;
        default: return 404;
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
    changeCurrValue(DEFAULT_VALUE);
    updateResultsDisplay(EMPTY);
    setNextOper();
}

const setNextOper = () => {
    currOper = EMPTY;
    nextValue = EMPTY;
}

const hasDot = (str) => {
    return str.indexOf(DECIMAL_DOT) !== -1;
}

const dotOverflow = (newVal) => {
    return newVal === DECIMAL_DOT && hasDot(currValue);
}

const round = (num) => {
    return Math.ceil(num * 10000) / 10000;
}
  

