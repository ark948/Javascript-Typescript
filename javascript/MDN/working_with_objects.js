// Objects are collections of associated values called properties and functions called methods

// Create objects using object initializers aka object literals
const obj1 = {
    property1: value1, // property name may be an identifier
    2: value2, // or a number
    "property n": value3, // or a string
};


// an object within an object as a property
const myHonda = {
    color: "red",
    wheels: 4,
    engine: {
        cylinders: 4,
        size: 2.2
    },
};


// Object constructor can also be used to create new objects (new)

// or with constructor function
function Car(make, model, year) {
    this.maek = make;
    this.model = model;
    this.year = year;
}

const myCar = new Car("Eagle", "Talon TSi", 1993);
const randCar = new Car("Nissan", "300ZX", 1992);
const kenCar = new Car("Mazda", "Miata", 1990);

// an object can be member of another object
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}


const rand1 = new Person("Rand McKinnon", 33, "M");
const ken = new Person("Ken Jones", 39, "M");

function Car(make, model, year, owner) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.owner = owner;
}

const car1 = new Car("Eagle", "Talon TSi", 1993, rand1);
const car2 = new Car("Nissan", "300ZX", 1992, ken);


// Object.create()
// allows us to choose the prototype while creating the object

// Animal properties and method encapsulation
const animalProto = {
    type: "Invertebrates", // Default value of properties
    displayType() {
        // Method which will display the type of animal
        console.log(this.type);
    },
};


// Create a new animal type called `animal`
const animal = Object.create(animalProto);
animal.displayType(); // Logs: Invertebrates

// Create a new animal type called fish
const fish = Object.create(animalProto);
fish.type = "Fishes"; // overriding the default value of type property
fish.displayType(); // Logs: Fishes

const myCar1 = {
    make: "Ford",
    model: "Mustang",
    year: 1969,
};

// there are two ways to access properties, dot notation, bracket notation
myCar1.make = "Ford";

myCar1["make"] = "ford";

// other examples
const myObj = {};
const str = "myString";
const rand = Math.random();
const anotherObj = {};

// Create additional properties on myObj
myObj.type = "Dot syntax for a key named type";
myObj["date created"] = "This key has a space";
myObj[str] = "This key is in variable str";
myObj[rand] = "A random number is the key here";
myObj[anotherObj] = "This key is object anotherObj";
myObj[""] = "This key is an empty string";


console.log(myObj);
// {
//   type: 'Dot syntax for a key named type',
//   'date created': 'This key has a space',
//   myString: 'This key is in variable str',
//   '0.6398914448618778': 'A random number is the key here',
//   '[object Object]': 'This key is object anotherObj',
//   '': 'This key is an empty string'
// }
console.log(myObj.myString); // 'This key is in variable str'


// there are three ways to traverse object properties:
// for..in, object.keys(), object.getOwnPropertyNames()


// this function will display properties of tha passed object (object's name should also be provided)
function showProps(obj, objName) {
    let result = "";
    for (const i in obj) {
        // Object.hasOwn() is used to exclude properties from the object's prototype chain and only show "own properties"
        if (Object.hasOwn(obj, i)) {
            result += `${objName}.${i} = ${obj[i]}\n`;
        }
    }
    console.log(result);
}


// also equal to:
function showProps(obj, objName) {
    let result = "";
    Object.keys(obj).forEach((i) => {
        result += `${objName}.${i} = ${obj[i]}\n`;
    });
    console.log(result);
}


// There is no native way to list all inherited properties, including non-enumerable ones. However, this can be achieved with the following function:
function listAllProperties(myObj) {
    let objectToInspect = myObj;
    let result = [];

    while (objectToInspect !== null) {
        result = result.concat(Object.getOwnPropertyNames(objectToInspect));
        objectToInspect = Object.getPrototypeOf(objectToInspect);
    }

    return result;
}


// non-inherited properties can be deleted
const myObj = {
    a: 5,
    b: 12
};

// Remove a, leaving myObj with only b
delete myObj.a;
console.log("a" in myObj); // fasle


// All objects in JavaScript inherit from at least one other object. 

// The following code adds a color property to all objects of type Car
Car.prototype.color = "red";
// Then it can be read from a instance of Car, like car1
console.log(car1.color); // "red"


// Defining methods
const myObj = {
  myMethod: function (params) {
    // do something
  },

  // this works too!
  myOtherMethod(params) {
    // do something else
  },
};


// defining a method at prototype level is also possible
Car.prototype.displayCar = function () {
    const result = `A beautiful ${this.year} ${this.make} ${this.model}`;
    console.log(result);
};


car1.displayCar();
car2.displayCar();

// this keyword refers to the current object
const manager = {
  name: "Karina",
  age: 27,
  job: "Software Engineer",
};
const intern = {
  name: "Tyrone",
  age: 21,
  job: "Software Engineer Intern",
};

function sayHi() {
  console.log(`Hello, my name is ${this.name}`); // Notice the use of this
}

// Add sayHi function to both objects
manager.sayHi = sayHi;
intern.sayHi = sayHi;

manager.sayHi(); // Hello, my name is Karina
intern.sayHi(); // Hello, my name is Tyrone



// Defining getters and setters
const myObj = {
    a: 7,

    get b() {
        return this.a + 1;
    },

    set c(x) {
        this.a = x / 2;
    }
}

console.log(myObj.a); // 7
console.log(myObj.b); // 8, returned from the get b() method
myObj.c = 50; // Calls the set c(x) method
console.log(myObj.a); // 25
// (c itself is a setter method not a value)

// Getters and Setters can be assigned later as well, using Object.defineProperties() method
const myObj = { a: 0 };
Object.defineProperties(myObj, {

    b: {
        get() {
            return this.a + 1;
        },
    },

    c: {
        set(x) {
            this.a = x / 2;
        },
    },

});


myObj.c = 10; // Runs the setter, which assigns 10 / 2 (5) to the 'a' property
console.log(myObj.b); // Runs the getter, which yields a + 1 or 6


// IMPORTANT
// In JavaScript, objects are a reference type. Two distinct objects are never equal, even if they have the same properties. 
// Only comparing the same object reference with itself yields true.

// Two variables, two distinct objects with the same properties
const fruit = { name: "apple" };
const anotherFruit = { name: "apple" };

fruit == anotherFruit; // return false
fruit === anotherFruit; // return false

// Two variables, a single object
fruit = { name: "apple" };
anotherFruit = fruit; // Assign fruit object reference to anotherFruit

// Here fruit and anotherFruit are pointing to same object
fruit == anotherFruit; // return true
fruit === anotherFruit; // return true

fruit.name = "grape";
console.log(anotherFruit); // { name: "grape" }; not { name: "apple" }