import React, { Component, createRef } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

class DataGrid extends Component {

  constructor(props) {
    super(props);

    this.gridRef = createRef();

    this.list = [
      { data: '0', label: 'Philippines' },
      { data: '1', label: 'Japan' },
      { data: '2', label: 'Korea' },
      { data: '3', label: 'Vietnam' },
      { data: '4', label: 'Norway' },
      { data: '5', label: 'Canada' },
      { data: '6', label: 'USA' },
      { data: '7', label: 'Germany' },
      { data: '8', label: 'France' },
    ];
  }

  render() {
    return (
      <div
        id="list"
        ref={this.gridRef}>
        <Paper>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <SendIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">A short message</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <PriorityHighIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">A very long text that overflows</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DraftsIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                A very long text that overflows
          </Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </div>
    );
  }
}

export default DataGrid;