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
  renderList = () => (
    <List style={{ padding: 0 }}>
      {this.props.list.map(item => (
        <ListItem
          button
          key={item._id}
          onClick={() => this.props.onClick(item)}
        >
          <ListItemIcon style={{ minWidth: 25 }}>
            {this.props.icon}
          </ListItemIcon>
          <ListItemText primary={item.title} classes={{ root: 'list-item' }} />
        </ListItem>
      ))}
    </List>
  )

  render() {
    const { noWrapper } = this.props;

    return (
      <>
        {noWrapper ?
          this.renderList()
          :
          <Paper>
            <CustomPaper inheritColor>
              {this.renderList()}
            </CustomPaper>
          </Paper>
        }
      </>
    );
  }
}

export default DataGrid;