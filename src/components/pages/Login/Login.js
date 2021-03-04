import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../../services/api';
import { setToken } from '../../../services/storage';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Login.scss';

function Login() {
  const history = useHistory();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const response = await login(data);
      const { token } = response.data;
      setToken(token);
      history.push('/dashboard');
    } catch (error) {
      const { Message } = error.response.data;
      const message = Message.split(':')[1];
      setErrorMessage(message);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <section className="login-form-container">
      <form className="login-form" onSubmit={handleLogin}>
        <Typography variant="h4">Login</Typography>
        <TextField
          name="email"
          type="email"
          fullWidth
          size="small"
          margin="normal"
          variant="outlined"
          label="Email"
          required
          onChange={handleChange}
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
          onChange={handleChange}
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
          Not registered?{' '}
          <span className="create-account">Create an account</span>
        </Typography>
        {errorMessage && <p className="login-form-error">{errorMessage}</p>}
      </form>
    </section>
  );
}

export default Login;
