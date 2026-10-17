// a Promise is an object representing the eventual completion or failure of an asynchronous event/operation

// we can attach success and error handlers to promises
// functions that will execute on success or failure respectively

// they aslo give us chaining using then()
// ability to execute more than one asynchronous operation back to back, then() returns another promise

function doSomething() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Things to do before completion of the promise
            console.log("Did something");
            // the fulfillment value of the promise
            resolve("https://example.com");
        }, 200);
    });
}

doSomething()
    .then(function (result) {
        return doSomethingElse(result);
    })
    .then(function (newResult) {
        return doThirdThing(newResult);
    })
    .then(function (finalResult) {
        console.log(`Got the final result: ${finalResult}`);
    })
    .catch(failureCallback);


// the same with arrow functions
doSomething()
    .then((result) => doSomethingElse(result))
    .then((newResult) => doThirdThing(newResult))
    .then((finalResult) => {
        console.log(`Got the final result: ${finalResult}`);
    })
    .catch(failureCallback);


// Arrow functions can have implicit return, () => x is short for () => { return x; }

// Don't forget the return statement in promises before the last promise
// otherwise there will be no way to track the final settlement of promises (promise is said to be floating)

doSomething()
    .then((url) => {
        // `return` keyword added
        // if there was no return, result in the next promise would have been undefined
        return fetch(url);
    })
    .then((result) => {
        // result is a Response object
    });


// Floating promises could be even worse if there are race conditions
const listOfIngredients = [];

doSomething()
    .then((url) => {
        // Missing `return` keyword in front of fetch(url).
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                listOfIngredients.push(data);
            });
    })
    .then(() => {
        console.log(listOfIngredients);
        // listOfIngredients will always be [], because the fetch request hasn't completed yet.
    });

// Improved
listOfIngredients = [];
doSomething()
    .then((url) => {
        // `return` keyword now included in front of fetch call.
        return fetch(url)
            .then((res) => res.json())
            .then((data) => {
                listOfIngredients.push(data);
            });
    })
    .then(() => {
        console.log(listOfIngredients);
        // listOfIngredients will now contain data from fetch call.
    });


// even better, flatten the chain
doSomething()
    .then((url) => fetch(url))
    .then((res) => res.json())
    .then((data) => {
        listOfIngredients.push(data);
    })
    .then(() => {
        console.log(listOfIngredients);
    });


// Using async/await 
async function listOfIngredients() {
    const url = await doSomething();
    const res = await fetch(url);
    const data = await res.json();
    listOfIngredients.push(data);
    console.log(listOfIngredients);
}


// Nesting
// a control structure to limit the scope of catch statements
// this gives us a higher precision in error recovery
doSomethingCritical()
    .then((result) =>
        doSomethingOptional(result)
            .then((optionalResult) => doSomethingExtraNice(optionalResult))
            .catch((e) => { }),
    ) // Ignore if optional stuff fails; proceed.
    .then(() => moreCriticalStuff())
    .catch((e) => console.error(`Critical failure: ${e.message}`));

// same code, async/await style
async function main() {
    try {
        const result = await doSomethingCritical();
        try {
            const optionalResult = await doSomethingOptional(result);
            await doSomethingExtraNice(optionalResult);
        } catch (e) {
            // Ignore failures in optional steps and proceed.
        }
        await moreCriticalStuff();
    } catch (e) {
        console.error(`Critical failure: ${e.message}`);
    }
}

// Apply nesting only for complicated code


// it is possible to do chaining after a failure
doSomething()
    .then(() => {
        throw new Error("Something failed");
        console.log("Do this");
    })
    .catch(() => {
        console.error("Do that");
    })
    .then(() => {
        console.log("Do this, no matter what happened before");
    });


// if a promise is rejected and not handled, some events will be sent to the global scope
// unhandledrejection
// rejectionhandled


// also the same with Node.js, but event names have slight differences


// Composition
// Handling async operations concurrently

// composition tools:
// Promise.all(), Promise.allSettled(), Promise.any(), and Promise.race().

Promise.all([func1(), func2(), func3()]).then(([result1, result2, result3]) => {
    // use result1, result2 and result3
});


