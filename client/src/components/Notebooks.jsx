import BaseGrid from './BaseGrid';
import { Notebook, Section, Page } from '../api';

export default class Notebooks extends BaseGrid {
  _title = 'Notebook';
  _attrName = 'notebooks';
  _mainIntf = new Notebook();
  _detailIntf = new Section();
  _subDetailIntf = new Page();

  constructor() {
    super();
  }

  setSelected = (notebook) => {
    const { _id } = notebook;

    this._detailIntf.view(`${_id}`, (data) => {
      this.context.updateState({
        notebook: _id,
        section: '',
        sections: this.fn.getArrayFromObjectKey(data), pages: [],
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
    });
  }
}