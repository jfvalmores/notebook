import React, { Component } from 'react';
import styled from 'styled-components';
import DataGrid from './components/DataGrid';
import Utils from './utils/Utils';

import { Notebook } from './api';

const Wrapper = styled.div`
  color: #37474f !important;
`;

class App extends Component {
  constructor() {
    super();
    this.fn = new Utils();
    this.state = {
      notebooks: []
    };
  }

  componentDidMount() {
    const notebook = new Notebook();
    notebook.view((data) => {
      this.setState({ notebooks: this.fn.getArrayFromObjectKey(data) });
    });
  }

  render() {
    return (
      <Wrapper>
        <DataGrid list={this.state.notebooks} />
      </Wrapper>
    );
  }
}

export default App;
