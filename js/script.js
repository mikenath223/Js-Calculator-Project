const banner = document.querySelector(".banner");
let output = document.querySelector(".inner");
let result = document.querySelector(".result");
let alert = document.querySelector(".alert");
let powerON = document.querySelector("#ON");
let clear = document.querySelector(".clear");
let divBut = document.getElementById("/");
let mulBut = document.getElementById("x");
let plusBut = document.getElementById("+");
let minusBut = document.getElementById("-");
let decimalBut = document.getElementById(".");

let operatorsListener = () => {
    divBut.addEventListener("click", () => {
        x = divBut.id;
        let chkEnding = objCollector.num1[objCollector.num1.length - 1];
        chkEnding === "x" || chkEnding === "/" || chkEnding === "+" || chkEnding === "-" || chkEnding === "." ? "Stop" : pickOperator(x);
        updateScreen();
    });
    mulBut.addEventListener("click", () => {
        x = mulBut.id;
        let chkEnding = objCollector.num1[objCollector.num1.length - 1];
        chkEnding === "x" || chkEnding === "/" || chkEnding === "+" || chkEnding === "-" || chkEnding === "." ? "Stop" : pickOperator(x);
        updateScreen();
    });
    plusBut.addEventListener("click", () => {
        x = plusBut.id;
        let chkEnding = objCollector.num1[objCollector.num1.length - 1];
        chkEnding === "x" || chkEnding === "/" || chkEnding === "+" || chkEnding === "-" || chkEnding === "." ? "Stop" : pickOperator(x);
        updateScreen();
    });
    minusBut.addEventListener("click", () => {
        x = minusBut.id;
        let chkEnding = objCollector.num1[objCollector.num1.length - 1];
        chkEnding === "x" || chkEnding === "/" || chkEnding === "+" || chkEnding === "-" || chkEnding === "." ? "Stop" : pickOperator(x);
        updateScreen();
    });
    decimalBut.addEventListener("click", () => {
        x = decimalBut.id;
        let chkEnding = objCollector.num1[objCollector.num1.length - 1];
        chkEnding === "x" || chkEnding === "/" || chkEnding === "+" || chkEnding === "-" || chkEnding === "." ? "Stop" : pickOperator(x);
        updateScreen();
    });
}
operatorsListener();


let allButtons = Array.from(document.querySelectorAll("button"));
allButtons.forEach(button => {
    if (button.textContent === "ON") {
        button.addEventListener("click", switchOn);
    }
});

