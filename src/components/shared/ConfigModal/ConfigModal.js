import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createConfig } from '../../../services/api';
import { getToken } from '../../../services/storage';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

function ConfigModal({ handleClose, open }) {
    const history = useHistory();
  const [config, setConfig] = useState({
    name: '',
    version: '',
    data: {},
  });

  const handleCreateConfig = async () => {
  const token = getToken();
    try {
      const response = await createConfig(token, config);
      console.log(response)
      history.replace('dashboard');
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setConfig(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Create new configuration</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            name="name"
            type="text"
            size="small"
            fullWidth
            margin="normal"
            placeholder="Enter config name..."
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            name="version"
            type="text"
            size="small"
            fullWidth
            margin="normal"
            placeholder="Enter config version..."
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button
          onClick={handleCreateConfig}
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfigModal.propTypes = {
    handleCloseModal: PropTypes.func,
    open: PropTypes.bool,
};

export default ConfigModal;
