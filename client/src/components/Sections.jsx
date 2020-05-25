import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Utils from '../utils/Utils';
import styled from 'styled-components';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import { AppContext } from '../AppContext';

import { Page } from '../api';

const SectionWrapper = styled.div`
  width: 100%;
  max-height: calc(100vh - 25px);
  overflow-y: auto;
  max-width: 240px;
`;

export default class Sections extends Component {
  static contextType = AppContext;

  constructor() {
    super();
    this.fn = new Utils();
  }

  setSelected = (section) => {
    const { _id } = section;
    this.context.updateState({ section: _id });

    const page = new Page();
    page.view(`/${this.context.appState.notebook}/${_id}`, (data) => {
      this.context.updateState({ pages: this.fn.getArrayFromObjectKey(data) });
    });
  }

  render() {
    return (
      <SectionWrapper>
        <DataGrid
          noWrapper
          list={this.context.appState.sections}
          onClick={this.setSelected}
          icon={<CollectionsBookmarkRoundedIcon fontSize="small" />}
        />
      </SectionWrapper>
    );
  }
}