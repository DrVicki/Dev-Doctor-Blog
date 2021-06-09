# MERN e_Commerce Web App Guidance

## App File Structure

```
.vscode
	settings.json
client
	node_modules
	public
	src
		actions
			authActions.js
			cartActions.js
			errorActions.js
			itemActions.js
			orderActions.js
			types.js
		components
			auth
				loginModal.js
				Logout.js
				registerModal.js
			AddItem.js
			AppNavbar.js
			Cart.js
			Checkout.js
			Home.js
			Main.js
			Order.js
		reducers
			authReducer.js
			cartReducer.js
			errorReducer.js
			index.js
			itemReducer.js
			orderReducer.js
		App.css
		index.css
		App.js
		App.test.js
		index.js
		logo.svg
		reportWebVitals.js
		setupTests.js
		store.js
		package-lock.json
		package,json
		README.md
config
	default.json
controllers
	authControllers.js
	cartControllers.js
	itemControllers.js
	orderControllers.js
middleware
	auth.js
models
	Cart.js
	Item.js
	Order.js
	User.js
node-modules
routes
	auth.js
	cart.js
	item.js
	order.js
package-lock.json
package.json
server.js
```

## Mongoose Connection to Mongo Database

- **MongoDB** is the database where all the data is stored.
- **Mongoose** will connect to the MongoDB

## Stripe for Payment

Make sure you signed up for Stripe Account.

- We need to add the real ```StripeAPIKey```, ```jwtsecret```, and ```dbURI``` FROM Mongoose/MongoDB.
  - Update the ```default.json``` file inside the ```config``` folder.

(from: Tutorial Part #4)
```
{
    "dbURI": "YOUR DB URI",
    "jwtsecret": "your jwt secret",
    "StripeAPIKey": "YOUR STRIPE SECRET API KEY"
}
```

### STRIPE_PUBLISHABLE pk_test

- Obtain the actual ```pk_test``` from Strip for ```STRIPE_PUBLISHABLE```
  - Update the ```Checkout.js file```

(fron Tutorial Part #7)
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


