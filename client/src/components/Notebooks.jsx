import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Utils from '../utils/Utils';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import styled from 'styled-components';

import { Notebook } from '../api';

const NotebookWrapper = styled.div`
  width: 100%;
  max-width: 360px;
`;

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
      <NotebookWrapper>
        <DataGrid
          list={this.state.notebooks}
          icon={<MenuBookRoundedIcon fontSize="small" />}
        />
      </NotebookWrapper>
    );
  }
}