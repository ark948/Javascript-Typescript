// what happens when we obj1 + obj?

// Javascript does not allow customize operators

// Instead objects are auto-converted to primitives, then the operation is carried out over them, and result is also primitive

// there are three variants of Type conversion, they are called hints

// object-to-string
// e.g. alert needs it

// object-to-number
// explicit conversion
let num = Number(obj);

// maths (except binary plus)
let n = +obj; // unary plus
let delta = date1 - date2;

// less/greater comparison
let greater = user1 > user2;


// default
// occurs in rare cases when operator is not sure what type to expect

// e.g. binary plus + can work with both strings (concats them) and numbers (adds them)
// here, it will use default hint to convert it

// also happens when using ==


// Javascript looks for all 3 hints

// here is the pattern that should be used
obj[Symbol.toPrimitive] = function (hint) {
    // here goes the code to convert this object to a primitive
    // it MUST return a primitive value
    // hint = one of "string", "number", "default"
};


// example
let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    }
};

// conversions demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500


// older codes use toString and valueOf methods