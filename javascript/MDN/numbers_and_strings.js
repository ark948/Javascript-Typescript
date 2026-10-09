// in javascript numbers can be represented in many different ways and shapes

// add _ to increase readability
1_000_000_000_000
1_050.95
0b1010_0001_1000_0101
0o2_2_5_6
0xA0_B0_C0
1_000_000_000_000_000_000_000n


const biggestNum = Number.MAX_VALUE;
const smallestNum = Number.MIN_VALUE;
const infiniteNum = Number.POSITIVE_INFINITY;
const negInfiniteNum = Number.NEGATIVE_INFINITY;
const notANum = Number.NaN;

// Apparently _ can be added between any integer not just thousands
console.log(10_0); // 100

// the builtin Math object has may mathematical methods and constants

Math.PI;

Math.sin(1.56);

// and many more


// BigInts
const b1 = BigInt(123);
// Using a string prevents loss of precision, since long number
// literals don't represent what they seem like.
const b2 = BigInt("-1234567890987654321");

const bigintDiv = 5n / 2n; // 2n, because there's no 2.5 in BigInt


// Strings can also be represented in different shapes
// but the most common ones are with using single or double quotes

// String object has some methods too
console.log("hello".toUpperCase()); // HELLO


// Template literals
// can be used for embedded expressions

console.log(`${1+2} is 3`);

// multi-line strings
console.log(
  "string text line 1\n\
string text line 2",
);
// "string text line 1
// string text line 2"

// also
console.log(`string text line 1
string text line 2`);
// "string text line 1
// string text line 2"


const five = 5;
const ten = 10;
console.log(`Fifteen is ${five + ten} and not ${2 * five + ten}.`);
// "Fifteen is 15 and not 20."


