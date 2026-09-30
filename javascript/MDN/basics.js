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


