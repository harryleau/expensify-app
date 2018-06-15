import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from './../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = (updatedExpense) => {
    this.props.editExpense(this.props.expense.id, updatedExpense);
    this.props.history.push('/');
  };

  onRemove = () => {
    this.props.removeExpense(this.props.expense.id);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
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
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (id) => dispatch(removeExpense({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);