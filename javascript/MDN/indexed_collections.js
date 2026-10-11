// Array is an ordered list of values

// JS does not have a predefined array data type, use Array object and its methods

const arr1 = new Array(1, 2, 3);
const arr2 = Array(1, 2, 3);
const arr3 = [1, 2, 3];


// defining length of an array
const arr = Array(42);
// this is equal to:
arr = []; // const omitted to prevent syntax errors
arr.length = 42;


// we can also use Array.of static method to create arrays with single element
const arr4 = Array.of(9.3);

const myArray = ["Wind", "Rain", "Fire"];
console.log(myArray[0]); // Wind

// Other properties of array can also be accessed this way (property accessors)
myArray["length"]; // 3


// Populating an array
const emp = [];
emp[0] = "Casey Jones";
emp[1] = "Phil Lesh";
emp[2] = "August West";


// if you supply a non-integer value to the array opreator, a property will be created in the object representing the array,
// instead of an element to array

const arr = [];
arr[3.4] = "Oranges";
console.log(arr.length); // 0
console.log(Object.hasOwn(arr, 3.4)); // true


// The Javascript arrays are actually objects, storing elements as properties and their index as property name
// the length is another property which its value is one integer greater than the index of the highest element (if exists)
// hence the following:
const cats = [];
cats[30] = ["Dusty"];
console.log(cats.length); // 31


// the length is also writable

// Modifying length will the elements, for example if we decrease the length by one, the last element will be removed
cats = ["Dusty", "Misty", "Twiggy"];
console.log(cats.length); // 3

cats.length = 2;
console.log(cats); // ['Dusty', 'Misty'] // last element (twiggy) was removed

cats.length = 0;
console.log(cats); // []; array was emptied

cats.length = 3;
console.log(cats); // [ <3 empty items> ]


// Iterating over arrays
colors = ["red", "green", "blue"];
for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}

// If you know that none of the elements in your array evaluate to false in a boolean context—if your array consists only of DOM nodes, for example—you can use a more efficient idiom:
const divs = document.getElementsByTagName("div");
for (let i = 0, div; (div = divs[i]); i++) {
    /* Process div in some way */
    // do something with divs
    console.log(div);
}


// another method of iterating is forEach()
colors = ["red", "green", "blue"];
colors.forEach((color) => console.log(color));
// red
// green
// blue


// if an item is empty, it will not be listed by forEach
// but if an item is excplityly stated as undefined, it will be included

// Since Javascript arrays are Object, it is NOT recommended to use for..in (because normal elements and properties will be included)

// Array methods
myArray = ["1", "2", "3"];
myArray = myArray.concat("a", "b", "c");
// myArray is now ["1", "2", "3", "a", "b", "c"]


myArray = ["Wind", "Rain", "Fire"];
const list = myArray.join(" - "); // list is "Wind - Rain - Fire"


myArray = ["1", "2"];
myArray.push("3"); // myArray is now ["1", "2", "3"] (pushes to END of the array)


myArray = ["1", "2", "3"];
const last = myArray.pop();
// myArray is now ["1", "2"], last = "3"  (Removes the last element)


myArray = ["1", "2", "3"];
const first = myArray.shift();
// myArray is now ["2", "3"], first is "1" (Removes the first element and returns the array)


// The unshift() method adds one or more elements to the front of an array and returns the new length of the array.
myArray = ["1", "2", "3"];
myArray.unshift("4", "5");
// myArray becomes ["4", "5", "1", "2", "3"]


// slice() extracts a section of the array and returns a new array
myArray = ["a", "b", "c", "d", "e"];
myArray = myArray.slice(1, 4); // [ "b", "c", "d"]
// starts at index 1 and extracts all elements
// until index 3


// The at() method returns the element at the specified index in the array, or undefined if the index is out of range.
// It's notably used for negative indices that access elements from the end of the array.
myArray = ["a", "b", "c", "d", "e"];
myArray.at(-2); // "d", the second-last element of myArray


