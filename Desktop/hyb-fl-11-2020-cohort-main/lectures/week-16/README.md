# Week 16

# Phase 2:  Backend Project Requirements

## March 16, 2021 - March 30, 2021

This is the final project for "Phase 2" of the Flex course. It is focused on backend technologies using [Node.js].

[DigitalCrafts]:https://www.digitalcrafts.com/
[Node.js]:https://nodejs.org/

## Project Description

Your task is to build a copy of an existing web application using the backend
technologies we have learned in Phase 2: [express.js], [PostgreSQL], [MongoDB], [knex.js],
etc.

You will not be designing something "new" for this project. Pick something that
already exists and build it from scratch with your team. Examples: a Twitter
clone, a simplified Facebook clone, a basic forum, a small ecommerce website,
etc. The project scope should be well-understood and defined up-front. Please
verify your project plans with an instructor before beginning coding.

You will need some HTML + CSS in order for the application to work, but it is ok
to keep this part simple (hint: use a CSS framework). Focus on thoroughness of
the implementation using backend technologies like `GET` and `POST` requests,
database schema and queries, user authentication, form submission and
validation, HTML templates, etc.

[express.js]:https://expressjs.com/
[PostgreSQL]:https://www.postgresql.org/
[MongoDB]: https://www.mongodb.com/try
[knex.js]:https://knexjs.org/

## Due Date

Each team will present their project in class on **Tuesday, March 30th**.

## Technical Requirements

Your application **must**:

- You must use some form of HTML templating
  - Pure JavaScript functions that return strings, or use [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
  - [mustache](http://mustache.github.io/), [handlebars](https://handlebarsjs.com/), [ejs](https://ejs.co/), [pug](https://pugjs.org/api/getting-started.html), etc

- Your project must support database [schema migrations](https://en.wikipedia.org/wiki/Schema_migration).

- User actions should trigger [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) against the database.
  - You must have at least **two** `<form>` submissions that insert or edit data in a database.
  - The forms should handle input validation and show errors in the UI (if necessary)
  - Do not use AJAX for form submission; use a native HTML `<form>` element
  - This [Working with forms](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms) tutorial might be helpful

- Have user authentication using [passport.js](http://www.passportjs.org/)
  - must support at least one OAuth provider (Twitter, Facebook, GitHub, etc)
  - must support passport.js "local strategy" backed with a database

- Code must follow some organization scheme.
  - Everything cannot be in one super long file.
  - Break different parts of the code into different files / modules.
  - No "spaghetti code".
  - Bonus / optional: consider using a build system with [npm scripts]

- Client-side JavaScript should be less than 200 lines of code.
  - Note: this does not include libraries
  - No cheating by writing all of your JS on one line, etc
  - The focus is backend, not frontend. But you will need some client-side code in some circumstances

- Your project must be hosted somewhere publicly reachable via `https`
  - Note that you do not need to purchase a domain name for your project. But it
    should be reachable via a public URL somewhere.
  - Examples: [Zeit Now](https://zeit.co/now), [Heroku](https://www.heroku.com/), [DigitalOcean](https://www.digitalocean.com/)

- Your project must have a `README.md` file written using [Markdown] with at least the following:
  - Explanation of what the project is / what it does.
  - What technologies you used.
  - List of team members.

- **(optional)** Connect your repo to [Travis CI](https://travis-ci.org/):
  - You must have at least one test of an API endpoint that touches the database
  - This tutorial might be helpful: [Test Driven Development with Node](https://mherman.org/blog/test-driven-development-with-node/)
  - Put a build status badge in your `README.md` that links to your latest build
  - Hint: don't forget to test for [StandardJS]!

- **(optional)** Have at least one AJAX-based GET endpoint that powers a dynamic dropdown or type-ahead component
  - This part will require some client-side JavaScript
  - Example components:
    - http://autocompletejs.com/examples#2000
    - https://jqueryui.com/autocomplete/#remote

- **(optional)** Your project must be able to swap between database types by using a config file.
  - In other words, your database should not be tied to just PostgresQL
  - Hint: use an abstraction layer like [knex.js](https://knexjs.org/) or [Sequelize](http://docs.sequelizejs.com/)

[Markdown]:https://guides.github.com/features/mastering-markdown/
[StandardJS]:https://standardjs.com/
[npm scripts]:https://deliciousbrains.com/npm-build-script/

## Workflow Requirements

- You will work solo.

- Maintain a GitHub repo.

## Learning Objectives


The focus of this project is less about creativity and more about completeness and thoroughness of implementation.

--------------------------------------------------------------------------------


