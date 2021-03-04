import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../../../services/api';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Register.scss';

function Register() {
  const history = useHistory();

  const [data, setData] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const redirect = () => {
    setTimeout(() => {
      history.push('/login');
    }, 2000);
  };

  const handleRegister = async event => {
    event.preventDefault();
    try {
      await register(data);
      setData({
        email: '',
        password: '',
        password2: '',
      });
      setSuccessMessage('Account created!');
      redirect();
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
    <section className="register-form-container">
      <form className="register-form" onSubmit={handleRegister}>
        <Typography variant="h4">Register</Typography>
        <TextField
          name="email"
          type="email"
          value={data.email}
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
          value={data.password}
          fullWidth
          size="small"
          margin="normal"
          variant="outlined"
          label="Password"
          required
          onChange={handleChange}
        />
        <TextField
          name="password2"
          type="password"
          value={data.password2}
          fullWidth
          size="small"
          margin="normal"
          variant="outlined"
          label="Repeat password"
          required
          onChange={handleChange}
        />
        <Button
          className="register-form-submit-bttn"
          type="submit"
          variant="contained"
          fullWidth
          size="medium"
          color="primary"
        >
          Register
        </Button>
        {errorMessage && (
          <p className="register-form-error-message">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="register-form-success-message">{successMessage}</p>
        )}
      </form>
    </section>
  );
}

export default Register;
