var x = 10;
let y = 20; // added in ES6

function add(a, b) {
    return a + b;
}

let result = add(x, y);
console.log(result); // 30

let a = 20,
    b = 30;

function divide(a, b) {
    if (a == 0) {
        throw "Division by zero";
    }
    return a / b;
}


// an array
let items = [1, 2, 3];
for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
}

// added in ES6
for (let item of items) {
    console.log(item);
}

