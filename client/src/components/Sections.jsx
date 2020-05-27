import React from 'react';
import BaseGrid from './BaseGrid';
import { Section, Page } from '../api';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';


export default class Sections extends BaseGrid {

  constructor(props) {
    super(props);

    this._title = 'Section';
    this._attrName = 'sections';
    this._mainIntf = new Section();
    this._detailIntf = new Page();
    this._hasCustomWrapper = true;
    this._icon = <CollectionsBookmarkRoundedIcon fontSize="small" />;
  }

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
      if (this.context.appState.section === _id) return;

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