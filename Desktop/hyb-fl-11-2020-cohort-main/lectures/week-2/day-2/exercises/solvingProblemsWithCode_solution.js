//Solving Problems with Code

//Directions: Before you get started with actually writing the code,
//psuedocode and talk through the problem with your partner. 

// Problem #1
// You and your friends just made a batch of cutout sugar cookies
// that you're going to decorate. In order to mix things up, you
// want to decorate the EVEN cookies with red and white frosting, and
// the ODD cookies with green and silver.

//You have a total of 10 cookies. Loop through the cookies, and log out the
//following in an ongoing conversation: cookie number & the frosting colors.

let n = 10;
let conversation = '';
while (n > 0){
    if(n % 2 !== 0) {
        console.log(`cookie ${n}`)
        conversation += 'This cookie has green and silver frosting. '
    } else {
        console.log(`cookie ${n}`)
        conversation += 'This cookie has red and white frosting. '
    }

    n--;  
}

console.log(conversation)


// Problem #2
const scores = [98, 87, 75, 99, 53, 83, 98, 78, 100, 95, 81, 96];

//You're a teacher, and you want to know how many of your students scored AT LEAST
// a 95 on your last exam. 

//If at least 5 people scored a 95 or higher, the class gets a pizza party.
//If not, they have to take the exam again. Log out the count of people who
//scored at least a 95 on the exam and their fate!

const scoresLength = scores.length;
let count = 0;

for(i = 0; i < scoresLength; i++ ){
    if(scores[i] >= 95){
        count++;
    }
}

if(count >= 5) {
    console.log("WE ARE HAVING A PIZZA PARTY!");
} else {
    console.log("We have to take the exam again!")
}

//Problem #3
const celebs = ["Gordon Ramsey","Michael Scott", "Walter White", "Bobby Flay","Pam Beesly", "Rachael Ray", "Giada", 
"Leslie Knope"]
const tables = [4, 3, 1, 1, 2, 3, 4, 2];
const celebToFind = "Bobby Flay";

//You're hosting a dinner party with the following celebs.
//They have been assigned to a table in the corresponding array. For example,
//Gordon Ramsey is seated at table 4. 

//You just found out that Bobby Flay and Walter White are having major beef and 
//You need to make sure that they aren't sitting at the same table. 
//Log out the table that Bobby Flay is sitting at (along with his name), and stop the loop once you find him. 

for(let i = 0; i < celebs.length; i++ ){
    if(celebs[i] === celebToFind){
        console.log(`${celebToFind} is sitting at table ${tables[i]}`);
        break;
    }
}