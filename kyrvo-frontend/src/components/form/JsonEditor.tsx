import React, { Component, RefObject } from 'react';
import isEqual from 'lodash/isEqual';

import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

// Author : Rakesh Rai,
interface JSONEditorReactProps extends JSONEditorOptions {
  json?: any;
  text?: string;
}

export default class JSONEditorReact extends Component<JSONEditorReactProps> {
  containerRef: RefObject<HTMLDivElement>;
  jsoneditor: JSONEditor | null;

  constructor(props: JSONEditorReactProps) {
    super(props);
    this.containerRef = React.createRef();
    this.jsoneditor = null;
  }

  componentDidMount() {
    const { json, text, ...options } = this.props;
    this.jsoneditor = new JSONEditor(this.containerRef.current!, options);

    if (json) {
      this.jsoneditor.set(json);
    }
    if (text) {
      this.jsoneditor.setText(text);
    }
  }

  componentDidUpdate(prevProps: JSONEditorReactProps) {
    const { json, text, mode } = this.props;

    if (json && !isEqual(json, prevProps.json)) {
      this.jsoneditor?.update(json);
    }

    if (text && text !== prevProps.text) {
      this.jsoneditor?.updateText(text);
    }

    if (mode && mode !== prevProps.mode) {
      this.jsoneditor?.setMode(mode);
    }
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  render() {
    return (
      <div className="jsoneditor-react-container" ref={this.containerRef} />
    );
  }
}
