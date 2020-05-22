import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Utils from '../utils/Utils';
import styled from 'styled-components';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { AppContext } from '../AppContext';

import { Notebook } from '../api';

const CanvasWrapper = styled.div`
  width: 100%;
  max-width: 360px;
`;

export default class Canvas extends Component {
  static contextType = AppContext;

  constructor() {
    super();
    this.fn = new Utils();
    this.state = {
      notebooks: []
    };
  }

  componentDidMount() {
    const notebook = new Notebook();
    notebook.view('', (data) => {
      this.setState({ notebooks: this.fn.getArrayFromObjectKey(data) });
    });
  }

  setSelected = (notebook) => {
    const { _id } = notebook;
    this.context.updateState({ notebook: _id });
  }

  render() {
    console.log(this.context);

    return (
      <CanvasWrapper>
        <DataGrid
          list={this.state.notebooks}
          onClick={this.setSelected}
          icon={<MenuBookRoundedIcon fontSize="small" />}
        />
      </CanvasWrapper>
    );
  }
}