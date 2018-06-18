import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from './../../components/EditExpensePage';
import expenses from './../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<EditExpensePage expense={expenses[2]} startEditExpense={startEditExpense} startRemoveExpense={startRemoveExpense} history={history} />);
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
  const updatedExpense = { note: 'updated' }
  wrapper.find('ExpenseForm').prop('onSubmit')(updatedExpense);
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, updatedExpense);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[2].id);
  expect(history.push).toHaveBeenLastCalledWith('/');
});