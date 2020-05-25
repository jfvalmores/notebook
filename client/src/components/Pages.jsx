import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Modal from './Modal';
import Utils from '../utils/Utils';
import styled from 'styled-components';
import BookRoundedIcon from '@material-ui/icons/BookRounded';
import { Button } from '@material-ui/core';
import { AppContext } from '../AppContext';

import { Page } from '../api';

const PageWrapper = styled.div`
  width: 100%;
  max-width: 240px;
`;

export default class Pages extends Component {
  static contextType = AppContext;
  _mainIntf = new Page();

  constructor() {
    super();
    this.fn = new Utils();
    this.state = {
      openModal: false,
      selected: {
        title: '',
      },
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    if (String(this.props.sectionId) === '') return;

    this._mainIntf.view(this.props.reqPath, (data) => {
      this.context.updateState({ pages: this.fn.getArrayFromObjectKey(data) });
    });
  }

  setSelected = (page) => {
    const { _id } = page;
    this.context.updateState({ page: _id });

    // TODO: show content
  }

  handleSave = (data) => {
    if (!this.validateForm(data)) return;
    this._mainIntf.create(data, `${this.props.reqPath}`);
    this.closeModalForm();
  }

  closeModalForm = () => {
    this.setState({ openModal: false });
  }

  openModalForm = () => {
    this.setState({ openModal: true })
  }

  handleUpdate = (data) => {
    if (!this.validateForm(data)) return;
    this._mainIntf.update(`${this.props.reqPath}/${data._id}`, data);
    this.closeModalForm();
  }

  handleNewEntry = () => {
    this.setState({ selected: { title: '' } })
    this.openModalForm();
  }

  handleAction = (action, detail) => {
    switch (String(action).toUpperCase()) {
      case 'EDIT':
        this.setState({ selected: detail }, (state) => {
          console.log(this.state);
          this.openModalForm();
        });
        break;
      case 'DELETE':
        this._mainIntf.remove(`${this.props.reqPath}/${detail._id}`);
        break;
      default:
        break;
    }
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      selected: {
        ...this.state.selected,
        [id]: value,
      }
    });
  }

  validateForm = (data) => {
    if (String(data.title) === '') {
      return false;
    }

    return true;
  }

  render() {
    return (
      <PageWrapper>
        <Button
          size="small"
          color="primary"
          style={{ margin: 9 }}
          onClick={this.handleNewEntry}
          startIcon={<BookRoundedIcon />}
        >
          Add Page
          </Button>
        {this.context.appState.pages.length > 0 &&
          <DataGrid
            noWrapper
            onClick={this.setSelected}
            actions={['Edit', 'Delete']}
            handleAction={this.handleAction}
            list={this.context.appState.pages}
            icon={<BookRoundedIcon fontSize="small" />}
          />
        }
        <Modal
          title="Page"
          open={this.state.openModal}
          handleSave={this.handleSave}
          selected={this.state.selected}
          handleUpdate={this.handleUpdate}
          handleChange={this.handleChange}
          handleCancel={this.closeModalForm}
        />
      </PageWrapper>
    );
  }
}