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

let foundDivIndex, foundMulIndex, foundAddIndex, foundSubIndex;
let secondDigit = "";
let firstDig;
let firstDigit;
function calculator() {
    multipleOperators();

    function multipleOperators() {
        bodmas();

        function bodmas() {
            for (let i in objCollector.num1) {
                if (objCollector.num1[i] === "/") {
                    runDiv();
                } else if (objCollector.num1[i] === "x") {
                    runMul();
                } else if (objCollector.num1[i] === "+") {
                    runAdd();
                } else if (objCollector.num1[i] === "-") {
                    runSub();
                }
            }
        }


        function runDiv() {
            foundDivIndex = objCollector.num1.indexOf("/");
            if (foundDivIndex !== undefined && foundDivIndex > -1) {
                getDigits(foundDivIndex);
                decider();
            }
        }

        function runMul() {
            foundMulIndex = objCollector.num1.indexOf("x");
            if (foundMulIndex !== undefined && foundMulIndex > -1) {
                getDigits(foundMulIndex);
                decider();
            }
        }

        function runAdd() {
            foundAddIndex = objCollector.num1.indexOf("+");
            if (foundAddIndex !== undefined && foundAddIndex > -1) {
                getDigits(foundAddIndex);
                decider();
            }
        }

        function runSub() {
            foundSubIndex = objCollector.num1.indexOf("-");
            if (foundSubIndex !== undefined && foundSubIndex > -1) {
                getDigits(foundSubIndex);
                decider();
            }
        }

        function getDigits(foundIndex) {
            let check = 0;
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
                check++;

                if (!reg.test(objCollector.num1)) {
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

            objCollector.num2 = objCollector.num1[foundIndex];
        }

    }

}

function updateScreen() {
    let print = objCollector.num1.join("");
    output.textContent = print;
    result.textContent = "";
}

function decider(arg1, arg2) {
    arg1 = +firstDigit;
    arg2 = +secondDigit;
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

let reslt;
function updateCollector(arg) {
    if (arg === Infinity) {
        result.textContent = "Error";
        objCollector.num1.splice(0);
    }
    else {
        objCollector.num1.splice(sliceForFirst, ((sliceForSecond - sliceForFirst) + 1), arg);
        reslt = arg;
        reslt.toString().length > 12 ? result.textContent = Math.round(reslt) : result.textContent = arg;
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
