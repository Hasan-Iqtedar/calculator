let operand1 = '';
let operand2 = '';
let operator = '';
let result = '';


let expression = document.querySelector('#expression');
let digits = document.querySelectorAll('.digit');
let operators = document.querySelectorAll('.operator')

let delButton = document.querySelector('#del');
let clearButton = document.querySelector('#clear');
let evaluateButton = document.querySelector('#evaluate');

delButton.addEventListener('click', del);
clearButton.addEventListener('click', clear);

evaluateButton.addEventListener('click', () => {
    result = evaluate();
    operand1 = result;
});

digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {

        //When entering first number.
        if (operator === '') {
            //When entering new number after result has been displayed.
            if (operand1 === '' || result !== '') {
                clear();
            }

            if (digit.textContent === '.' && isFloat(operand1)) {
                return;
            }

            operand1 += digit.textContent;
        }

        //When entering second number.
        else if (operator !== '') {
            if (digit.textContent === '.' && isFloat(operand2)) {
                return;
            }
            operand2 += digit.textContent;
        }

        currentValue = digit.textContent;
        displayEquation(e);
    });
});

operators.forEach((op) => {
    op.addEventListener('click', (e) => {
        if (operator !== '') {
            if (operand2 !== '') {
                operand1 = evaluate();
            }
            else {
                return;
            }
        }
        operator = op.textContent;
        displayEquation(e);
    });
});

function displayEquation(e) {
    expression.textContent += e.target.textContent;
}

function del() {
    if (operand2 !== '') {
        let index = expression.textContent.indexOf(operator, 0);
        expression.textContent = expression.textContent.substring(0, index + 1);
        operand2 = '';
    }
    else if (operator !== '') {
        expression.textContent = expression.textContent.replace(operator, '');
        operator = '';
    }
    else {
        expression.textContent = expression.textContent.replace(operand1, '');
        operand1 = '';
    }
}

function clear() {
    expression.textContent = "";
    operand1 = '';
    operand2 = '';
    operator = '';
    result = '';
}

function evaluate() {
    if (operand1 === '' || operator === '' || operand2 === '') {
        return;
    }
    let res = operate(operator, operand1, operand2);

    if (!Number.isInteger(res)) {
        res = res.toFixed(2);
    }

    clear();
    expression.textContent = res;

    return res;
}


function operate(operator, num1, num2) {
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        case '%': return modulus(num1, num2);
    }
}

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function modulus(num1, num2) {
    return num1 % num2;
}

function isFloat(n) {
    return n % 1 !== 0;
}