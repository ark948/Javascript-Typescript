// A Class is a template for creating objects

class User {
    constructor(name) {
        // Constructor will always be called
        this.name = name;
    }

    sayHi() {
        console.log(this.name);
    }
}

let user0 = new User("John");
user0.sayHi();


console.log(typeof User); // function
console.log(typeof User.prototype.constructor); // or more precisely, the constructor method
console.log(User.prototype.sayHi); // methods are in User.prototype
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

// Class can be defined in another way:
let User = class {
    sayHi() {
        console.log("Hello");
    }
};

// there are other ways as well:
function makeClass(phrase) {
    return class {
        sayHi() {
            console.log(phrase);
        }
    };
}

let User = makeClass("Hello");
new User().sayHi(); // Hello


// Similar to literal objects, Classes may include getters/setters and computed properties
class User {
    constructor(name) {
        // invokes the setter
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short");
            return;
        };
        this._name = value;
    }
}

let user1 = new User("Dude");
console.log(user1.name); // John
user1 = new User(""); // Name is too short


// Computed names
// an example of a computed name using brackets
class User {
    ['say' + 'Hi']() {
        console.log("Hello");
    }
}

new User().sayHi();

// Class fields (allows us to add any properties)
// Recent addition (old browsers may need polyfill)
class User {
    name = "John";
    sayHi() {
        console.log(`Hello, ${this.name}`);
    }
}

new User().sayHi(); // Hello John

// the difference is that class fields are set on individual objects, not User.prototype
class User {
    name = "John";
}

let user2 = new User();
console.log(user2.name); // John
console.log(User.prototype.name); // undefined

// using more complex expressions and function calls is also accepted
class User {
    name = prompt("Name, please?", "John");
}

let user = new User();
console.log(user.name); // John


// Making bound methods with class fields
class Button {
    constructor(value) {
        this.value = value;
    }

    click() {
        alert(this.value);
    }
}

let button = new Button("hello");
setTimeout(button.click, 1000); // undefined (because we lose 'this')

// to fix this, we can make a wrapper function that will be created per-object basis
class Button {
    constructor(value) {
        this.value = value;
    }

    click = () => {
        console.log(this.value);
    }
}

button = new Button("hello");
setTimeout(button.click, 1000); // hello

// Summary
class MyClass {
    prop = value; // class field property
    constructor() {
        // invoked when instantiating objects
    }

    method() {
        // a method
    }

    get something() {
        // getter
    }

    set something(value) {
        // setter
    }

    [Symbol.iterator]() {
        // method with computed name
    }
}

// Tasks
// re-write the functional Clock in class
function Clock({ template }) {
    let timer;
    function render() {
        let date = new Date();
        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = template.replace('h', hours).replace('m', mins).replace('s', secs);
        console.log(output);
    }

    this.stop = function () {
        clearInterval(timer);
    };

    this.start = function () {
        render();
        timer = setInterval(render, 1000);
    };
}

let clock = new Clock({ template: 'h:m:s' });
clock.start();

// Re-Write in Class
class Clock {
    constructor({ template }) {
        this.template = template;
    }

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    }

    stop() {
        clearInterval(this.timer);
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}


let clock1 = new Clock({ template: 'h:m:s' });
clock1.start();