const selectQuery = query => document.querySelector(query);

const banner = selectQuery(".banner");
const output = selectQuery(".inner");
const result = selectQuery(".result");
const alert = selectQuery(".alert");
const powerON = selectQuery("#ON");
const clear = selectQuery(".clear");
powerON.onclick = switchOn;

let feedInput = e => {
  const keyboardInput = document.querySelector(`button[data-key="${e.keyCode}"]`);
  const controls = ["Enter", "ON", "AC", "OFF"];
  if (!keyboardInput) return;
  !controls.includes(keyboardInput.innerText)
    ? wrapOpKeys(keyboardInput.innerText)
    : wrapCtrlKeys(keyboardInput.innerText);
};
window.addEventListener("keydown", feedInput);

function wrapOpKeys(text) {
  let regexNumbers = /[^0-9]/;
  if (regexNumbers.test(text)) {
    getOperators(text);
  } else {
    pickOperator(text);
    updateScreen();
  }
}

function wrapCtrlKeys(text) {
  switch (text) {
    case "Enter":
      calculator();
      break;
    case "AC":
      deleteItems();
      break;
    case "OFF":
      location.reload();
      break;
    case "ON":
      switchOn();
      break;
  }
}

const allScreenButtons = Array.from(document.querySelectorAll("button"));

function switchOn() {
  alert.textContent = "Calculator Powered";
  allScreenButtons.forEach(button => {
    button.style.color = "green";
  });
  output.style.backgroundColor = "gray";
  result.style.backgroundColor = "gray";
  setTimeout(() => (alert.style.display = "none"), 1200);
  powerON.style.display = "none";
  clear.style.display = "inline";
  buttonEvents();
}

let objCollector = {
  inputs: []
};

function pickOperator(x) {
  objCollector.inputs.push(x);
}

function buttonEvents() {
  allScreenButtons.forEach(button => {
    const buttonText = button.id;
    let regexButtons = /\d/;

    button.addEventListener("click", () => {
      if (regexButtons.test(+buttonText)) {
        pickOperator(buttonText);
        updateScreen();
      } else if (buttonText === "Enter") {
        calculator();
      } else if (buttonText === "AC") {
        deleteItems();
      } else if (buttonText === "ON") {
        switchOn;
      } else if (buttonText === "OFF") {
        location.reload();
      } else {
        getOperators(buttonText);
      }
    });
  });
}

function getOperators(buttonText) {
  let regex = /x|\+|\.|\-|\//;
  if (
    objCollector.inputs.length >= 1 &&
    !regex.test(objCollector.inputs[objCollector.inputs.length - 1])
  ) {
    pickOperator(buttonText);
    updateScreen();
  }
}

function deleteItems() {
  objCollector.inputs.pop();
  updateScreen();
}

function calculator() {
  let result = eval(objCollector.inputs.join(""));
  updateCollector(result);
}

function updateScreen() {
  let print = objCollector.inputs.join("");
  output.textContent = print;
  result.textContent = "";
}

function updateCollector(arg) {
  console.log(objCollector.inputs);
  if (arg === Infinity || typeof arg === NaN) {
    result.textContent = "Error";
    objCollector.inputs.splice(0);
  } else {
    result.textContent = arg;
    objCollector.inputs.splice(0);
    objCollector.inputs.push(arg);
  }
}
