// we can use the 'new' operator to create multiple similar objects
// (and with the help of functions)


function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");
alert(user.name); // Jack
alert(user.isAdmin); // false


// this is what happens behind the scenes:
function User(name) {
    // this = {};  (implicitly)

    // add properties to this
    this.name = name;
    this.isAdmin = false;

    // return this;  (implicitly)
    // if return with object is present (PRIMITIVE is ignored) it will be returned instead
    return { name: "Godzilla" };
}


// Immediately called constructor function
// THIS IS EXECUTED RIGHT AWAY
let user1 = new function() {
    this.name = "John";
    this.admin = false;
    // other code and logic to execute
};

// Parentheses can be omitted while instantiating, but it is not a good practice

// constructor functions can have methods
function User(name) {
    this.name = name;
    this.sayHi = function() {
        console.log("My name is " + this.name);
    };
}

let john = new User("John");
john.sayHi(); // My name is: John


// Tasks

// create a constructor function Calculator with read, sum and mul
// My Answer Fully OK
function Calculator() {
    this.read = function() {
        this.a = +prompt("Enter a: ", 0);
        this.b = +prompt("Enter b: ", 0);
    }

    this.sum = function() {
        return this.a + this.b;
    }

    this.mul = function() {
        return this.a * this.b;
    }
}

// create an Accumulator constructor function
// takes an initial value and method of read
// every time read is called, prompt for a new number and add it to the value
// I had some mistakes, but general idea was ok
function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = function() {
        this.value += +prompt("Enter new value: ", 0);
        // if return is omitted, 'this' is returned, i think
    }
}