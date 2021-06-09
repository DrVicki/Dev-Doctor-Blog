# Build MERN Stack e-Commerce Web App: Part Five

In the fifth part, we set up the client-side for our application with React and will use Redux for the state management in our application.

We start focusing on the frontend part. We start setting up the client side of our project with React and will also make use of the Redux library to manage all our state in the React application.

First, we make a new folder inside our root folder (where we have all our backend files). We will name this folder as ‘```client```’ and we will have all files related to the client-side inside this folder.

We use ```create-react-app``` to set up a React project. 
- Using this command will make the process much easier and we will be able to focus on the things that really matter.

After creating the folder named ```client```, move into that folder and run the following command to create a new react app inside the folder.

```
npx create-react-app .
```
If you have not yet created the ```client``` folder, you can type in this command to set up a new React project in a folder named client and then you can move inside the client folder.

```
npx create-react-app client
```

This will set up a new React project in the application. We can run both the server and the client at the same time as we installed ```concurrently``` in part 1 of the series and defined the node script for this purpose. We just need to run ```npm run dev``` to run them both at the same time.

Open the ```package.json``` file inside the client folder. 
- It contains various dependencies installed. 
- We also install more dependencies we will be using in our project.

Here is the ```package.json``` file of the client-side. 
- There are many dependencies. We need all of these in our project.

(package.json)
```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "axios": "^0.21.1",
    "bootstrap": "^4.5.3",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-redux": "^7.2.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.1",
    "react-stripe-checkout": "^2.6.3",
    "reactstrap": "^8.8.1",
    "redux": "^4.0.5",
    "redux-thunk": "^2.3.0",
    "web-vitals": "^0.2.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:4000",
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
Let’s go through them one by one to see what we installed and what function they serve.

- **Axios** — Used to interact with the REST APIs and fetch the data from the server.
- **Bootstrap** — Te frontend CSS library we will be using to design the frontend.
- **redux** — The state management library we will be using to manage our state.
- **react-redux** — The React version of Redux used to manage the state in our application. (since Redux can be used with various frameworks and libraries. This one is for React.)
- **react-router-dom** — Manage the routes of our application. It will help us define routes and allow them to go from one route to another.
- **redux-thunk** — The middleware we will use in our application tol help us in state management of the application.
- **reactstrap** — The React version for Bootstrap styling which allows us to use Bootstrap classes as React components.
- **react-stripe-checkout** — For using Stripe to accept payments in our application.

We will set up a proxy to allow us to transfer the request to localhost:4000. 
- Since we are running our application on port number 3000 and we will not be wanting to write complete URL for interacting with the APIs so we will define a proxy to transfer requests from 3000 to 4000.

Now we work in the files present in the ```client``` folder. 
- We look in the ```src``` folder. 
  - We have an ```index.js``` file. We do not need to make any changes. Here is the ```index.js``` file:

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
Now we move into the ```App.js``` file.

```
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render(){
    return ( 
        <div className="App">
          <h1>Hello everyone!</h1>
        </div> 
    );
  }
}

