import React, { Component } from 'react';
import {
  Box,
  Snackbar,
} from '@material-ui/core';

import Notebooks from './components/Notebooks';
import Sections from './components/Sections';
import Pages from './components/Pages';
import PageContent from './components/PageContent';
import Sidenav from './components/Sidenav';
import SignInModal from './components/SignInModal';
import { AppContext } from './AppContext';
import { Auth } from './api';


class App extends Component {
  state = {
    appTitle: 'Notebooks',
    user: '',
    showSignIn: false,
    notebook: '',
    section: '',
    page: '',
    title: '',
    content: '',
    notebooks: [],
    sections: [],
    pages: [],
    mode: 'VIEW',
  };

  auth = new Auth();

  updateState = (data) => {
    this.setState({ ...data });
  }

  showToast = (message) => {
    this.setState({
      openToast: true,
      toastMessage: message,
    });
  }

  handleLoginSuccess = (data) => {
    this.setState({ user: data.email, mode: 'EDIT' });
    this.showToast(`Welcome back, ${data.email}!`);
  }

  handleLogout = () => {
    this.auth.logout();
    this.setState({ user: '', mode: 'VIEW' });
    this.showToast('You have logged out.');
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
          user={this.state.user}
          title={this.state.appTitle}
          handleLogout={this.handleLogout}
          handleSignIn={() => this.setState({ showSignIn: true })}
          menu={
            <Notebooks
              reqPath=""
              mode={this.state.mode}
              sourceKey={this.state.notebookId} />
          }
        >
          <Box display="flex">
            {showSections &&
              <Sections
                mode={this.state.mode}
                sourceKey={this.state.section}
                reqPath={`${this.state.notebook}`} />
            }
            {showPages &&
              <Pages
                mode={this.state.mode}
                sourceKey={this.state.page}
                reqPath={`${this.state.notebook}/${this.state.section}`} />
            }
            {showEditor &&
              <PageContent
                mode={this.state.mode}
                content={this.state.content} />
            }
          </Box>
        </Sidenav>
        <SignInModal
          open={this.state.showSignIn}
          showToast={this.showToast}
          handleLoginSuccess={this.handleLoginSuccess}
          handleClose={() => this.setState({ showSignIn: false })}
        />
        <Snackbar
          autoHideDuration={5000}
          open={this.state.openToast}
          message={this.state.toastMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={() => this.setState({ openToast: false, toastMessage: '' })}
        />
      </AppContext.Provider>
    );
  }
}

export default App;
