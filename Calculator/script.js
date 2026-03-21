let reset = document.querySelector('.reset');
let display = document.querySelector('#ans')
let buttons = document.querySelectorAll('.btn')

let currnum = "";
let previousnum = "";
let operator = null;


function handleNumber(num){
    currnum += num;
    display.textContent = currnum;
}

function handleOperator(op){
    if(currnum === ""){
        operator = op;
        return;
    }
    if(previousnum != ""){
        calculate();
    }
    previousnum = currnum;
    operator = op;
    currnum = "";
}

function calculate(){
    let prev = Number(previousnum);
    let curr = Number(currnum);
    let result;
    
    if(previousnum === "" || currnum === "") return;

    if(operator === '+') result = prev + curr;
    if(operator === 'x') result = prev * curr;
    if(operator === '-') result = prev - curr;
    if(operator === '/') result = prev / curr;

    currnum = result.toString();
    previousnum = "";
    operator = null;

    display.textContent = currnum;
}

// Reset Button
reset.addEventListener('click', function(){
    display.textContent = '88888888';
    currnum = "";
    operator = null;
    previousnum = "";
});

// Delete last element
function deleteLast(){
    currnum = currnum.slice(0,-1); //last element is excluded
    display.textContent = currnum || '88888888';
}

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        let value = btn.textContent;
        console.log(value);

        if(!isNaN(value) || value === '.'){
            handleNumber(value);
        }
        else if(value === '+' || value === '-' || value === 'x' || value === '/'){
            handleOperator(value);
        }
        else if(value === '='){
            calculate();
        }
        else if(value == 'DEL'){
            deleteLast();
        }
    });
});
