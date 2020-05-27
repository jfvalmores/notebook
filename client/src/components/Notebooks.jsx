import BaseGrid from './BaseGrid';
import { Notebook, Section, Page } from '../api';


export default class Notebooks extends BaseGrid {

  constructor(props) {
    super(props);

    this._title = 'Notebook';
    this._attrName = 'notebooks';
    this._mainIntf = new Notebook();
    this._detailIntf = new Section();
    this._subDetailIntf = new Page();
  }

  setSelected = (notebook) => {
    const { _id } = notebook;

    this._detailIntf.view(`${_id}`, (data) => {
      if (this.context.appState.notebook === _id) return;

      this.context.updateState({
        notebook: _id,
        section: '',
        sections: this.fn.getArrayFromObjectKey(data),
        page: '',
        pages: [],
      });
    });
  }

  doPostRemove = (id) => {
    this._detailIntf.remove(`${this.props.reqPath}/${id}`);
    this._subDetailIntf.remove(`${this.props.reqPath}/${id}`);
    this.cleanUp();
  }

  cleanUp = () => {
    this.context.updateState({
      notebook: '',
      section: '',
      sections: [],
      page: '',
      pages: [],
      content: '',
    });
  }
}