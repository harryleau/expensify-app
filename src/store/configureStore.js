import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from './../reducers/expenses';
import filtersReducer from './../reducers/filters';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))    
  );

  return store;
};

// this line is for using redux devtools in Chrome, if we dont use thunk, just add this line below combineReducers. But if we use thunk to use firebase in redux, use composeEnhancers like above instead
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
