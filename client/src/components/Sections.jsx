import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Utils from '../utils/Utils';
import styled from 'styled-components';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';

const SectionWrapper = styled.div`
  width: 100%;
  max-width: 360px;
`;

export default class Sections extends Component {
  render() {
    return (
      <SectionWrapper>
        <DataGrid
          list={this.state.notebooks}
          icon={<CollectionsBookmarkRoundedIcon fontSize="small" />}
        />
      </SectionWrapper>
    );
  }
}