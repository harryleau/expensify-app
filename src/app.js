import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { firebase } from './firebase/firebase';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import LoadingPage from './components/LoadingPage';

import 'react-dates/initialize';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// we dont want to render app multiple times when user login and logout, so we use this line below to check.
let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    // we have to dispatch login here, not in startLogin like other actions for expenses, because this code here will run when user loads the app and will keep redux store up-to-date. If we dispatch login in startLogin, when user loads the app again (and still logged in), login action will not be dispatched -> user.uid in redux store is outdated.
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      // if user logs in at the login page, redirect to his dashboard 
      if(history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    // if not authenticated, redirect to login page.
    renderApp();
    history.push('/');
  }
});
