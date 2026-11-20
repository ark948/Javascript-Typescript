// promisification -> to transform a regular function that accepts a callback to such a form that returns a promise
// aka promisify them

// example: loadScript(src, callback) from previous chapters
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})


let loadScriptPromise = function (src) {
    return new Promise((resolve, reject) => {
        loadScript(src, (err, script) => {
            if (err) reject(err);
            else resolve(script);
        });
    });
};

// usage:
// loadScriptPromise('path/script.js').then(...)
// Note: this is a wrapper around the original function


// we can provide a re-usable wrapper function for this behavior
// it accepts a function to promisify

function promisify(f) {
    return function (...args) { // returns a wrapper function
        return new Promise((resolve, reject) => {
            function callback(err, result) { // custom callback
                if (err) reject(err);
                else resolve(result);
            }
            args.push(callback); // append our custom callback to the end of f arguments
            f.call(this, ...args); // call the original function
        });
    };
}

// usage:
// let loadScriptPromise = promisify(loadScript);
// loadScriptPromise(...).then(...);


// we can further improve this helper
// in this version, we'll introduce a second argument to helper, that if set to true, will return an array of callback results
// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            function callback(err, ...results) { // our custom callback for f
                if (err) {
                    reject(err);
                } else {
                    // resolve with all callback results if manyArgs is specified
                    resolve(manyArgs ? results : results[0]);
                }
            }
            args.push(callback);
            f.call(this, ...args);
        });
    };
}

// usage:
// f = promisify(f, true);
// f(...).then(arrayOfResults => ..., err => ...);


// Promisification is a good approach, but not a total replacement for callbacks
// Remember, a promise may have only one result, but a callback may technically be called many times.
// So promisification is only meant for functions that call the callback once. Further calls will be ignored.