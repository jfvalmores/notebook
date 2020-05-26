import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Modal from './Modal';
import Utils from '../utils/Utils';
import styled from 'styled-components';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { AppContext } from '../AppContext';
import { Button } from '@material-ui/core';

const CustomWrapper = styled.div`
  width: 100%;
  max-width: 240px;
`;

export default class BaseGrid extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.fn = new Utils();
    this._attrName = '';
    this._title = '';
    this._mainIntf = '';
    this._detailIntf = '';
    this._hasCustomWrapper = false;

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
    this._mainIntf.view('', (data) => {
      this.context.updateState({ [this._attrName]: this.fn.getArrayFromObjectKey(data) });
    });
  }

  handleSave = (data) => {
    if (!this.validateForm(data)) return;
    this._mainIntf.create(data, `${this.props.reqPath}`);
    this.closeModalForm();
    this.doPostSave();
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
        this.doPostRemove(detail._id);
        break;
      default:
        break;
    }
  }

  doPostSave = () => {
    this.cleanUp();
  }

  doPostRemove = (id) => {
    this.cleanUp();
  }

  cleanUp = () => { }

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

  closeModalForm = () => {
    this.setState({ openModal: false });
  }

  openModalForm = () => {
    this.setState({ openModal: true })
  }

  renderMain() {
    return (
      <>
        {this.context.appState.mode === 'EDIT' &&
          <Button
            size="small"
            color="primary"
            style={{ margin: 9 }}
            onClick={this.handleNewEntry}
            startIcon={this._icon || <MenuBookRoundedIcon fontSize="small" />}
          >
            Add {this._title}
          </Button>
        }
        {this.context.appState[this._attrName].length > 0 &&
          <DataGrid
            noWrapper
            sourceKey={this.props.sourceKey}
            onClick={this.setSelected}
            actions={['Edit', 'Delete']}
            handleAction={this.handleAction}
            list={this.context.appState[this._attrName]}
            icon={this._icon || <MenuBookRoundedIcon fontSize="small" />}
          />
        }
        <Modal
          title={this._title}
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

  render() {
    if (this._hasCustomWrapper) {
      return (
        <CustomWrapper>
          {this.renderMain()}
        </CustomWrapper>
      );
    }

    return (
      <>
        {this.renderMain()}
      </>
    );
  }
}