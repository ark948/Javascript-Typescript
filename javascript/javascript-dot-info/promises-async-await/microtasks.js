// Promise handlers (.then, .catch, .finally) are always asynchronous

// even if a Promise is immediately resolved, the aformentioned handlers will still execute
// example
let promise = Promise.resolve();
promise.then(() => console.log("promise done."));
console.log("code finished"); // this shows first, then promise done.

// why? because async tasks require proper management
// ECMA has an internal queue called PromiseJobs aka "microtask queue" (V8 term)
// the queue is FIFO
// execution of a task is initiated only when nothing else is running

// when a promise is ready, JS puts them into a queue
// When engine becomes free of current code, it takes tasks from queue and executes them

// to fix the order of previous code:
Promise.resolve()
    .then(() => console.log("promise done"))
    .then(() => console.log("code finished"));


// What if there is an error?

// normally we would attach a .catch to chain to handle it
promise = Promise.reject(new Error("Promise failed"));
promise.catch(err => console.log("caught"));

window.addEventListener('unhandledrejection', event => console.log(event.reason)); // this code does not run, because error is handled

// if we forgot .catch, when microtask queue is empty, the event is triggered
promise = Promise.reject(new Error("Promise failed."));
window.addEventListener('unhandledrejection', event => console.log(event.reason)); // Promise failed.

