import React, { Component } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components';

const CustomPaper = styled.div`
  color: ${props => props.inheritColor ? 'inherit !important' : ''};
`;

class DataGrid extends Component {
  render() {
    return (
      <Paper>
        <CustomPaper inheritColor>
          <MenuList autoFocus>
            {this.props.list.map(item => (
              <MenuItem key={item._id}>
                <ListItemIcon>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <strong>{item.title}</strong>
                {' '}
                <span>{item.description}</span>
              </MenuItem>
            ))}
          </MenuList>
        </CustomPaper>
      </Paper>
    );
  }
}

export default DataGrid;