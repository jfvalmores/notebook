import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { AppContext } from '../AppContext';
import { Page } from '../api';

export default class PageContent extends Component {
  static contextType = AppContext;
  _mainIntf = new Page();
  _saveDelay = 500;
  _saveTimeout = null;

  handleEditorChange = (content, editor) => {
    if (this._saveTimeout) clearTimeout(this._saveTimeout);

    this._saveTimeout = setTimeout(() => {
      console.log('Content was updated:', content);
      this.handleUpdate({
        content
      });
    }, this._saveDelay);
  }

  handleUpdate = (data) => {
    const { notebook, section, page } = this.context.appState;
    const updateData = {
      title: this.context.appState.title,
      content: data.content
    };

    this._mainIntf.update(`${notebook}/${section}/${page}`, updateData);
  }

  render() {
    return (
      <Editor
        initialValue={this.context.appState.content}
        apiKey={process.env.REACT_APP_TINYMCE_KEY}
        init={{
          selector: 'textarea',
          height: 500,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: `
            undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help`
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}