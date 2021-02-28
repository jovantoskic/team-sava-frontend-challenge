import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../../utils/helpers';

const RouteWrapper = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default RouteWrapper;
