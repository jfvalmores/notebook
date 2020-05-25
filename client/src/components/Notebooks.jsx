import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Modal from './Modal';
import Utils from '../utils/Utils';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { AppContext } from '../AppContext';
import { Button } from '@material-ui/core';

import { Notebook, Section } from '../api';

export default class Notebooks extends Component {
  static contextType = AppContext;
  _mainInterface = new Notebook();
  _detailInterface = new Section();

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
    this._mainInterface.view('', (data) => {
      this.context.updateState({ notebooks: this.fn.getArrayFromObjectKey(data) });
    });
  }

  setSelected = (notebook) => {
    const { _id } = notebook;
    this.context.updateState({ notebook: _id });

    this._detailInterface.view(`/${_id}`, (data) => {
      this.context.updateState({ sections: this.fn.getArrayFromObjectKey(data), pages: [] });
    });
  }

  handleSave = (data) => {
    if (!this.validateForm(data)) return;
    this._mainInterface.create(data);
    this.closeModalForm();
  }

  closeModalForm = () => {
    this.setState({ openModal: false });
  }

  openModalForm = () => {
    this.setState({ openModal: true })
  }

  handleRemove = (id) => {
    this._mainInterface.remove(id);
  }

  handleUpdate = (data) => {
    if (!this.validateForm(data)) return;
    this._mainInterface.update(data._id, data);
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
        // this._mainInterface.update(detail._id, detail);
        break;
      case 'DELETE':
        this._mainInterface.remove(detail._id);
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
      <>
        <Button
          size="small"
          color="primary"
          style={{ margin: 9 }}
          onClick={this.handleNewEntry}
          startIcon={<MenuBookRoundedIcon />}
        >
          Add Notebook
        </Button>
        <DataGrid
          noWrapper
          onClick={this.setSelected}
          actions={['Edit', 'Delete']}
          handleAction={this.handleAction}
          list={this.context.appState.notebooks}
          icon={<MenuBookRoundedIcon fontSize="small" />}
        />
        <Modal
          title="Notebook"
          open={this.state.openModal}
          handleSave={this.handleSave}
          selected={this.state.selected}
          handleUpdate={this.handleUpdate}
          handleChange={this.handleChange}
          handleCancel={this.closeModalForm}
        />
      </>
    );
  }
}