allButtons.forEach(buttonItem => {
    if (buttonItem.textContent === "OFF") {
        buttonItem.addEventListener("click", () => {
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
    num1: [],
    num2: []
};


let sliceIndex;
let sliceForFirst;
let sliceForSecond;

function pickOperator(x) {
    objCollector.num1.push(x);
}


function buttonEvents() {
    allButtons.forEach(buttText => {
        x = buttText.textContent;
        if (
            x !== "Enter" &&
            x !== "ON" &&
            x !== "OFF" &&
            x !== "x" &&
            x !== "-" &&
            x !== "+" &&
            x !== "/" &&
            x !== "." &&
            x !== "AC"
        ) {
            buttText.addEventListener("click", () => {
                x = buttText.textContent;
                pickOperator(x);
                updateScreen();
            });
        } else if (x === "Enter") {
            buttText.addEventListener("click", runMultipleOperators);
        } else if (x === "AC") {
            buttText.addEventListener("click", () => {
                objCollector.num1.pop();
                updateScreen();
            });
        }
    });
}

let conditionMul = "single operator detected";
let foundDivIndex, foundMulIndex, foundAddIndex, foundSubIndex;
function calculator() {
    let secondDigit = "";
    let firstDig;

    let chkMulOperators = "";
    i = 0;
    while (true) {
        if (objCollector.num1[i] == "-" || objCollector.num1[i] == "+" || objCollector.num1[i] == "x" || objCollector.num1[i] == "/") {
            chkMulOperators += objCollector.num1[i];
        } else if (chkMulOperators.length > 1) {
            chkMulOperators = "";
            conditionMul = "multiple operators detected";
            break;
        } else if (i == objCollector.num1.length) {
            break;
        }
        i++;
    }
    checkDone();

    function checkDone() {
        if (conditionMul == "multiple operators detected") {

            multipleOperators();
        } else {
            singleOperators();
        }
    }


    function singleOperators() {
        firstDig = "";
        let i = 0;
        let reg = /[^0-9]/g
        while (true) {
            if (objCollector.num1[i] == "-" || objCollector.num1[i] == "+" || objCollector.num1[i] == "x" || objCollector.num1[i] == "/") {
                break;
            }
            firstDig += objCollector.num1[i];
            if (!reg.test(objCollector.num1)) {
                break;
            }
            i++;
        }
        objCollector.num2[0] = firstDig;


        secondDigit = "";
        chkMulOperators = "";
        let len = objCollector.num1.length;
        i = 0;
        while (i < len) {
            if (chkMulOperators.length === 1) {
                secondDigit += objCollector.num1[i];
                sliceIndex = i + 2;
            }
            else if (objCollector.num1[i] == "-" || objCollector.num1[i] == "+" || objCollector.num1[i] == "x" || objCollector.num1[i] == "/") {
                chkMulOperators += objCollector.num1[i];
            }
            i++;
        }
        objCollector.num2[1] = chkMulOperators[0];
        objCollector.num2[2] = secondDigit;
        decider();
    }

    function multipleOperators() {
        function bodmas() {
            runDiv();
            runMul();
            runAdd();
            runSub();
        }
        bodmas();

        foundDivIndex = objCollector.num1.indexOf("/");
        foundMulIndex = objCollector.num1.indexOf("x");
        foundAddIndex = objCollector.num1.indexOf("+");
        foundSubIndex = objCollector.num1.indexOf("-");

        function runDiv() {
            if (foundDivIndex !== undefined && foundDivIndex > -1) {
                getDigits(foundDivIndex);
                decider();
            }
        }

        function runMul() {
            if (foundMulIndex !== undefined && foundMulIndex > -1) {
                getDigits(foundMulIndex);
                decider();
            }
        }

        function runAdd() {
            if (foundAddIndex !== undefined && foundAddIndex > -1) {
                getDigits(foundAddIndex);
                decider();
            }
        }

        function runSub() {
            if (foundSubIndex !== undefined && foundSubIndex > -1) {
                getDigits(foundSubIndex);
                decider();
            }
        }

        function getDigits(foundIndex) {
            let len = objCollector.num1.length;
            firstDig = "";
            let i = foundIndex;
            let reg = /[^0-9]/g;
            while (true) {
                if (objCollector.num1[i - 1] == "-" || objCollector.num1[i - 1] == "+" || objCollector.num1[i - 1] == "x" || objCollector.num1[i - 1] == "/") {
                    sliceForFirst = i;
                    break;
                }
                if (i <= 0) {
                    sliceForFirst = 0;
                    break;
                }
                firstDig += objCollector.num1[i - 1];

                if (!reg.test(objCollector.num1)) {
                    break;
                }
                i--;
            }
            if (!isNaN(firstDig)) {
                objCollector.num2[0] = firstDig.split("").reverse().join("");
            } else {
                objCollector.num2[0] = firstDig;
            }

            secondDigit = "";
            i = foundIndex;
            while (true) {
                if (objCollector.num1[i + 1] == "-" || objCollector.num1[i + 1] == "+" || objCollector.num1[i + 1] == "x" || objCollector.num1[i + 1] == "/") {
                    sliceForSecond = i;
                    break;
                }
                else if (i === (len - 1)) {
                    sliceForSecond = i;
                    break;
                }
                secondDigit += objCollector.num1[i + 1];

                i++;
            }

            objCollector.num2[1] = objCollector.num1[foundIndex];
            objCollector.num2[2] = secondDigit;
        }

    }

}

function updateScreen() {
    let print;
    print = objCollector.num1.join("");
    output.textContent = print;
    result.textContent = "";
}

function decider(arg1, arg2) {
    arg1 = +objCollector.num2[0];
    arg2 = +objCollector.num2[2];
    if (objCollector.num2.includes("+")) {
        addOperator(arg1, arg2);
    } else if (objCollector.num2.includes("-")) {
        minusOperator(arg1, arg2);
    } else if (objCollector.num2.includes("x")) {
        timesOperator(arg1, arg2);
    } else if (objCollector.num2.includes("/")) {
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

function updateCollector(arg) {
    if (arg === Infinity) {
        result.textContent = "Error";
        objCollector.num1.splice(0);
    }
    else if (!(isNaN(arg) === true || arg === Infinity) && conditionMul == "single operator detected") {
        objCollector.num1.splice(0, (sliceIndex - 1), arg);
        result.textContent = arg;
    } else if (conditionMul == "multiple operators detected") {
        objCollector.num1.splice(sliceForFirst, ((sliceForSecond - sliceForFirst) + 1), arg);
        result.textContent = arg;
    }
}


function runMultipleOperators() {
    let reg = /[^0-9]/g;
    let i = 0;
    while (true) {
        if (!reg.test(objCollector.num1)) {
            break;
        }
        calculator();
        i++;
    }
}
