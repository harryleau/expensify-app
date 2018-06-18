import database from '../firebase/firebase';

//////// NO FIREBASE 
// component calls action generator
// action generator returns object
// component calls action generator
// redux store changes

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

//////// WITH FIREBASE
// component calls action generator
// action generator returns function
// component dispatches function - startAddExpense returns a function that dispatches action addExpense
// function runs (has the ability to dispatch other actions and do whatever it wants)

// START_ADD_EXPENSE
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
    const expense = { description, note, amount, createdAt };

    // for further promise chaining, we use return. for example, in test file, we can chain assertion after calling startAddExpense
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});