// The splice() method removes elements from an array and (optionally) replaces them. It returns the items which were removed from the array.
myArray = ["1", "2", "3", "4", "5"];
myArray.splice(1, 3, "a", "b", "c", "d");
// myArray is now ["1", "a", "b", "c", "d", "5"]
// This code started at index one (or where the "2" was),
// removed 3 elements there, and then inserted all consecutive
// elements in its place.


// The reverse() method transposes the elements of an array, in place: the first array element becomes the last and the last becomes the first. It returns a reference to the array.
myArray = ["1", "2", "3"];
myArray.reverse(); // myArray = ["3", "2", "1"]


// flatten an array with all sub-arrays
myArray = [1, 2, [3, 4]];
myArray = myArray.flat(); // [1, 2, 3, 4]


// sort(), sorts in place and returns a reference
myArray = ["wind", "rain", "fire"];
myArray.sort(); // myArray = ["fire", "rain", "wind"]

// sort() also takes a callback 
const sortFn = (a, b) => {
    if (a[a.length - 1] < b[b.length - 1]) {
        return -1; // negative number => a < b, a comes before b
    } else if (a[a.length - 1] > b[b.length - 1]) {
        return 1; // positive number => a > b, a comes after b
    }
    return 0; // Zero => a = b, a and b keep their original order
};

myArray.sort(sortFn); // ['wind', 'fire', 'rain']


// search() searches the array and returns the index of first match
const a = ["a", "b", "a", "b", "a"];
console.log(a.indexOf("b")); // 1

// Now try again, starting from after the last match
console.log(a.indexOf("b", 2)); // 3
console.log(a.indexOf("z")); // -1, because 'z' was not found



// lastIndexOf() starts at the end and searches backwards
a = ["a", "b", "c", "d", "a", "b"];
console.log(a.lastIndexOf("b")); // 5

// Now try again, starting from before the last match
console.log(a.lastIndexOf("b", 4)); // 1
console.log(a.lastIndexOf("z")); // -1


// forEach can take a callback
a = ["a", "b", "c"];
a.forEach((element) => {
    console.log(element); // the callback that executes on every element
});
// Logs:
// a
// b
// c



// map() returns a new array, and executes a callback on every item
const a1 = ["a", "b", "c"];
const a2 = a1.map((item) => item.toUpperCase());
console.log(a2); // ['A', 'B', 'C']


// flatMap() method runs map() followed by a flat() of depth 1
a1 = ["a", "b", "c"];
a2 = a1.flatMap((item) => [item.toUpperCase(), item.toLowerCase()]);
console.log(a2); // ['A', 'a', 'B', 'b', 'C', 'c']


// The find() method returns the first item for which callback returned true
a1 = ["a", 10, "b", 20, "c", 30];
const i = a1.find((item) => typeof item === "number");
console.log(i); // 10


// findlast() is the same, but returns the last item for which callback returns true, here 30


// The findIndex() method returns the index of the first item for which callback returned true.
a1 = ["a", 10, "b", 20, "c", 30];
i = a1.findIndex((item) => typeof item === "number");
console.log(i); // 1


// findLastIndex() returns the last index of the item that callback is true for, here 5


// The every() method returns true if callback returns true for every item in the array.
function isNumber(value) {
    return typeof value === "number";
}
a1 = [1, 2, 3];
console.log(a1.every(isNumber)); // true
a2 = [1, "2", 3];
console.log(a2.every(isNumber)); // false


// The some() method returns true if callback returns true for at least one item in the array.
function isNumber(value) {
    return typeof value === "number";
}
a1 = [1, 2, 3];
console.log(a1.some(isNumber)); // true
a2 = [1, "2", 3];
console.log(a2.some(isNumber)); // true
const a3 = ["1", "2", "3"];
console.log(a3.some(isNumber)); // false


// The reduce() method applies callback(accumulator, currentValue, currentIndex, array) for each value in the array for the purpose of reducing the list of items down to a single value. 
a = [10, 20, 30];
const total = a.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
);
console.log(total); // 60

