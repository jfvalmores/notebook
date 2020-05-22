import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';

import Notebooks from './components/Notebooks';
import Sections from './components/Sections';
import Pages from './components/Pages';
import { AppContext } from './AppContext';

const Wrapper = styled.div`
  color: #37474f !important;
  padding: 10px;
`;

class App extends Component {
  state = {
    notebook: '',
    section: '',
    page: '',
    notebooks: [],
    sections: [],
    pages: [],
  };

  updateState = (data) => {
    this.setState({ ...data });
  }

  render() {
    return (
      <AppContext.Provider value={{
        appState: this.state,
        updateState: this.updateState
      }}>
        <Wrapper>
          <Box display="flex">
            <Notebooks />
            <Sections />
            <Pages />
          </Box>
        </Wrapper>
      </AppContext.Provider>
    );
  }
}

export default App;
