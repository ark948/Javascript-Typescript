// Promise chaining: connecting promises together using .then, the result of each is passed to the next

// every call to a .then returns a new Promise

new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
}).then(function (result) {
    console.log(result); // 1
    return result * 2;
}).then(function (result) {
    console.log(result); // 2
    return result * 2;
}).then(function (result) {
    console.log(result); // 4
    return result * 2;
});
// result: 1 -> 2 -> 4

// the following is the same but with 1 second delay between alert/console.log calls
new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
}).then(function (result) {
    alert(result); // 1
    return new Promise((resolve, reject) => { // (*)
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function (result) { // (**)
    alert(result); // 2
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function (result) {
    alert(result); // 4
});


// updating loadScript function from previous chapter to load scripts one by one in sequence
loadScript("/article/promise-chaining/one.js")
    .then(function (script) {
        return loadScript("/article/promise-chaining/two.js");
    })
    .then(function (script) {
        return loadScript("/article/promise-chaining/three.js");
    })
    .then(function (script) {
        // use functions declared in scripts
        // to show that they indeed loaded
        one();
        two();
        three();
    });


// we could also use a simpler syntax
loadScript("/article/promise-chaining/one.js")
    .then(script => loadScript("/article/promise-chaining/two.js"))
    .then(script => loadScript("/article/promise-chaining/three.js"))
    .then(script => {
        // scripts are loaded, we can use functions declared there
        one();
        two();
        three();
    });


// an object that has the .then method is called "thenable"
// sometimes in 3rd party codes, some promises return these promise-compatible objects
class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        alert(resolve); // function() { native code }
        // resolve with this.num*2 after the 1 second
        setTimeout(() => resolve(this.num * 2), 1000); // (**)
    }
}

new Promise(resolve => resolve(1))
    .then(result => {
        return new Thenable(result); // (*)
    })
    .then(alert); // shows 2 after 1000ms



// fetch method is a very useful in frontend programming (it can make http requests)
// example
fetch("/article/promise-chaining/user.json") // the following .then runs when server responds
    .then(function (response) {
        // response.text() returns a new pormise that resolves with full response text when it loads
        return response.text();
    })
    .then(function (text) {
        // here's the content of the remote file
        console.log(text);
    });


// same as before but a bit shorter
// same as above, but response.json() parses the remote content as JSON
fetch('/article/promise-chaining/user.json')
    .then(response => response.json())
    .then(user => alert(user.name)); // iliakan, got user name
// Now we can do something with the user


// example of making a request to github and showing the profile avatar
// Make a request for user.json
fetch('/article/promise-chaining/user.json')
    // Load it as json
    .then(response => response.json())
    // Make a request to GitHub
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    // Load the response as json
    .then(response => response.json())
    // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
    .then(githubUser => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);
        setTimeout(() => img.remove(), 3000); // (*)
    });



// full example with reusable functions
function loadJson(url) {
    return fetch(url)
        .then(response => response.json());
}

function loadGithubUser(name) {
    return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
    return new Promise(function (resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser);
        }, 3000);
    });
}

// Use them:
loadJson('/article/promise-chaining/user.json')
    .then(user => loadGithubUser(user.name))
    .then(showAvatar)
    .then(githubUser => alert(`Finished showing ${githubUser.name}`));
// ...