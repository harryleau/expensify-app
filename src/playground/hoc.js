//////////////// HIGHER ORDER COMPONENT - A component (HOC) that renders another component. Some benefits of HOC are:
// reuse code
// render hijacking
// prop manipulating
// abstract state

import React from 'react';
import ReactDOM from 'react-dom';

// This is the wrapped component
const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

// this is a function that takes in a regular component and returns a HOC component
// AdminInfo is the higher component with all current props of WrappedComponent and a prop of its own to render admin message
// HOC is simply just a component that add more props to a regular component like private message, authenication checking. 
const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share</p>}
      <WrappedComponent { ...props } />
    </div>
  );  
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isLoggedIn && <p>You are logged in!</p>}
      <WrappedComponent { ...props } />
    </div>
  );
};

// create a component with HOC component and wrapped component.
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isLoggedIn={true} info="This is login page" />, document.getElementById('app'));