export default App;
```
- We imported ```bootstrap``` into this file. Also, 
- We clear out all the pre-written code.
- We make changes in this file later to incorporate the Redux state management and the routing.

Next, we start setting up our Redux state management. 
- We create a new file named ```store.js``` in the ```src``` folder.
  - This is our ```store.js``` file. It will serve as a store for our state. 

```
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleWare = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
```

We imported something we have not actually created till now; the ```rootReducer``` file from ```reducers``` folder. We will make that in a while.
- We do not need to visit this file again for any purpose. 
  - It is the standard way to set up a Redux store. 

Now we start building the ```actions``` folder inside the ```src``` folder. 
- This is standard Redux way to have store, actions, and reducers.

First we start with the ```types.js``` file inside the ```actions``` folder. 
- Here we define all the action types. 

```
export const GET_ITEMS = 'GET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const ITEMS_LOADING = 'ITEMS_LOADING';
export const CART_LOADING = 'CART_LOADING';
export const GET_CART = 'GET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const ORDERS_LOADING = 'ORDERS_LOADING';
export const GET_ORDERS = 'GET_ORDERS';
export const CHECKOUT = 'CHECKOUT';
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
```

We have all the types related to the items, next, we have for cart, orders, then for the user, and finally for errors.

We have five more files in this actions folder; ```itemActions```, ```authActions```, ```cartActions```, ```orderActions```, and ```errorActions```.

### errorActions

We have two functions in this actions file. We have one for returning any error we have in our application and the next is for clearing out these errors when we do not need to display them.

The first function will take a ```message```, ```status```, and ```id``` in the function and will return them as ```payload``` with the type of ```GET_ERRORS```.

The next function will clear the errors by sending the type as ```CLEAR_ERRORS```.
- These will be handled in the errors reducers file we will build in the next part to handle the state as specified by these functions.

(errorActions.js)
```
import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    }
}

// CLEAR ERRORS
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}
```

### authActions.js

This is the most involved part of the actions file. 
- It handles all the authentication. 
- We have four functions in this part; ```loadUser```, ```register```, ```login```, and ```logout```.

We also have a helper function ```tokenconfig``` which would get token from local storage and set up the config to send a request using ```loadUser``` for fetching the currently logged in user details.

- **loadUser** — Sets the type as ```USER_LOADING``` to indicate that the user is currently loading. We then make a request using Axios to the API endpoint ```‘/api/user’``` along with the token obtained from the ```tokenconfig``` which will then get the result and set the payload as the data fetched from the API endpoint. The type would be set as ```USER_LOADE```D since we have successfully loaded the user. In case of any error, we will call the ```returnErrors``` function and set the type to ```AUTH_ERROR```.
- **register*** — Takes in the name, email, and password from the frontend and then makes these a JSON object. We then hit the API endpoint for register and pass in the data. We then receive a response and set the data received as payload and the type is set to ```REGISTER_SUCCESS```. We handle errors in the same way as we did in the previous function and set the error type as ```REGISTER_FAIL```.
- **login** — Works similarly as register function works. The difference is that the login function gets email and password only and then it hits the API endpoint meant for login. We get a response and set the payload as the data received from the response and set the type as ```LOGIN_SUCCESS```. We handle errors in the same way and set the error type as ```LOGIN_FAIL```.
- **logout** — Set the type as ```LOGOUT_SUCCES``S and that is all we need to do for logout.

We will handle all these responses type and their payload in the reducers file we describe in the next part.

(authActions.js)
```
import axios from 'axios';
import { returnErrors } from './errorActions';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types';

export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

export const register = ({name, email, password}) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({name, email, password});

    axios.post('/api/register',body,config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

export const login = ({email, password}) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({email, password});

    axios.post('/api/login',body,config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}
// logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}


// Setup config/headers and token
export const tokenConfig = getState => {
    //Get token from local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers:{
            "Content-type": "application/json",
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}
```

### itemActions

Here we handle all the actions related to the items we will be displaying on the website.
- It has five functions to manage fetching items, adding a new item, deleting an item, updating an item, and for setting items state as loading.

We will not be using deleting and updating of items in our application components in this series, but having everything ready is a good choice in case we need to add these later on.

**Note**: You can add a separate portal for managing all items like adding them, deleting them, and updating them. We only cover adding items and getting all items in the components though we have APIs, actions, and reducers ready for all these tasks.

