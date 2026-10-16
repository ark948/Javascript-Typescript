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

// example, we're creating a custom HTML element, it should do something complicated when clicked, tapped or ...
// this behavior must be restricted to this element only, no other part of Javascript should or will access it
class Counter extends HTMLElement {
    #xValue = 0;
    constructor() {
        super();
        this.onclick = this.#clicked.bind(this);
    }
    get #x() {
        return this.#xValue;
    }
    set #x(value) {
        this.#xValue = value;
        window.requestAnimationFrame(this.#render.bind(this));
    }
    #clicked() {
        this.#x++;
    }
    #render() {
        this.textContent = this.#x.toString();
    }
    connectedCallback() {
        this.#render();
    }
}

customElements.define("num-counter", Counter);

// Accessor fields
class Color {
    constructor(r, g, b) {
        this.value = [r, g, b];
    }

    get red() {
        return this.values[0];
    }

    set red(value) {
        this.value[0] = value;
    }
}

red = new Color(255, 0, 0);
red.red = 0;
console.log(red.red); // 0


// if setter is not defined, that property is paractically read-only (will throw error in strict-mode)

// Public fields
class MyClass {
    luckyNumber = Math.random();
}
console.log(new MyClass().luckyNumber); // 0.5
console.log(new MyClass().luckyNumber); // 0.3

// This is equal to
class MyClass {
    constructor() {
        this.luckyNumber = Math.random();
    }
}


// Static methods are methods that belong to the class itself and can be invoked directly
// (Other members can be static as well, like methods, fields, getters and setters)

class Color {
    static isValid(r, g, b) {
        return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
    }
}

Color.isValid(255, 0, 0); // true
Color.isValid(1000, 0, 0); // false

// IMPORTANT
// static properties are NOT accessible from instances
// IMPORTANT

// Static initialization block is a special construct that runs when the class is first run
class MyClass {
    static {
        MyClass.myStaticProperty = "foo";
    }
}

console.log(MyClass.myStaticProperty); // "foo"

class Color {
    #values;
    constructor(r, g, b, a = 1) {
        this.#values = [r, g, b, a];
    }

    get alpha() {
        return this.#values[3];
    }

    set alpha(value) {
        if (value < 0 || value > 1) {
            throw new RangeError("Alpha value must be between 0 and 1");
        }
        this.#values[3] = value;
    }
}


class ColorWithAlpha extends Color {
    #alpha;
    constructor(r, g, b, a) {
        super(r, g, b);
        this.#alpha = a;
    }

    get alpha() {
        return this.#alpha;
    }

    set alpha(value) {
        if (value < 0 || value > 1) {
            throw new RangeError("Alpha value must be between 0 and 1");
        }
        this.#alpha = value;
    }
}


// Derived classes can override methods from their parents
// for example, all classes implicitly inherit from Object, which has the toString method
// by default it is useless, because it prints [object Object]
// we can override this with something more meaningful
class Color {
    #values;
    constructor(r, g, b, a = 1) {
        this.#values = [r, g, b, a];
    }

    get alpha() {
        return this.#values[3];
    }

    set alpha(value) {
        if (value < 0 || value > 1) {
            throw new RangeError("Alpha value must be between 0 and 1");
        }
        this.#values[3] = value;
    }

    toString() {
        return this.#values.join(", ");
    }
}

console.log(new Color(255, 0, 0).toString()); // '255, 0, 0'


// we can access parent's methods by using the super keyword
class ColorWithAlpha extends Color {
    #alpha;
    constructor(r, g, b, a) {
        super(r, g, b);
        this.#alpha = a;
    }

    get alpha() {
        return this.#alpha;
    }

    set alpha(value) {
        if (value < 0 || value > 1) {
            throw new RangeError("Alpha value must be between 0 and 1");
        }
        this.#alpha = value;
    }

    toString() {
        // Call the parent class's toString() and build on the return value
        return `${super.toString()}, ${this.#alpha}`;
    }
}

console.log(new ColorWithAlpha(255, 0, 0, 0.5).toString()); // '255, 0, 0, 0.5'

// Static methods of parent class can also be overridden like regular methods
// (don't forget the static keyword)

// IMPORTANT
// derived class don't have access to parent's private fields

// Classes can only extend from one class
// This is on purpose to avoid mulitple inheritance problems like the diamond problem
// however some multiple inheritance effects can be achieved through mixins


// instances of derived classes are instances of base class
const color = new ColorWithAlpha(255, 0, 0, 0.5);
console.log(color instanceof Color); // true
console.log(color instanceof ColorWithAlpha); // true

