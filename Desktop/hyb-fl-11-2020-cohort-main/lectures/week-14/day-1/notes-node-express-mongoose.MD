One of the best ways to start writing our own software is to create a simple project to sharpen our programming skills and revise what we’ve learned.

- In this article, we’ll build a little web application in which you can store your notes.

The notes list in our application will consist of two things: a title and a description. This will be our result in the end:
![](https://miro.medium.com/max/301/1*OLhXaaMv1BuHC2elbJQuAw.png)

- Left to right: Page for creating notes, page for viewing notes, and page for updating notes

## Let’s dive in!

## Getting Started

Install the:
- ```express``` module for handling routing
- ```mongoose``` module for database integration
- ```body-parser``` to handle how our incoming data will be processed
- And, finally, ```pug``` as our view engine, which will act as our front end
```
npm install express
npm install mongoose
npm install body-parser
npm install pug
```
Let’s now implement a database for our app.

## Creating a Database

### database.js

We need a storage system for our notes so they can be saved even when the program ends. To add persistent storage, we’ll use databases.

We’ll use the file ```database.js``` to connect to a database, create a collection, and name our collection ```Notes```.

To connect to a database in Mongoose, type the code in the file ```database.js```.

![](https://miro.medium.com/max/4800/1*oIU4dsv0cr-79R2yDUGh_w.png)

Now we need to create a schema for our notes. In the same file, to do so:

![](https://miro.medium.com/max/700/1*HZcLZ3OBwV1yUopMb7WVSw.png)

We created a schema for our notes, ```NotesSchema```. As the code suggests, the document that uses this schema will have two fields:

- A ```title``` field of type ```String```
- A ```description``` field of type ```String```

Let’s now create a collection by the name of  ```Notes``` that’ll be using the ```NotesSchema```.

In the end, we’ll use ```module.exports``` on our ```Notes``` so we can use this collection in our code.

![](https://miro.medium.com/max/700/1*J0Nh07wTyPncoT5WeUWR3g.png)

In the end, the code should look something like this:

```

const mongooseClient = require("mongoose");

mongooseClient.connect("mongodb://localhost/notepadDB", {useNewUrlParser:true, useUnifiedTopology:true},(err)=> {
  if(err)   console.log(err);
});

const NotesSchema = mongooseClient.Schema({
    title : String,
    description : String,
})

const Notes = mongooseClient.model("Notes", NotesSchema);

module.exports =Notes;
```

Let’s now move on to the second part of the app, ```update-router.js```.


## Middleware for Updating Documents

### update-router.js

This file will handle the routes whenever the user navigates to the directories that start with ```updatepage```. As the path suggests, here the user will update his respective notes.

This file will perform the following;

- Use ```express.Router()``` middleware to send the ```id``` data to the paths updatepage and ```updatepage:/__id``

- This ```__id``` field will be required so the database can select the note with the specified ID, which will be needed for updating purposes.
- 
Let’s first create an instance of ```express.Router()``` and create a temporary variable, ```id```, to store the ID across different routes. This is all done within ```update-router.js```.

![](https://miro.medium.com/max/700/1*xEoZiXTIRUzQvJiN7vM-0w.png)

As this file is middleware, we can add properties to the ```request``` object.

Let’s perform a ```GET``` request to the route ending with ```/:__id``` and then assign the ```req.id``` property to the ```__id``` parameter of the route:

![](https://miro.medium.com/max/700/1*k4-_DxH9UJir0Ody4ZXirg.png)

Notice the temporary variable ```id``` has also been assigned to the same value. We’ve done this as the ```req.id``` property won’t be persistent across different paths.

We’ll now perform a ```POST``` request to the route ending with ```/```, as follows:

![](https://miro.medium.com/max/690/1*T75-mmv1h3zM3SAKbX80Pw.png)

Now, the ```req.id``` property is persistent across both ```updatepage/``` and ```updatepage/:__id```.

Finally, use ```module.exports``` to export the ```Router``` object so it can be used in other files.

![](https://miro.medium.com/max/542/1*ajT5Zayow05kwwY7SQGIJg.png)

Ultimately, ```update-router.js``` would look like so:

```
const Router = require('express').Router()

let id=0;

Router.get('/:__id',(req,res,next)=>{
    id= req.id = req.params.__id;
    console.log('in get middleware');
    next();
})

Router.post('/',(req,res,next)=>{
    console.log('in post middleware')
    req.id = id;
    next();
})
module.exports = Router;
```

## The Main JavaScript File

### main.js

This file, ```main.js```, will handle the following:

- Our routing
-  CRUD operations
- Processing incoming data sent by the client
- Sending data to the front end

### HTML files

For our front end, we’ll create the following files.

- ```notes-add```: For adding our notes. This will be our homepage.
- ```view```: For viewing our created notes
- ```updatepage```: For updating the note we’ve selected

### Importing libraries

Assuming all of the modules have been installed, let’s use ```require``` to use their functionalities in your code and use the ```Notes``` collection we just exported.

![](https://miro.medium.com/max/700/1*cB1PN0E2wJRc_MRcBL3D7A.png)

### Configuration and middleware

Now we need to configure the view engine of Express and use Middleware to handle the processing of data. Type the code as follows:
![](https://miro.medium.com/max/700/1*sOzUcDGONZhG4iOHn1YDFA.png)

- Lines 1-2: Set the view engine of the front end to ```pug```, and then specify in which folder our ```pug``` files will be saved. In this case, the files will be saved within the ```views``` folder.
- Line 4 : Use the ```body-parser``` module to parse the incoming data. The ```urlencoded()``` method means the module will parse the data that’ll come from a simple HTML form.
- Line 6: Use ```updateRouter``` middleware to handle routing whenever the user navigates to the directories that start with ```/updatepage```
- Lines 7-10: To see the directories the user has navigated to and what type HTTP request was performed (e.g., ```GET```, ```POST```, etc.) in our server-side terminal

### Creating notes

Whenever the user navigates to our homepage, he performs a ```GET``` request. Thus, if the user navigates to the homepage, we want to render a ```pug``` file called ```notes-add.pug```.

![](https://miro.medium.com/max/700/1*905ZhMc1eSeHe3Y79APrzw.png)

This page will consist of a simple HTML form.

In ```notes-add.pug```, whenever a form is submitted, a ```POST``` request is performed.

To handle a ```POST``` request:

![](https://miro.medium.com/max/700/1*uIBVjNJsn-ISKAcg1WwZAw.png)

- Lines 5-6: Assign the fields to the respective ```req.body``` properties that’ll be returned by the form
- Lines 8-10: Save the document to the database, and output the document
- Line 12: After the operations are performed, redirect to ```/index```, which will view our documents

The code will look like so:

```
app.get(("/notes-add"),(req,res,next)=>{
      res.render('notes-add');
})
app.post( (req,res,next)=> {
      console.log(req.body);
      const Note = new Notes({})
      
      Note.title = req.body.title
      Note.description = req.body.description
            //save notes first
      Note.save((err,product)=>{
              if(err) console.log(err);
              console.log(product);
      })
res.redirect('/index')
})
```

Now that is done, we just need to create a file called ```notes-add.pug```. This will be our front end. The code for ```notes-add.pug``` is the following:

```
html
    include style.css
form(method='POST' action='/notes-add')
            p
                input(type='text', name='title', value='')
            p
                input(type='text' name='description' value ='')
            p
                input(value='submit' type='submit')   
a(href='/index')
 button(value="submit") Cancel and View List
 ```

This is just a simple HTML form. When the ```submit``` button is hit, a ```POST``` request for the path ```/notes-add``` is performed.

Try running the code by typing:

```node main```

Go to ```localhost:3000/notes-add```. Type anything in the form, and hit enter. You might encounter an error in the next page. However, in the terminal window, the output might be as follows:

![](https://miro.medium.com/max/558/1*xcKKFVyUyzgLVbcYBh3azA.png)

Now that we’ve added our notes, we want to actually read all of them.

### Finding/reading our notes

As stated above, the ```/index``` path will help us in viewing our notes. If the client is only receiving data from this path, what kind of HTTP request should we handle?

The type of request we’ll handle this time will be a ```GET``` request, as we’re only getting data.

To use the ```/index``` path, write the code as follows:

![](https://miro.medium.com/max/700/1*XPQl1C5R6q3oVqz9ie-h8A.png)

- Lines 2-6: We run a query in our database. As the ```query``` parameter is empty, it denotes we want all of the documents present in the database.
- Line 4: Print out the documents matching the query

Now to run this code, go to ```localhost:3000/index```. The output in the console might be as follows:

![](https://miro.medium.com/max/609/1*MH4cg93DwANf8jj4haVy9g.png)

To build a front end for this path, we’ll need to render it in a file called ```view.pug```.

The code for ```view.pug``` is as follows:

```
html
body
        a(href='notes-add/')
            button(value="submit" ) Create New  
        ul 
            each val,key in data
             li= val.title
              
              p=val.description
              a(href='delete/' + val._id)
               button(value='submit') Delete this
              a(href='updatepage/' + val._id)
                button(value='submit') Update
              
```

Ultimately, we now need to modify our ```GET``` request like so:

```
app.get('/index' , (req,res,next)=>{
  Notes.find({}).exec((err,document)=> {
    if(err) console.log(err);
       document.forEach((value) => {
        console.log(document);
     })
   res.render('view',{data:document})
  })
})
```

- Line 7: Render the ```view.pug``` file, and send the returned documents to the front end ( ```view```) so it can be rendered.

Now go to ```localhost:3000/index```. The output:

![](https://miro.medium.com/max/417/1*pNSOQ___1EXFnC2JFXPbdg.png)

The client wants to remove a note. Let’s now implement deletion functionality.

### Deleting notes

Look at the ```view.pug``` file. Here’s what we can do:

- Whenever the user clicks on the delete button, the user is redirected to a ```/delete``` path with the ```id``` of the document sent as a parameter

- We can use this ```id``` field to identify the document and then delete it

Let’s perform a ```GET``` request to the ```/delete``` path:

```
app.get("/delete/:__id", (req,res,next)=>{
    Notes.findByIdAndRemove(req.params.__id ,{useFindAndModify : false}, (err,document)=> {
       if(err) console.log(err)
       console.log(document);
    })
  res.redirect('/index');
})
view raw
```

- Line 2: Perform a query, and find a document with the ```id``` present in the parameter

- Line 6: Redirect the user to the ```/index``` path, which will allow them to view all of their documents once the operation is complete

Go to ```localhost:3000/index```, and then press the delete button.

![](https://miro.medium.com/max/291/1*aPfnkHIEFbr53Ypmz3RRlQ.png)
![](https://miro.medium.com/max/254/1*WWTdiw2bEYMWiMWihnHU8Q.png)


Notice we had one document in the database. When this is deleted, no documents are left.

This is the output in the terminal:

![](https://miro.medium.com/max/364/1*_dowzB510dHaGallDKPDng.png)

Now instead of deleting, the client wants to correct his typo within the note. Let’s now implement editing into our app.

### Updating/editing our notes

Within the ```view.pug``` file:

- Notice when the user clicks the update button, the app redirects the user to the ```/updatepage``` directory with an ```id``` in the parameter

Here’s what we can do:

- Perform a ```GET``` request to the ```/updatepage``` directory, and get the ```id``` field present in the parameter
- Find the document with the given ```id```, and send it to a separate page, ```updatepage.pug```, for updating purposes

Write the code for this operation:

![](https://miro.medium.com/max/700/1*bLCi4z8tuI9542oG-U-H9A.png)

- Line 6: Send the returned document to the ```updatepage.pug``` file

Remember we built a middleware at the beginning of the ```main.js``` file that’ll assign the ```req.id``` property to the ```id``` parameter in the URL.

Go to ```localhost:3000/index```, and click on the update button.

![](https://miro.medium.com/max/321/1*PZ6ASyiRYEjK4iXXSnATMQ.png)
![](https://miro.medium.com/max/655/1*sl7DtIlBIvVQ5F2SZdp8Jg.png)


The code for ```updatepage.pug``` is like so:

```
html
form(method='POST' action='/updatepage')
    p
    input(type='text', name='title', value=data.title)
    p
    input(type='text' name='description' value=data.description)
    p
    input(value='submit' type='submit') 
a(href='/index')
    button(value="submit") Cancel and View List.
```

- Lines 4 and 6: Set the value of the corresponding inputs to ```title``` and ```description```

The Submit button will redirect the user to ```/updatepage```, and it’ll also perform a ```POST``` request.

Let’s handle the ```POST``` request:

![](https://miro.medium.com/max/700/1*e5jF409popF1huhUZ-z-8Q.png)

- Lines 3-7: Perform a query to find the document with the specific ```id```. Update the ```title``` and ```description``` fields, respectively.
- Line 11: Redirect to the ```/index``` directory

Now press the Update button, and it’ll render ```updatepage```. The output of the code is like so:

![](https://miro.medium.com/max/254/1*SOsBEh2-usQh5AcOCHdbCA.png)
![](https://miro.medium.com/max/258/1*2P5sFnHt2h-A79Tbw4XZng.png)
![](https://miro.medium.com/max/282/1*aXoXOFY9hSre22ODf6KvMg.png)

Ultimately, the code for handling both the ```POST``` and ```GET``` requests are like so:

```
app.get('/updatepage/:__id',(req,res)=>{
  console.log('id for get request: ' + req.id);
  Notes.findById(req.id,(err,document)=>{
    console.log(document);
    res.render('updatepage',{data:document});
  })
})

app.post('/updatepage',(req,res,next)=>{
  console.log('id: ' + req.id);
  Notes.findByIdAndUpdate(req.id , {title : req.body.title , description: req.body.description },{useFindAndModify:false}
    ,(err,document)=>{
console.log('updated');
})
res.redirect('/index');
})
```
