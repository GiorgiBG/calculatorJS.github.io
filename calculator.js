'use strict';

let runningTotal = 0;
let buffer = '0';
let prevOperetor = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
  if (isNaN(value)) handelSymbol(value);
  else handelNumber(value);
  screen.innerText = buffer;
}

function flashOperation(intBuffer) {
  if (prevOperetor === '+') {
    runningTotal += intBuffer;
  } else if (prevOperetor === '-') {
    runningTotal -= intBuffer;
  } else if (prevOperetor === '×') {
    runningTotal *= intBuffer;
  } else if (prevOperetor === '÷') {
    runningTotal /= intBuffer;
  }
  console.log('Running total', runningTotal);
}

function handelSymbol(symb) {
  console.log(`handel symbol function`, symb);

  if (symb === 'C') {
    buffer = '0';
    runningTotal = 0;
  }

  switch (symb) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;
    case '=':
      if (prevOperetor === null) {
        // need numbers to do math
        return;
      }
      flashOperation(parseInt(buffer));
      prevOperetor = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.slice(0, -1);
      }
      break;
    case '+':
    case '-':
    case '×':
    case '÷':
      handleMath(symb);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === '0') {
    return;
  }

  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flashOperation(intBuffer);
  }
  prevOperetor = symbol;
  buffer = '0';
  console.log(runningTotal);
}

function handelNumber(numStr) {
  if (buffer === '0') buffer = numStr;
  else buffer += numStr;
}

function init() {
  document.querySelector('.calc-buttons').addEventListener('click', function (e) {
    // console.log(e.target.innerText);
    buttonClick(e.target.innerText);
  });
}

init();
