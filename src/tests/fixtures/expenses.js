import moment from 'moment';

export default [{
  id: '1',
  description: 'Book',
  note: '',
  amount: 2095,
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '2',
  description: 'Food',
  note: '',
  amount: 10850,
  createdAt: 0
}, {
  id: '3',
  description: 'Games',
  note: '',
  amount: 3599,
  createdAt: moment(0).add(3, 'days').valueOf()
}];