import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API_REGISTER_URL } from '../../../constants/apiRoutes';
import { handleChange } from '../../../utils/helpers';
import axios from 'axios';
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
      await axios.post(API_REGISTER_URL, data);
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

  const handleInputChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    handleChange(setData, data, key, value);
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
