import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';


export default function SignInModal(props) {
  const params = {
    email: '',
    password: '',
  };
  const [state, setState] = useState(params);

  const handleChanges = (e) => {
    const { id, value } = e.target;
    setState({
      ...state,
      [id]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please sign in to update your notes.
          </DialogContentText>
          <TextField
            autoFocus
            id="email"
            type="email"
            margin="dense"
            label="Email Address"
            onChange={handleChanges}
            fullWidth
          />
          <TextField
            fullWidth
            id="password"
            margin="dense"
            type="password"
            label="Password"
            onChange={handleChanges}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
