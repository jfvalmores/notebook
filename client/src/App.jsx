import React, { Component } from 'react';
import styled from 'styled-components';
import Notebooks from './components/Notebooks';

const Wrapper = styled.div`
  color: #37474f !important;
  margin: 10px;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Notebooks />
      </Wrapper>
    );
  }
}

export default App;
