// Loops, repeated steps of something

for (let step = 0; step < 5; step++) {
    console.log("Walking east one step");
}

// do-while
// always executed at least once
let i = 0;
do {
    i += 1;
    console.log(i);
} while (i < 5);

// while statement, executes as long as the condition is true
let n = 0;
let x = 0;
while (n < 3) {
    n++;
    x += n;
}


// Labeled statements
// labels provide an idenitifier, allowing us to refer to somewhere else in the program

// break statement, terminates a loop
// if used with a label, it terminates that specific label, otherwise the innermost enclosing conditional block

for (let i = 0; i < a.length; i++) {
    if (a[i] === thatValue) {
        break;
    }
}

// example: breaking a label
let x1 = 0;
let z = 0;
labelCancelLoops: while (true) {
    console.log("Outer loops:", x);
    x1 += 1;
    z = 1;
    while (true) {
        console.log("Inner loops:", z);
        z += 1;
        if (z === 10 && x1 === 10) {
            break labelCancelLoops;
        } else if (z === 10) {
            break;
        }
    }
}


// continue statement
// restarts a conditional
// without a label, skips the current iteration
// with label, applies to the loop with that label

// example 1
i = 0;
n = 0;
while (i < 5) {
    i++;
    if (i === 3) {
        continue;
    }
    n += i;
    console.log(n);
}

// logs: 1 3 7 12

// example 2
i = 0;
let j = 10;
checkIandJ: while (i < 4) {
  console.log(i);
  i += 1;
  checkJ: while (j > 4) {
    console.log(j);
    j -= 1;
    if (j % 2 === 0) {
      continue;
    }
    console.log(j, "is odd.");
  }
  console.log("i =", i);
  console.log("j =", j);
}


// for..in statement (newer than tradtional for loop)
function dumpProps(obj, objName) {
    let result = "";
    for (const i in obj) {
        result += `${objName}.${i} = ${obj[i]}<br>`;
    }
    result += "<hr>";
    return result;
}

// for.. of
// for...in iterates over property names (if used with objects), for...of iterates over property values
const arr = [3, 5, 7];
arr.foo = "hello";
for (const i in arr) {
    console.log(i); // "0", "1", "2", "foo"
}

for (const i of arr) {
    console.log(i); // 3, 5, 7
}


// The for...of and for...in statements can also be used with destructuring. 
const obj = {
    foo: 1,
    bar: 2
};

for (const [key, val] of Object.entries(obj)) {
    console.log(key, val);
}

// "foo" 1
// "bar" 2