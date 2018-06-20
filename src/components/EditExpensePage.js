import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from './../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = (updatedExpense) => {
    this.props.startEditExpense(this.props.expense.id, updatedExpense);
    this.props.history.push('/');
  };

  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button-secondary" onClick={this.onRemove}>Remove Expense</button>
        </div>
      </div>
    );
  }
}

// not only we can access state, but we can also access current props through second argument to use some props like match.params
// find() is an array method that will return the value if the condition is true
const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (id) => dispatch(startRemoveExpense({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);