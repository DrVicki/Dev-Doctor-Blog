# Week 6 - Day 2: January 9, 2021

Welcome to Week 6!

## Agenda

- [Pre-Class 6.2 Lesson: AWS Deployment](https://learn.digitalcrafts.com/flex/lessons/handling-user-input/aws-deployment/)
- Code-Along Lesson [Host a Static Website on AWS](https://aws.amazon.com/getting-started/hands-on/host-static-website/0)
- In-Class Project [Build & Host a Full-Stack React Application on AWS](https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/)
- In-Class Project REVISED [Build React App & Host on AWS](https://www.youtube.com/watch?v=uNljKd7VnaM)
- Wrap up/Reflection [January 9 Exit Ticket](https://forms.gle/14EP4BzxWzDRZ7bt5)
  - Office hours reminder

## Homework for January 12 Class
Small Project Day is January 12, 2021<br>
- [January 12 Small Project Choice Form: Required](https://forms.gle/1pN4NBiXixJH3ZSt9)<br>
- Below are several ideas you can potentially choose; review each and select one or select one not on the list.
### Notes App
- Difficulty: Beginner

 - With a notes app, you can create and store any of your notes for later use. It’s fairly easy to build, and can be done with only JS for the functionality.

- <h4>Basic Features
- User should be able to create, edit, and delete a note. When a user closes the browser window, the notes will be stored and when the user returns to the application, the data will be retrieved (use localStorage).

- <h4>Bonus Features
- User can create and edit a note in Markdown formatting. The application will convert the Markdown to HTML on save. The User should also be able to see the date when he made the note.

- <h4>Useful Resources and Tutorials
- [Create Notes App With JS Tutorial](https://www.youtube.com/watch?v%3DBav5SL8-sI4)
- [Notes App Tutorial Docs](https://eqdn.tech/html5-note-app-tutorial/)
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Markdown Syntax](https://www.markdownguide.org/basic-syntax/)
  
### Quiz App
- Difficulty: Intermediate

 - With a quiz app, you can practice and test you knowledge by answers questions in a quiz. You can create a quiz app for the purpose of testing yourself or others.

- <h4>Basic Features
- User can start the quiz by pressing a button, can see a question with 4 possible answers, and then move on to the next question. At the end of the quiz, the user will see what questions they got correct or incorrect. The application should show them how long it took to finish the quiz, and whether or not they passed or failed the quiz.

- <h4>Bonus Features
- Make the end of the application have a restart button to redo the quiz. On the redo, shuffle the order of the questions so the user can’t cheat as easily.

- <h4>Useful Resources and Tutorials
- [Example of Project](https://codepen.io/FlorinPop17/full/qqYNgW)
- [Another Example](https://tranquil-beyond-43849.herokuapp.com/)
- [Build A Quiz App Tutorial](https://www.youtube.com/watch?time_continue%3D2%26v%3DriDzcEQbX6k%26feature%3Demb_title)

### E-commerce Online Store
- Difficulty: Intermediate

 - The simple online store gives users the capability of selecting products to purchase, viewing the purchase information, adding to their cart, and actually purchasing the products that they added to their shopping cart.

- <h4>Basic Features
- User can view their products on a Products page. They can see a card on the Products page for each product. Each product has a photo, name, price, short description, and a ‘Add To Cart’ button.
- User sees a Product Details page displayed when they click the ‘Add To Cart’ button. The Product Details page also shows a unique product id, detailed description, ‘Add To Cart’ button, and other products that are similar.
- When the user clicks on the ‘See More Products’ page, they return to the original Products page.
- User can see how much their total purchase costs, how many of each product they want, and is able to cancel or change their purchase.

- <h4>Bonus Features
- User sees an error message if they order more than the amount of that product in stock. User can specify their billing info and shipping address.

- <h4>Useful Resources and Tutorials
- [Build a Shopping Cart Tutorial](https://www.smashingmagazine.com/2014/02/create-client-side-shopping-cart/)
- [Ecommerce Bootstrap Theme](https://themes.getbootstrap.com/product/shopper/)

### To-Do List App
- Difficulty: Intermediate

 - The todo list is an application where a user can keep track of their daily, weekly, and even yearly tasks. Users can write down everything they want to accomplish or do today.

- <h4>Basic Features
- User types in a task item in an input field. The user can also submit the task and see that it is added to a list of tasks. This can be done by pressing the enter key or a button. Tasks can also be marked as completed, and removed by pressing on a button.

- <h4>Bonus Features
- Users should be able to edit their tasks easily. The tasks are also saved with LocalStorage.

- <h4>Useful Resources and Tutorials
- [Code a Better To-do List](https://www.youtube.com/watch?v%3DW7FaYfuwu70)
- [Make a ToDo List With JS: Dev Ed](https://www.youtube.com/watch?v%3DTtf3CEsEwMQ)

### JavaScript Clock
- Difficulty: Beginner

 - Wouldn’t it be great to have a simple application that counts down the months, weeks, days, hours, minutes, and seconds to a certain event in the future?
 - That’s why you should build a simple countdown timer to provide a display of decrementing months, weeks, days, hours, minutes, and seconds to a user specified date and event.

- <h4>Basic Features
- User chooses a date in the future. User clicks a button and a countdown timer begins. User can add a label to an event. For example, a user can name an event “My friend’s birthday” to help them remember their friend’s birthday.

- <h4>Bonus Features
- User sees a warning message if the event name is blank, or if it is not filled out correctly. User can save the event so he or she doesn’t lose it or forget about it. User gets alerted when the timer is finished. You can also add a feature to allow the user to make more than 1 event.

- <h4>Useful Resources and Tutorials
- [Countdown Timer Tutorial](https://www.youtube.com/watch?v%3DNJVJRFF-Y6U)
- [Simple Clock/Timer Example](https://codepen.io/karlo-stekovic/pen/OajKVK)
- [Build Countdown App with React](https://www.florin-pop.com/blog/2019/05/countdown-built-with-react/)
  
### Weight Conversion Tool
- Difficulty: Beginner

 - Build a simple weight converter app using JS. It converts pounds to grams, kilograms, and ounces.

- <h4>Basic Features
- User enters a number that gets converted to other weights.

- <h4>Bonus Features
- User can keep what weights they converted saved (use LocalStorage).

- <h4>Useful Resources and Tutorials
- [Simple Weight Converter Tutorial](https://www.youtube.com/watch?v%3D7l-ZAuU8TXc)
- [Weight Converter App W3schools](https://www.w3schools.com/howto/howto_js_weight_converter.asp)

### Weather App
- Difficulty: Intermediate

 - Learn how to build a simple and functional weather app with JS.

- <h4>Basic Features
- User searches for a city in an input element. When a user presses enter or clicks a submit button, the weather API gets called to display the weather. User can view the weather in his/her location. User can choose between Celsius or Fahrenheit.
- A weather icon or background image changes depending on weather conditions (sunny, rainy).

- <h4>Bonus Features
- User can even search for weather information of other locations.

- <h4>Useful Resources and Tutorials
- [Build a Weather App with Node.JS](https://codeburst.io/build-a-simple-weather-app-with-node-js-in-just-16-lines-of-code-32261690901d)
- [Build A Weather App FreeCodeCamp](https://www.freecodecamp.org/news/building-a-weather-app-a3cec42b11fa/)
- [Weather App Tutorial Dev Ed](https://www.youtube.com/watch?v%3DwPElVpR1rwA)

## Where to find stuff
- /notes - This will include any example code or notes created during class so you can always go back and review
- RESOURCES.md - Any relevant resources for the current day in class

