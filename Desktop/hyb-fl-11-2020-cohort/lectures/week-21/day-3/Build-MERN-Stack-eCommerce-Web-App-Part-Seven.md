# Build MERN Stack e-Commerce Web App: Part Seve

In the final part, we will complete our application by building out all the React components and using Stripe Checkout to accept payments.

We will build all the components one by one, inside the ```components``` folder we created in the previous part.

### AppNavbar

The Navbar will contain the ```Login``` Modal, ```Register``` modal, ```Logout``` button, and links to various pages on our website.

We will use Reactstrap components to build our Navbar component. 

Then import the ```LoginModal```, ```Logout``` and ```RegisterModal``` from the ```auth``` folder. 
- Import the ```PropTypes``` and ```connect``` function.

Define a state to assess whether the Navbar is open or not. 
- We have a toggle to change the open to close and vice versa.
Get the ```user``` and ```isAuthenticated``` states from the ```auth``` props. 
- Then check whether we are authenticated or not; if we are, then we display the username, link to home, cart and orders, and also a Logout button. 
- If we are not authenticated, we get the ```Register``` and ```Login``` modals.

Display a Navbar brand, andwhen we are authenticated, we display the ```authLinks```, and when we are not, we display the ```guestLinks```.

Finally, define the ```mapStateToProps``` and add the ```auth```. 
- Then connect it to the ```AppNavbar``` class.

(AppNavbar.js)
```
import { Component, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container, NavLink } from 'reactstrap';
import RegisterModal from './auth/registerModal';
import Logout from './auth/Logout';
import LoginModal from './auth/loginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/cart">Cart</NavLink>
                </NavItem>
                <NavItem className="mr-2">
                    <NavLink href="/orders">Orders</NavLink>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );

        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">E Commerce Store</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar> 
                                { isAuthenticated ? authLinks: guestLinks}                               
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);
```

### Home

This is the ```homepage``` of our application, where we display all our items and give the user an option to add items to the cart.

Bring in the ```getItems``` and ```addToCart``` functions from the ```action```s folder, we use to fetch the items and add an item to the cart.

On mount, we fetch all the items using the ```getItems``` function. 
- We also define an ```onAddToCart``` function that triggers when we click ```Add to Cart``` button in any products. 
- It receives the ```userId``` and ```productId``` and has the ```addToCart``` function where it sends these values as parameters and keeps the number of items added to 1. 
  - We could give users the option to choose the number of items, but we have not implemented it here to keep things simple.

Use a grid-based layout to display all our items, with all items displayed as ```Cards```. 
- Use the map functionality to map over items and display the data for each in its own card. 
- We also have an ```add to cart``` button for each product. 
  - ```Add to Cart``` button is only displayed when the user is authenticated.

We also have a ```mapStateToProps``` defined which has items, user, and isAuthenticated defined. 
Finally, we use the ```connect``` function to bind the actions and the ```mapStateToProps``` with the ```Home``` Component.

(Home.js)
```
import { Component } from 'react';
import AppNavbar from './AppNavbar';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';

class Home extends Component {

    componentDidMount(){
        this.props.getItems();
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    onAddToCart = async (id, productId) => {
        await this.props.addToCart(id, productId, 1);
        alert ('Item added to Cart');
    }

    render(){
        const { items } = this.props.item;
        const user = this.props.user;
        return (
            <div>
            <AppNavbar/>
            <Container>
                <div className="row">
                {items.map((item)=>(
                    <div className="col-md-4">
                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle tag="h5">{item.title}</CardTitle>
                            <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                            <CardText>{item.category}</CardText>
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</Button> :
                                    null}
                        </CardBody>
                    </Card>
                    </div>
                ))}
                 </div>
            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {getItems, addToCart})(Home);
```

### AddItem

This component is used to add items to the store. 
- We do not link this page to the Navbar since we don’t want users to add new items to our store.

We must make a separate seller portal with different access security measures set. 
- Since this is a beginner’s tutorial, we won’t take it that far, and only build this component to allow anyone to access. 
- We won’t add it in Navbar (only accessible through the URL).

We have a state with ```title```, ```description```, ```category```, and ```price```, which all relate to the product.

We have a similar ```onChange``` function and ```onSubmit``` function, like in the ```Register``` or ```Login``` components, but with different variables and different functions (```addItem```).

We have a form with all these fields and a button to add the item to the cart. 
- We display an alert on addition.

Lastl; we have a ```mapStateToProps```, and a ```connect``` function to link it with the ```AddItem``` component.

