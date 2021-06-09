## Part 2: Designing the Models

In this second part, we design all the required models using Mongoose to connect to the MongoDB database with our Express App.

We start building models for our application. 
- We are using MongoDB as the database to store all our data. 
- We will use Mongoose to connect to the MongoDB database. It would is easier to build Database Schema and then the models based on that schema.

Keep things clean and simple. Create a new folder named ```models``` in our root folder.

- Create four files inside it to represent our four models: ```User```, ```Item```, ```Cart```, and ```Order```.
  - You do not need to give a unique id parameter to your schemas beacuse MongoDB automatically provides a unique ID after we save any document in it.

Let’s start with the User model.
**User Model

Create your first model; ```User``` Model. 
- This defines the model to store the data of our users. 
- Start by creating a ```User.js``` file in the ```‘models’``` folder we created earlier.
- We start by first requiring ```mongoose``` in our file. We also require an ```isEmail``` validator from the ```‘validator’``` dependency we installed in the first part.

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
```

Create your ```UserSchema``` from the Schema defined earlier.

```
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [6, 'Minimum password length must be 6 characters']
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})
```

This Schema has various fields inside, each with its own ```type``` and ```properties```. These are the ```parameters``` or fields every user on our application will have. 
- **name**: Contains the name of the user who is using your application. This field will be of ```String``` data type to store the name of the user. It is a required field and every user should have a name in our application.
- **email**: Email of the user who is registering on your website. It will be of a ```String``` data type once again. Emails should be unique so we turn ```unique``` to be ```true```. We also want to store emails in lowercase so we set that to ```true```. Email is a required field and we attach a custom error message to trigger when the email is not provided. Also, we check whether the provided email address is actually of email format or not. We use the ```isEmail``` validator we required earlier and attach a custom error message to it.
- **password**: Designed to store the password of the user. It will be of ```string``` data type and is a required field for every user. We set a minimum length limit so that we do not allow passwords shorter than that length. We can also set maximum length but we are not doing it here.
- **register_date**: Responsible to store the date when the user first registers on your website. It defaults to the current date so the user does not have to explicitly imput it. 

For security, we will be use bcrypt library to hash our passwords and then save the hashed password in the database. 
- We do that hashing in the controllers file and not here in the models file. 

We have built our ```UserSchema``` and will now build the ```User``` model based on the schema we created.

```
module.exports = User = mongoose.model('user',UserSchema);
```
Export the ```User``` model created and we will be call this collection as ```‘user’```. 
- In the database, MongoDB will pluralize it and will save the collection name as ```‘users’```.

```
onst mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [6, 'Minimum password length must be 6 characters']
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user',UserSchema);
```

## Item Model

The next model we create is the ```Item Model```. 
- We will design the Schema for the items we would have in our store for users to buy. 
- We will keep our items schema simple for now and not include images. 
  - You can add product image or any extra field you want to add.

For this Guided Learning series, we will hav these five fields: ```title```, ```description```, ```category```, ```price```, and ```date_added```.

We will build our ```Item``` model in a file named ```Item.js``` inside the ```models``` folder. 
- Start by requiring ```mongoose``` and creating the ```Schema``` object.

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
```

Start designing your ```ItemSchema```. It has five fields and will build upon the Schema we defined earlier.

```
const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
});
```

This Schema has five fields each with its own ```type``` and ```properties```. 
- These would be ```parameters``` or fields every item on your application will have. 

  - **title**: Stores ```title``` of the item or product in our store. It is of ```String``` data type and is a required field.
  - **description**: Stores details or ```description``` of the item or product. It is also of ```String``` data type and is also a required field.
  - **category**:Stores the ```category``` of the item or product we have in our store. It denotes which category an item belongs to. It is also of ```String``` data type and is a required field.
  - **price**: Stores the ```price``` of the product or the item we have in our store. It is of ```Number``` data type because the price will be a number. It is a  required field since we require every product to have a price.
  - **date_added**: Stores the ```date``` the item or product was added in our store. It is automatically set because we keep the current date as the default.

We have built our ```ItemSchema```, and now we can build the ```Item``` model based on the schema we created.

```
module.exports = Item = mongoose.model('item',ItemSchema);
```

Export the ```Item``` model created and call this collection as ```‘item’```. In the database, MongoDB will pluralize it and save the collection name as ```‘items’```.


## Cart Model

The next modelis the ```Cart``` model. 
- We store the ```cart``` of any user in our web application. 
- A ```cart``` contains all the items added by a user to his cart.

```CartSchema``` will contain: ```userId```, ```items```, and the ```total bill```.

Build ```Cart``` model in a file named ```Cart.js``` inside the ```models``` folder. 
- Require the ```mongoose``` and creating the ```Schema``` object.

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
```

Start designing our ```CartSchema```. 
- It has three fields and will build upon the Schema we defined earlier.

```
const CartSchema = new Schema({
    userId: {
        type: String,
    },
    items: [{
        productId: {
            type: String,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            deafult: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
});
```

This Schema has three main fields and four sub-fields, each with its own ```type``` and ```properties```. 
- These will be the ```parameters``` or fields every item on our application will have. 
  - **userId**: Stores the unique ```ID``` of the user who is the owner of the cart. We will store this to identify the correct cart for that particular user.
  - **items** — The field which will contain all the ```items``` a user has added to his/her cart. It will have various sub-fields like ```productId``` (unique ID of the product or item added to cart), ```name``` (the name of the item added), ```quantity``` (the quantity of that item being added in the cart which is defaulted to 1 and minimum quantity can also be 1 only), and ```price``` (the cost of the item added to the cart).
  - **bill**: Store the ```total cost``` of all the items in the cart. It is of ```Number``` data type and is a required field which defaults to 0 when the cart is empty.
  - 
We can now build the ```Cart``` model based on the schema we created.

```
module.exports = Cart = mongoose.model(‘cart’,CartSchema);
```
Export the ```Cart``` model created and call this collection as ```‘cart’```. In the database, MongoDB will pluralize it and will save the collection name as ```‘carts’```.


## Order model

The Order Model includes all the orders made by users present in our application. 
- It is designed very similar to the ```Cart``` model and all the fields are the same as the ```Cart``` model.
  - The ```cart``` items will become the ```order```.

**Note***: After a user ```checkouts``` and makes the ```payment```, all the ```cart``` items will convert into an ```order``` and the ```cart``` will be emptied.

The ```Order``` model has one extra field. That extra field is the ```date_added``` field which will automatically store the ```date``` when the order was created.
- Because all the fields are the same as the ```Cart``` Model, we won’t be going into the detailsagain as it would be really redundant.

Here is the code for the ```Order``` Model file we create in a file named ```Order.js``` inside the ```models``` folder.

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: String,
    },
    items: [{
        productId: {
            type: String,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

module.exports = Order = mongoose.model('order',OrderSchema);
```

This was all about the ```models``` in our application. 

In Part Three, we deal with the ```routes``` and  ```controllers```. We will also create custom middleware functions.
