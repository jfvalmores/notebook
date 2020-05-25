import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Modal from './Modal';
import Utils from '../utils/Utils';
import styled from 'styled-components';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import { Button } from '@material-ui/core';
import { AppContext } from '../AppContext';

import { Section, Page } from '../api';

const SectionWrapper = styled.div`
  width: 100%;
  max-width: 240px;
`;

export default class Sections extends Component {
  static contextType = AppContext;
  _mainIntf = new Section();
  _detailIntf = new Page();

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
    if (String(this.props.reqPath) === '') return;

    this._mainIntf.view(this.props.reqPath, (data) => {
      this.context.updateState({ sections: this.fn.getArrayFromObjectKey(data) });
    });
  }

  setSelected = (section) => {
    const { _id } = section;
    this.context.updateState({ section: _id });

    this._detailIntf.view(`${this.props.reqPath}/${_id}`, (data) => {
      this.context.updateState({
        section: _id,
        page: '',
        pages: this.fn.getArrayFromObjectKey(data)
      });
    });
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
      <SectionWrapper>
        <Button
          size="small"
          color="primary"
          style={{ margin: 9 }}
          onClick={this.handleNewEntry}
          startIcon={<CollectionsBookmarkRoundedIcon />}
        >
          Add Section
          </Button>
        {this.context.appState.sections.length > 0 &&
          <DataGrid
            noWrapper
            onClick={this.setSelected}
            actions={['Edit', 'Delete']}
            handleAction={this.handleAction}
            list={this.context.appState.sections}
            icon={<CollectionsBookmarkRoundedIcon fontSize="small" />}
          />
        }
        <Modal
          title="Section"
          open={this.state.openModal}
          handleSave={this.handleSave}
          selected={this.state.selected}
          handleUpdate={this.handleUpdate}
          handleChange={this.handleChange}
          handleCancel={this.closeModalForm}
        />
      </SectionWrapper>
    );
  }
}