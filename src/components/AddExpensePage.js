import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from './../actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// just like mapStateToProps, it turns dispatch actions into props, so in the component we don't need to use props.dispatch(addExpense(expense)) anymore.
const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

// first arg is mapStateToProps, we don't need it in this component, so set it to be undefined
export default connect(undefined, mapDispatchToProps)(AddExpensePage);