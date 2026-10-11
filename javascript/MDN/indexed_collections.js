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
  console.log(element);
});
// Logs:
// a
// b
// c



