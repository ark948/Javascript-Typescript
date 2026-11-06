// instanceof operator allows to check whether an object belongs to a certain class
// also take inheritance into account

class Rabbit {}
let rabbit = new Rabbit();

console.log(rabbit instanceof Rabbit); // true

// it also works with function constructors
function Rabbit() {}

console.log(new Rabbit() instanceof Rabbit); // true

// also with built-in classes like Array
let arr = [1, 2, 3];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true

// instanceof examines the prototype chain for the check
// we can also set custom logic with static method Symbol.hasInstance

// example
// we set up instanceof to assume that anything with canEat property is an Animal
class Animal {
    static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
    }
}

let obj = {
    canEat: true
};

console.log(obj instanceof Animal); // true, Animal[Symbol.hasInstance](obj) is called


// if a class does not have a Symbol.hasInstance, the standard logic is used
// obj instanceof Class will check both's prototype
// obj.__proto__ === Class.prototype?
// obj.__proto__.__proto__ === Class.prototype?
// obj.__proto__.__proto__.__proto__ === Class.prototype?

// if any answer is true, it'll return true
// otherwise, if reached the end of chain, return false


class Anima {}
class Rabbit extends Animal {}

rabbit = new Rabbit();
console.log(rabbit instanceof Animal); // true

// rabbit.__proto__ === Animal.prototype (no match)
// rabbit.__proto__.__proto__ === Animal.prototype (match!)

