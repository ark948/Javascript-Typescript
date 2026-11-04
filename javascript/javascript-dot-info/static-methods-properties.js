// static methods belong to the class itself and can be invoked without instantiating an object first

class User {
    static staticMethod() {
        console.log(this === User);
    }
}

User.staticMethod(); // true

// also works:
User.staticMethod2 = function () {
    console.log(this === User);
};

User.staticMethod2(); // true

// example
class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    static compare(articleA, articleB) {
        return articleA.date - articleB.date;
    }
}


let articles = [
    new Article("HTML", new Date(2019, 1, 1)),
    new Article("CSS", new Date(2019, 0, 1)),
    new Article("JavaScript", new Date(2019, 11, 1))
];

articles.sort(Article.compare);
console.log(articles[0].title); // CSS

// Another example: factory method
class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    static createTodays() {
        // this = Article
        return new this("Today's digest", new Date());
    }
}

let article = Article.createTodays();
console.log(article.title); // Today's digest

// Static methods are also popular with database-related operations: search/save/remove

// IMPORTANT: Static methods are not CALLABLE on individual objects

// Static properties
class Article {
    static publisher = "Some Guy";
}

console.log(Article.publisher); // Some Guy

// direct assigment also works: Article.publisher = "Some Guy"

// Static methods and properties are inherited
class Animal {
    static planet = "Earth";
    constructor(name, speed) {
        this.speed = speed;
        this.name = name;
    }

    run(speed = 0) {
        this.speed += speed;
        alert(`${this.name} runs with speed ${this.speed}.`);
    }

    static compare(animalA, animalB) {
        return animalA.speed - animalB.speed;
    }

}

// Inherit from Animal
class Rabbit extends Animal {
    hide() {
        alert(`${this.name} hides!`);
    }
}

let rabbits = [new Rabbit("White Rabbit", 10), new Rabbit("Black Rabbit", 5)];
rabbits.sort(Rabbit.compare);
rabbits[0].run(); // Black Rabbit runs with speed 5.
alert(Rabbit.planet); // Earth


// some stuff about __proto__ skipped