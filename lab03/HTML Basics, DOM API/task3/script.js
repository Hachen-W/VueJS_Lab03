const display = document.getElementById('display');

function appendValue(val) {
    display.value += val;
}

function clearDisplay() {
    display.value = '';
}

function calculateResult() {
    try {
        const expression = display.value;
        if (!expression) return;
        display.value = evaluateMathExpression(expression);
    } catch (e) {
        display.value = 'Ошибка';
    }
}

// Парсинг и вычисление с помощью Обратной Польской Нотации (ОПН)
function evaluateMathExpression(expr) {
    // Разбиваем строку на токены: числа и операторы
    const tokens = expr.match(/\d+(\.\d+)?|[\+\-\*\/\(\)]/g);
    if (!tokens) return '';

    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
    const outputQueue = [];
    const operatorStack = [];

    // 1. Алгоритм сортировочной станции (перевод в ОПН)
    for (let token of tokens) {
        if (!isNaN(parseFloat(token))) {
            outputQueue.push(parseFloat(token)); // Числа сразу в выходную очередь
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.pop(); // Удаляем '('
        } else { // Операторы +, -, *, /
            while (
                operatorStack.length > 0 && 
                operatorStack[operatorStack.length - 1] !== '(' &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
            ) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        }
    }
    while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
    }

    // 2. Вычисление выражения в ОПН
    const calcStack = [];
    for (let token of outputQueue) {
        if (typeof token === 'number') {
            calcStack.push(token);
        } else {
            const b = calcStack.pop();
            const a = calcStack.pop();
            switch (token) {
                case '+': calcStack.push(a + b); break;
                case '-': calcStack.push(a - b); break;
                case '*': calcStack.push(a * b); break;
                case '/': calcStack.push(a / b); break;
            }
        }
    }

    // Возвращаем итоговый результат
    let result = calcStack[0];
    // Убираем проблему с плавающей точкой (например, 0.1 + 0.2 = 0.30000000000000004)
    return Math.round(result * 10000000000) / 10000000000; 
}
