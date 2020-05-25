import BaseGrid from './BaseGrid';
import { Page } from '../api';

export default class Pages extends BaseGrid {
  _title = 'Page';
  _attrName = 'pages';
  _mainIntf = new Page();
  _hasCustomWrapper = true;

  getList = () => {
    if (String(this.context.appState.section) === '') return;

    this._mainIntf.view(`${this.props.reqPath}`, (data) => {
      this.context.updateState({ [this._attrName]: this.fn.getArrayFromObjectKey(data) });
    });
  }

  setSelected = (page) => {
    const { _id } = page;
    this.context.updateState({ page: _id });

    this._mainIntf.view(`${this.props.reqPath}/${_id}`, (data) => {
      if (!data) return;

      this.context.updateState({
        title: data.title,
        content: data.content || '',
      });
    });
  }

  cleanUp = () => {
    this.context.updateState({
      page: '',
      content: '',
    });
  }
}