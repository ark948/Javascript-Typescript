// Optional chaining is to return undefined instead of raising an error if something does not exist

// consider this example

// we have users with addresses
// some may have not submitted their address

// in that case if we attempt to get the address of a user who has not submitted their address, we'll get an Error
// this could halt the program
let user = {};
console.log(user.address); // Error

// instead getting undefined is better

// solution 1 (bare)
// we can check for undefined using ternary operator
console.log(user.address ? user.address.street : undefined);

// this is not good, it can get very inelegant for more nested ones
alert(user.address ? user.address.street ? user.address.street.name : null : null);


// solution 2: AND'ing it
alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)

// a bit better but still not good

// solution 3: Optional chaining using ?. (best)
// value?.prop
// if value exists, it will return prop
// otherwise, if value is undefined/null, it returns undefined

console.log( user?.address?.street ); // undefined, no error

// it works even if user object does not exist
user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined


// IMPORTANT
// Only use optional chaining where it's possible/OK that something does not exist
// and apply proper handling if something is required


// Short-circuiting
// ?. will imeddiately stop the execution if the left part does not exist
// so further operations on the right will not be performed
user = null;
let x = 0;

user?.sayHi(x++); // no "user", the execution does not reach sayHi
console.log(x); // x is still 0


// the optional chaining ?. is not an operator, but a special syntax, also works with () and []
// ?.() for a call to a function that may not exist
// ?.[] for a property that may not exist

let userAdmin = {
  admin() {
    console.log("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin
userGuest.admin?.(); // nothing happens (no such method)

// --------------------
let key = "firstName";
let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined


// We can use ?. with delete as well
delete user?.name; // delete user.name if user exists

// We CANNOT use ?. for writing
user = null;
user?.name = "John"; // Error, it evaluates to: undefined = "John"

