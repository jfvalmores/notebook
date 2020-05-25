import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default class PageContent extends Component {
  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  }

  render() {
    console.log(process.env.REACT_APP_TINYMCE_KEY);
    return (
      <Editor
        initialValue="<p>Something, something...</p>"
        apiKey={process.env.REACT_APP_TINYMCE_KEY}
        init={{
          height: 500,
          menubar: false,
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