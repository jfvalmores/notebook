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
    title: '',
    content: '',
    notebooks: [],
    sections: [],
    pages: [],
  };

  updateState = (data) => {
    this.setState({ ...data });
  }

  render() {
    const showSections = Boolean(this.state.notebook);
    const showPages = Boolean(this.state.notebook && this.state.section);
    const showEditor = Boolean(this.state.notebook && this.state.section && this.state.page);

    return (
      <AppContext.Provider value={{
        appState: this.state,
        updateState: this.updateState
      }}>
        <Sidenav>
          <Box display="flex">
            {showSections &&
              <Sections reqPath={`${this.state.notebook}`} />
            }
            {showPages &&
              <Pages reqPath={`${this.state.notebook}/${this.state.section}`} />
            }
            {showEditor &&
              <PageContent />
            }
          </Box>
        </Sidenav>
      </AppContext.Provider>
    );
  }
}

export default App;
