import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';

export default class RichTextEditor extends Component {
  static propTypes = {
    detail: PropTypes.string.isRequired
  };
  constructor(prop) {
    super(prop);

    const blocksFromHtml = htmlToDraft(this.props.detail);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);

    this.state = {
      // editorState: EditorState.createEmpty(),
      editorState
    }

  }


  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return <div>
      <Editor
        editorState={editorState}
        editorClassName="editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    </div>
  }
}