// the reduceRight() is the same, but works from the last element



// Array transformations

// we can transform back and forth between arrays and other data structures

// example we have this:
const inventory = [
    { name: "asparagus", type: "vegetables" },
    { name: "bananas", type: "fruit" },
    { name: "goat", type: "meat" },
    { name: "cherries", type: "fruit" },
    { name: "fish", type: "meat" },
];


const result = Object.groupBy(inventory, ({ type }) => type);
console.log(result);
// Logs
// {
//   vegetables: [{ name: 'asparagus', type: 'vegetables' }],
//   fruit: [
//     { name: 'bananas', type: 'fruit' },
//     { name: 'cherries', type: 'fruit' }
//   ],
//   meat: [
//     { name: 'goat', type: 'meat' },
//     { name: 'fish', type: 'meat' }
//   ]
// }


// NOTE: the returned object references the same elements as the original array


// Map.groupBy() is same, but it groups to a map object


// Sparse arrays
// arrays with empty slots

// Array constructor:
a = Array(5); // [ <5 empty items> ]

// Consecutive commas in array literal:
const b = [1, 2, , , 5]; // [ 1, 2, <2 empty items>, 5 ]

// Directly setting a slot with index greater than array.length:
const c = [1, 2];
c[4] = 5; // [ 1, 2, <2 empty items>, 5 ]

// Elongating an array by directly setting .length:
const d = [1, 2];
d.length = 5; // [ 1, 2, <3 empty items> ]

// Deleting an element:
const e = [1, 2, 3, 4, 5];
delete e[2]; // [ 1, 2, <1 empty item>, 4, 5 ]



// NOTE : In some operations, empty slots behave as if they are filled with undefined

const arr = [1, 2, , , 5]; // Create a sparse array

// Indexed access
console.log(arr[2]); // undefined

// For...of
for (const i of arr) {
    console.log(i);
}
// Logs: 1 2 undefined undefined 5

// Spreading
const another = [...arr]; // "another" is [ 1, 2, undefined, undefined, 5 ]


// But in others (most notably array iteration methods), empty slots are skipped.
const mapped = arr.map((i) => i + 1); // [ 2, 3, <2 empty items>, 6 ]
arr.forEach((i) => console.log(i)); // 1 2 5
const filtered = arr.filter(() => true); // [ 1, 2, 5 ]
const hasFalsy = arr.some((k) => !k); // false

// Property enumeration
const keys = Object.keys(arr); // [ '0', '1', '4' ]
for (const key in arr) {
    console.log(key);
}
// Logs: '0' '1' '4'
// Spreading into an object uses property enumeration, not the array's iterator
const objectSpread = { ...arr }; // { '0': 1, '1': 2, '4': 5 }



// Multi-dimensional arrays
// can be created by nesting arrays

a = new Array(4);
for (let i = 0; i < 4; i++) {
    a[i] = new Array(4);
    for (let j = 0; j < 4; j++) {
        a[i][j] = `[${i}, ${j}]`;
    }
}
/*
Row 0: [0, 0] [0, 1] [0, 2] [0, 3]
Row 1: [1, 0] [1, 1] [1, 2] [1, 3]
Row 2: [2, 0] [2, 1] [2, 2] [2, 3]
Row 3: [3, 0] [3, 1] [3, 2] [3, 3]
*/


// arrays can be used like objects to store related information
const arr = [1, 2, 3];
arr.property = "value";
console.log(arr.property); // "value"


// Some objects are array-like
// they have some behaviors and metohds of arrays but not all of them
// for example NodeList returned by document.getElementsByTagName()
// or the arguments object inside body of a function has the length attribute but not array methods like forEach()


// but you can call them indirectly using Function.prototype.call()
function printArguments() {
    Array.prototype.forEach.call(arguments, (item) => {
        console.log(item);
    });
}



// Array prototype methods can be used on strings as well, since they provide sequential access to their characters in a similar way to arrays:
Array.prototype.forEach.call("a string", (chr) => {
    console.log(chr);
});