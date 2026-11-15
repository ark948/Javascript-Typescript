// Promises are pieces of code that can execute another code when ready (or another code when rejected)

let promise = new Promise(function (resolve, reject) {
    // calls resolve if successful
    // reject if there was an error
});


// the promise object has these initial properties:
// state -> initially pending, then changes to either "fulfilled" when resolve is called or "rejected" when reject is called
// result -> initially undefined, then changes to value when resolve(value) is called or error when reject(error) is called

promise = new Promise(function (resolve, reject) {
    // the function is executed automatically when the promise is constructed
    // after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve("done"), 1000);
});


promise = new Promise(function (resolve, reject) {
    // after 1 second signal that the job is finished with an error
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});


// IMPORTANT
// executor should only call one resolve OR one reject. further calls are ignored
// resolve/reject expect only one argument (or none) and will ignore additional arguments

// consuming functions which will receive the result or error can be registered with .then and .catch

promise.then(
    function (result) {
        // handle a successful result, runs when promise is resolved
    },

    function (error) {
        // handle an error, runs when promise is rejected
    }
);


promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
});

promise.then(
    result => console.log(result), // shows done! after 1 second
    error => console.log(error),
);

// in case of rejection:
promise = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise.then(
    result => console.log(result), // doesn't run
    error => console.log(error) // shows "Error: Whoops!" after 1 second
);


// if we're interested only in successful completion, we can provide only one function:
promise = new Promise(resolve => {
    setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // shows "done!" after 1 second


// if we're interested only in errors, we can use null as the first arg of .then(null, errorHandlingFunc)
// or we can use .catch(errorHandlingFunc)

promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second



// there is also a .finally method that always runs
new Promise((resolve, reject) => {
    // do something that takes time, then call resolve or reject
})
    .finally(() => console.log("Stop loading indicator"))
    .then(result => console.log("show result"), err => console.log("show error"));


// finally should be used for general finalizing procedures
// it passes the result or error to the next handler
new Promise((resolve, reject) => {
    setTimeout(() => resolve("value"), 2000);
})
    .finally(() => alert("Promise ready")) // triggers first
    .then(result => alert(result)); // <-- .then shows "value"


// in case of an error
new Promise((resolve, reject) => {
    throw new Error("error");
})
    .finally(() => alert("Promise ready")) // triggers first
    .catch(err => alert(err));  // <-- .catch shows the error


// the loadScript function in async-promise style
function loadScript(src) {
    return new Promise(function (resolve, reject) {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.append(script);
    });
}

// usage
promise = loadScript("test.js");
promise.then(
    script => alert(`${script.src} is loaded!`),
    error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('Another handler...'));