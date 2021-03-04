import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import RouteWrapper from './components/shared/RouteWrapper';
import Dashboard from './components/pages/Dashboard';
import Register from './components/pages/Register';
import Login from './components/pages/Login';

import './index.scss';

function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <RouteWrapper component={Dashboard} exact path="/dashboard" />
          <Route component={Register} exact path="/register" />
          <Route component={Login} exact path="/login" />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
