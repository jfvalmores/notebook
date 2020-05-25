import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Utils from '../utils/Utils';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { AppContext } from '../AppContext';

import { Notebook, Section } from '../api';

export default class Notebooks extends Component {
  static contextType = AppContext;

  constructor() {
    super();
    this.fn = new Utils();
  }

  componentDidMount() {
    const notebook = new Notebook();
    notebook.view('', (data) => {
      this.context.updateState({ notebooks: this.fn.getArrayFromObjectKey(data) });
    });
  }

  setSelected = (notebook) => {
    const { _id } = notebook;
    this.context.updateState({ notebook: _id });

    const section = new Section();
    section.view(`/${_id}`, (data) => {
      this.context.updateState({ sections: this.fn.getArrayFromObjectKey(data), pages: [] });
    });
  }

  render() {
    console.log(this.context);

    return (
      <DataGrid
        noWrapper
        list={this.context.appState.notebooks}
        onClick={this.setSelected}
        icon={<MenuBookRoundedIcon fontSize="small" />}
      />
    );
  }
}