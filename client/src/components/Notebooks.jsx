import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Utils from '../utils/Utils';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';

import { Notebook } from '../api';

export default class Notebooks extends Component {

  constructor() {
    super();
    this.fn = new Utils();
    this.state = {
      notebooks: []
    };
  }

  componentDidMount() {
    const notebook = new Notebook();
    notebook.view((data) => {
      this.setState({ notebooks: this.fn.getArrayFromObjectKey(data) });
    });
  }

  render() {
    return (
      <DataGrid
        list={this.state.notebooks}
        icon={<MenuBookRoundedIcon fontSize="small" />}
      />
    );
  }
}