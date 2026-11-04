class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }

    run(speed) {
        this.speed = speed;
        console.log(`${this.name} runs with speed of ${this.speed}`);
    }

    stop() {
        this.speed = 0;
        console.log(`${this.name} stands still.`);
    }
}

let animal = Animal("My animal");

class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} hides`);
    }
}

let rabbit = new Rabbit("White Rabbit");
rabbit.run(5);
rabbit.hide();

// extends keyword also works for other expressions (useful for advanced programming patterns)
function f(phrase) {
    return class {
        sayHi() {
            console.log(phrase);
        }
    };
}

class User extends f("Hello") {};
new User().sayHi(); // Hello


// we can override methods to have custom implementation
class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} hides`);
    }

    stop() {
        // Custom implementation of stop() here
        // Now this one will be used instead of stop() from Animal
        // We can still call the parent's stop() as well
        super.stop(); // call stop() from parent
        this.hide(); // then call hide()
    }
}

// Arrow functions don't have super
class Rabbit extends Animal {
    stop() {
        setTimeout(() => super.stop(), 1000); // call parent's stop after 1 second
    }
}


// overriding constructor
// if no constructor is specified, parent's constructor is called implicitly
// to overide a constructor, we MUST call super() before assigning any this

class Rabbit extends Animal {
    constructor(name, earLength) {
        super(name); // MUST call
        this.earLength = earLength;
    }
}

rabbit = new Rabbit("White Rabbit", 10);
console.log(rabbit.name); // White Rabbit
console.log(rabbit.earLength); // 10


// ...skipped the rest...temp