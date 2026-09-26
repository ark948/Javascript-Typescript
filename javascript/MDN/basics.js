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
