import React from 'react';
import { shallow } from 'enzyme';
import ExpenselistItem from './../../components/ExpenseListItem';
import expenses from './../fixtures/expenses';
import ExpenseListItem from './../../components/ExpenseListItem';

test('should render ExpenseListItem with fixture data', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});