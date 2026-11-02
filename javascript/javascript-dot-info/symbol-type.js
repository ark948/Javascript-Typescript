// By specification, only two types may serve as object property keys: string or symbol
// Anything else is autoconverted to string (like numbers)

// a simple represent a unique identifier
// let id = Symbol(); // a symbol
let id = Symbol("id"); // id is a Symbol with symbol name/description of id (helpful for debugging purposes)

// the description is just a label
// symbols are guaranteed to be unique (even if their description is duplicated)

let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 == id2); // false


// Symbols do NOT autoconvert to strings

// to properly show a Symbol, you may need to convert it to string first
console.log(id.toString());

// to show description only
console.log(id.description); // id

// Symbols allow us to create hidden properties (that cannot be accidentally accessed or overwritten)
// Common when working with third-party code

let user = {
    name: "John",
};

let id3 = Symbol("id");
user[id3] = 1;
console.log(user[id3]); // we can access the data using symbol as key
// Sometimes when working with third-party code, we want to modify (for example add a property) to an object
// But that may accidentally overwrite an already defined property
// In this case, we can use symbols
// Third-party code will not be aware of newly defined symbols, they cannot be accessed accidentally
let id4 = Symbol("id");
user[id4] = "Third id value"; // No conflict even after adding third id value


// to add symbols in an object literal, we need square brackets around it
let id5 = Symbol("id");
let user2 = {
    name: "John",
    [id5]: 123,
};



// Symbolic properties to not participate in for..in loop
let id6 = Symbol("id");
let user3 = {
    name: "John",
    age: 40,
    [id6]: 122
};

for (let key in user3) console.log(key); // name, age (no symbols)

// only direct access works
console.log(user3[id6]); // 122

// Object.keys(user) also ignores them

// Object.assign() copies BOTH strings and symbols
id = Symbol("id");
user = {
    [id]: 123,
};

let clone = Object.assign({}, user);
console.log(clone[id]); // 123


// sometimes we actually want same-named symbols to be same entities
// For instance, different parts of our application want to access symbol "id" meaning exactly the same property.
// Global Symbol Registry can be used for this (we can create symbols in it and access them later)

// in order to read (create if absent) a symbol from registry, use Symbol.for(key) (returns a symbol by name)

id = Symbol.for("id"); // read from global symbol registry, if not exist, it is created

// read it again from somewhere else
let idAgain = Symbol.for("id");

console.log(id === idAgain); // true

// These are called global symbols

// to return a name by global symbol (opposite of previous one) use Symbol.keyFor(sym)

// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
console.log(Symbol.keyFor(sym)); // name
console.log(Symbol.keyFor(sym2)); // id


// if it does not exist in global symbol registry it returns undefined

// There are many system symbols that Javascript uses internally, they can be used to fine-tune our objects
// for instance, Symbol.toPrimitive allows us to describe object to primitive conversion

