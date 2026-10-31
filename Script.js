const display = document.getElementById("Display");
const buttons = document.querySelectorAll("button");

let current = "";
let previous = "";
let operator = "";

function updateDisplay() {
    if (operator !== "") {
        display.innerText = previous + " " + operator + " " + current;
    } else if (current !== "") {
        display.innerText = current;
    } else {
        display.innerText = "0";
    }
}

function calculate() {
    if (previous === "" || operator === "" || current === "") {
        return;
    }

    const a = Number(previous);
    const b = Number(current);
    let result;

    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            if (b === 0) {
                current = "Error";
                previous = "";
                operator = "";
                return;
            }
            result = a / b;
            break;   
        case "%":
            if (b === 0) {
                current = "Error";
                previous = "";
                operator = "";
                return;
            }
            result = a * b / 100;
            break; 
    }

    current = String(result);
    previous = "";
    operator = "";
}

buttons.forEach(function (button) {
    button.addEventListener("click", function() {
        const value = button.innerText;

        if (current === "Error") {
            current = "";
        }

        if (value === "C") {
            current = "";
            previous = "";
            operator = "";
        } else if (value === "DEL") {
            current = current.slice(0, -1);
        } else if (value === "=") {
            calculate();
        } else if (["+", "-", "*", "/", "%"].includes(value)) {
            if (current !== "") {
                previous = current;
                operator = value;
                current = "";
            }
        } else if (value === ".") {
            if (!current.includes(".")) {
                if (current === "") {
                    current = "0";
                }
                current = current + ".";
            }
        } else if (value === "00") {
            if (current !== "" && current !== "0") {
                current = current + "00";
            }
        } else {
            current = current + value;
        }
        updateDisplay();
    });
});

updateDisplay();