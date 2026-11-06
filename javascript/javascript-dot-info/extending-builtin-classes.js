// Built-in classes like Array, Map and others are extendable

// example: here PowerArray inherits from Array
class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
}

let arr = new PowerArray(1, 2, 3, 10, 15);
console.log(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10); // Also notice: here filter returns PowerArray as well
console.log(filteredArr); // 10, 15
console.log(filteredArr.isEmpty()); // false


// So, methods like filter and map return the same inherited class (PowerArray), because they use arr.constructor
// We can customize this behavior using Symbol.species and static getter

class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }

    // built-in methods will use this as the constructor
    static get [Symbol.species]() {
        return Array;
    }
}

arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
filteredArr = arr.filter(item => item >= 10);

// filteredArr is not PowerArray, but Array (Regular array in javascript)
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function

// This can be done for Map, Set and some others as well


// Built-in classes do not inherit statics from each other (More research required on this)