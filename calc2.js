
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
        let defaultNum = '0'
        

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
        if (!action) {
            if (displayedNum === defaultNum || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            } 
            calculator.dataset.previousKeyType = 'number'
        }
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            } else  if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }

        if (
            action === "add" ||
            action === "subtract" ||
            action === "divide" ||
            action === "multiply"
        ) {
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }
        if (action === 'percent') {
            if (key.textContent === '%') {
                calculator.dataset.firstValue === displayedNum * (1/100)
            } else {
                key.textContent = '%'
            }
            display.textContent = displayedNum * (1/100)
            calculator.dataset.previousKeyType = '%'
        }
        if (action === 'delete') {
            if(key.textContent === 'del') {
                calculator.dataset.firstValue = displayedNum.slice(0, -1)
                
            } else {
                key.textContent = 'del'
            }
            display.textContent = displayedNum.slice(0, -1)

            calculator.dataset.previousKeyType = 'delete'
        }
        
        if (action === 'clear') {
            if(key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.secondValue = ''
            } else {
                key.textContent = 'AC'
            }
            display.textContent = defaultNum
            calculator.dataset.previousKeyType = 'clear'
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