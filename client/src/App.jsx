import React, { Component } from 'react';
import styled from 'styled-components';
import Notebooks from './components/Notebooks';
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
  };

  updateState = (data) => {
    this.setState({ ...data });
  }

  render() {
    return (
      <AppContext.Provider value={{ appState: this.state, updateState: this.updateState }}>
        <Wrapper>
          <Notebooks />
        </Wrapper>
      </AppContext.Provider>
    );
  }
}

export default App;
