const selectQuery = query => document.querySelector(query);

const output = selectQuery('.inner');
const result = selectQuery('.result');
const alert = selectQuery('.alert');
const powerON = selectQuery('#ON');
const clear = selectQuery('.clear');
const allScreenButtons = Array.from(document.querySelectorAll('button'));
const inputsCollector = [];

function updateScreen() {
  const print = inputsCollector.join('');
  output.textContent = print;
  result.textContent = '';
}

function pickOperator(x) {
  inputsCollector.push(x);
}

function getOperators(buttonText) {
  const regex = /x|\+|\.|-|\//;
  if (
    inputsCollector.length >= 1
    && !regex.test(inputsCollector[inputsCollector.length - 1])
  ) {
    pickOperator(buttonText);
    updateScreen();
  }
}

function updateCollector(arg) {
  if (arg === Infinity || Number.isNaN(arg)) {
    result.textContent = 'Error';
    inputsCollector.splice(0);
  } else {
    result.textContent = arg;
    inputsCollector.splice(0);
    inputsCollector.push(arg);
  }
}

function calculator() {
  let joinedInputs = inputsCollector.join('');
  joinedInputs = joinedInputs.replace(/x/g, '*').replace(/÷/g, '/');
  const result = eval(joinedInputs);
  updateCollector(result);
}

function switchOn() {
  alert.textContent = 'Calculator Powered';
  allScreenButtons.forEach(button => {
    button.style.color = 'green';
  });
  output.style.backgroundColor = 'gray';
  result.style.backgroundColor = 'gray';
  setTimeout(() => {
    alert.style.display = 'none';
  }, 1200);
  powerON.style.display = 'none';
  clear.style.display = 'inline';
}
powerON.onclick = switchOn;

function deleteItems() {
  inputsCollector.pop();
  updateScreen();
}

allScreenButtons.forEach(button => {
  const buttonText = button.id;
  const regexButtons = /\d/;

  button.addEventListener('click', () => {
    if (regexButtons.test(+buttonText)) {
      pickOperator(buttonText);
      updateScreen();
    } else if (buttonText === 'Enter') {
      calculator();
    } else if (buttonText === 'AC') {
      deleteItems();
    } else if (buttonText === 'ON') {
      switchOn();
    } else if (buttonText === 'OFF') {
      window.location.reload();
    } else {
      getOperators(buttonText);
    }
  });
});

function wrapOpKeys(text) {
  const regexNumbers = /[^0-9]/;
  if (regexNumbers.test(text)) {
    getOperators(text);
  } else {
    pickOperator(text);
    updateScreen();
  }
}

function wrapCtrlKeys(text) {
  switch (text) {
    case 'Enter':
      calculator();
      break;
    case 'AC':
      deleteItems();
      break;
    case 'OFF':
      window.location.reload();
      break;
    default:
      switchOn();
  }
}

function feedInput(e) {
  const keyboardInput = document.querySelector(
    `button[data-key="${e.keyCode}"]`,
  );
  if (!keyboardInput) return;

  const controls = ['Enter', 'ON', 'AC', 'OFF'];
  if (!controls.includes(keyboardInput.innerText)) {
    wrapOpKeys(keyboardInput.innerText);
  } else {
    wrapCtrlKeys(keyboardInput.innerText);
  }
}
window.addEventListener('keydown', feedInput);
