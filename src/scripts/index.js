import '../styles/main.css'
import { multiplication, division, substraction, addition, percent } from './mathOperations/operations'

//Vars
var _inputNumber = '';
var _resNumber = '';
var _sign = '';

var functionLink;


const state = {
  
  get inputNumber() {
    return _inputNumber;
  },
  set inputNumber(value) {
    _inputNumber = value;
    
    const input = document.getElementById('number');
    input.value = value
  },


  get sign(){
    return _sign
  },
  set sign(value){
    _sign = value

    const sign = document.getElementById('sign');
    sign.innerText = value
  },


  get resNumber(){
    return _resNumber;
  },
  set resNumber(value){
    _resNumber = value;
    
    const result = document.getElementById('result');
    result.innerText = Number(value)
  },
};

document.addEventListener('DOMContentLoaded', () => {

  const input = document.getElementById('number');
  const equalButton = document.getElementById('bigActionResult')

  //numerical buttons 
  const buttons = document.querySelectorAll('button[id^="input"]');

  //point
  const point = document.getElementById('Point')


  // big actions
  const multiplyButton = document.getElementById('bigActionMultiply')
  const divideButton = document.getElementById('bigActionDivide')
  const substractButton = document.getElementById('bigActionMinus')
  const addButton = document.getElementById('bigActionPlus')

  //small actions
  const clearButton = document.getElementById('smallActionAC')
  const changeSignButton = document.getElementById('smallActionChangeSign')
  const percentButton = document.getElementById('smallActionPercent')


  //big actions handlers
  function actionInputHandler(functionSign, functionVar){
    if (state.resNumber == ""){
      state.resNumber = state.inputNumber
      state.inputNumber = ""
    }
    state.sign = functionSign
    functionLink = functionVar;
  }


  divideButton.addEventListener('click', ()=>{
    actionInputHandler('/', division)
  })
  
  multiplyButton.addEventListener('click', ()=>{
    actionInputHandler('*', multiplication)
  })
  substractButton.addEventListener('click', ()=>{
    actionInputHandler('-', substraction)
  })
  addButton.addEventListener('click', ()=>{
    actionInputHandler('+', addition)
  })

  //small actions handlers
  clearButton.addEventListener('click', ()=>{
    if(state.inputNumber != ''){
      state.inputNumber = ''
    }
    else{
      if(state.sign != ''){
        state.sign = ''
        functionLink = NaN
      }
      else{
        state.resNumber = ''
      }
    }    
  })
  changeSignButton.addEventListener('click', ()=>{
    state.inputNumber = Number(state.inputNumber) * -1
  })
  percentButton.addEventListener('click', ()=>{
    var b = state.resNumber
    if(b==""){
      state.inputNumber = percent(state.inputNumber)
    }
    else{
      state.inputNumber = percent(state.inputNumber, b)
    }
    
  })


  equalButton.addEventListener('click', ()=>{
    var a = Number(state.resNumber)
    var b = Number(state.inputNumber)
    const func = functionLink
    if(typeof(func) == 'function'){
      var res = func(a,b)
      state.inputNumber =''
      state.resNumber = res
    }
    else{        
      state.inputNumber =''
      state.resNumber = b
    }
  })
  

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.value;
      state.inputNumber += String(value)

    });
  });

  point.addEventListener('click', ()=>{
    if(!state.inputNumber.includes('.')){
      state.inputNumber += String('.')
    }
  })

  input.addEventListener('input', () => {
    input.value = input.value
      .replace(/[^\d.]/g, "")
      .replace(/(\..*?)\./g, "$1"); 
    state.inputNumber = input.value 
  });
});
