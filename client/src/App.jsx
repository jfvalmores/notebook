import React, { Component } from 'react';
import { Box } from '@material-ui/core';

import Notebooks from './components/Notebooks';
import Sections from './components/Sections';
import Pages from './components/Pages';
import PageContent from './components/PageContent';
import Sidenav from './components/Sidenav';
import SignInModal from './components/SignInModal';
import { AppContext } from './AppContext';

class App extends Component {
  state = {
    appTitle: 'Notebooks',
    showSignIn: false,
    notebook: '',
    section: '',
    page: '',
    title: '',
    content: '',
    notebooks: [],
    sections: [],
    pages: [],
    mode: 'EDIT',
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
        <Sidenav
          title={this.state.appTitle}
          handleSignIn={() => this.setState({ showSignIn: true })}
          menu={
            <Notebooks
              reqPath=""
              sourceKey={this.state.notebookId} />
          }
        >
          <Box display="flex">
            {showSections &&
              <Sections
                sourceKey={this.state.section}
                reqPath={`${this.state.notebook}`} />
            }
            {showPages &&
              <Pages
                sourceKey={this.state.page}
                reqPath={`${this.state.notebook}/${this.state.section}`} />
            }
            {showEditor &&
              <PageContent
                content={this.state.content} />
            }
          </Box>
        </Sidenav>
        <SignInModal
          open={this.state.showSignIn}
          handleClose={() => this.setState({ showSignIn: false })}
        />
      </AppContext.Provider>
    );
  }
}

export default App;
