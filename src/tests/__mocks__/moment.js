// import moment from 'moment';
// we cant import moment like above because it will import the current file, which also named moment, we can use requireActual like below
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
  return moment(timestamp);
};

// now with the moment mocking function, snapshot will match everything time we rerun the test. (it would fail if we dont use mocks because moment function will return different point in time in every test run.)