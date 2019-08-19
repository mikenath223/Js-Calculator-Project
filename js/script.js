const banner = document.querySelector(".banner");
let output = document.querySelector(".inner");
let result = document.querySelector(".result");
let alert = document.querySelector(".alert");
let powerON = document.querySelector("#ON");
let clear = document.querySelector(".clear");

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

let filtered1;
function pickOperator(x) {
    objCollector.num1.push(x);
    console.log("Objcollector ", objCollector.num1);
    objCollector.num1.forEach(item => {
        if (item == "-" || item == "+" || item == "/" || item == "x") {
            newItem = objCollector.num1.join("");
            console.log("newItem ", newItem);
        }
    });
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
                objCollector.num1.forEach(item => {
                    if (item == "-" || item == "+" || item == "/" || item == "x") {
                        filtered1 = newItem.split(`${item}`);
                        console.log("filtered1 ", filtered1);
                    }
                });
            });
        } else if (
            x === "x" ||
            x === "." ||
            x === "-" ||
            x === "+" ||
            x === "/"
        ) {
            buttText.addEventListener("click", () => {
                x = buttText.textContent;
                pickOperator(x);
                updateScreen();
                objCollector.num1.forEach(item => {
                    if (item == "-" || item == "+" || item == "/" || item == "x") {
                        filtered1 = newItem.split(`${item}`);
                        console.log("filtered1 ", filtered1);
                    }
                });
            });
        } else if (x === "Enter") {
            buttText.addEventListener("click", () => {
                objCollector.num1.forEach(item => {
                    if (item == "-" || item == "+" || item == "/" || item == "x") {
                        filtered1 = newItem.split(`${item}`);
                        console.log("filtered1 ", filtered1);
                    }
                });
                decider();
            });
        } else if (x === "AC") {
            buttText.addEventListener("click", () => {
                objCollector.num1.pop();
                console.log("obj", objCollector.num1);
                updateScreen();
            });
        }
    });
}

function updateScreen() {
    let print;
    print = objCollector.num1.join("");
    output.textContent = print;
    result.textContent = "";
}

function decider(arg1, arg2) {
    arg1 = +filtered1[0];
    arg2 = +filtered1[1];
    if (objCollector.num1.includes("+")) {
        addOperator(arg1, arg2);
    } else if (objCollector.num1.includes("-")) {
        minusOperator(arg1, arg2);
    } else if (objCollector.num1.includes("x")) {
        timesOperator(arg1, arg2);
    } else if (objCollector.num1.includes("/")) {
        divOperator(arg1, arg2);
    }
}

let addOperator = (arg1, arg2) => {
    let added = arg1 + arg2;
    updateCollector(added);
};
let minusOperator = (arg1, arg2) => {
    let subtracted = arg1 - arg2;
    updateCollector(subtracted);
};
let timesOperator = (arg1, arg2) => {
    multiplied = arg1 * arg2;
    updateCollector(multiplied);
};
let divOperator = (arg1, arg2) => {
    let divided = arg1 / arg2;
    updateCollector(divided);
};

function updateCollector(arg) {
    result.textContent = arg;
    if (arg === Infinity) {
        setTimeout(() => {
            result.textContent = "Hey can't divide by 0!";
            result.style.fontSize = "17px";
            objCollector.num1.splice(0);
        }, 100);
    }
    if (isNaN(arg)) {
        arg1 = 0;
        arg2 = 0;
        output.textContent = "One operator a time!";
        setTimeout(() => {
            result.innerHTML = "Example(2 x 2)" + "<br>" + "Not(2 x 2 x 2)";
            result.setAttribute("style", "font-size:11px;font-weight:bold;color:black");
            objCollector.num1.splice(0);
        }, 10);
    }
    objCollector.num1.splice(0);
    objCollector.num1.push(arg);
}
