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
        chkEnding === "x" || chkEnding === "/" || chkEnding === "+" || chkEnding === "-" || chkEnding === "." ? "Stop" : pickOperator(x);
        updateScreen();
    })
})

function checkKeyCode(e) {
    switchOn();
    let key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (!key) return;
    if (key.id !== "enter" && key.id !== "ON" && key.id !== "AC" && key.id !== "OFF") {
        console.log(e.keyCode);
        pickOperator(key.id);
        updateScreen();
    } else if (key.id === "enter") {
        runMultipleOperators();
    } else if (key.id === "AC") {
        deleteItems();
    }
    else if (key.id === "OFF") {
        location.reload();
    }
}

let key = document.querySelector("button[data-key='17']");
if (key) {
    window.addEventListener("keydown", checkKeyCode)
} else if (!key) {
    window.removeEventListener("keydown", checkKeyCode)
}


let allButtons = Array.from(document.querySelectorAll("button"));
allButtons.forEach(button => {
    if (button.textContent === "ON") {
        button.addEventListener("click", switchOn);
    }
    else if (button.textContent === "OFF") {
        button.addEventListener("click", () => {
            location.reload();
        });
    }
});

function switchOn() {
    alert.textContent = "Calculator Powered";
    allButtons.forEach(button => {
        button.style.color = "green";
    });
    output.style.backgroundColor = "gray";
    result.style.backgroundColor = "gray";
    setTimeout(() => (alert.style.display = "none"), 1200);
    buttonEvents();
    powerON.style.display = "none";
    clear.style.display = "inline";
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
        buttonText = button.textContent;
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
                buttonText = button.textContent;
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
    if (arg === Infinity || arg === NaN) {
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
    let i = 0;
    while (true) {
        if (!reg.test(objCollector.inputs)) {
            break;
        }
        console.log(objCollector.inputs);
        calculator();
        console.log(objCollector.inputs);
        i++;
    }
}