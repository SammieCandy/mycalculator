
let calculate = (n1, operator, n2) => {
    let result = '';
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if ( operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if ( operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if ( operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    } else if ( operator === 'percent') {
        result = parseFloat(n1) * (1/100)
    }
    return result
}



const calculator = document.querySelector('.calculator')
console.log()
const display = calculator.querySelector('.calculator__display')
const keys = calculator.querySelector('.calculator__keys')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        console.log('click')
        let key= e.target
        let action = key.dataset.action
        let keyContent = key.textContent
        let displayedNum = display.textContent
        let previousKeyType = calculator.dataset.previousKeyType

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            } 
            calculator.dataset.previousKeyType = 'number'
        }
        if (displayedNum === 'decimal') {
            display.textContent = displayedNum + '.'
        }
        if (
            action === "add" ||
            action === "subtract" ||
            action === "divide" ||
            action === "multiply" ||
            action === "percent" 
        ) {
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }
        if (action === 'delete') {
            console.log(displayedNum.toString().slice(0, -1))
        }
        if (action === 'clear') {
            console.log('')
        }
        if (action === 'calculate') {
            console.log(calculate.dataset)
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            display.textContent = calculate(firstValue, operator, secondValue)
        }
    }
});

console.log()