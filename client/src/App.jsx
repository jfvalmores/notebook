import React, { Component } from 'react';
import DataGrid from './components/DataGrid';
import Utils from './utils/Utils';

import Notebook from './api/Notebook';

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
      <DataGrid list={this.state.notebooks} />
    );
  }
}

export default App;
