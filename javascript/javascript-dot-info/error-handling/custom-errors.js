// we can make custom errors by inherting from Error object
// that way we can use obj instanceof Error to identify error objects

// example, HttpTimeoutError may inherit from HttpError

// we will implement a custom ValidtionError (for previous read data from user example)
// (in case, json is syntatically correct but misses some required parts)

class ValidationError extends Error {
    constructor(message) {
        super(message); // This is required
        this.name = "ValidationError";
    }
}

function test() {
    throw new ValidationError("Whooops");
}

try {
    test();
} catch (err) {
    console.log(err.message); // Whoooops!
    console.log(err.name); // ValidationError
    console.log(err.stack); // a list of nested calls with line numbers
}


// Usage
function readUser(json) {
    let user = JSON.parse(json);
    if (!user.age) {
        throw new ValidationError("No field: age");
    }
    if (!user.name) {
        throw new ValidationError("No field: name");
    }

    return user;
}


try {
    let user = readUser('{ "age": 25 }');
} catch (err) {
    if (err instanceof ValidationError) {
        // we could also use: else if (err.name == "ValidationError"), but instanceof is better
        console.log("Invalid data: " + err.message);
    } else if (err instanceof SyntaxError) {
        console.log("JSON Syntax error: " + err.message);
    } else {
        throw err; // unknown error, re-throw it
    }
}



// We can even further extend our ValidationError class for more detailed approach
class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("No property: " + property);
        this.name = "PropertyRequiredError";
        this.property = property;
    }
}

function readUser(json) {
    let user = JSON.parse(json);
    if (!user.age) throw new PropertyRequiredError("age");
    if (!user.name) throw new PropertyRequiredError("name");
    return user;
}

// instanceof still works with PropertyRequiredError, because it is a subclass of ValidationError
try {
    let user = readUser('{ "age": 25 }');
} catch (err) {
    if (err instanceof ValidationError) {
        alert("Invalid data: " + err.message); // Invalid data: No property: name
        alert(err.name); // PropertyRequiredError
        alert(err.property); // name
    } else if (err instanceof SyntaxError) {
        alert("JSON Syntax Error: " + err.message);
    } else {
        throw err; // unknown error, rethrow it
    }
}



// Assigning our custom error's name to this.name property is repetitious
// instead we can do this:
class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("No property: " + property);
        this.property = property;
    }
}

// name is correct
alert(new PropertyRequiredError("field").name); // PropertyRequiredError


// Wrapping exceptions

// as readUser function grows, it may throw other errors
// we can make a new class ReadError to represent generic "data reading" error
// ReadError will catch known errors such as ValidationError and SyntaxError and keeps a reference to them (holds them) in its cause property

// This technique is called wrapping exceptions (We'll catch all reading data related errors, and get details if we wanted to)

class ReadUser extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = "ReadUser";
    }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
    if (!user.age) throw new PropertyRequiredError("age");
    if (!user.name) throw new PropertyRequiredError("name");
}


function readUser(json) {
    let user;

    try {
        user = JSON.parse(json);
    } catch (err) {
        if (err instanceof SyntaxError) throw new ReadError("Syntax Error", err);
        else throw err;
    }

    try {
        validateUser(user);
    } catch (err) {
        if (err instanceof ValidationError) {
            throw new ReadError("Validation Error", err);
        } else {
            throw err;
        }
    }
}


try {
    readUser('{bad json}');
} catch (e) {
    if (e instanceof ReadError) {
        console.log(e);
        // Original error: SyntaxError: Unexpected token b in JSON at position 1
        console.log("Original error: " + e.cause);
    } else {
        throw e;
    }
}



// Create a FormatError that inherits from built-in SyntaxError
class FormatError extends SyntaxError {
    constructor(message) {
        super(message);
        this.name = "FormatError";
        // this.name = this.constructor.name; // OK too
    }
}