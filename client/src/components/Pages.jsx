import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Utils from '../utils/Utils';
import styled from 'styled-components';
import BookRoundedIcon from '@material-ui/icons/BookRounded';
import { AppContext } from '../AppContext';

const PageWrapper = styled.div`
  width: 100%;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  max-width: 240px;
`;

export default class Pages extends Component {
  static contextType = AppContext;

  constructor() {
    super();
    this.fn = new Utils();
  }

  setSelected = (page) => {
    const { _id } = page;
    this.context.updateState({ page: _id });
  }

  render() {
    return (
      <PageWrapper>
        <DataGrid
          noWrapper
          list={this.context.appState.pages}
          onClick={this.setSelected}
          icon={<BookRoundedIcon fontSize="small" />}
        />
      </PageWrapper>
    );
  }
}