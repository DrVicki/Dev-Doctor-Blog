# ExpressJS Environment

We will learn how to start developing and using the Express Framework. To start twith you should have the Node and the npm (node package manager) installed. 
If you don’talready already have these, go to the Node setup to install node on your local system. Confirm that nod eand and npm are installed by running the following commands in your terminal.

node --verson<br>
npm --version

You should get an output similar to:

v5.0.0<br>
3.5.2

Now with Node and npm set up, let's tackle npm and how to use it.

## Node Package Manager (npm)

npm is the package manager for node. The npm Registry is a public collection of packages of open-source code for Node.js, front-end web apps, mobile apps, robots, routers, and countless other needs of the JavaScript community. npm allows us to access all these packages and install them locally. You can browse through the list of packages available on npm at npmJS.

### How to use npm

There are two ways to install a package using npm: globally and locally.
- Globally: Generally used to install development tools and CLI based packages. To install a package globally, use the following code;

  - npm install -g <package name>
  
- Locally; Generally used to install frameworks and libraries. A locally installed package can be used only within the directory it is installed. To install a package locally, use this code;

  - npm install <package name>
  
When we create a project using npm, we need to provide a package.json file, which has all the details about our project. npm makes it easy for us to set up this file. Let's set up our development project.

<b>Step 1</b> - Start your terminal, create a new folder named hello-worl and cd (create directory) into it.
  - mkdir hello-world
  - cd hello-world/
  
<b> Step 2</b> Create the package.json file using npm, using the following code.
  - npm init
  - It will ask for your input, so keep pressing enter, and enter your name at "author name" filed
  
<b>Step 3</b> Now with our package.json file set up, we will further install Express. To install Express and add to package.json, use:
  - npm install --save express
  - ls node_modules (to confirm correct installation)
  
This is all you need to start development using Express framework. To make our development process easier, we will install a tool from npm, nodemon. This tool restarts our server as soon as we make a change in any of our files. To install nodemon, use this command.
  - npm install -g nodemon
  
Now you can start working on Express.
