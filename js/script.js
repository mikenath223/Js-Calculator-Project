const banner = document.querySelector(".banner");
let output = document.querySelector(".inner");
let result = document.querySelector(".result");
let alert = document.querySelector(".alert");
let powerON = document.querySelector("#ON");
let clear = document.querySelector(".clear");
let ops = [...document.querySelectorAll(".op")];

ops.forEach(item => {
    const x = item.id;
    item.addEventListener("click", () => {
        let chkEnding = objCollector.inputs[objCollector.inputs.length - 1];
        let chkStart = objCollector.inputs[0];
        if (chkEnding === "x" || chkEnding === "/" || chkEnding === "+" || chkEnding === "-" || chkEnding === ".") {
            "Stop"
        } else { pickOperator(x) }
        if (chkStart === "x" || chkStart === "/" || chkStart === "+" || chkStart === "-" || chkStart === ".") {
            chkStart.splice(0);
        }
        updateScreen();
    })
})


function feedInput(e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    const controls = ["Enter", "ON", "AC", "OFF"];
    if (!key) return;
    !controls.includes(key.innerText) ? wrapOpKeys(key.innerText) : wrapCtrlKeys(key.innerText);
}
window.addEventListener('keydown', feedInput);

function wrapOpKeys(text) {
    pickOperator(text);
    updateScreen();
};

function wrapCtrlKeys(text) {
    switch (text) {
        case 'Enter': runMultipleOperators();
        break;
        case 'AC' : deleteItems();
        break;
        case 'OFF' : toggleSwitch(null, "Calculator Off", "white", "whitesmoke", "inline", "none");
        break;
        case 'ON' : toggleSwitch(null);
        break;
    }
};

let allButtons = Array.from(document.querySelectorAll("button"));
allButtons.forEach(button => {
    if (button.textContent === "ON") {
        button.addEventListener("click", toggleSwitch);
    }
    else if(button.textContent === "OFF") {
        button.addEventListener("click", () => {
            location.reload();
        });
    }
});


function toggleSwitch(e, powerText = "Calculator Powered", buttonColor = "white", screenCol = "gray", onButtonDisplay = "none", clearButDisplay = "inline") {
    alert.textContent = powerText;
    allButtons.forEach(button => {
        button.style.color = buttonColor;
    });
    output.style.backgroundColor = screenCol;
    result.style.backgroundColor = screenCol;
    setTimeout(() => (alert.style.display = "none"), 1200);
    powerON.style.display = onButtonDisplay;
    clear.style.display = clearButDisplay;
}

let objCollector = {
    inputs: [],
    operator: []
};


let sliceIndex, sliceForFirst, sliceForSecond;
function pickOperator(x) {
    objCollector.inputs.push(x);
}

function buttonEvents() {
    allButtons.forEach(button => {
        const buttonText = button.id;
        if (
            buttonText !== "Enter" &&
            buttonText !== "ON" &&
            buttonText !== "OFF" &&
            buttonText !== "x" &&
            buttonText !== "-" &&
            buttonText !== "+" &&
            buttonText !== "/" &&
            buttonText !== "." &&
            buttonText !== "AC"
        ) {
            button.addEventListener("click", () => {
                pickOperator(buttonText);
                updateScreen();
            });
        } else if (buttonText === "Enter") {
            button.addEventListener("click", runMultipleOperators);
        } else if (buttonText === "AC") {
            button.addEventListener("click", deleteItems);
        }
    });
}
function deleteItems() {
    objCollector.inputs.pop();
    updateScreen();
}


let foundDivIndex, foundMulIndex, foundAddIndex, foundSubIndex;
let secondDigit, firstDig, firstDigit;