(AddItem.js)
```
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import AppNavbar from './AppNavbar';

class AddItem extends Component {
    state = {
        title: '',
        description: '',
        category: '',
        price: '',
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const newItem = {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            price: this.state.price
        }

        await this.props.addItem(newItem);

        alert('Item added successfully');
    }

    render(){
        return(
            <div>
                <AppNavbar/>
                <Container>
                    <h2 className="text-center mb-3">Add a new Item</h2>
                    { this.props.isAuthenticated ?
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Title of the item"
                                onChange={this.onChange}
                            />
                            <br/>
                            <Label for="description">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Description of the item"
                                onChange={this.onChange}
                            />
                            <br/>
                            <Label for="category">Category</Label>
                            <Input 
                                type="text"
                                name="category" 
                                id="category"
                                placeholder="Category of the item"
                                onChange={this.onChange}
                                >
                            </Input>
                            <br/>
                            <Label for="price">Price</Label>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Price of the item"
                                onChange={this.onChange}
                            />
                            
                            <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                            >Add Item</Button>
                        </FormGroup>
                    </Form> : 
                    <Alert className="text-center" color="danger">Login to add items!</Alert>
                    }
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
});

```

### Checkout
This is a ```helper``` function we create to handle the payment via Stripe Checkout. 
- First import the ```StripeCheckout``` function from ```react-stripe-checkout```.
- Add our ```Stripe publishable key``` and then create two functions; ```onToken``` to just checkout with the user and the token id, and ```Checkout``` function, which takes in the ```amount```, ```user```, and ```checkout``` from the ```Cart``` component, which we will define in a second.

Here, ```checkout``` is a function we receive through props from the ```Cart``` component. 
- This is the action which we use to checkout.

Use ```StripeCheckout``` with the amount in the lowest currency ```value```, the ```token```, ```currency```, and the ```stripe key```.

(Checkout.js)
```
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'pk_test_********************';

const onToken = (user,checkout) => token => 
    checkout(user, token.id);

const Checkout = ({ amount, user, checkout }) => 
    <StripeCheckout
      amount={amount*100}
      token={onToken(user,checkout)}
      currency='INR'
      stripeKey={STRIPE_PUBLISHABLE}
/>

export default Checkout;
```

### Cart

This component displays the user’s cart. 
- It shows all the items a user has in his/her cart, gives the option to remove them from the cart, and gives the option to checkout (pay for the products and order them).

We do not have a good way of handling what happens after the ```Checkout``` is finished and payment is done in this part. 
- Ideally, we should then redirect to the ```Orders``` page which can be done by ```history and ```withRouter```. 
- We have left it out for you to decide what’s best to do in case payment fails or in case payment is successful.

We have two functions; ```getCartItems``` and ```onDeleteFromcart``` defined, which both have functions to get all the cart items and delete an item from the cart.

We only get the items from the cart once we have the user loaded. 
- Otherwise, we would fetch an error. 
- Then we display all the items in our cart by mapping them and showing a delete button to delete that item from the cart.

After displaying all the items, we then have a Card displaying the ```bill``` and the ```Checkout``` component we defined earlier.

We then define the ```mapStateToProp```s and then ```connect``` it with this component.

(Cart.js)
```
import { Component, Fragment } from 'react';
import AppNavbar from './AppNavbar';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart, deleteFromCart } from '../actions/cartActions';
import Checkout from './Checkout';
import { checkout } from '../actions/orderActions';

class Cart extends Component {

    state = {
        loaded: false,
    }

    static propTypes = {
        getCart: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        deleteFromCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        cart: PropTypes.object.isRequired,
        checkout: PropTypes.func.isRequired
    }

    getCartItems = async (id) => {
        await this.props.getCart(id);
        this.state.loaded = true;
    }

    onDeleteFromCart = (id, itemId) => {
        this.props.deleteFromCart(id, itemId);
    } 
    
