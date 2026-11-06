// One import principles of OOP, delimiting internal interface from external

// We'll use a coffee machine example
// we'll expose the simple interface to make coffee
// and hide the internal interface (all electronic components)

class CoffeeMachine {
    waterAmount = 0; // the amount of water inside
    constructor(power) {
        this.power = power;
        console.log(`Created a coffee machine, power: ${power}`);
    }
}


let coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = 200;
// here, properties waterAmount and power are public and accessible

// we'll update waterAmount to protected (no one should be able to change it below zero e.g.)
// we'll prefix it with (_) - this is a well known convention
class CoffeeMachine {
    _waterAmount = 0;
    set waterAmount(value) {
        if (value < 0) value = 0;
        this._waterAmount = value;
    }

    get waterAmount() {
        return this._waterAmount;
    }

    constructor(power) {
        this._power = power;
    }
}


coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10


// We'll make powe read-only (because power never changes) - (Also there another syntax for implementing getter/setter)
class CoffeeMachine {
    _waterAmount = 0;
    setWaterAmount(value) {
        if (value < 0) value = 0;
        this._waterAmount = value;
    }

    getWaterAmount() {
        return this._waterAmount;
    }

    constructor(power) {
        this._power = power;
    }

    get power() {
        return this._power;
    }
}

coffeeMachine = new CoffeeMachine(100);
console.log(`Power is: ${coffeeMachine.power}W`); // Power is: 100W
coffeeMachine.power = 25; // Error (no setter)

// NOTE: Protected fields are inherited (here _waterAmount and power)

// Private members start with #, They are only accessible from inside the class
class CoffeeMachine {
    #waterLimit = 200;
    #fixWaterAmount(value) {
        if (value < 0) return 0;
        if (value > this.#waterLimit) return this.#waterLimit;
    }

    setWaterAmount(value) {
        this.#waterLimit = this.#fixWaterAmount(value);
    }
}

let coffeeMachine = new CoffeeMachine();

// can't access privates from outside of the class
coffeeMachine.#fixWaterAmount(120); // Error
coffeeMachine.#waterAmount = 1000; // Error


// Private fields do not conflict with public ones. we can have both
class CoffeeMachine {
  #waterAmount = 0;
  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();
machine.waterAmount = 100;
console.log(machine.#waterAmount); // Error (we can't access the private properties directly)

// if we inherit from CoffeeMachine, we'll have no direct access to private fields
// this is why protected syntax is used more often
class MegaCoffeeMachine extends CoffeeMachine {
    method() {
        console.log(this.#waterAmount); // Error, can only access from CoffeeMachine
    }
}


// Private fields are NOT accessible using this[fieldName] syntax






