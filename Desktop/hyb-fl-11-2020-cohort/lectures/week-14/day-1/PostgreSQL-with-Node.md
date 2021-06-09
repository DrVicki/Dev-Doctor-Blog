# PostgreSQL with NodeJS

## Prerequisites
- Node.js (preferably Node 14.x) installed and running on your machine.
- You are aware of how Node.js generally works and also have a bit of Express Js experience.
- Having some knowledge of Git and GitHub will be really useful.
- For the database we will use a free database on [ElephantSQL](https://www.elephantsql.com/), so please register and set up a free PostgreSQL database there. 
- You are able to code using an IDE. I will be using VS Code as an editor but you are free to use any code editor of your choice for this Node.js PostgreSQL tutorial.

## Steps for Node.js PostgreSQL tutorial

We will be building a very simple REST API with Express Js that can send out some quotes. So let’s start with setting up Express js:

### Setup Express with express generator
Run the following command:

```npx express-generator --no-view --git nodejs-postgresql```

The ```--no-view``` parameter tells the generator to generate the Express app without any views like Pug. The other ```--git``` parameter indicates that we want to add the default ```.gitignore``` file in our Express app.

It will create the needed files in ```nodesj-postgresql``` directory. Your express will be set up when the command runs successfully. To quickly check if Express is setup correctly run the below:

```cd nodejs-posgresql && npm install && DEBUG=nodejs-posgresql:* npm start```

You should see something similar to the image below on your browser when you go to http://localhost:3000:
![Browser Image](https://geshan.com.np/images/nodejs-postgresql-tutorial/02express.jpg)


**Delete the public folder**
Because we are building a REST API for quote,s for this Node.js PostgreSQL tutorial we don’t need CSS or JS. wWe will delete the generated ```public``` folder as we will deal with JSON.

To delete the generated public folder execute the following on your terminal:
```rm -rf public```

**Delete unnecessary existing routes then create a new route for quotes**
We will delete the unnecessary users' route found in ```routes/users.js```. We will add ```routes/quotes.js``` file with the following content:


```const express = require('express');```

```const router = express.Router();```

```/* GET quotes listing. */```

```router.get('/', function(req, res, next) {```

  ```res.json({```
  
    data: [
    
      {
        quote: 'First, solve the problem. Then, write the code.',
        author: 'John Johnson'
      }
    ],
    meta: {
      page: 1
    }
   ```
  });
});
```
```
   module.exports = router;
   ```

For now, it will give a static output of only 1 quote as shown above. We will link up the quotes route in the ```app.js``` file like below:

```
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var quotesRouter = require('./routes/quotes');

var app = express();
`
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/quotes', quotesRouter);

module.exports = app;
```
The changes on the above file are only on lines 7 and 18 where the users’ router has been replaced with the quotes one.

**Change index route to give out JSON**
The last change in this step is on line 6 of ```index.js``` file found in the root of the project. We will edit it to send out JSON in place of rendering a view. 
```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: 'alive'});
});

