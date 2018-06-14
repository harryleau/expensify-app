import { createStore, combineReducers } from 'redux';
import expensesReducer from './../reducers/expenses';
import filtersReducer from './../reducers/filters';

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    // this line is for using redux devtools in Chrome
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
