let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('0');
}

function appendNumber(number) {
    if (currentInput.length >= 9) {
        return;
    }
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay(currentInput);
}

function appendDot() {
    if (!currentInput.includes('.') && currentInput.length < 9) {
        currentInput += '.';
    }
    updateDisplay(currentInput);
}

function appendOperator(op) {
    if (currentInput === '' && previousInput === '') return;
    if (currentInput === '') {
        operator = op;
    } else {
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === null) return;
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    updateDisplay(result);
    currentInput = result.toString().slice(0, 9); 
    previousInput = '';
    operator = null;
}

function updateDisplay(value) {
    display.textContent = value;
}

function toggleSign() {
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.substring(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay(currentInput);
}

function percent() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) / 100).toString().slice(0, 9); 
    updateDisplay(currentInput);
}
