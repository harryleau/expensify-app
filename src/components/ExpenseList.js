import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from './../selectors/expenses';

export const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
      )
    }
  </div>
);

const mapStatetoProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStatetoProps)(ExpenseList);

// the connect method will return a function like requestAuthentication in hoc.js so we call that function right after that with the regular component ExpenseList
// connect also takes in a function that takes in state and return a props obj that can be used in ExpenseList component. that function argument is famously named mapStateToProps. 
// the final default export will be a higher order component of ExpenseList.