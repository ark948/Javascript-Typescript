// example of a try-catch block with no errors
try {
    console.log("Start of try runs");
    // no errors here
    console.log("End of try runs");
} catch (err) {
    console.log("Catch is ignored, because there were no errors");
}


// example of a try-catch block that will catch an error
try {
    console.log("Start of try-catch block;"); // This runs
    undefinedVariable;
    console.log("End of try-catch block"); // WON'T RUN
} catch (err) {
    console.log("An error has occurred"); // This also runs
}


// Try-Catch only works for Runtime Errors AKA Exceptions (not for syntax errors)


// IMPORTANT
// Try-Catch only works for synchronous code (NOT for scheduled code, like with setTimeout)
// because the function is executed later, when engine has left the try-catch constructor
try {
    setTimeout(function () {
        noSuchValue; // Script will die here
    }, 1000);
} catch (err) {
    console.log("Won't work");
}


// To catch an exception inside scheduled functions, put try-catch inside functions
setTimeout(function () {
    try {
        noSuchVariable; // try...catch handles the error!
    } catch {
        alert("error is caught here!");
    }
}, 1000);



// When an error occurs, JS will create an object with details about it
// This object has name, message and stack

try {
    undefinedVar;
} catch (err) {
    console.log(err.name); // ReferenceError
    console.log(err.message); // undefinedVar is not defined
    console.log(err.stack); // ReferenceError: lalala is not defined at (...call stack)
    console.log(err); // Show the error as a whole (converted to string)
}


// Optional Catch binding
// if we don't need error details, catch may omit it
try {
    // ..
} catch {
    //
}


// trycatch example
let json = '{"name":"John", "age": 30}'; // data from the server
let user = JSON.parse(json);
console.log(user.name, user.age);


// if json is malformed, JSON.parse will generate an error
json = "{ bad json }";
try {
    user = JSON.parse(json);
    console.log(user.name);
} catch (err) {
    console.log("Sorry, there was an error. ", err.name, err.message);
}


// What if json is syntatically correct, but does not have a required name property
// JSON.parse works normally, but our age will be undefined. this may cause a problem. (In this case we have to throw an error)
// to unify error handling, we'll use the 'throw' operator


json = '{ "age": 30 }'; // incomplete data
try {
    let user = JSON.parse(json); // <-- no errors
    if (!user.name) {
        throw new SyntaxError("Incomplete data: no name"); // Use of throw
    }
    console.log(user.name);
} catch (err) {
    console.log("JSON Error: " + err.message); // JSON Error: Incomplete data: no name
}


// Re-throwing technique
// is a method used to catch errors that we may not have anticipated

json = '{ "age": 30 }'; // incomplete data
try {
    user = JSON.parse(json); // <-- forgot to put "let" before user
    // ...
} catch (err) {
    console.log("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
    // (no JSON Error actually)
}

// in rethrowing, we catch all errors, then check them for type, if we don't know how to handle one, we throw it again
try {
    user = { /*...*/ };
} catch (err) {
    if (err instanceof ReferenceError) {
        console.log("ReferenceError");
    } else {
        throw err; // This will NOT be handled
    }
}

// errors thrown in catch block (re-thrown) will not be handled and halt the script
// in this case we either have to put everything inside a larger try-catch block or
// or use a function for some sort of a retry pattern

function readData() {
    let json = '{"age": 30}';
    try {
        blabla(); // error
    } catch (err) {
        if (!(err instanceof SyntaxError)) {
            throw err; // re-throw (don't know how to deal with it)
        }
    }
}

try {
    readData();
} catch (err) {
    console.log("External catch got: " + err); 
}
// Here, readData only knows how to handle SyntaxError, While the outer try-catch knows how to handle everything

// Try-catch construct may have one more clause: finally
// if it exists, it will run in all cases: after try (if no error was caught), after catch (if there was error)
try {
    // try to execute code
} catch (err) {
    // handle errors
} finally {
    // always executes
}

// example
try {
    console.log('try');
    if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
    console.log('catch');
} finally {
    console.log("finally");
}


// Another example: we want to measure fibonacci calcualation time
// we need to guarantee that time will be measured correctly in case of errors like negative or non-integer numbers
let num = +prompt("Enter a positive number to calculate fib: ", 35);
let diff, result; // Variables inside try block are local, so we have to define them outside
function fib(n) {
    if (n < 0 || Math.trunc(n) != n) {
        throw new Error("Must not be negative, and also an integer, not float.");
    }
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();
try {
    result = fib(num);
} catch (err) {
    result = 0;
} finally {
    diff = Date.now() - start;
}

console.log(result || "error occurred");
console.log(`execution took ${diff}ms`);

// IMPORTANT
// if there is a return in try, finally still executes before that


// Environment-specific cases
// most environment (unlike javascript core langauge) provide a way to catch errors outside of try-catch statements
// e.g. Node.js has process.on("uncaughtException")
// browsers, we can assign a function to global window.onerror property
window.onerror = function(message, url, line, col, error) {
  // ...
};


// There are also services that provide error logging such as Sentry
