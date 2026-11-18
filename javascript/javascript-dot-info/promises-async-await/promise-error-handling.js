// when a promise rejects, controller jumps to the closest rejection handler

// example
fetch("https://no-such-server.blabla") // rejects
    .then(response => response.json())
    .catch(err => console.log(err)); // TypeError, failed to fetch (error text may vary)


// the .catch does not have to be immediate
// appending a .catch to end of chain is a way to catch all errors
fetch('/article/promise-chaining/user.json')
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    .then(githubUser => new Promise((resolve, reject) => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser);
        }, 3000);
    }))
    .catch(error => alert(error.message));


// there is an invisible try-catch inside promise handlers
// these two are the same
new Promise((resolve, reject) => {
    throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!

// works the same as:
new Promise((resolve, reject) => {
    reject(new Error("Whooops"));
}).catch(alert);


// Error does not have to be in Promise executor, it could be in one of the handlers


// in a regular try-catch, we can analyze the error and maybe rethrow if it cannot be handled
// if an error is handled by a .catch, code continues to the next .then handler

// to rethrow an error if necessary, use throw keyword
// execution flow: catch -> catch
new Promise((resolve, reject) => {
    throw new Error("Whooops");
}).catch(function (error) {
    if (error instanceof URIError) {
        // handle it
    } else {
        console.log("Was unable to handle such error");
        throw error; // jumps to the next catch
    }
}).then(function () {
    // THIS DOES NOT RUN
}).catch(error => {
    // This Runs
    console.log(`An unknown error has occurred: ${error}`);
});


// If an error is not handled (no .catch existed or was not triggered), execution halts just like regular error
// JS engine tracks such rejections hand generates a global error

// we can however, handle such scenario with a global event handler
window.addEventListener('unhandledrejection', function (event) {
    console.log(event.promise); // [object Promise] - the promise that generates an error
    console.log(event.reason); // Error: Whoops! - the unhandled error
});

new Promise(function () {
    throw new Error("Whoops!");
}); // No catch to handle the error


// Task
// does the following catch gets triggered?
new Promise(function (resolve, reject) {
    setTimeout(() => {
        throw new Error("Whoops!");
    }, 1000);
}).catch(alert);

// the implicit/invisible try-catch around the inside the promise handles all sync codes
// but the error is generated not while the executor is running, but later, so the promise WILL NOT handle it