    render(){
        const user = this.props.user;
        if(this.props.isAuthenticated && !this.props.cart.loading && !this.state.loaded){
            this.getCartItems(user._id);
        }
        return(
            <div>
                <AppNavbar/>
                {this.props.isAuthenticated ?
                    <Fragment>
                        {this.props.cart.cart ? null :
                            <Alert color="info" className="text-center">Your cart is empty!</Alert>
                        }
                    </Fragment>
                    : <Alert color="danger" className="text-center">Login to View!</Alert>
                }  
        
            
                {this.props.isAuthenticated && !this.props.cart.loading && this.state.loaded && this.props.cart.cart?
                <Container>
                    <div className="row">
                        {this.props.cart.cart.items.map((item)=>(
                            <div className="col-md-4">
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">{item.name}</CardTitle>
                                <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                                <CardText>Quantity - {item.quantity}</CardText>
                                <Button color="danger" onClick={this.onDeleteFromCart.bind(this, user._id, item.productId)}>Delete</Button>
                            </CardBody>
                        </Card>
                        <br/>
                        </div>
                        ))}
                        <div class="col-md-12">
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Total Cost = Rs. {this.props.cart.cart.bill}</CardTitle>
                                <Checkout
                                    user={user._id}
                                    amount={this.props.cart.cart.bill}
                                    checkout={this.props.checkout}
                                />                   
                            </CardBody>
                        </Card>
                        </div>
                    </div>
                </Container>
                    :null}
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})

export default connect(mapStateToProps, {getCart, deleteFromCart, checkout})(Cart);
```

### Order

This is the page that displays all the orders users have placed. 
- Use the function ```getOrders``` from the ```actions``` file to do the same.

Once we are authenticated and have a user, get all the user orders and display them all in a card-based view using the ```map``` function.

Next, we define our ```mapStateToProps```, and then we ```connect``` the functions and ```mapStateToProps``` with the ```Orders``` component.

(Order.js)
```
import { Component, Fragment } from 'react';
import AppNavbar from './AppNavbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../actions/orderActions';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container} from 'reactstrap';

class Orders extends Component {

    state = {
        loaded: false,
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object.isRequired,
        order: PropTypes.object.isRequired,
        getOrders: PropTypes.func.isRequired
    }

    ongetOrders = async (id) => {
        await this.props.getOrders(id);
        this.state.loaded = true;
    }

    render(){
        const user = this.props.user;
        if(this.props.isAuthenticated && !this.props.order.loading && !this.state.loaded){
            this.ongetOrders(user._id);
        }
        return(
            <div>
                <AppNavbar/>
                {this.props.isAuthenticated ?
                    <Fragment>
                        {this.props.order.orders!==[] ? null :
                            <Alert color="info" className="text-center">You have no orders!</Alert>
                        }
                    </Fragment>
                    : <Alert color="danger" className="text-center">Login to View!</Alert>
                }

                {this.props.isAuthenticated && !this.props.order.loading && this.state.loaded && this.props.order.orders.length?
                    <Container>
                        <div className="row">
                            {this.props.order.orders.map((order)=>(
                                <div className="col-md-12">
                                    <Card>
                                        <CardBody>
                                            <CardTitle tag="h4">{order.items.length} items - Total cost: Rs. {order.bill}</CardTitle>
                                            <div className="row">
                                            {order.items.map((item)=>(
                                                <div className="col-md-4">
                                                    <Card className="mb-2">
                                                        <CardBody>
                                                            <CardTitle tag="h5">{item.name} ({item.quantity} pieces)</CardTitle>
                                                            <CardSubtitle tag="h6">Rs. {item.price}/piece</CardSubtitle>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                            ))}
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <br/>
                                </div>
                                
                            ))}
                        </div>
                    </Container>
                :null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    order: state.order,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})

export default connect(mapStateToProps, {getOrders})(Orders);
```

### Main

This is the component where we use the React router to define various routes for each component. 
- It helps us to have a multi-route layout with different components having their own route.

Use the ```withRouter```, ```Switch```, ```Route```, and ```Redirect``` to do all this routing. 
- Wrap the ```main component``` with the ```withRouter``` function.

(Main.js)
```
import { Component } from 'react';
import AddItem from './AddItem';
import Home from './Home';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from './Cart';
import Orders from './Oder';

class Main extends Component {
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/home'>
                        <Home/>
                    </Route>
                    <Route path='/addItem'>
                        <AddItem/>
                    </Route>
                    <Route path='/cart'>
                        <Cart/>
                    </Route>
                    <Route path='/orders'>
                        <Orders/>
                    </Route>
                    <Redirect to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect()(Main));
```

These were all the components we need to define inside the ```components``` folder.

Now, we update our ```App.js``` file to reflect all these changes and connect it with the Redux store.

### App

Dispatch the ```loadUser``` function when the component mounts. 
- Then wrap all our JSX code inside the ```Provider``` with a ```store={store}``` value. 
- Here, ```store``` is imported from the ```store``` we defined in the 5th tutorial.

Use a ```BrowserRouter``` to wrap the div with ```className``` ```App``` since we used Routing in our application.
- Have the ```Main``` function inside the div. 
- Export the app in the last line of our code.


```
import { Component } from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main';
import store from './store';
import {loadUser} from './actions/authActions';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return ( 
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main/>
          </div> 
        </BrowserRouter>
        </Provider> 
    );
  }
}

export default App;
```

**Congratulations!!** This completes the tutorial. 


