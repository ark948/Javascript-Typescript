// unlike primitives, objects are stored and copied by reference

let message = "Hello";
let phrase = message;

// here we have two independent variables, each storing the string "Hello"

// But a variable assigned to an object, does not store the object itself, but its address in memory
// aka a reference to it

let user = {
    name: "John"
}

// when we copy an object into another variable, the reference is copied, not the object itself
let admin = user; // copy the reference

// There is still ONLY one object in memory, but two variables referencing it
// either can be used to access the object and modify its content
admin.name = "Pete";
console.log(user.name); // Pete


// Two objects are equal only if they reference the same object
let a = {};
let b = a;
console.log(a == b); // true, both variables reference the same object
console.log(a === b); // true

// and two independent objects are NOT equal, even though they look alike
let c = {};
let d = {};
console.log(c == d); // false


// A side effect of storing objects as reference is that const objects can be modiied
const user2 = {
    name: "Johnny",
};

user2.name = "Bob";
console.log(user2.name); // Bob
// (object properties can still be changed)
// (it is possible to make properties const too, but through flags and descriptors)


// what if we actually needed to duplicate an object?
let user3 = {
    name: "john",
    age: 30,
};

let clone = {};
for (let key in user3) {
    clone[key] = user3[key];
}

// now clone is fully independent

// we can also use Object.assign
let user4 = { name: "John" };
let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user4, permissions1, permissions2);
// now user = { name: "John", canView: true, canEdit: true }
// if property already exists, it gets overwritten

// Object.assign can also be used for simple cloning
let user5 = {
    name: "John",
    age: 30,
};

let clone2 = Object.assign({}, user5);


// spread syntax can also be ued: let clone = {...user}


// Nested cloning
// object properties can be objects as well
let user6 = {
    name: "Max",
    sizes: {
        height: 182,
        width: 50,
    }
};

console.log(user6.sizes.height); 182

// In these situations, if we want true independent objects, we need deep cloning aka structured cloning
let clone3 = structuredClone(user6);
console.log(user6.sizes === clone3.sizes); // false, different objects


// Edge cases:
// when a property is a reference to the object itself, structuredClone works Ok
let user7 = {};
// let's create a circular reference:
// user.me references the user itself
user7.me = user;

let clone7 = structuredClone(user7);
alert(clone7.me === clone7); // true

// When a property is a function, structuredClone fails
structuredClone({
    f: function() {}
});

// for such cases, either implement custom deep cloning code, or use third party code such as lodash


