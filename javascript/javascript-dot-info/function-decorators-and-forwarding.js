// Javascript has flexibility for functions

// they can be passed around, used as objects, and calls between them can be forwarded and they can be decorated

// example, we have a CPU-heavy function
// we can cache it by creating a wrapper that adds caching

function slow(x) {
    // CPU-intensive job here
    alert(`Called with ${x}`);
    return x;
}

function cachingDecorator(func) {
    let cache = new Map();

    // this is the wrapper block
    return function (x) {
        if (cache.has(x)) { // if key already exists (was cached previously)
            return cache.get(x); // return results from it
        }

        let result = func(x); // otherwise call func and remember the result
        cache.set(x, result);
        return result;
    };
}

slow = cachingDecorator(slow);
alert(slow(1)); // slow(1) is cached and the result returned
alert("Again: " + slow(1)); // slow(1) result returned from cache (will not be processed again)

alert(slow(2)); // slow(2) is cached and the result returned
alert("Again: " + slow(2)); // slow(2) result returned from cache (will not be processed again)


// IMPORTANT
// This does not work for object methods (because 'this' becomes undefined)


// But there is a func.call(context, ...args) that allows us to call a function and set the context

// example
function say(phrase) {
    console.log(this.name + ': ' + phrase);
}

let user = { name: "John" };
say.call(user, "Hello"); // John: Hello


// Updated version of cache wrapper function
function cachingDecorator(func) {
    let cache = new Map();
    return function (x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func.call(this, x); // "this" is passed correctly now
        cache.set(x, result);
        return result;
    };
}



// We can make cachingDecorator more universal by making it accept more than one argument
// cache.get needs to remember combination of arguments but the native Map only takes a single value as key
// there are multiple ways to get around this: using nested maps, 
// using third party that accepts more than one or implement our own, 
// or join two values into one string like this: "min,max" (and our own custom hashing function), we'll go with this
let worker = {
    slow(min, max) {
        alert(`Called with ${min},${max}`);
        return min + max;
    }
}

function cachingDecorator(func, hash) {
    let cache = new Map();
    return function () {
        let key = hash(arguments); // input: "3,5"
        if (cache.has(key)) {
            return cache.get(key);
        }

        let result = func.call(this, ...arguments);
        cache.set(key, result);
        return result;
    };
}

function hash(args) {
    return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert(worker.slow(3, 5)); // works
alert("Again " + worker.slow(3, 5)); // same (cached)


// instead of this we could call func.apply
// func.apply takes a context and an array-like object of args

// passing all arguments along with the context to another function is called forwarding

let wrapper = function () {
    return func.apply(this, arguments);
};

// we'll also update our hash function
function hash() {
    alert([].join.call(arguments)); // 1,2
}


// Exercises
// Write a decorator that returns a wrapper that saves all calls to a function in its calls property
// answer v1
function saveCallsDecorator(func) {
    let calls = new Map();
    return function (x) {
        let result = func.call(this, x);
        calls.set(x, result);
        return result;
    }
}

// answer v2
wrapper = function () {
    let calls = new Map();
    let result = original.apply(this, arguments);
    calls.set(arguments, result)
    return result
}

// My both answers are wrong

// Correct answer
function spy(func) {
    function wrapper(...args) {
        // using ...args instead of arguments to store "real" array in wrapper.calls
        wrapper.calls.push(args);
        return func.apply(this, args);
    }

    wrapper.calls = [];
    return wrapper;
}
// Usage
function work(a, b) {
    alert(a + b); // work is an arbitrary function or method
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
    alert('call:' + args.join()); // "call:1,2", "call:4,5"
}