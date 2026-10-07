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

// IIFEs create an extra scope of variables, which helps to confine variables the the place where they are useful

// Function scopes and closures
// inside variables cannot be accessed from outside
// global variables are accessible everywhere
// a function declared inside another function can access variables from its parent function 
// (and any other variable to which the parent has access)

// Parent function CANNOT access inner fucntion variables

// some variables in global scope
const num1 = 20;
const num2 = 3;
const name = "Chamakh";

// function in global scope
function multiply() {
  return num1 * num2;
}


console.log(multiply()); // 60

// nested function example
function getScore() {
  const num1 = 2;
  const num2 = 3;

  function add() {
    return `${name} scored ${num1 + num2}`;
  }

  return add();
}


console.log(getScore()); // Chammakh scored 5

// Using IIFE pattern to make a variable inaccessible from outside - encapsulation
const getCode = (function () {
  const apiCode = "somecode"; // something we don't want outsiders be able to modify
  return function () {
    return apiCode;
  }
})();

console.log(getCode()); // "somecode"


// multiple-nested functions
// scope chaining
function A(x) {
  function B(y) {
    function C(z) {
      console.log(x + y + z);
    }
    C(3);
  }
  B(2);
}
A(1); // Logs 6 (which is 1 + 2 + 3)


// in nested functions, if there is a name conflict, the innermost scope takes highest precedence
function outside() {
  const x = 5;
  function inside(x) {
    return x * 2;
  }
  return inside;
}

console.log(outside()(10)); // 20 (instead of 10)


// The arguments of a function are maintained in an array-like object. Within a function, you can address the arguments passed to it
// also use arguments.length to access the number of arguments

function myConcat(separator) {
  let result = ""; // initialize list
  // iterate through arguments
  for (let i = 1; i < arguments.length; i++) {
    result += arguments[i] + separator;
  }
  return result;
}

console.log(myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley"));
// "sage. basil. oregano. pepper. parsley. "

// NOTE: arguments array is array-like not an actual array (it only has some array-like properties)


// Function parameters
function multiply(a, b) {
  b = typeof b !== "undefined" ? b : 1;
  return a * b;
}

console.log(multiply(5)); // 5

// can be shortened to a parameter with default value
function multiply(a, b = 1) {
  return a * b;
}

console.log(multiply(5)); // 5


// rest parameter (infinite number of params)
function multiply(multiplier, ...theArgs) {
  return theArgs.map((x) => multiplier * x);
}

arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]


// arrow functions aka fat arrow
// shorter syntax, no this, no arguments, no super, no new.target, always anonymous
const a = ["Hydrogen", "Helium", "Lithium", "Beryllium"];
const a2 = a.map(function (s) {
  return s.length;
});

console.log(a2); // [8, 6, 7, 9]

// re-written as arrow function
const a3 = a.map((s) => s.length);
console.log(a3); // [8, 6, 7, 9]


// this refers to the object itself
function Person() {
  // The Person() constructor defines `this` as itself.
  this.age = 0;

  setInterval(function growUp() {
    // In nonstrict mode, the growUp() function defines `this`
    // as the global object, which is different from the `this`
    // defined by the Person() constructor.
    this.age++;
  }, 1000);
}

const p = new Person();


// some prefer self or this
function Person() {
  // Some choose `that` instead of `self`.
  // Choose one and be consistent.
  const self = this;
  self.age = 0;

  setInterval(function growUp() {
    // The callback refers to the `self` variable of which
    // the value is the expected object.
    self.age++;
  }, 1000);
}


// arrow functions do not have this
function Person() {
  this.age = 0;

  setInterval(() => {
    this.age++; // `this` properly refers to the person object
  }, 1000);
}

p = new Person();


