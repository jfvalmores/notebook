import BaseGrid from './BaseGrid';
import { Section, Page } from '../api';

export default class Sections extends BaseGrid {
  _title = 'Section';
  _attrName = 'sections';
  _mainIntf = new Section();
  _detailIntf = new Page();
  _hasCustomWrapper = true;

  getList = () => {
    if (String(this.context.appState.notebook) === '') return;

    this._mainIntf.view(`${this.props.reqPath}`, (data) => {
      this.context.updateState({ [this._attrName]: this.fn.getArrayFromObjectKey(data) });
    });
  }

  setSelected = (section) => {
    const { _id } = section;
    this.context.updateState({ section: _id });

    this._detailIntf.view(`${this.props.reqPath}/${_id}`, (data) => {
      this.context.updateState({
        section: _id,
        page: '',
        pages: this.fn.getArrayFromObjectKey(data)
      });
    });
  }

  doPostRemove = (id) => {
    this._detailIntf.remove(`${this.props.reqPath}/${id}`);
    this.cleanUp();
  }

  cleanUp = () => {
    this.context.updateState({
      section: '',
      page: '',
      pages: [],
      content: '',
    });
  }
}