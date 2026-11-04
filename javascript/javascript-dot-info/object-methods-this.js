// objects are made to represent real world entities
// and just like them, they can act (methods)

let user1 = {
    name: "John",
    age: 30
};

user1.sayHi = function () {
    console.log("Hello");
};

user1.sayHi();

// There is a shorter syntax for this:
user1 = {
    sayHi: function () {
        console.log("Hey");
    }
};

user1 = {
    sayHi() {
        console.log("Even shorter");
    }
};


// we can use 'this' to access other information stored on the object
let user2 = {
    name: "John",
    age: 30,
    sayHi() {
        // "this" is the current object
        console.log(this.name);
    }
};

user2['sayHi'](); // another way to invoke methods

// 'this' works in functions as well
function sayBye() {
    console.log(this.name);
}

user2.f = sayBye;
user2.f(); // John


// IMPORTANT
// Arrow functions do not have 'this'
// however they can get it from outer function context
let user3 = {
    firstName: "Ilya",
    sayHi() {
        let arrow = () => console.log(this.firstName);
        arrow();
    }
};

user3.sayHi(); // Ilya


// Tasks
// Create an object calculator with three methods: read(), sum(), mul()
// My answer is OK, but a more concise answer exists
let calculator = {
    read() {
        let a = prompt("Enter a: ");
        let b = prompt("Enter b: ");
        this.a = parseInt(a);
        this.b = parseInt(b);
    },

    sum() {
        return this.a + this.b;
    },

    mul() {
        return this.a * this.b;
    },
};

// More advanced solution
calculator = {
    sum() {
        return this.a + this.b;
    },

    mul() {
        return this.a * this.b;
    },

    read() {
        this.a = +prompt('enter a:', 0); // + here is unary operator that converts a to integer, 0 is default
        this.b = +prompt('enter b:', 0);

        // if number is NOT convertable to integer, NaN will be returned
        // we can improve this even further by validating input number and check for NaN
        if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
            console.error("Invalid input, cannot convert to integer");
        };
    }
};


// Task 2
// there is a ladder object allows you to go up and down:
let ladder = {
    step: 0,
    up() {
        this.step++;
    },
    down() {
        this.step--;
    },
    showStep: function () { // shows the current step
        alert(this.step);
    }
};

ladder.up();
ladder.down();
ladder.showStep();

// Modify the object to make the calls chainable:
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0

// All we have to do is to return this at the end of every function:
ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep() {
        alert(this.step);
        return this;
    }
};
