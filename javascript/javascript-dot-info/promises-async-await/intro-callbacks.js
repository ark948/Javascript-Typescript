// asynchronous actions: actions that we initiate now, but they finish later

function loadScript(src) {
    // creates a <script> tag and append it to the page
    // this causes the script with given src to start loading and run when complete
    let script = document.createElement('script');
    script.src = src;
    document.head.append(script);
}


// we can use this function like this:
loadScript("test.js");
// Now we still can't use the code inside test.js here, because the script may have not been loaded yet
// all we know, is that it eventually runs

// to know when script is ran, we can use a callback
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}


// now we can use it like this:
loadScript("test.js", function () {
    // this runs after the script is loaded
    functionFromTestjsFile();
});

// This is called callback-style of asynchronous programming
// an async function should provide a callback argument where we put a function to run after it's complete.


// it is possible to run more than one script (however it will get messy quick)
loadScript('/my/script.js', function (script) {
    loadScript('/my/script2.js', function (script) {
        loadScript('/my/script3.js', function (script) {
            // ...continue after all scripts are loaded
        });
    });
});


// what about error-handling? here is an improved version
function loadScript(src, callback) {
    let script = document.createElement("script");
    script.src = src;
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
    document.head.append(script);
}


// usage
loadScript('/my/script.js', function (error, script) {
    if (error) {
        // handle error
    } else {
        // script loaded successfully
    }
});


// nesting callbacks like this will cause pyramid of doom (aka callback hell)
// very difficult to manage
// promises were introduced to fix this problem


