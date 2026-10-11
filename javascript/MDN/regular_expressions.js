// Regular expressions are patterns used to match character combinations in strings.

// regular expression literal
const re = /ab+c/;


// using constructor of RegExp
const re2 = new RegExp("ab+c");



const myRe = /d(b+)d/g;
const myArray = myRe.exec("cdbbdbsbz"); // [ "dbbd" ]