module.exports = router;
```

To swiftly view the output of the above changes run the following:

```DEBUG=nodejs-postgresql:* npm start```
Then go to  ```http://localhost:3000/quotes``` on the browser , and you will see something like below:
![Browser Image](https://geshan.com.np/images/nodejs-postgresql-tutorial/03quotes-static.jpg)

We will fetch the quotes from our PostgreSQL database in the next step.

## Setup PostgreSQL with quote table

To save you from the hassle of creating and maintaining a database locally on your machine, you can have a free PostgreSQL database on Elephant SQL with 20 MB data and 5 concurrent connections. It is more than enough for the purpose of this tutorial.

To create the PostgreSQL database on [Elephant SQL](https://www.elephantsql.com/) after registering please follow this documentation. 

Create the free (tiny turtle) database in the data center of your choice. 

After that, to create the quote table run the following SQL in the “browser” section of the created database:

```
CREATE SEQUENCE quote_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE quote (
    id bigint DEFAULT nextval('quote_id_seq'::regclass) NOT NULL PRIMARY KEY,
    quote character varying(255) NOT NULL UNIQUE,
    author character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```
Here is how it looks on the Elephant SQL interface:
![Elephent Interface](https://geshan.com.np/images/nodejs-postgresql-tutorial/04create-table-elephant-sql.jpg)


This is a very simple table with 5 columns. The first one is the ```id``` which is a sequence and primary key. Then  ```quote``` and ```author``` are variable characters.

```created_at``` and ```updated_at``` are both time stamps. There is a unique index added to the ```quote``` column so we don’t have the same quote more than once. After the table is created we will fill up quotes in the ```quote``` table executing the insert SQL below:

```
INSERT INTO quote (quote, author) VALUES 
('There are only two kinds of languages: the ones people complain about and the ones nobody uses.', 'Bjarne Stroustrup'), 
('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 'Martin Fowler'), 
('First, solve the problem. Then, write the code.', 'John Johnson'), 
('Java is to JavaScript what car is to Carpet.', 'Chris Heilmann'), 
('Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'John Woods'), 
('I''m not a great programmer; I''m just a good programmer with great habits.', 'Kent Beck'), 
('Truth can only be found in one place: the code.', 'Robert C. Martin'), 
('If you have to spend effort looking at a fragment of code and figuring out what it''s doing, then you should extract it into a function and name the function after the "what".', 'Martin Fowler'), 
('The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil (or at least most of it) in programming.', 'Donald Knuth'), 
('SQL, Lisp, and Haskell are the only programming languages that I’ve seen where one spends more time thinking than typing.', 'Philip Greenspun'), 
('Deleted code is debugged code.', 'Jeff Sickel'), 
('There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies and the other way is to make it so complicated that there are no obvious deficiencies.', 'C.A.R. Hoare'), 
('Simplicity is prerequisite for reliability.', 'Edsger W. Dijkstra'), 
('There are only two hard things in Computer Science: cache invalidation and naming things.', 'Phil Karlton'), 
('Measuring programming progress by lines of code is like measuring aircraft building progress by weight.', 'Bill Gates'), 
('Controlling complexity is the essence of computer programming.', 'Brian Kernighan'),
('The only way to learn a new programming language is by writing programs in it.', 'Dennis Ritchie');
```

After you have inserted the 17 rows, run the following on the Elephant SQL browser interface:

```SELECT * FROM quote;```

You should see something similar to below:
![Elephant Interface](https://geshan.com.np/images/nodejs-postgresql-tutorial/05select-elephant-sql.jpg)

Our database is set up and ready so let’s proceed to link it up with the Node.js Express application.

**Link Node.js with Postgres**

To link the Node.js Express Js application with the database we have set up, we will need to install the Postgres npm library. To get this useful library please run the following command:

```npm install --save pg```

Time to proceed to add the GET quotes API route.

## Show Quotes - GET API with pagination

When you go to ```http://localhost:3000/quotes``` after starting the Express Js app, you can see something like below:

```
{
  "data":[
    {
      "quote":"First, solve the problem. Then, write the code.",
      "author":"John Johnson"
    }
  ],
  "meta":{
    "page":1
  }
}
```

Now we will replace this by fetching data from the PostgreSQL database on Elephant SQL. To do this, we will need to connect to the database.

Let’s create a ```config.js``` file on the root level. This config file has the database credentials and other configs like below:

```
const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'otto.db.elephantsql.com',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'cklijfef',
    password: env.DB_PASSWORD || 'V1qidES5k3DSJICDRgXtyT8qeu2SPCZp',
    database: env.DB_NAME || 'cklijfef',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
```

Subsequently, we will need to add a ```services/db.js``` file that will use a pool to run our SQL queries. It will look like below:

```
const { Pool } = require('pg');
const config = require('../config');
const pool = new Pool(config.db);

/**
 * Query the database using the pool
 * @param {*} query 
 * @param {*} params 
 * 
 * @see https://node-postgres.com/features/pooling#single-query
 */
async function query(query, params) {
    const {rows, fields} = await pool.query(query, params);

    return rows;
}

module.exports = {
  query
}
```

Now we will add a ```helper.js``` file on the root level to help us format the results and calculate the offset for pagination. It will have the following contents:

```
function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getOffset,
  emptyOrRows
}
```

We will add ```services/quotes.js``` file which will have contents as below:

```
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT id, quote, author FROM quote OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple
}
```

All of this is from the routes file at ```routes/quotes.js``` which after the change looks like:

```
const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await quotes.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

module.exports = router;
```

The main change here in the ```routes/quotes.js``` file is the addition of quotes service. After that, the ```/quotes``` is getting the quotes dynamically using the added quotes service.

Please take note that the quotes are already paginated, meaning ```https://localhost:3000/quotes?page=2``` will give out quotes 11-20 as it has 10 quotes per page in the ```config.js file```. The output for page 2 should look something like below:
![Output](https://geshan.com.np/images/nodejs-postgresql-tutorial/06quotes-api-page-2.jpg)

Now let’s add the POST quote API which will insert a new quote in the database. 

## Save a new quote - POST API for Node.js PostgreSQL tutorial

To create a new quote we will keep it a simple POST API. We will not use any validation library and keep the response codes as simple as possible.

The first thing we will do for adding the save new quote endpoint is to add it to the ```/routes/quotes.js``` file just above ```module.exports = router``` line as shown below:

```
/* POST quotes */
router.post('/', async function(req, res, next) {
  try {
    res.json(await quotes.create(req.body));
  } catch (err) {
    console.error(`Error while posting quotes `, err.message);
    next(err);
  }
});

module.exports = router;
```
For now, we will not add any code level validation. The database table ```quote``` has the ```quote``` field required and 255 characters. So, if the quote is empty it will get a database level error. Unlike MySQL, PostgreSQL will give an error if the quote is longer than 255 characters.

In a more real-life scenario, I would recommend using a validation library for these kinds of cases. For now, let’s add the ```create``` method in ```/services/quotes.js``` like below:

```
async function create(quote) {
  const result = await db.query(
    'INSERT INTO quote(quote, author) VALUES ($1, $2) RETURNING *',
    [quote.quote, quote.author]
  );
  let message = 'Error in creating quote';

  if (result.length) {
    message = 'Quote created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}
```

After you run the server, you can try the following curl to see if it create a new quote:


```curl -i -X POST -H 'Accept: application/json' \```
  ```  -H 'Content-type: application/json' http://localhost:3000/quotes \```
    ```--data '{"quote":"Before software can be reusable it first has to be usable2.","author":"Ralph Johnson"}'```
    
    
It should come back with a 200 response saying the quote has been created. You can try other quotes from this post.

With the create quote POST API working. You can easily build upon it to create the edit and the delete quote endpoints with respective ```UPDATE``` and ```DELETE``` SQL statements. Just be careful to pass the right id to carry out those operations.

**Adding validation for creating quotes POST API**
Till now it should be functional but we should not push validation to the database layer as it will be more resource expensive. So in the next part of this step, we will add validation on the code level.

We will add a validateCreate method above create method in /services/quotes.js to do the validation like below:

function validateCreate(quote) {
  let messages = [];

  console.log(quote);

  if (!quote) {
    messages.push('No object is provided');
  }

  if (!quote.quote) {
    messages.push('Quote is empty');
  }

  if (!quote.author) {
    messages.push('Quote is empty');
  }

  if (quote.quote && quote.quote.length > 255) {
    messages.push('Quote cannot be longer than 255 characters');
  }

  if (quote.author && quote.author.length > 255) {
    messages.push('Author name cannot be longer than 255 characters');
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

async function create(quote){
  validateCreate(quote);

  const result = await db.query(
    'INSERT INTO quote(quote, author) VALUES ($1, $2) RETURNING *',
    [quote.quote, quote.author]
  );
  let message = 'Error in creating quote';

  if (result.length) {
    message = 'Quote created successfully';
  }

  return {message};
}
So now if you try the below cURL without an author, when the server is running it will show an error:

curl -i -X POST -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/quotes \
    --data '{"quote":"Before software can be reusable it first has to be usable."}' 
It will show something like below:

Creating a quote without author will give a validation error
These changes are also reflected in a pull request.

On dev, I would highly recommend using Nodemon as it will restart the server on every file change.

After you have nodemon installed globally you can run the app with the following command:

DEBUG=nodejs-postgresql:* nodemon bin/www 
Nodemon is great for development.

TLDR; quick rundown
All the code shown above is in a public GitHub repository, to quickly get started with what has already been built you can follow the steps below:

Clone the repository with: git clone git@github.com:geshan/nodejs-posgresql.git
Then run cd nodejs-postgresql
Subsequently, execute: npm install && npm start
After that, hit: https://localhost:3000/quotes on your favorite browser
You should see the following on your browser:
Quotes on page 1
Conclusion
Setting up a REST API with Node.js and PostgreSQL was pretty fun till now. Still, it is more like scratching the surface. You can use the GitHub repo as a boilerplate to create simple REST APIs.
