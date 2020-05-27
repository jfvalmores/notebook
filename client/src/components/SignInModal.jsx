import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import { Auth } from '../api';


export default function SignInModal(props) {
  const auth = new Auth();
  const params = {
    email: '',
    password: '',
  };
  const [state, setState] = useState(params);

  useEffect(() => {
    setState(params);
    // eslint-disable-next-line
  }, [props.open]);

  const handleChanges = (e) => {
    const { id, value } = e.target;
    setState({
      ...state,
      [id]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);

    const ok = (res) => {
      props.handleLoginSuccess(state);
      props.handleClose();
    }

    const errCb = (err) => {
      props.showToast(err.message);
    }

    if (String(state.email) === '') {
      props.showToast('Please enter email.');
      return;
    }

    auth.login(state, ok, errCb)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please sign in to update your notes.
        </DialogContentText>
        <form onKeyPress={handleKeyPress}>
          <TextField
            autoFocus
            id="email"
            type="email"
            margin="dense"
            label="Email Address"
            value={state.email}
            onChange={handleChanges}
            fullWidth
          />
          <TextField
            fullWidth
            id="password"
            margin="dense"
            type="password"
            label="Password"
            value={state.password}
            onChange={handleChanges}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
          </Button>
        <Button type="submit" onClick={handleSubmit} color="primary">
          Submit
          </Button>
      </DialogActions>
    </Dialog>
  );
}
