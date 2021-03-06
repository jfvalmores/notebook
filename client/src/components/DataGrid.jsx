import React, { Component } from 'react';
import {
  List,
  Menu,
  ListItem,
  MenuItem,
  IconButton,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import styled from 'styled-components';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const ListContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 127px);
`;

class DataGrid extends Component {
  state = {
    selected: '',
  };

  handleClick = (idx, item) => {
    this.setState({ selected: idx });
    this.props.onClick(item);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (String(newProps.sourceKey) === '') {
      this.setState({ selected: '' });
    }
  }

  renderList = () => (
    <List style={{ padding: 0 }}>
      {this.props.list.map((item, idx) => (
        <ListItem
          button
          key={item._id}
          style={{ backgroundColor: (this.state.selected === idx ? 'lightgray' : 'inherit') }}
          onClick={() => this.handleClick(idx, item)}
        >
          <ListItemIcon style={{ minWidth: 25 }}>
            {this.props.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            classes={{ root: 'list-item' }} />
          {this.props.mode === 'EDIT' &&
            <Options
              item={item}
              actions={this.props.actions || []}
              handleAction={this.props.handleAction}
            />
          }
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
          <ListContainer>
            {this.renderList()}
          </ListContainer>
        }
      </>
    );
  }
}

function Options(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        style={{ padding: 0 }}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 50 * 4.5,
            width: '20ch',
          },
        }}
      >
        {props.actions.map((option) => (
          <MenuItem
            key={option}
            onClick={(e) => { handleClose(e); props.handleAction(option, props.item) }}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default DataGrid;