function calculator() {
    multipleOperators();

    function multipleOperators() {
        bodmas1();
        bodmas2();
        bodmas4();
        bodmas3();

        function bodmas1() {
            for (let i = 0; i < objCollector.inputs.length; i++) {
                if (objCollector.inputs[i] === "/") {
                    runDiv();
                }
            }
        }
        function bodmas2() {
            for (let i = 0; i < objCollector.inputs.length; i++) {
                if (objCollector.inputs[i] === "x") {
                    runMul();
                }
            }
        }
        function bodmas3() {
            for (let i = 0; i < objCollector.inputs.length; i++) {
                if (objCollector.inputs[i] === "+") {
                    runAdd();
                }
            }
        }
        function bodmas4() {
            for (let i = 0; i < objCollector.inputs.length; i++) {
                if (objCollector.inputs[i] === "-") {
                    runSub();
                }
            }
        }

        function runDiv() {
            foundDivIndex = objCollector.inputs.indexOf("/");
            if (foundDivIndex !== undefined && foundDivIndex > -1) {
                getDigits(foundDivIndex);
                decider();
            }
        }

        function runMul() {
            foundMulIndex = objCollector.inputs.indexOf("x");
            if (foundMulIndex !== undefined && foundMulIndex > -1) {
                getDigits(foundMulIndex);
                decider();
            }
        }

        function runAdd() {
            foundAddIndex = objCollector.inputs.indexOf("+");
            if (foundAddIndex !== undefined && foundAddIndex > -1) {
                getDigits(foundAddIndex);
                decider();
            }
        }

        function runSub() {
            foundSubIndex = objCollector.inputs.indexOf("-");
            if (foundSubIndex !== undefined && foundSubIndex > -1) {
                getDigits(foundSubIndex);
                decider();
            }
        }

        function getDigits(foundIndex) {
            let check = 0;
            let len = objCollector.inputs.length;
            firstDig = "";
            let i = foundIndex;
            let reg = /[^0-9]/g;
            while (true) {
                if (objCollector.inputs[i - 1] == "-" || objCollector.inputs[i - 1] == "+" || objCollector.inputs[i - 1] == "x" || objCollector.inputs[i - 1] == "/") {
                    sliceForFirst = i;
                    break;
                }
                if (i <= 0) {
                    sliceForFirst = 0;
                    break;
                }
                firstDig += objCollector.inputs[i - 1];
                check++;
                if (!reg.test(objCollector.inputs)) {
                    break;
                }
                i--;
            }

            if (check > 1) {
                firstDigit = firstDig.split("").reverse().join("");
            } else if (check == 1) {
                firstDigit = firstDig;
            }

            secondDigit = "";
            i = foundIndex;
            while (true) {
                if (objCollector.inputs[i + 1] == "-" || objCollector.inputs[i + 1] == "+" || objCollector.inputs[i + 1] == "x" || objCollector.inputs[i + 1] == "/") {
                    sliceForSecond = i;
                    break;
                }
                else if (i === (len - 1)) {
                    sliceForSecond = i;
                    break;
                }
                secondDigit += objCollector.inputs[i + 1];
                i++;
            }
            objCollector.operator = objCollector.inputs[foundIndex];
        }
    }
}

function updateScreen() {
    let print = objCollector.inputs.join("");
    output.textContent = print;
    result.textContent = "";
}

function decider(arg1, arg2) {
    arg1 = +firstDigit;
    arg2 = +secondDigit;
    if (objCollector.operator.includes("+")) {
        addOperator(arg1, arg2);
    } else if (objCollector.operator.includes("-")) {
        minusOperator(arg1, arg2);
    } else if (objCollector.operator.includes("x")) {
        timesOperator(arg1, arg2);
    } else if (objCollector.operator.includes("/")) {
        divOperator(arg1, arg2);
    }
}

function addOperator(arg1, arg2) {
    let added = arg1 + arg2;
    updateCollector(added);
};
function minusOperator(arg1, arg2) {
    let subtracted = arg1 - arg2;
    updateCollector(subtracted);
};
function timesOperator(arg1, arg2) {
    let multiplied = arg1 * arg2;
    updateCollector(multiplied);
};
function divOperator(arg1, arg2) {
    let divided = arg1 / arg2;
    updateCollector(divided);
};

let reslt;
function updateCollector(arg) {
    if (arg === Infinity || typeof arg === NaN) {
        result.textContent = "Error";
        objCollector.inputs.splice(0);
    }
    else {
        objCollector.inputs.splice(sliceForFirst, ((sliceForSecond - sliceForFirst) + 1), arg);
        let reslt = arg;
        if (reslt.toString().length > 12) {
            result.textContent = +reslt.toPrecision(5);
        }
        else { result.textContent = arg; }
    }
}

function runMultipleOperators() {
    let reg = /[^0-9]/g;
    while (true) {
        if (!reg.test(objCollector.inputs)) {
            break;
        }
        calculator();
    }
}