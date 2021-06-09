# Build MERN Stack e-Commerce Web App: Part Six

In this sixth part, we will finish the Redux setup by building all the reducers files. We will also deal with components related to authentication in the React application.

So, in the sixth part, we will be completing the Redux setup by building out the Reducers files and we start dealing with some components.

Let’s start to build the reducer files first. 
- We create a folder inside the client folder which we would name as ```reducers```. 
- Inside this folder, we would create six files; ```index```, ```authReducer```, ```itemReducer```, ```errorReducer```, ```cartReducer```, and ```orderReducer```.

### authReducer

First is the auth reducer file. 
- As the name suggests, this file is there for authentication purposes.

Start by importing all the types we need for authentication from the ```types``` file of the ```actions``` folder.

Set up an initial state where we retrieve the token from the local storage. 
- set ```isAuthenticated``` to null and ```isLoading``` to false. 
- Set the ```user``` field as false, to begin with.

Check for each action type and makke changes as applicable.

- **USER_LOADING** — If this is the type, we can say that the user is being loaded set the ```isLoading``` to true.
- **USER_LOADED*** — In this case, we set ```isLoading``` to false and we also set ```isAuthenticate```d to true. We also set the ```user``` as the payload we received from the actions file.
- **LOGIN_SUCCESS, REGISTER_SUCCESS** — In both these scenarios, we set ```isAuthenticated``` to true and we also set the token received in the local storage.
- **AUTH_ERROR, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL** — In all four cases, we remove the token from the local storage. We set the token and user to null. We also set ```isAuthenticated``` and ```isLoading``` to false.

(authReducer.js)
```
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function(state=initialState, action){
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}
```

### itemReducer

We will deal with the ```itemReducer``` file to handle all the tasks related to items in this application. 
- We will import all the types related to items first.

Set up an initial state where we set the items to an empty array and set loading to false.

Start checking for each action type and making changes as applicable.

- **GET_ITEMS** — This is the reducer for getting the items. In this case, we will set the items array to be the payload received from actions. We also set loading to false to signify that items have been loaded.
- **ADD_ITEM** — We call our state using the spread operator and then add the new item received from the payload to the items array.
- **DELETE_ITEM** — Get the ```id``` of the deleted item via the payload. Take the items array and remove the item whose id matches by filtering.
- **UPDATE_ITEM** — Get the ```id``` and the updated item from the payload. Find the item from the items array using its ```id``` and then update it with the new item.
- **ITEMS_LOADING** — Set the loading to true to signify that items are loading.

(itemReducer.js)
```
import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items: action.payload,
                loading: false
            }
        
        case ADD_ITEM:
            return{
                ...state,
                items: [action.payload, ...state.items]
            }
        
        case DELETE_ITEM:
            return{
                ...state,
                items: state.items.filter(item => item._id!==action.payload)                
            };
        
        case UPDATE_ITEM:
            const { id, data } = action.payload;
            return{
                ...state,
                items: state.items.map(item => {
                    if(item._id===id){
                        item = data;
                    }
                })
            }

        case ITEMS_LOADING:
            return{
                ...state,
                loading: true
            }

        default:
            return state;
    }
}
```
### errorReducer

In this reducer, we manage the errors part of the application. 
- We import both the error related types.

Then, we define an initial state with a msg set to empty object, status set to null, and id also set to null.

We have two cases to deal with. The first case deals with getting errors and the next case is for clearing errors.

- **GET_ERRORS** — Set the ```msg```, ```status```, and ```id``` we received from the action’s payload.
- **CLEAR_ERRORS** — Reset everything. We set ```msg``` to empty object and we set the ```status``` and ```id``` to null.

(errorReducer.js)
```
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
    msg: {},
    status: null,
    id: null
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ERRORS:
            return{
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
        
        case CLEAR_ERRORS:
            return{
                msg: {},
                status: null,
                id: null
            };
            
        default:
            return state;
    }
}
```

### cartReducer

In this file, we deal with the reducers related to the cart of the user. 
- We import the types related to the cart from the ```types``` file we defined in the ```actions``` folder.

Define the initial state with the cart set to null and the loading set to false.

- **GET_CART** — Receive the cart through the payload from the ```actions``` file and set it to the cart we defined in our initial state. We also set loading to false.
- **ADD_TO_CART, DELETE_FROM_CART** — In both these cases, we get the updated cart and set the cart to the payload received from the actions.
- **CART_LOADING** — Set the loading to true.

(cartReducer.js)
```
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from '../actions/types';

const initialState = {
    cart: null,
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_CART:
            return {
                ...state,
                cart: action.payload,
                loading: false
            }

        case ADD_TO_CART:
            return {
                ...state,
                cart: action.payload
            }

        case DELETE_FROM_CART:
            return {
                ...state,
                cart: action.payload
            }

        case CART_LOADING:
            return {
                ...state, 
                loading: true
            }

        default:
            return state;
    }
}
```

### orderReducer

In this file, we deal with the reducers related to the orders in our application. 
- We first import all the relevant types for the orders.
- Then define an initial state and define orders as an empty array and also define loading and set it to false.

