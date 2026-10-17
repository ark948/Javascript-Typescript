// a way to customize behavior of loops, especially for..of


// Iterator is any object that implements the Iterator protocol
// by defining the next() method which returns an object with two properties: value (the next value in sequence) and done a boolean indicating the end of sequence

// example of an iterator
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let nextIndex = start;
    let iterationCount = 0;

    const rangeIterator = {
        next() {
            let result;
            if (nextIndex < end) {
                result = { value: nextIndex, done: false };
                nextIndex += step;
                iterationCount++;
                return result;
            }
            return { value: iterationCount, done: true };
        },
    };
    return rangeIterator;
}

// Using it looks like this:
const iter = makeRangeIterator(1, 10, 2);

let result = iter.next();
while (!result.done) {
    console.log(result.value); // 1 3 5 7 9
    result = iter.next();
}

console.log("Iterated over sequence of size:", result.value); // [5 numbers returned, that took interval in between: 0 to 10]


// Iterators are useful, but creating them requires careful maintainability of their internal state
// Generators provide a powerful alternative

// when called, they don't initially execute the code. instead they return a generator.
// generator can be consumed by calling next() method, then it executes until it encounters yield

// the above code, written in generator pattern instead of iterator
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    for (let i = start; i < end; i += step) {
        iterationCount++;
        yield i;
    }
    return iterationCount;
}


// Iterable
// an object is iterable if it defines iteration behavior and implements the iterator protocol

// the fibonacci generator
function* fibonacci() {
    let current = 0;
    let next = 1;
    while (true) {
        const reset = yield current;
        [current, next] = [next, next + current];
        if (reset) {
            current = 0;
            next = 1;
        }
    }
}

const sequence = fibonacci();
console.log(sequence.next().value); // 0
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 2
console.log(sequence.next().value); // 3
console.log(sequence.next().value); // 5
console.log(sequence.next().value); // 8
console.log(sequence.next(true).value); // 0
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 2


