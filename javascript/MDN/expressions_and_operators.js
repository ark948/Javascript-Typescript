/*
    Assignment operators
    Comparison operators
    Arithmetic operators
    Bitwise operators
    Logical operators
    BigInt operators
    String operators
    Conditional (ternary) operator
    Comma operator
    Unary operators
    Relational operators
*/

// the precedence of operators determine the order of evaluation
const x = 1 + 2 * 3;
const y = 2 * 3 + 1;


// Assignment operator
/*
Assignment 	                x = f() 	    x = f()
Addition assignment 	    x += f() 	x = x + f()
Subtraction assignment 	    x -= f() 	x = x - f()
Multiplication assignment 	x *= f() 	x = x * f()
Division assignment 	    x /= f() 	x = x / f()
Remainder assignment 	    x %= f() 	x = x % f()
Exponentiation assignment 	x **= f() 	x = x ** f()
Left shift assignment 	    x <<= f() 	x = x << f()
Right shift assignment 	    x >>= f() 	x = x >> f()
Unsigned right shift assignment 	x >>>= f() 	x = x >>> f()
Bitwise AND assignment 	    x &= f() 	x = x & f()
Bitwise XOR assignment 	    x ^= f() 	x = x ^ f()
Bitwise OR assignment 	    x |= f() 	x = x | f()
Logical AND assignment 	    x &&= f() 	x && (x = f())
Logical OR assignment 	    x ||= f() 	x || (x = f())
Nullish coalescing assignment 	x ??= f() 	x ?? (x = f())
*/


// assigning to 
const obj = {};

obj.x = 3;
console.log(obj.x); // Prints 3.
console.log(obj); // Prints { x: 3 }.

const key = "y";
obj[key] = 5;
console.log(obj[key]); // Prints 5.
console.log(obj); // Prints { x: 3, y: 5 }.


// Destructuring
// (without destructing)
const foo = ["one", "two", "three"];

const one = foo[0];
const two = foo[1];
const three = foo[2];

// (with destructuring)
[one, two, three] = foo;



let x;
const y = (x = f()); // Or equivalently: const y = x = f();
console.log(y); // Logs the return value of the assignment x = f().

console.log(x = f()); // Logs the return value directly.

// An assignment expression can be nested in any place
// where expressions are generally allowed,
// such as array literals' elements or as function calls' arguments.
console.log([0, x = f(), 0]);
console.log(f(0, x = f(), 0));



// Avoid assignment chains
const z = y = x = f();


// other operators skipped


function getFullName() {
  return `${this.firstName} ${this.lastName}`;
}

const person1 = {
  firstName: "Chris",
  lastName: "Martin",
};

const person2 = {
  firstName: "Chester",
  lastName: "Bennington",
};

// Attach the same function
person1.getFullName = getFullName;
person2.getFullName = getFullName;

console.log(person1.getFullName()); // "Chris Martin"
console.log(person2.getFullName()); // "Chester Bennington"


// Optional chaining
// The optional chaining syntax (?.) performs the chained operation on an object if it is defined and non-null, and otherwise short-circuits the operation and returns undefined.
// This allows you to operate on a value that may be null or undefined without causing a TypeError.
maybeObject?.property;
maybeObject?.[property];
maybeFunction?.();


const objectName = new ObjectType(param1, param2, /* …, */ paramN);


super(args); // calls the parent constructor.
super.functionOnParent(args);