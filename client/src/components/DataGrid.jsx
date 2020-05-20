import React, { Component } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';

class DataGrid extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        id="list">
        <Paper>
          <MenuList autoFocus>
            {this.props.list.map((item, idx) => (
              <MenuItem key={idx}>
                <ListItemIcon>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <strong>{item.title}</strong>
                <Typography variant="inherit">{item.description}</Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </div>
    );
  }
}

export default DataGrid;