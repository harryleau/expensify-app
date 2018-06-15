import filtersReducer from './../../reducers/filters';
import moment from 'moment';

test('should set up default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const state = filtersReducer({sortBy: 'amount'}, { type: 'SORT_BY_DATE' });
  expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
  const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'book' });
  expect(state.text).toBe('book');
});

test('should set startDate', () => {
  const startDate = moment();
  const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate});
  expect(state.startDate).toBe(startDate);
});

test('should set endDate', () => {
  const endDate = moment();
  const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate });
  expect(state.endDate).toBe(endDate);
});