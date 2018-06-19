import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

// react-router does not have built-in component for protected page => create on our own.
// PrivateRoute is just a Component that renders Route from react-router but adds on more logical props like isAuthenticated to protected pages.
// have to rename component props to Component because capitalize is a must for react components.
export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div> 
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const mapStateToProps = state => ({
  // !!state.auth.uid is the way to turn a value into boolean value: true if value exsists, false if null or undefined, same as state.auth.uid ? true : false
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);