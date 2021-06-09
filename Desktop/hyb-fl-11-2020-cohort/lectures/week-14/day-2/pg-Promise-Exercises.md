# pg-Promise Exercise

## Setup Database

- Set up a database so you can work with the ```pg-promise``` library.

- Save the following SQL statements to a ```todo-app-db-setup.sql``` file:

```
CREATE DATABASE todo_app;
\c todo_app;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks (title) VALUES ('Buy milk');
INSERT INTO tasks (title) VALUES ('Sweep the house');
INSERT INTO tasks (title) VALUES ('Walk the dog');
```
Run the ```pgsql``` command in the same directly as where you saved the ```todo-app-db-setup.sql``` file and run the following command in the PostgreSQL command-line:

```username=# \i todo-app-db-setup.sql```

You will see the following output in the terminal:

```
CREATE DATABASE
You are now connected to database "todo_app" as user "username".
CREATE TABLE
INSERT 0 1
INSERT 0 1
INSERT 0 1
```

You're done setting up your database. Quit the ```pgsql``` process ```(\q)``` and continue to the exercises using the ```task_app``` database and ```tasks``` table.

## Simple Query

- Initialize a new npm package (```npm init```)
- Install the ```pg-promise``` package (```npm install pg-promise```)
- Create a JavaScript file to build your app (```main.js```)
- Create a database connection with the ```todo_app``` database
- Create a simple ```SELECT``` query and log all of the tasks
- Run the file with node and view the output from the database in the logs

When you run the main file (```node index.js```), you will get the following results in the console:

```
[
  { id: 1, title: "Buy milk", is_completed: false },
  { id: 2, title: "Sweep the house", is_completed: false },
  { id: 3, title: "Walk the dog", is_completed: false },
];
```
## Todo CRUD API

Create a simple CRUD API using Express routes that works with the ```pg-promise``` library for the following actions:

Method | Endpoint | Description
-------|----------|-------------
```POST```|    ```/tasks```|Creates new task
```GET``` |```/tasks```|Reads all of tasks
```PATCH```|```/tasks/:id/is_completed```|Updates if task is completed
```PATCH```|```/tasks/:id/title```|Updates task's title
```DELETE```|```/tasks/:id```|Deletes task



