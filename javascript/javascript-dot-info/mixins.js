// Mixins are classes containing methods that can be used by other classes without inherting from them

// We use them to add behavior to classes

// example mixin
let sayHiMixin = {
    sayHi() {
        console.log(`Hello ${this.name}`);
    },

    sayBye() {
        console.log(`Bye ${this.name}`);
    }
};

class User {
    constructor(name) {
        this.name = name;
    }
}

Object.assign(User.prototype, sayHiMixin);

// Now User can say Hi
new User("dude").sayBye(); // hello, Dude

// Since there is no inheritance, User is free to inherit from other classes
class User extends Person {
    // ...
}

Object.assign(User.prototype, sayHiMixin);


// Mixins can make use of inheritance inside themselves
let sayMixin = {
    say(phrase) {
        console.log(phrase);
    }
};

sayHiMixin = {
    __proto__: sayMixin, // (or we could use Object.setPrototypeOf as well)
    sayHi() {
        // call parent method
        super.say(`Hello ${this.name}`);
    },

    sayBye() {
        super.say(`Bye ${this.name}`);
    }
};



class User {
    constructor(name) {
        this.name = name;
    }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!



// EventMixin
// generating events is an important feature
// it is a way to broadcast information to anyone who wants it

let eventMixin = {
    /**
     * Subscribe to event, usage:
     *  menu.on('select', function(item) { ... }
    */
    on(eventName, handler) {
        if (!this._eventHandlers) this._eventHandlers = {};
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
    },

    /**
     * Cancel the subscription, usage:
     *  menu.off('select', handler)
     */
    off(eventName, handler) {
        let handlers = this._eventHandlers?.[eventName];
        if (!handlers) return;
        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
                handlers.splice(i--, 1);
            }
        }
    },

    /**
     * Generate an event with the given name and data
     *  this.trigger('select', data1, data2);
     */
    trigger(eventName, ...args) {
        if (!this._eventHandlers?.[eventName]) {
            return; // no handlers for that event name
        }

        // call the handlers
        this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
    }
};

// on -> stores and array of handlers for each event and adds them to a list
// off -> removes the function from handlers list
// trigger -> generates the events

// Usage:
// Make a class
class Menu {
    choose(value) {
        this.trigger("select", value);
    }
}
// Add the mixin with event-related methods
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// add a handler, to be called on selection:
menu.on("select", value => alert(`Value selected: ${value}`));

// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123");