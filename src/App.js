import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { isLoggedIn } from './utils/helpers';

import Register from './components/pages/Register';
import Login from './components/pages/Login';

import './index.scss';

function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            {!isLoggedIn() && <Redirect to="/login" />}
          </Route>
          <Route component={Register} path="/register" />
          <Route component={Login} exact path="/login" />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