- **getItems** — Used for fetching all the items from the backend using API endpoint. We set items as loading and then we reach the API endpoint to get all items. We then set the type as ```GET_ITEMS``` and set payload as the data received as a response.
- **addItem** — Used for adding a new item to the database. We take in the item object through frontend forms and then send this data to the API endpoint responsible for adding the item. We then set the type as ```ADD_ITEM``` and set payload as the data received from the response.
- **deleteItem** — Used to delete an existing item from the database. It takes in the id of the item we want to delete and sends the id using a delete request to the API endpoint meant for this purpose. We then set the type as ```DELETE_ITEM``` and the payload as the id of the item which was deleted.
- **updateItem** — Used to update an existing item present in our inventory. It makes a put request to the API endpoint with the help of id and also sends in the new item object. We then set the type as ```UPDATE_ITEM``` and set payload as the id and the data we receive as the response from the server.
- **setItemsLoading** — Sets the type as ```ITEMS_LOADING```.

(itemActions.js)
```
import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING } from './types';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addItem = (item) => (dispatch) => {
    axios.post('/api/items', item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteItem = (id) => (dispatch) => {
    axios.delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const updateItem = (id, item) => (dispatch) => {
    axios.put(`/api/items/${id}`, item)
        .then(res => dispatch({
            type: UPDATE_ITEM,
            payload: Promise.all([id, res.data])
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING
    }
}
```

### cartActions

This handles all the actions related to the cart of any user. 
- It has four functions which are getting the cart, adding items to cart, deleting items from the cart, and set the cart status to loading.
- **getCart** — Used to fetch the cart for any user. First of all, we set cart as loading. This function passes on the id as a param with the API endpoint and receives a response consisting of the cart of the user. We set the type as ```GET_CART```.
- **addToCart** — Used to add an item to cart. It takes in the id of the user which it uses as param and also passes on the ```productId``` and ```quantity``` as the request body. We then receive a response which we assign to the payload and set the type as ```ADD_TO_CART```.
- **deleteFromCart** — Used to delete an item from the cart. It takes in the ```userId``` and the ```itemId``` and passes these as params to the API endpoint. We then set the type to DELETE_FROM_CART and set payload as the response’s data.
- **setCartLoading** — Sets the type as ```CART_LOADING```.

(cartActions.js)
```
import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from './types';

export const getCart = (id) => dispatch => {
    dispatch(setCartLoading());
    axios.get(`/api/cart/${id}`)
        .then(res => dispatch({
            type: GET_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addToCart = (id, productId, quantity) => dispatch => {
    axios.post(`/api/cart/${id}`, {productId, quantity})
        .then(res => dispatch({
            type: ADD_TO_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const deleteFromCart = (userId, itemId) => dispatch => {
    axios.delete(`/api/cart/${userId}/${itemId}`)
        .then(res => dispatch({
            type: DELETE_FROM_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setCartLoading = () => {
    return{
        type: CART_LOADING
    }
}
```

### orderActions

This action file handles all the actions related to the orders in our application. 
- It has three functions which are used to get all orders of a user, place a new order (checkout), and set the orders as loading.

- **getOrders** — Sets the orders as loading. Next, it uses the id of the user received to use it as a param in making a GET request. We then set the type as ```GET_ORDERS``` and set payload as data received as the response.
- **checkout** — Used to place an order. It receives two parameters from the components which are the id of the user and source. The source is generated from stripe checkout functions which we will deal with in detail when we actually create them in the later part. We then use the id as a param and source as request body and make a POST request. We then set the type as ```CHECKOUT``` and set the payload as response’s data.
- **setOrdersLoading** — Sets the order type as``` ORDERS_LOADING```.

(orderActions.js)
```
import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from './types';

export const getOrders = (id) => dispatch => {
    dispatch(setOrdersLoading());
    axios.get(`/api/order/${id}`)
        .then(res => dispatch({
            type: GET_ORDERS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const checkout = (id, source) => dispatch => {
    axios.post(`/api/order/${id}`, {source})
        .then(res => dispatch({
            type: CHECKOUT,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setOrdersLoading = () => {
    return{
        type: ORDERS_LOADING
    }
}
```
## Conclusion

In the next part, we deal with the reducers, start dealing with some components, and then in the last part we wrap up the series after dealing with the leftover components part.
      



