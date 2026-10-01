// javascript is case-sensitive and uses Unicode character set
const Früh = "foobar"; // it means early in german language


// Comments
// a one line comment

/* this is a longer,
 * multi-line comment
 */

/* You can /* nest comments *\/ by escaping slashes */


// Const variables must be initialized right after declaration

// A variable may belong to one of three scopes: Global, Module, Function
// Variables declared with let and const can have an additonal scope called Block (inside curly braces)

if (Math.random() > 0.5) {
    const y = 5;
}

console.log(y); // ReferenceError: y is not defined

if (true) {
    var x = 5;
}

console.log(x); // x is 5


// Var declared variables are hoised (they are brought to top, and are accessible from anywhere)
// for let and const, it's another story
console.log(x === undefined); // true
var x = 3;

(function () {
    console.log(x); // undefined
    var x = "local value";
})

// Functions however are always hoisted and can be safely called from anywhere


// let and const hoisting should not be relied on
console.log(x); // ReferenceError
const x = 3;

console.log(y); // ReferenceError
let y = 3;


// window is the global variable
// other global variables can be assigned to this as needed (like htmx and Alpine)
console.log(window);


// This is a constant
const PI = 3.14;


// Constant values cannot be re-assigned after initialization
// However they can be mutated. The following is OK:
const MY_OBJECT = { key: "value" };
MY_OBJECT.key = "AnotherValue";

// also ok:
const myArray = ["HTML", "CSS"];
myArray.push("JAVASCRIPT");
console.log(myArray);  // ['HTML', 'CSS', 'JAVASCRIPT'];


// the + operator converts numeric values to string:
x = "The answer is " + 42; // "The answer is 42"
y = 42 + " is the answer"; // "42 is the answer"
z = "37" + 7; // "377"


// To convert strings to numbers, we have:
// parseInt(), parseFloat(), Number()

// don't use parseInt() for decimals
// also it's best to provide the radix parameter (indicates which numeric system to use)
console.log(parseInt("101", 2)); // 5

// An alternative method is retrieving a number from a sting is to use +
// this implicitly performs number conversion:
"1.1" + "1.1"; // '1.11.1'
(+"1.1") + (+"1.1"); // 2.2
// Note: the parentheses are added for clarity, not required.


// Primitives in Javascript: Booelan, null, undefined, Number, BigInt, String, Symbol
// Other than primitives we have Object

// functions are technically object

// JS is dynamically typed (no need to specify data type)
let answer = 42;
// re-assigning is also ok:
answer = "This is a message";

// In JS, str + int = str


// Literals -> fixed values that you provide in script

// Array literals:
const coffees = ["French Roast", "Colombian", "Kona"];

// empty value in arrays (JS leaves an empty space for them)
const fish = ["Lion", , "Angel"]; // length is 3
console.log(fish);
// [ 'Lion', <1 empty item>, 'Angel' ]

// empty != undefined

// for traversing, empty slots are skipped, but index-accessing fish[1] returns undefined
// the last comma will be ignored
const myList1 = ["home", , "school", ,]; // length is 4, mylist[1] and mylist[3] are missing


// CODE CLARITY: always explicitly indicate absence of elements with either undefined or a comment
const myList2 = ["home", /* empty */, "school", /* empty */, ];


// Examples of Integer Literals:
// 0, 117, 123456789123456789n             (decimal, base 10)
// 015, 0001, 0o777777777777n              (octal, base 8)
// 0x1123, 0x00111, 0x123456789ABCDEFn     (hexadecimal, "hex" or base 16)
// 0b11, 0b0011, 0b11101001010101010101n   (binary, base 2)


// Floating-point literals
// 3.1415926
// .123456789
// 3.1E+12
// .1e-23



// Three examples of object literals
const sales = "Toyota";

function carTypes(name) {
  return name === "Honda" ? name : `Sorry, we don't sell ${name}.`;
}

const car = { myCar: "Saturn", getCar: carTypes("Honda"), special: sales };

console.log(car.myCar); // Saturn
console.log(car.getCar); // Honda
console.log(car.special); // Toyota


car = { manyCars: { a: "Saab", b: "Jeep" }, 7: "Mazda" };
console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda


// How to access valid and invalid object property names?
const unusualPropertyNames = {
    "": "An empty string",
    "!": "Bang"
};

console.log(unusualPropertyNames.""); // ReferenceError
console.log(unusualPropertyNames.!); // ReferenceError

console.log(unusualPropertyNames[""]); // An empty string
console.log(unusualPropertyNames["!"]); // Bang



// I don't what this part supposed to be
// Enhanced Object literals
const thatProtoObj = {};
const handler = {};
const obj = {
    __proto__: thatProtoObj,
    handler, // short for 'handler: handler'
    toString() {
        return `d ${super.toString()}`; // super calls
    },
    ["prop_" + (() => 42)()]: 42, // computed (dynamic) property names
};


const re = /ab+c/; // RegExp literal


// String literal
// Will print the number of symbols in the string including whitespace.
console.log("Joyo's cat".length); // In this case, 10.


// NOTE: String literal != String object
// but all String object's methods can be used on String litral value (JS automatically converts it to String object temporarily, calls the method, then discards the temporary String object)


// Template literals (done by back-tick) aka String interpolation aka syntactic sugar
const name = "Lev",
  time = "today";
`Hello ${name}, how are you ${time}?`;


