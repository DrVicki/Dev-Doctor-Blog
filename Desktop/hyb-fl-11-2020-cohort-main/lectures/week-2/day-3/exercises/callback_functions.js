//CALLBACK FUNCTIONS
//setTimeout()
let myVar

function myFunction() {
  myVar = setTimeout(alertFunc, 3000);
}

function alertFunc() {
  console.log("Hello!");
}

console.log(myFunction())




//JavaScript Array Methods
//Many of them use callback functions!
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// nums.forEach(function(element) {
//     console.log(element)
// })

//This is the exact same thing as the example above but with an arrow function
// nums.forEach((element) => {
//     console.log(element);
// })

//This is also the exact same thing, but IMPLICITLY returned with an arrow function.
// nums.forEach(el => console.log(el));