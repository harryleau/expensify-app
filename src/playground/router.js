import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

const ExpenseDashboardPage = () => (
  <div>
    This is my dashboard component
  </div>
);

const AddExpensePage = () => (
  <div>
    This is my add expense component
  </div>
);

const EditExpensePage = () => (
  <div>
    This is my edit expense component
  </div>
);

const HelpPage = () => (
  <div>
    This is my help page
  </div>
);

// Link is used to link internal pages. It renders pages from client-side, not server-side => when linking to external page, use regular <a> tag.

const NotFoundPage = () => (
  <div>
    404 - <Link to="/">Go Home</Link>
  </div>
);

// NavLink provides more props than Link
const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
    <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
    <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
    <NavLink to="/help" activeClassName="is-active">Help</NavLink>
  </header>
);

// BrowserRouter only accepts one child element => wrap routes in a div
// "/create" will not render in first load, as react get the page from browser, not from server => add "historyApiFallback: true" in webpack config 
// path will match any url that starts with path => "/create" will load both "/" and "/create", "/create/other" will load "/" and "/create" => use exact props
// NotFoundPage will render in all pages => use Switch => convert div into Switch tag. Switch will find matched route from top to bottom and stop when found => NotFoundPage will not render in matched routes.
// Header component is used in all pages => put it along side with Switch => it will load Header in all pages, including all NotFoundPage pages. 
const routes = (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);