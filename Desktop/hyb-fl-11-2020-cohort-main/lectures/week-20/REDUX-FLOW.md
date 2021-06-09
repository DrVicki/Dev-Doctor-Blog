# Why Redux?
## Observe the diagram below:

![](https://github.com/DigitalCraftsStudents/hyb-fl-11-2020-cohort/blob/main/lectures/week-20/day-3/why%20redux.png)

The Redux model on our left demonstrates the more complicated our app gets, the more confusing it becomes to trace and share states with other components in the child-parent state relationship model.

We can easily see how this can get tangled up with larger applications when we have bugs and or just keeping organized.

The model illustrating “With Redux”, however, shows how we can solve the problem. 
- Creating a store to handle our state management, data flow can render traceable more easily and components listen to the data they are interested in; cleaner & predictable. 

With comprehensive and customizable middleware and awesome Redux DevTools in a Redux environment, Redux’s value in simplifying the process of state management in larger applicationsis invaluable.

## React-Redux “Flux” and Architecture

Our second step in understanding Redux core concepts: the cycle pattern of Redux.

![](https://github.com/DigitalCraftsStudents/hyb-fl-11-2020-cohort/blob/main/lectures/week-20/day-3/redux%20image.png)

**EXPLANATION**:

### Action
- An object setting up information about our data moving into ```state```.

### Dispatch
- Functions which act as a bridge between our ```actions``` and ```reducers```; sending the information over to our application.

### Reducer
- A function which receives data information from our ```action``` in the form of a ```type``` and ```payload```, and modifies the ```state``` based on additional provided data.

### State
- Where all the data from our ```reducers``` are passed into a central source.

Now we see that implementing a system to devise our data will give us a clearer level of control and power over our data flow. 
- This Redux cycle is what makes this whole thing go around and around. 

## The Store, Provider, and Connect

### Store

With ```actions``` and ```reducers``` set up, everything is maintained in our store. 
- The store is where we can set up our ```initial state```, ```combine our reducers```, ```apply middleware```, and hold our information.

### Provider

Use the ```provider``` to wrap our store around our application and by doing so, pass and render our ```state```. 
- We can then use ```connect``` with a component and enable it to receive store state from the ```provider```.

Check it Out....our store file architecture shoul resemble this:

![](https://github.com/DigitalCraftsStudents/hyb-fl-11-2020-cohort/blob/main/lectures/week-20/day-3/file%20architecture.png)

Redux is very flexible for structuring setup. 
- We strive for isolated and clean file structure by creating a ```store folder``` with an ```actions folder``` and a ```reducers folder``` inside.

We also have an ```index``` in our ```store folder``` to hook up our ```store``` and pass the ```reducers```.

## Ready?! Let's Go!!
