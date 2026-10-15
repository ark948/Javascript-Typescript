// Collections of data that hold values be a key, Map and Set (iterable by order of insertion)

const sayings = new Map();
sayings.set("dog", "woof");
sayings.set("cat", "meow");
sayings.set("elephant", "toot");
sayings.size; // 3
sayings.get("dog"); // woof
sayings.get("fox");
sayings.has("bird"); // false
sayings.delete("dog");
sayings.has("dog"); // false

for (const [key, value] of sayings) {
    console.log(`${key} goes ${value}`);
}

// cate goes meow
// elephant goes toot

sayings.clear();
sayings.size; // 0


// Map has some advantages over objects
// object keys are strings, or symbols whereas Map keys can be of any value
// Map has size property, for objects you need to manually keep track of that
// map keeps the insertion order
// Object has prototype, so there are default keys in the map ?


// use objects when shape is known ahead of time and keys are stings
// map keys do not require serialization to string or symbols
// use maps when keys are unknown until runtime, like when coming from external input

// WeakMap
// a collection of key/value pairs when keys are objects or other arbitrary javascript types

// Set objects are collections of unique values. You can iterate its elements in insertion order.
const mySet = new Set();
mySet.add(1);
mySet.add("some text");
mySet.add("foo");

mySet.has(1); // true
mySet.delete("foo");
mySet.size; // 2

for (const item of mySet) {
  console.log(item);
}
// 1
// "some text"


// You can create an Array from a Set using Array.from or the spread syntax. Also, the Set constructor accepts an Array to convert in the other direction.

// NOTE: Duplicate values will be deleted

Array.from(mySet);
let someSet = [...mySet];
mySet2 = new Set([1, 2, 3, 4]);


// WeakSet
// collections of garbage-collectable values including objects and non-registered symbols
// no duplicate allowed
// their use is limited, but they will not leak memory

// Weakset keys must be only objects or symbols no arbitrary values

// Weakset is weak, objects will be garbage-collected if no references are present

// weakset are not enumerable

// Both Map and Set use SameValueZero algorithm

