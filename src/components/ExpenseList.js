import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from './../selectors/expenses';

export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>

    <div className="list-body">
      {
        props.expenses.length === 0 ? (
          <div>
            <span className="list-item list-item--message">No expenses</span>
          </div>
        ) : (
          props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
        )
      }
    </div>
  </div>
);

const mapStatetoProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStatetoProps)(ExpenseList);

// the connect method will return a function like requestAuthentication in hoc.js so we call that function right after that with the regular component ExpenseList
// connect also takes in a function that takes in state and return a props obj that can be used in ExpenseList component. that function argument is famously named mapStateToProps. 
// the final default export will be a higher order component of ExpenseList.