- **GET_ORDERS** — Set the orders array to the payload received from the ```actions``` file. We also set the loading to false.
- **CHECKOUT** — Receive the new order from the payload and add it to the orders array.
- **ORDERS_LOADING** — Set the loading to true.

(orderReducer.js)
```
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from '../actions/types';

const initialState = {
    orders: [],
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ORDERS:
            return{
                ...state,
                orders: action.payload,
                loading: false
            }

        case CHECKOUT:
            return{
                ...state,
                orders: [action.payload, ...state.orders]
            }

        case ORDERS_LOADING:
            return{
                ...state,
                loading: true
            }

        default:
            return state;
    }
}
```

### index (Combining Reducers)

In this file, we import all the reducers from all the different files; ```items```, ```cart```, ```order```, ```auth```, and ```error``` 
- Then combine them using the ```combineReducers``` function we got from redux.

(index.js)
```
import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer
})
```

We have finished all the redux work. We can focus on building components for our application.

**Note**: We are going to have a pretty bad design in this application, because are not focusing on CSS and animations. We are just concerenced with React so it is up to you how you will design them.

We will deal with the components needed for authentication in this part, and with all the other components in the next part of the series.

First; we create a folder called ```components``` inside the ```client``` folder. 
- Since we keep all the authentication components separate from the rest of our components, we will make another folder named ```auth``` inside the ```components``` folder.

Both of our ```Login``` and ```Register``` will be modal based displayed in the Navbar.

### loginModal

We will build our login component in this file. 
- We import ```Component``` from React. 
- We import various items from Reactstrap we will use to make our component. 
- We also import ```connect``` from react-redux.
- We also import ```PropTypes``` to define all the prop types we will use in this file. 
- Also, we import ```login``` and ```clearError``` actions.

Define a state with email and name set to empty strings. 
- We also have modal set to false and msg set to null.

Define all our prop types. 
- We then set up the ```componentDidUpdate``` and take in the previous props as a parameter. 
- Then check if the current error object is equal to the previous error. 
  - If no; we check whether the error is from ```LOGIN_FAIL``` and if yes, we set the msg as error’s msg, else, we set msg to null.

Check if we are authenticated or not. 
- If yes we close the modal.

Set up a toggle function to toggle the state of the modal. 
- Set up an ```onChange``` function to update the value of the email and password as we type in the form fields.

Set up an ```onSubmit``` function which takes in the email and password from the state and passes them to the login action.

Next, we have the JSX code to display our modal and the form within the modal. 
- In the form, we have two input fields; ```email``` and ```password```. 
- We also have a submit button.

After that, define a ```mapStateToProps``` and get the ```isAuthenticated``` and ```error``` from the state we set up in the ```reducer``` files. Finally, we connect the ```LoginModal``` to these state and the action functions and export it.

(loginModal.js)
```
import { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            // Check for login error
            if(error.id === 'LOGIN_FAIL'){
                this.setState({msg: error.msg.msg});
            }
            else{
                this.setState({msg:null});
            }
        }

        // If authenticated, close modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault(); 
        
        const {email, password} = this.state;
        const user = {email, password};

        // Attempt to login
        this.props.login(user);
    }

    render(){
        return(
            <div className="container">
                <Button color="success" className="btn btn-sm"><NavLink onClick={this.toggle} href="#"><span className="text-dark"><b>Login</b></span></NavLink></Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Login
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>):null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps,{login, clearErrors})(LoginModal);
```

### registerModal

This will handle the registration on our website. 
- It will be very similar to the ```login``` modal so we will not go into details. 
- There will be just a few differences; use the ```register``` action instead of the ```login``` action. 
- And we have three fields this time; ```name```, ```email```, and password. 
  - Our form will have three input fields.

The rest mostly remains the same. 
- We call the ```register``` action when the form is submitted and pass on the three values into it.

(registerModal.js)
```
import { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            // Check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg: error.msg.msg});
            }
            else{
                this.setState({msg:null});
            }
        }

        // If authenticated, close modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();  
        
        const { name, email, password } = this.state;

        // Crete user object
        const newUser = { name, email, password};

        // Attempt to register
        this.props.register(newUser);


    }

    render(){
        return(
            <div className="container">
                <Button color="info" className="btn btn-sm"><NavLink onClick={this.toggle} href="#"><span className="text-dark"><b>Register</b></span></NavLink></Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>):null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps,{register, clearErrors})(RegisterModal);

```

### Logout

This one is simple. It uses a ```NavLink``` and a ```Button``` that displays ```Logout```. 
- On clicking it calls the ```logout``` action. 
- Connect it with the ```logout``` action and then export it.

(Logout.js)
```
import { Component, Fragment } from 'react';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
import {NavLink, Button} from 'reactstrap';
import PropTypes from 'prop-types';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <div>
                <Fragment>
                    <Button color="danger" className="btn btn-sm"><NavLink onClick={this.props.logout} href="#"><span className="text-light"><b>Logout</b></span></NavLink></Button>
                </Fragment>
            </div>
        )
    }
}

export default connect(null,{logout})(Logout);
```
This is all for part six. We finished Redux and also built the components needed for the authentication.




