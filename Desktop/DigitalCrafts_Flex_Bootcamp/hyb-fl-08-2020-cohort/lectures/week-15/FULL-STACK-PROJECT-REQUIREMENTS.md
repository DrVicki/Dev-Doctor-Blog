# Phase 2 Backend Project Requirements

This is the final project for "Phase 2" of the Flex course for [DigitalCrafts]
Houston. It is focused on backend technologies using [Node.js].

> NOTE: You must complete this project in accordance with the requirements laid out
  below in order to fulfill Texas state requirements for credit for the course. If
  you have any questions or concerns about the requirements, please see an
  instructor.

[DigitalCrafts]:https://www.digitalcrafts.com/
[Node.js]:https://nodejs.org/

## Project Description

Your task is to build a copy of an existing web application using the backend
technologies we have learned in Phase 2: [express.js], [PostgreSQL], [knex.js],
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
[knex.js]:https://knexjs.org/

## Due Date

Each team will present their project in class on **Tuesday, December 22nd**.

We will have Career Week activities during the second week - more information on this forthcoming

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

- (optional) Connect your repo to [Travis CI](https://travis-ci.org/):
  - You must have at least one test of an API endpoint that touches the database
  - This tutorial might be helpful: [Test Driven Development with Node](https://mherman.org/blog/test-driven-development-with-node/)
  - Put a build status badge in your `README.md` that links to your latest build
  - Hint: don't forget to test for [StandardJS]!

- (optional) Have at least one AJAX-based GET endpoint that powers a dynamic dropdown or type-ahead component
  - This part will require some client-side JavaScript
  - Example components:
    - http://autocompletejs.com/examples#2000
    - https://jqueryui.com/autocomplete/#remote

- (optional) Your project must be able to swap between database types by using a config file.
  - In other words, your database should not be tied to just PostgresQL
  - Hint: use an abstraction layer like [knex.js](https://knexjs.org/) or [Sequelize](http://docs.sequelizejs.com/)

[Markdown]:https://guides.github.com/features/mastering-markdown/
[StandardJS]:https://standardjs.com/
[npm scripts]:https://deliciousbrains.com/npm-build-script/

## Workflow Requirements

- You can work solo, or on a team of up to 3 students

- Create one GitHub repo and add all group members as collaborators.

- Collaborate using Pull Requests (PRs):
  - No one should commit to the master branch directly.
  - Every PR should be reviewed and approved by at least one team member (not the person who originated the PR).
  - PRs should not be merged by the person who opened it (no self-merging).
  - See below for [suggested PR rejection criteria](#suggested-pr-rejection-criteria)

- Project features and bugs should be tracked using GitHub Issues.
  - Use of additional project management tooling (Trello, JIRA, etc) is at your team's discretion

## Suggested PR Rejection Criteria

It's ok to reject a PR or have a PR rejected - that is what the PR process is
for! Remember if your PR is rejected that doesn't mean you are a bad person and
stink at life. It just means that your teammate(s) see something that could be
improved. The PR process is more about sharing knowledge than "you did something
wrong".

Any of the following are valid reasons to reject a PR:

- Breaks the build (Travis CI breaks)
- Does not fulfill feature
- Breaks other feature
- Does not follow team coding style / standards
- Too much to review / large code diff (ie: should be broken up into smaller PRs)
- Code in the PR does not match up with commit message
- Commit message is vague

## Learning Objectives

> TODO: finish this section

The focus of this project is less about creativity and more about completeness and thoroughness of implementation.

--------------------------------------------------------------------------------

This requirements document is licensed as [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/):

> You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.
