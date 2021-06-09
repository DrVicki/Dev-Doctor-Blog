
## Part 1: Setting up the Project

Let’s build a simple E-Commerce website using MERN stack (MongoDB, Express, React and Node) where users can add items, pay and order.

We are using Full Stack Javascript to design and develop the application. 
- This means we will use Node, Express and MongoDB to design the REST APIs, and 
- then we use those APIs in the React frontend. 

In Part One, we talk about the basics of the project and set the project up.

The project will be a simple E-Commerce website. 
- It will not have all the bells and whistles of a complete modern E-Commerce website, this Guided Learning is aimed at learning and understanding how everything actually works. 
- You can add features on top of this project to enhance and/or improve it. 
- The design is simple and minimal on the Frontend. 
  - We will use CSS much as our focus is to understand how we deal with APIs on the frontend.
- We will use React Bootstrap to design the React Frontend. 

### Features
- Authentication using JSON Web Tokens (JWT).
- Option to add, edit, view and delete all the items in our store.
- Option to add items or remove items from the cart.
- Display the total bill of the cart and update it as soon as the cart is updated by the user.
- Using Local Storage to store the JWT so that we only allow logged-in users to buy items.
- Option to pay and checkout; create order and empty the cart.

### Tech Stack
**Frontend**: React as the frontend library | Redux for state management | React Bootstrap library for basic design of interface.
<br/>**Backend**: Express library on top of Nodejs | MongoDB as the NoSQL database to store data as documents in JSON format | Mongoose to connect to our MongoDB database.

- We create REST APIs with Express and use endpoints in the React frontend to interact with the backend.

### Open up Terminal and move into the folder where you will create your project.

Create a new folder to store all the project files. 
- I named my folder ‘E-Commerce’. 
- Move into the created folder and type the following command in the terminal to start a new Node project there.
```
npm init
```
It will ask a series of questions like this:

![](https://github.com/DigitalCraftsStudents/hyb-fl-11-2020-cohort/blob/main/lectures/week-21/day-1/npminit.png)

- We can choose any name for our package and give any description. 
- Put your name in the author section. 
- Change the entry point from ```index.js``` to ```server.js```. 
- We will name our entry file as ```server.js``` instead of ```index.js```. 
  - It will work like a server so naming as one seems more reasonable. 
- We leave all other fields blank.
- Click on yes, a ```package.json``` file is crdeated in that folder. 

Open the package.json file in the code editor of your choice. 
- I use VS Code.

Install dependencies using ```npm``` to automatically add them as dependencies in our ```package.json``` file.

This is the ```package.json``` file with the dependencies we need for the project at this moment. 
- We willadd more dependencies as we need them.

```
{
  "name": "e-commerce",
  "version": "1.0.0",
  "description": "An e-commerce app",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
  },
  "author": "Vicki Bealman",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.0.0",
    "concurrently": "^5.3.0",
    "config": "^3.3.3",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.11.11",
    "validator": "^13.5.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```

Actually; you can copy the dependencies and dev dependencies from the ```package.json``` file and update your file. 
- Then run ```npm install``` to install all the dependencies listed in the ```package.json``` file.

After you install the dependencies, let’s talk about the significance of these packages.

- **bcrypt** — We will uthenticate users in our application. We need to store the password of users in the database. So, it is never recommended to store plain text passwords because they can be compromised easily. So; we use bcrypt library to hash the passwords before we save them. We will discuss in more detail into when we use it.
- **concurrently** — This package helps run two processes at the same. We will run both our server and client at the same time without using two separate terminals.
- **config** — Store important data like secret keys, database ID,  in a separate JSON file and access it easily within any file.
- **express** — Use on top of Node to build REST APIs.
- **jsonwebtoken** — Create JWTs for authentication.
- **mongoose** — Establish a connection between MongoDB and our Express app.
- **validator** — Validate items such as emails. 
- **nodemon** — Keep server running andupdates server when any changes are detected.

We added scripts to make it easier to run the server and client:
- **start** — Uses node to run the ```server.js``` file. 
- **server** — Uses nodemon to run the ```server.js``` file to update changes and restart the server automatically.
- **client** — Runs the client. Use a prefix to indicate first moving into client folder and then run the command.
- **dev** — Uses concurrently to run both the server and client at the same time.

Now create a ```server.js``` file in the root directory.
- Start building the ```server.js``` file.
  - Start by completing the required imports of the libraries we would need in this file.

```
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
```

Call express app and set it to use in the application.

```
const app = express();
app.use(express.json());
```
Next; set up the server file to serve static content tol be generated from React app in production. 
- This will only work in the production environment.

```
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}
```

Next; configure our server file to connect to the MongoDB database and start running the server to listen to requests on port 4000.

```
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));
  ```
- We use ```config``` to get our Database URI. 
- We define a port variable to use any port value present in the environment variable as in production; but in development, we use port 4000.

Connect to your database using mongoose and after you successfully connect to the database, start listening to requests on the port; i.e. server is up and running.

This is the ```server.js``` file now:

```
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();
app.use(express.json());

// used in production to serve client files
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

// connecting to mongoDB and then running server on port 4000
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));
```
Create a new folder named ```config``` in the root directory. 
- Create a new file named ```default.json``` inside the ```config``` folder.
- Store your important keys and secrets inside this file in key-value pairs.

```
{
"dbURI": "YOUR_DATABASE_URI",
}
```

Create different folders to keep your ```routes```, ```controllers```, ```models``` files. 
- This reduces clutter and keeps your code readable and maintainable.


We deal with these in the next parts. 
- We dedicate a part to the authentication. 
- Next, we deal with the models, routes and controllers related to Items, Cart and Orders.


I hope you are excited about the upcoming parts!
