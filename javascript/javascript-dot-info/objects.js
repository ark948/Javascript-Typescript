// Objects are used to store keyed collections of various data and more complex entities

// Objects can be created using curly braces

let user = new Object(); // object constructor syntax
let user2 = {}; // object literal syntax

// we can put properties into our objects using "key:value" pairs:
let user3 = {
    name: "John",
    age: 30
};

// Accessing object properties using dot notation
console.log(user3.name);

// we can also add properties like this:
user3.isAdmin = true;

// And remove
delete user3.age;

// multi-word property names are also acceptable, but they must be quoted
let user4 = {
    name: "Dude",
    age: 300,
    "likes birds": true, // a comma in the last is called trailing or hanging comma and it is ok
};

// IMPORTANT
// dot notation does not work with multiword keys

// square bracket notation is an alternative to dot notation that works with everything

// get
console.log(user4["age"]); // 300
console.log(user4["likes birds"]); // true

// set
user["likes birds"] = true;

// delete
delete user["likes birds"];


// square bracket notation also works with result of expressions as key
let key = "likes birds";
user4[key] = true;


// key must be calculated at run-time or depend on user input
key = prompt("What do you want to know about the user4, name or age?", "name"); // if no input provided, key will equal name
console.log(user4[key]);

// We can use square brackets in an object literal, when creating an object, it's called computed properties
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {
    [fruit]: 5, // the name of the property will be taken from user's input, with default of apple
};

console.log(bag.apple); // 5 if fruit = "apple"

// similar approach
fruit = prompt("Which fruit to buy?", "apple");
bag = {}
bag[fruit] = 5;

// More complex expressions inside square brackets
fruit = 'apple';
bag = {
    [fruit + 'Computers']: 5, // bag.appleComputers = 5
}

// using function to create objects
function makeUser(name, age) {
    return {
        name: name,
        age: age,
    };
}

user = makeUser("John", 30);
console.log(user.name);

// if the name of the property and the variable are the same, there is a shorthand for it, since this is so common:
function makeUser(name, age) {
    return {
        name, // same as name: name
        age, // same as age: age
    };
}

// can also be used in object expression
user = {
    name, // same as name: name
    age: 30,
};

// Object property names can be language reserved words
let obj = {
    for: 1,
    let: 2,
    return: 3
};

alert(obj.for + obj.let + obj.return);  // 6


// Strings and Symbols are also acceptable (especial type for idenitifiers, to be covered later)
obj = {
    0: "test" // here 0 becomes "0"
};

// and both access the same property
alert(obj["0"]); // test
alert(obj[0]); // test (same property)


// There is an exception: __proto__ (CANNOT be assigned to something else)

// Property existence test by "in" operator
// we can go through objects and check if an object exists, if not, undefined is retured
user = {};
console.log(user.noSuchProperty === undefined); // true

// we can also use "in" operator
user = { name: "Bob", age: 30 };
console.log("age" in user); // true
console.log("WhatIsThis?" in user); // false

// Exception case: if a property exists but it stores undefiend:
// In such cases we need to use "in" instead of equality check with undefined
obj = {
    test: undefined
};

console.log(obj.test); // it's undefined, so - no such property??
console.log("test" in obj); // true

// IMPORTANT: use null to indicate empty or unknown instead of undefined

// for..in loop
// goes through each key of an object
user = {
    name: "john",
    age: 20,
    isAdmin: true
};

for (let key in user) {
    console.log(key); // name, age, isAdmin
    console.log(user[key]); // john, 20, true
}


// Object properties are in a special order
// Integer properties are ordered, others appear in creation order

let codes = {
    "49": "Germany",
    "41": "Switzerland",
    "44": "Great Britain",
    // ..,
    "1": "USA"
};

for (let code in codes) {
    console.log(code); // 1, 41, 44, 49
}

user = {
    name: "John",
    surname: "Smith"
};
user.age = 25; // add one more

// non-integer properties are listed in the creation order
for (let prop in user) {
    console.log(prop); // name, surname, age
}

// Sometimes we want integer properties to have a custom order fashion
// we can go around this by adding a + to property names to make them non-integer
codes = {
    "+49": "Germany",
    "+41": "Switzerland",
    "+44": "Great Britain",
    // ..,
    "+1": "USA"
};

for (let code in codes) {
    console.log(+code); // 49, 41, 44, 1
}


// Exercise
// check for emptiness
// write a function that returns true if the object has no properties, false otherwise
// ok
function isEmpty(obj) {
    for (let key in obj) {
        if (key != undefined) {
            return false;
        }
    }
    return true;
}


// having object that stores the salaries of a team,
// write the code to store all salaries in a variable called sum
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
} // here sum should be 390, return 0 if salaries was empty

// OK
let sum = 0;
for (key in salaries) {
    sum += salaries[key];
}


// Create a function multiplyNumeric(obj) that multiplies all numeric property values of obj by 2.
// do not return anything, modify in-place

// before the call
let menu = {width: 200, height: 300, title: "My menu"};
// my answer wrong
function multiplyNumeric(obj) {
    for (let key in obj) {
        if (typeof key == "number") {
            obj[key] *= 2;
        }
    }
}

// correct
function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] == 'number') {
      obj[key] *= 2;
    }
  }
}

// after the call
menu = {width: 400, height: 600, title: "My menu"};