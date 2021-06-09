//Function delcaration is hoisted!
console.log(addNumbers(1,2));

//Function Declaration
function addNumbers(a, b){
    return a + b;  
}

//Function Expression
const addNumbersExp = function(a, b) {
    return a + b;
};

//Anonymous Function
const addAnon = function(a, b) {
    return a + b;
}

//Arrow Function
const addArrow = (a, b) => {
    return a + b;
}

//Arrow Function - Implicit Return
const addArrowImplicit = (a, b) => a + b;

//Function expressions are not hoisted!
console.log(addNumbersExp(1,2));

console.log(addAnon(1,2))

console.log(addArrow(1,2))

console.log(addArrowImplicit(1,2))


//Passing Functions as Arguments
const apply = (a,b, fn) => {
    const val = fn(a,b);
    return val;
}

// console.log(apply(1, 4, addArrowImplicit));

//Notice we are NOT invoking the function 
//when passing it as an argument!


