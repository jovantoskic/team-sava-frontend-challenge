import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API_LOGIN_URL } from '../../../constants/apiRoutes';
import { handleChange } from '../../../utils/helpers';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Login.scss';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const history = useHistory();

  const handleLogin = event => {
    event.preventDefault();
    axios
      .post(API_LOGIN_URL, data)
      .then(response => {
        const {
          data: { token },
        } = response;
        localStorage.setItem('token', token);
      })
      .catch(error => {
        error && setError('Something went wrong, please try again.');
      });
  };

  const handleInputChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    handleChange(setData, data, key, value);
  };

  return (
    <section className="login-form-container">
      <Typography variant="h4">Login</Typography>
      <form className="login-form" onSubmit={handleLogin}>
        <TextField
          name="email"
          type="email"
          fullWidth
          size="small"
          margin="normal"
          variant="outlined"
          label="Email"
          required
          onChange={handleInputChange}
        />
        <TextField
          name="password"
          type="password"
          fullWidth
          size="small"
          margin="normal"
          variant="outlined"
          label="Password"
          required
          onChange={handleInputChange}
        />
        <Button
          className="login-form-submit-bttn"
          type="submit"
          variant="contained"
          fullWidth
          size="medium"
          color="primary"
        >
          Login
        </Button>
        <Typography
          onClick={() => history.push('/register')}
          className="login-form-register"
        >
          Not registered? Create an account
        </Typography>
        {error && <p className="login-form-error">{error}</p>}
      </form>
    </section>
  );
}

export default Login;
