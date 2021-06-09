# A REDUX "EXPERIENCE"

## React and Redux front-end Movie App Demo with API Fetch

![](https://github.com/DigitalCraftsStudents/hyb-fl-11-2020-cohort/blob/main/lectures/week-20/day-2/Dr-vickis-redux-movie-list-app.gif)

Let’s begin by using Node in our terminal (for Macs) and creating our React app, titled ```redux-movielist``` with ```create-react-app```.

```
npx create-react-app redux-movielist
```

Now, let’s go into the directory and install some packages that we will be using to enable the Redux library.
- These will include Redux, React-Redux to connect React to Redux, and redux-thunk, which we will be using to act as custom middleware for our async actions.

```
cd redux-movielist
npm i redux react-redux redux-thunk
```
Open your text editor and set up/clean up our app by removing the logo and ```app.test.js```, and create our file structure for our Redux store. 
- This will include our actions and reducers folders, as well as an ```index.js``` to hold our data.
- Now our file structure should look something like this:

![](https://github.com/DigitalCraftsStudents/hyb-fl-11-2020-cohort/blob/main/lectures/week-20/day-2/redux%20file%20structure.png)

Now that we have the initial file set up for our store, go ahead and create our first action and reducer.
- Our action will take data to update our movies to the movie we select with a ```type``` and ```payload```, while our reducer will be receiving the information and return the payload.
- In our action folder, we will create ```updateMovies.js``` and in our reducers folder we will create ```movielistReducer.js```.

```updateMovies.js:```

```
export const UPDATE_MOVIES = "UPDATE_MOVIES";
const updateMovies = {
      type: UPDATE_MOVIES,
      payload: "THE BREAKFAST CLUB"
};
export default updateMovies;
```

**Note** 
We have made ```UPDATE_MOVIES``` into a const to avoid mistakes down the road.

Let’s write in our reducer function for the movie list and receive the data from action and return the payload. So far so good!

```movielistReducer.js```:

```
import {UPDATE_MOVIES} from '../actions/updateMovies';
const movielistReducer = (state ={}, {type, payload}) => {
      switch(type) {
             case UPDATE_MOVIES :
             return {name: payload}
             default :
     return state
};
};
export default movielistReducer;
```
Our reducer takes two parameters; ```state``` which is set to an empty object, and ```action``` which we have destructured with ```type``` and ```payload```.

Now we have the logic written for our ```action``` and ```reducer``` to update our movie list, let’s set up our ```store``` in the ```index.js``` file found in our store folder.

We will also add-on our Redux DevTools extension, Basic Store, which we can grab from GitHub.

```index.js``` (in our store folder):

```
import {createStore, combineReducers} from 'redux';
import movielistReducer from './reducers/movielistReducer';
const reducer = combineReducers({movies: movielistReducer});
const initialState = {
movies: {name: "TERMINATOR 2"}
};
const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
```

Now let’s hook up our store to React and wrap our application around the provider in our source folder ```index.js```.

```index.js``` (src folder):

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/index'
import {Provider} from 'react-redux'
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```
We should get an error in our console, saying that ```logo.svg``` cannot be found. this is a good sign. Our app is now connected with our Redux store. To remove these errors, let’s go to our ```App.js``` and clean it up.

```App.js```:

```
import React from 'react';
import './App.css';
function App() {
   return (
       <div className="App">
       REDUX MOVIELIST APP
       </div>
);
};
export default App;
```
When we return to our application in the browser, we should be able to access our Redux DevTools by clicking on the lit up icon (for Chrome) on the top-right side.

This will open our GUI. Click on state and we see our movie list ```state``` being initialized! BOOM!!!

![](https://github.com/DigitalCraftsStudents/hyb-fl-11-2020-cohort/blob/main/lectures/week-20/day-2/redux-tools-state.png)

FANTASTIC!!. Go back to our text editor and set up ```App.js``` so it’s connected to our store. We do that by; 
- importing our actions, 
- connect, 
- with state and dispatch, and 
- set up props.

Now we render the display of the movie list and create a button to dispatch the new state! Now your ```App.js``` should look like this:

```App.js```:

```
import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import updateMovies from './store/actions/updateMovies';
function App(props) {
return (
    <div className="App">
    <h3>REDUX MOVIELIST APP</h3>
<br/>
<span
style={{color:'green'}}
>YOUR CURRENT MOVIE IS: </span>{props.movies.name}
<br/>
<button onClick={props.updateMovies}>SELECT NEW MOVIE</button>
</div>
);
};
const MapStateToProps = (state) => {
    return {
    movies: state.movies
};
};
const MapDispatchToProps = (dispatch) => {
return {
updateMovies: ()=> dispatch(updateMovies)
}
};
export default connect(MapStateToProps, MapDispatchToProps)(App);
```

WOW! Now we should have our entire Redux cycle completely hooked up and running, and our app updates the state to our new movie selection.

No; it’s not the most beautiful app of all time, but considering the boilerplate setup for Redux, we will stick to the concepts. Style the App up as you like. 

## But now, congratulations; Great Work!

Our next challenge is implementing an async action API fetch for user data information. Ready? Let's Go!

We will use data from https://reqres.in/ 
- Go to the website, and you can see that we can get a request for user data from /api/users?page=2.

![](https://github.com/DigitalCraftsStudents/hyb-fl-11-2020-cohort/blob/main/lectures/week-20/day-2/regres_data.png)

Now let’s go back to the actions folder in the text editor and write our fetch API code in a new file, called ```fetchUsers.js```.

```fetchUsers.js```:

```
export const FETCH_USERS = "FETCH_USERS";
const fetchUsers = (dispatch) => {
    fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then(res => dispatch({type:FETCH_USERS,payload:res.data}))
};
export default fetchUsers;
```

Make a new reducer in our reducer folder named ```userReducer.js`` and code it:

```userReducer.js```:

```
import {FETCH_USERS} from '../actions/fetchUsers';
const userReducer = (state = {}, {type, payload}) => {
    switch(type) {
        case FETCH_USERS :
        return payload
        default :
    return state
};
};
export default userReducer;
```

Back in  ```index.js``` file in our store folder, we can now import ```userReducer```, add it to our ```combineUsers```, set it to users, and set up its initial state, which will be an array.

We also need to import ```Thunk``` and ```applyMiddleWare``` to perform an async action using custom middleware.

Lastly, we  need to import ```compose``` so that we are able to use both our DevTools extension and our middleware.

```index.js``` (store folder):

```
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import movielistReducer from './reducers/movielistReducer';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk';
const middleware = [thunk];
const allReducers = combineReducers({movies: movielistReducer, users: userReducer});
const initialState = {
    users: [],
    movies: {name: "TERMINATOR 2"}
};
const store = createStore(allReducers, initialState, compose( applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export default store;
```
**Note** W
e use the spread operator to apply our middleware and set Thunk into an array to a const (middleware). We have changed our const from reducer to ```Allreducers```.

We are getting there!! Let’s go back into our``` App.js``` and import our fetch action. 
- We can use the map method to map through our users and display the pertinent data by dispatching our fetch with a button. 
- Your ```App.js``` should now look like:

```App.js```:

```
import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import updateMovies from './store/actions/updateMovies';
import fetchUsers from './store/actions/fetchUsers';
function App(props) {
    return (
    <div className="App">
        <h3>REDUX MOVIELIST APP</h3>
        <br/>
        <span
        style={{color:'green'}}
        >YOUR CURRENT MOVIE IS: </span>{props.movies.name}
    <br/>
    <p><button onClick={props.updateMovies}>SELECT NEW     MOVIE</button></p>
    <br/>
        {props.users.length === 0 ?
        <p>THERE ARE NO USERS</p> :
        props.users.map(user=> <p key={user.id}>{user.first_name} -    {user.email}</p>)}
    <br/>
    <button onClick={props.fetchUsers}>FETCH USERS</button>
    </div>
);
};
const MapStateToProps = (state) => {
    return {
    movies: state.movies,
    users: state.users
};
};
const MapDispatchToProps = (dispatch) => {
    return {
    updateMovies: ()=> dispatch(updateMovies),
    fetchUsers: ()=> dispatch(fetchUsers)
};
};
export default connect(MapStateToProps, MapDispatchToProps)(App);
```
**Beautiful!** If we check back in our app and we click on the button to fetch users, we should see our users being fetched.
![](https://github.com/DigitalCraftsStudents/hyb-fl-11-2020-cohort/blob/main/lectures/week-20/day-2/fetch_Users.png)


# YOU DID IT!!!

You just created & observed two Redux cycles in live-action!
- One ```movie list```, which we update on dispatch to the new movie, and 
- one ```async action```, where we fetch data for our users. 
