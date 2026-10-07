// if statement

function checkData() {
    if (document.form1.threeChar.value.length === 3) {
        return true;
    }

    alert(`Enter excatly three characters. ${document.form1.threeChar.value} is not valid.`);
    return false;
}


// Swtich statement
switch (fruitType) {
  case "Oranges":
    console.log("Oranges are $0.59 a pound.");
    break;
  case "Apples":
    console.log("Apples are $0.32 a pound.");
    break;
  case "Bananas":
    console.log("Bananas are $0.48 a pound.");
    break;
  case "Cherries":
    console.log("Cherries are $3.00 a pound.");
    break;
  case "Mangoes":
    console.log("Mangoes are $0.56 a pound.");
    break;
  case "Papayas":
    console.log("Papayas are $2.79 a pound.");
    break;
  default:
    console.log(`Sorry, we are out of ${fruitType}.`);
}
console.log("Is there anything else you'd like?");


// falsy values

    // false
    // undefined
    // null
    // 0
    // NaN
    // the empty string ("")


// Error handling with try-catch

function getMonthName(mo) {
    mo--; // adjusting month number for array index (0 = Jun, 11 = Dec)
    // prettier-ignore
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (!months[mo]) {
        throw new Error("Invalid month code");
    }
    return months[mo];
}


try {
    monthName = getMonthName(myMonth); // statement that may or may not throw an exception
} catch (e) {
    // handle error
    monthName = "unknown";
    logMyError(e);
}


// the finally clause is executed regardless of whether an exception was thrown or not
openMyFile();
try {
  writeMyFile(theData); // This may throw an error
} catch (e) {
  handleError(e); // If an error occurred, handle it
} finally {
    // will always execute
  closeMyFile(); // Always close the resource
}


// IMPORTANT:
// if finally block returns a value, that value becomes the return value of the entire try..catch..finally block
// regardless of any return statement in the try and catch blocks

function f() {
  try {
    console.log(0);
    throw "bogus";
  } catch (e) {
    console.log(1);
    // This return statement is suspended
    // until finally block has completed
    return true;
    console.log(2); // not reachable
  } finally {
    console.log(3);
    return false; // overwrites the previous "return"
    // `f` exits here
    console.log(4); // not reachable
  }
  console.log(5); // not reachable
}
console.log(f()); // 0, 1, 3, false



// return value inside finally, will overwrite the re-throw in catch block as well
function f() {
  try {
    throw "bogus";
  } catch (e) {
    console.log('caught inner "bogus"');
    // This throw statement is suspended until
    // finally block has completed
    throw e;
  } finally {
    return false; // overwrites the previous "throw"
    // `f` exits here
  }
}

try {
  console.log(f());
} catch (e) {
  // this is never reached!
  // while f() executes, the `finally` block returns false,
  // which overwrites the `throw` inside the above `catch`
  console.log('caught outer "bogus"');
}

// Logs:
// caught inner "bogus"
// false


// Utilizing Error objects
function doSomethingErrorProne() {
  if (ourCodeMakesAMistake()) {
    throw new Error("The message");
  }
  doSomethingToGetAJavaScriptError();
}

try {
  doSomethingErrorProne();
} catch (e) {
  // Now, we actually use `console.error()`
  console.error(e.name); // 'Error'
  console.error(e.message); // 'The message', or a JavaScript error message
}