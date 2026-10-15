// Instances of classes are created uinsg the new operator

class MyClass {
    // Constructor
    constructor() {
        // Constructor body
    }
    // Instance field
    myField = "foo";
    // Instance method
    myMethod() {
        // myMethod body
    }
    // Static field
    static myStaticField = "bar";
    // Static method
    static myStaticMethod() {
        // myStaticMethod body
    }
    // Static block
    static {
        // Static initialization code
    }
    // Fields, methods, static fields, and static methods all have "private" forms
    #myPrivateField = "bar"; // ?
}


// Constructing a class (instantiating it)
const myInstance = new MyClass();
console.log(myInstance.myField); // 'foo'
myInstance.myMethod();


// IMPORTANT
// Class declarations are not hoisted
// We can't use a class before it is declared

// Class declarations
const MyClass = class {
    // Class body...
}

// Class expressions can have names as well (BE careful with this, i have no idea what is the purpose of this)
const MyClass = class MyClassLongerName {
    // Class body. Here MyClass and MyClassLongerName point to the same class.
};
new MyClassLongerName(); // ReferenceError: MyClassLongerName is not defined


// Constructor (factory of the class)
// it's a piece of code that gets executed when class is instantiated
class Color {
    constructor(r, g, b) {
        // Assign the RGB values as a property of 'this'
        this.values = [r, g, b];
    }
}

const red = new Color(255, 0, 0);
console.log(red);


// another common pattern:
class Color {
    constructor(...values) {
        this.values = values;
    }
}

red = new Color(255, 0, 0);
// Creates an instance with the same shape as above.


// IMPORTANT 
// It is advised not to return anything in constructor (constructor will return 'this')
// IMPORTANT


// Instance methods
class Color {
    constructor(r, g, b) {
        this.values = [r, g, b];
    }
    getRed() {
        return this.values[0];
    }
}

red = new Color(255, 0, 0);
console.log(red.getRed()); // 255


// --------
class Color {
    constructor(r, g, b) {
        this.values = [r, g, b];
    }
    getRed() {
        return this.values[0];
    }
    setRed(value) {
        this.values[0] = value;
    }
}

red = new Color(255, 0, 0);
red.setRed(0);
console.log(red.getRed()); // 0; of course, it should be called "black" at this stage!


// Private fields
class Color {
    // Declare: every Color instance has a private field called #values.
    #values;
    constructor(r, g, b) {
        this.#values = [r, g, b];
    }
    getRed() {
        return this.#values[0];
    }
    setRed(value) {
        this.#values[0] = value;
    }
}

red = new Color(255, 0, 0);
console.log(red.getRed()); // 255

// Accessing private fields outside the class is an early syntax error
// language guards against this because #privateField is a special syntax, so it can do some static analysis

console.log(red.#values); // SyntaxError: Private field '#values' must be declared in an enclosing class

// ----------
// after making values private, we can add some logic to getRed and setRed
class Color {
    #values;
    constructor(r, g, b) {
        this.#values = [r, g, b];
    }
    getRed() {
        return this.#values[0];
    }
    setRed(value) {
        // a simple check to validate assignment of red value
        if (value < 0 || value > 255) {
            throw new RangeError("Invalid R value");
        }
        this.#values[0] = value;
    }
}

red = new Color(255, 0, 0);
red.setRed(1000); // RangeError: Invalid R value


// Class methods can read the private fields, as long as they belong to the same class
class Color {
    #values;
    constructor(r, g, b) {
        this.#values = [r, g, b];
    }
    redDifference(anotherColor) {
        // #values doesn't necessarily need to be accessed from this:
        // you can access private fields of other instances belonging to the same class.
        return this.#values[0] - anotherColor.#values[0];
    }
}

red = new Color(255, 0, 0);
const crimson = new Color(220, 20, 60);
red.redDifference(crimson); // 35
// NOTE: if anotherColor is not a Color instance, it will not have #values and this will fail

// we can use the 'in' operator to handle this
class Color {
    #values;
    constructor(r, g, b) {
        this.#values = [r, g, b];
    }
    redDifference(anotherColor) {
        if (!(#values in anotherColor)) {
            throw new TypeError("Color instance expected");
        }
        return this.#values[0] - anotherColor.#values[0];
    }
}


// private fields cannot have duplicate names

// Methods, getters and setters can be private as well, useful for more complex setups
// (like when something needs to be done internally, that no other part of code should be allowed to call)

