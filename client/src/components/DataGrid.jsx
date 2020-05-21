import React, { Component } from 'react';
import {
  List,
  Paper,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import styled from 'styled-components';

const CustomPaper = styled.div`
  color: ${props => props.inheritColor ? 'inherit !important' : ''};
`;

class DataGrid extends Component {
  render() {
    return (
      <Paper>
        <CustomPaper inheritColor>
          <List>
            {this.props.list.map(item => (
              <ListItem
                button
                key={item._id}
                onClick={() => this.props.onClick(item)}
              >
                <ListItemIcon>
                  {this.props.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </CustomPaper>
      </Paper>
    );
  }
}

export default DataGrid;