const displayEl =  document.querySelector('.display-1');
const display2El = document.querySelector('.display-2');
const tempResultEl = document.querySelector('.temp-result');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
//singgle element selector gabutuh all
const equalEl = document.querySelector('.equal');
const clearAllEl = document.querySelector('.all-clear');
const clearLastEl = document.querySelector('.last-entity-clear');

let disNum=''
let dis2Num=''
let result = null
let lastOperation = null
let haveDot = false;

numbersEl.forEach((number) => {
    number.addEventListener('click', function(e){
        if(e.target.innerText==='.' && !haveDot){ //if dot is clicked and dot is not already in the display
            haveDot=true;
        }else if (e.target.innerText ==='.' && haveDot){
            return;
        }
        dis2Num += e.target.innerText;//from string to int or float
        display2El.innerText = dis2Num;
    })
});


operationEl.forEach(operation => {
    operation.addEventListener('click',function(e){
        if(dis2Num===''){
            return;
        }
        haveDot=false;
        const operationName = e.target.innerText;
        if(disNum && dis2Num && lastOperation){
            mathOperation();
        }else{
            result = parseFloat(dis2Num);
        }
        clearVar(operationName)
        lastOperation = operationName;
        console.log(result);
    })
});


function clearVar (name=''){
    disNum += dis2Num + ' ' + name + ' ';
    displayEl.innerText = disNum;
    display2El.innerText = '';
    dis2Num  = ' ';
    tempResultEl.innerText = result;
}

function mathOperation(){
    if(lastOperation === 'X'){
        result = parseFloat(result) * parseFloat(dis2Num);   
    }else if (lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2Num);
    }else if ( lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2Num);
    }else if(lastOperation === '/'){    
        result = parseFloat(result) / parseFloat(dis2Num);
    }else if(lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equalEl.addEventListener('click',(e)=>{
    if(!disNum || !dis2Num){//kalo gada apa apa 
        return;
    }
    haveDot =false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = '';
    dis2Num=result;
    disNum = '';
});

clearAllEl.addEventListener('click',(e)=>{
    displayEl.innerText = '0';
    display2El.innerText = '0';
    disNum = '';
    dis2Num = '';
    tempResultEl.innerText = '0';
})

clearLastEl.addEventListener('click',(e)=>{
    display2El.innerText = '0';
    dis2Num = '';//cuman clear display 2;
})

window.addEventListener('keydown',(e)=>{
    if(e.key==='0'||e.key==='1'||e.key==='2'||e.key==='3'||e.key==='4'||e.key==='5'||e.key==='6'||e.key==='7'||e.key==='8'||e.key==='9'){
        clickButtonEl();    
    }else if(e.key==='+'||e.key==='-'||e.key==='*'||e.key==='/'||e.key==='%'){
        clickOperationEl();
    }else if(e.key==="*"){
        clickOperationEl('*');
    }else if (e.key==="Enter"||e.key==="="){
        equalEl.click();
    }
    function clickButtonEl(){
        numbersEl.forEach((button) => {
            if(button.innerText===e.key){
                button.click();
            }
        });
    }
    
    function clickOperationEl(){
        operationEl.forEach((button) => {
            if(button.innerText===e.key){
                button.click();
            }
        });
    }
    
});


