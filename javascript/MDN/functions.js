function square(number) {
    return number * number;
}

// parameters are passed by value (the outer value is not affected)
// Unless, it's an object or an array

function myFunc(theObject) {
    theObject.make = "Toyota";
}

const myCar = {
    make: "Honda",
    model: "Accord",
    year: 1998,
};

console.log(myCar.make); // "Honda"
myFunc(myCar);
console.log(myCar.make); // "Toyota"

// array
function myFunc(theArr) {
  theArr[0] = 30;
}

const arr = [45];

console.log(arr[0]); // 45
myFunc(arr);
console.log(arr[0]); // 30


// nested function (will create a scope chain)
function addSquares(a, b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}


// function expressions, or anonymous
const square = function (number) {
    return number * number;
}

console.log(square(4)); // 16


// However a name can be provided
const factorial = function fac(n) {
    return n < 2 ? 1 : n * fac(n - 1);
};


// function expressions are convenient when passing a function to another function.
// like in map function that takes a callback

function map(f, a) {
  const result = new Array(a.length);
  for (let i = 0; i < a.length; i++) {
    result[i] = f(a[i]); // apply f on each member of a
  }
  return result;
}

const numbers = [0, 1, 2, 5, 10];
const cubedNumbers = map(function (x) {
  return x * x * x; // bring every member of array to the power of 3
}, numbers);

console.log(cubedNumbers); // [0, 1, 8, 125, 1000]


// defining a function based on a condition
let myFunc;
if (num === 0) {
  myFunc = function (theObject) {
    theObject.make = "Toyota";
  };
}


// a function can call itself (recursive)
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}


// functions are objects themselves. they have the call() and apply() methods

// functions are hoisted
console.log(square(5));
function square(n) {
    return n * n;
}

// IMPORTANT:
// function hoisting only works with function declarations, NOT function expressions

// A recursive function
function loop(x) {
  // "x >= 10" is the exit condition (equivalent to "!(x < 10)")
  if (x >= 10) {
    return;
  }
  // do stuff
  loop(x + 1); // the recursive call
}
loop(0);


// some algorithms are easier to write via recursion (such as DOM)
function walkTree(node) {
  if (node === null) {
    return;
  }
  // do something with node
  for (const child of node.childNodes) {
    walkTree(child);
  }
}


// recursive functions use a stack called the function stack
// the stack-like behavior can be seen in this example:
function foo(i) {
  if (i < 0) {
    return;
  }
  console.log(`begin: ${i}`);
  foo(i - 1);
  console.log(`end: ${i}`);
}
foo(3);

// Logs:
// begin: 3
// begin: 2
// begin: 1
// begin: 0
// end: 0
// end: 1
// end: 2
// end: 3


// An Immediately Invoked Function Expression (IIFE) is a code pattern that directly calls a function defined as an expression.
(function () {
  // Do something
})();

const value = (function () {
  // Do something
  return someValue;
})();


