import React, { Component } from 'react';
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

export default class FormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (this.props.selected._id) {
        this.props.handleUpdate(this.props.selected);
      } else {
        this.props.handleSave(this.props.selected);
      }
    }
  }

  render() {
    return (
      <Dialog
        fullWidth
        open={this.props.open}
        onClose={this.props.handleCancel}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.props.description}
          </DialogContentText>
          <TextField
            required
            autoFocus
            fullWidth
            id="title"
            label="Title"
            margin="dense"
            value={this.props.selected.title}
            onKeyPress={this.handleKeyPress}
            onChange={this.props.handleChange}
            inputProps={{
              maxLength: 64,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleCancel} color="primary">
            Cancel
          </Button>
          {this.props.selected._id ?
            <Button onClick={() => this.props.handleUpdate(this.props.selected)} color="primary">
              Update
            </Button>
            :
            <Button onClick={() => this.props.handleSave(this.props.selected)} color="primary">
              Save
            </Button>
          }
        </DialogActions>
      </Dialog>
    );
  }
}
