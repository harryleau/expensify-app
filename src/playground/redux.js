import { createStore } from 'redux';
import { Z_BEST_COMPRESSION } from 'zlib';

//////////////////// STEPS TO UNDERSTAND THIS FILE ///////////////////////////
/*
  1. use createStore() with a callback argument to create a redux store, this takes in 2 arguments - state and action
  2. use dispatch to send an action change state in store. this takes in an object argument, the type prop define the action name and we can add more props into the object. this object is the action argument in store.
  3. use subscribe to watch for state changes, set it to a var called unsubscribe and call it to stop watching.
  4. use action generators to avoid typos and be more efficient and refactor it with ES6 destructuring 
  5. the callback function in createStore() is actually a reducer, which is a pure function.
*/


// action generators -  functions that return action objects => use it with dispatch() to avoid typo errors (because it will not show any error message if we mistype the action type in dispatch function)

////////// old syntax
/*
const incrementCount = (payload = {}) => ({
  type: 'INCREMENT',
  incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
});
*/

////////// ES6 destructuring - argument is an object with a prop called incrementBy whose default value is 1 and default value of the object argument is an empty obj. In this way, we dont have to define the obj name like payload above and dont have to check if the incrementBy prop is passed when the method is called. Ex: store.dispatch(incrementCount()); => no argument => increment by 1
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

// just like above, 2 default values. 1 for the argument obj and 1 for its property (decrementBy)
const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({ count }) => ({
  type: 'SET',
  count
});

const resetCount = () => ({ 
  type: 'RESET',
  count: 0
});

/////// REDUCERS
/*
  1. Reducers are pure functions - functions that only use their own inputs, or arguments.
  2. Never change state or action - dont manipulate them, they are read-only.
*/

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
      return {
        count: state.count + incrementBy
      };
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
      return {
        count: state.count - decrementBy
      }
    case 'RESET':
      return {
        count: 0
      }
    case 'SET':
      return {
        count: action.count
      }
    default:
      return state;
  }
};

const store = createStore(countReducer);

// subscribe will run after every change of state.
// we can assign the subscribe method to a var called unsubscribe and call it where we want it stop watching state changes (unsubscribe)
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});



// action - is an object that sent to the store
// when action is dispatched, code in creteStore will run regardless of whether state is changed
// if action type in dispatch not matched, it does nothing and not showing error.
// the object we dispatch will be the action argument in the callback in createStore()

// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5 }));

// unsubscribe(); 

// store.dispatch({
//   type: 'INCREMENT'
// });

store.dispatch(incrementCount());

// store.dispatch({
//   type: 'RESET'
// });

store.dispatch(resetCount());

// store.dispatch({
//   type: 'DECREMENT', 
//   decrementBy: 10
// });

store.dispatch(decrementCount({ decrementBy: 100 }));

// store.dispatch({
//   type: 'DECREMENT'
// });
store.dispatch(decrementCount());

// store.dispatch({
//   type: 'SET',
//   count: 101
// });

store.dispatch(setCount({ count: 500 }));