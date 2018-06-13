import React from 'react';

export default class ExpenseForm extends React.Component {
  // new syntax for constructor
  state = {
    description: '',
    note: ''
  };

  // Solution 1: set value to a const.
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  // Solution 2: use e.persist(), cannot use e.target.value in a callback without e.persist()
  onNoteChange = e => {
    e.persist();
    this.setState(() => ({ note: e.target.value }));
  }

  onAmountChange = e => {
    const amount = e.target.value;
    if(amount.match(/^\d*(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="number"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <textarea 
            placeholder="Add a note for your expense"
            value={this.state.note}
            onChange={this.onNoteChange}
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
};