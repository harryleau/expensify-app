import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

///// we have a lot of actions to do like below, so we need multiple reducers => use combineReducers
// install and import uuid to generate id

///////// ACTION GENERATORS
// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});


/////// DEFAULT STATE FOR TWO REDUCERS
const expensesReducerDefaultState = [];
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

// instead of using concat(), we can use ES6 spread operator: state.concat(arr) will equal [...state, arr]
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default: 
      return state;
  }
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount' }
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date' }
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

////// GET VISIBLE EXPENSES
// use filter() method with 3 conditions to check:
  // startDateMatch: true if startDate is undefined or less than expense created date
  // endDateMatch: true if endDate is undefined or more than expense created date
  // textMatch: use indexOf or includes to filter. (includes() is an ES6 method, better than indexOf as it can find                 undefined and NaN values in an array).
// if 1 condition fails, that expense will be filtered out. 
// use sort() method: the compare function return < 0 => a comes first, > 0 => b comes first. 
  // For number comparison, there are 2 ways: 
    // 1. use conditional to return -1 or 1
    // 2. use shorthand return a - b; => sort ascendingly because if a < b => a - b < 0 => a comes first => sort from   small to large number; return b - a => sort descendingly.
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    // const textMatch = expense.description.toLowerCase().indexOf(text.toLowerCase()) !== -1;

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if(sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if(sortBy === 'amount') {
      return b.amount - a.amount;
    }
  });
};


/////// COMBINE TWO REDUCERS INTO STORE
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

////// WATCHING STATE CHANGES
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

/////// ACTION CALLS

const expenseOne = store.dispatch(addExpense({ description: 'house rent for June', amount: 100, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: -1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter(''));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setStartDate(525));
// store.dispatch(setEndDate(925));



/*
////// sample state object
const demoState = {
  expenses: [{
    id: '123abc',
    description: 'June Rent',
    note: 'This was the final payment for that address',
    amount: 47500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};
*/

///// ES6 spreading object, only array spreading is supported, we have to install babel plugin spreading object and add it in .babelrc
/*
const user = {
  name: 'harry',
  age: 24
};

// we can concat or override props in obj, note that if we put age: 29 before ...user, the original age will override and still is 24.
console.log({
  ...user,
  location: 'Melbourne',
  age: 29
}); 
*/