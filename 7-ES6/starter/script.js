//let and const. 

//ES5:
// var name5 = "Jane Smith";
// var age = 23;
// name5 = "Jane Miller";
// console.log(name5);

// //ES6 

// const name6 = "Jane Smith";
// let age = 23;
// name6 = "Jame Miller";
// console.log(name6);

// In ES6, let and const are available only to calls made within their same block. Var is scoped up to the function it is defined in. Below, I can define firstName 
// and yearOfBirth inside the IFFY and it is still available in the execution context of the first function. 

//ES5
function driversLicense(passedTest) {

    (function(passedTest){
        if (passedTest) {
            var firstName = 'John';
            var yearOfBirth = 1990;
        }
    })
    // console.log(firstName + ", born in " + yearOfBirth);
}

// console.log(driversLicense(true))

//ES6
//let can be declared in the outer scope and redefined in the inner scope but will not be available in the outer scope if only defined in the inner. 
function driversLicense(passedTest) {
    let firstName;
    const yearOfBirth = 23;

    if (passedTest) {
        firstName = 'John';
    }
    // console.log(firstName + ", born in " + yearOfBirth);

}

console.log(driversLicense(true))

//these two i's function independently of each other because of the way that let scoping works. 
let i = 23;
for (let i = 0;i < 5; i++) {
    // console.log(i);
}
// console.log(i);

/////////////////////////////////////////////////////
//BLOCKS AND IFFY'S
////////////////////////////////////////////////////
// es5

(function() {
    var c = 3;
})();

//Console logging c does not work because var is function scoped in ES5, and an iffy qualifies as a function
//console.log(c);

// ES6 allows the below syntax, which is treated as a block and not a function. Thus, var is accessible from outside the function, but let is not. 
{
    const a = 1;
    let b = 2;
    var d = a + b ;
}

console.log(d);

///////////////////////////////////////////////////////
//Strings in ES5
//////////////////////////////////////////
let firstName = 'john';
let lastName = 'Smith';
const yearOfBirth = 1990; 
function calcAge(year) {
    return 2016 - year;
}

// ES5 
console.log("Hello, my name is " + firstName + ' ' + lastName + " and I was born in " + yearOfBirth);

// ES6 
console.log(`Hello, my name is ${firstName} ${lastName} and I was born in ${yearOfBirth}`)


////////////////////////////////////////////////////////////////////
// Arrow Functions: 
//////////////////////////////////////////
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2016 - el;
})
console.log(ages5);

// ES6

ages6 = years.map((el) => 2016 - el);
console.log(ages6);

//Where inside the event listener, this is the window object, so we can save this to the self variable so that it is available in the listener. 
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {

        var self = this;
        console.log("Outside this: ", this);
        //outside here, this is the object
        document.querySelector('.green').addEventListener('click', function() {
            console.log("Inside this: ", this);
            //inside here, this is the div element. 
            var str = "This is box number "+ self.position + " and it is " + self.color;
            alert(str);
        });
    }
}
// box5.clickMe();


//ES6

//arrow functions share the this of their surroundings, not of the window/ place where the event listener is. 
//Arrow functions share the lexical this of their surroundings. 
var box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        console.log("Outside this: ",this);
        //Both the inner and outer this are the object. 
        document.querySelector('.green').addEventListener('click', () => {
            console.log("Inside this: ",this);
            var str = "This is box number "+ this.position + " and it is " + this.color;
            alert(str);
        });
    }
}
box6.clickMe();

function Person(name) {
    this.name = name; 
}

// ES5
Person.prototype.myFriends5 = 
    function(friends) {
        var self = this;
        var arr = friends.map(function(el) {
            //in this case, This is the window object. 
            //but, we can create a  copy of the function with bind, and pass it into the function. 
            console.log(this);
            return this.name + " is friends with " + el 
        }.bind(this))
        console.log(arr);
    }

    var friends = ['Bob', 'Jane', 'Mark'];
    // new Person('John').myFriends5(friends);


Person.prototype.myFriends6 = 
function(friends) {
    var arr = friends.map((el) => {
        //the this value outside of the start of this enumerable function is the object itself.
        //by using an arrow function, we retain the this value from the previous this value.  
        console.log(this);
        return `${this.name} is friends with ${el}`; 
    });
    console.log(arr);
}

    var friends = ['frank', 'leonard', 'Ralph'];
    new Person('John').myFriends5(friends);


////////////////////////////////
//DESTRUCTURING/////////////////

// ES5
// var john = ['John', 26];
// var name = john[0];
// var age = john[1];

// ES6

const [name, age] = ['John', 26 ]

console.log(name, age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);



function calcAgeRetirement(year) {
    const age = 2018 - year;
    return [age, 65 - age];
}

const[name2, age2] = calcAgeRetirement(1993);
console.log(name2);
console.log(age2);

const boxes = document.querySelectorAll('.box');

// ES5 
//querySelectorAll returns a node list.
//using the call method, we are able to call an array prototype method on the node list.

// console.log(boxes);
// var boxArr5 = Array.prototype.slice.call(boxes);
// boxArr5.forEach(function(box) {
//     box.style.backgroundColor = "dodgerblue";
// });

// ES6 provides a built in way to convert from a node list to a prototype. 
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach((bx) => {
    bx.style.backgroundColor = 'dodgerblue';
});

// ES5

for(var k =0; k< boxesArr6.length; k++) {
    // if (boxesArr6[k].className != 'boxblue') {
    //     boxesArr6[k].innerHTML = "I am blue!"
    // }
}

//ES6

for (const e of boxesArr6) {
    if (e.className != 'boxblue') {
        e.innerHTML = "I became blue!"
    }
}

// ES5

var ages = [12,17,8,21,14,11]
var full = ages.map(function(e){
    return e >= 18
})
console.log(full);
console.log(ages[full.indexOf(true)]);

//ES6

g = ages.findIndex((e) => {
    return e >=18;
})

console.log(g);