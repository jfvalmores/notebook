import React, { Component } from 'react';
import { Box } from '@material-ui/core';

import Sections from './components/Sections';
import Pages from './components/Pages';
import PageContent from './components/PageContent';
import Sidenav from './components/Sidenav';
import { AppContext } from './AppContext';

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
        <Sidenav>
          <Box display="flex">
            <Sections />
            <Pages />
            <PageContent />
          </Box>
        </Sidenav>
      </AppContext.Provider>
    );
  }
}

export default App;
