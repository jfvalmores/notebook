import React from 'react';
import BaseGrid from './BaseGrid';
import { Page } from '../api';
import BookRoundedIcon from '@material-ui/icons/BookRounded';


export default class Pages extends BaseGrid {

  constructor(props) {
    super(props);

    this._title = 'Page';
    this._attrName = 'pages';
    this._mainIntf = new Page();
    this._hasCustomWrapper = true;
    this._icon = <BookRoundedIcon fontSize="small" />;
  }

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
        page: _id,
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