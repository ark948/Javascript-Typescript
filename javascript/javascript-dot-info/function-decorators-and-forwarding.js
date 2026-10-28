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