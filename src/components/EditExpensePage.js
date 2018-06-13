import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from './../actions/expenses';

const EditExpensePage = ({ dispatch, expense, history }) => {
  return (
    <div>
      <ExpenseForm
        expense={expense}
        onSubmit={(updatedExpense) => {
          dispatch(editExpense(expense.id, updatedExpense));
          history.push('/');
        }}
      />
      <button onClick={(e) => {
        dispatch(removeExpense({ id: expense.id }));
        history.push('/');
      }}>Remove</button>
    </div>
  )
};

// not only we can access state, but we can also access current props through second argument to use some props like match.params
// find() is an array method that will return the value if the condition is true
const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

export default connect(mapStateToProps)(EditExpensePage);