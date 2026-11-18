// Promise API has 6 static methods

// promise.all to execute many promises in parallel and wait until all of them are ready
// it takes an iterable

Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log); // 1,2,3 when promises are ready: each promise contributes an array member

// the order is as same as its source promises

// a common trick is to map an array of job data into an array of promises, and then wrap them into Promise.all
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));
Promise.all(requests)
    .then(responses => responses.forEach(
        response => console.log(`${response.url}: ${response.status}`)
    ));


// another example
let names = ['iliakan', 'remy', 'jeresig'];
requests = names.map(name => fetch(`https://api.github.com/users/${name}`));
Promise.all(requests)
    .then(responses => {
        // all responses are resolved successfully
        for (let response of responses) {
            console.log(`${response.url}: ${response.status}`); // shows 200 for every url
        }

        return responses;
    })
    // map array of responses into an array of response.json() to read their content
    .then(responses => Promise.all(responses.map(r => r.json())))
    // all JSON answers are parsed: "users" is the array of them
    .then(users => users.forEach(user => console.log(user.name)));

// if there is an error, the rejection error becomes the outcome of the entire Promise.all
// other promises are cancelled

// Promise.all rejects as a whole if any promise rejects. (All or Nothing)

// Promise.allSettled waits for all promises to settle, regardless of the reuslt, the resulting array has:
// {status:"fulfilled", value:result} for successful responses,
// {status:"rejected", reason:error} for errors.

urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
    .then(results => {
        results.forEach((result, num) => {
            if (result.status == "fulfilled")
                console.log(`${urls[num]}: ${result.value.status}`);
            if (result.status == "rejected")
                console.log(`${urls[num]}: ${result.reason}`);
        });
    });

// result:
/*
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
*/

// Promise.race
// waits only for the first settled promise

Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1 (the first promise won the race)


// Promise.any
// similar to Promise.race, but waits for only the first fulfilled promise and gets its result
// if all are rejected, AggregateError is returned

Promise.any([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1

// An example when all promises fail
Promise.any([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
    console.log(error.constructor.name); // AggregateError
    console.log(error.errors[0]); // Error: Ouch!
    console.log(error.errors[1]); // Error: Error!
});

// AggregateError keeps errors in "errors" property

