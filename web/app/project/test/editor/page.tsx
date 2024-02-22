"use client"
import CodeMirror from '@uiw/react-codemirror';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import React, { useState, useEffect } from 'react';


const EditorComponent = ({  }) => {
  const [editorSize, setEditorSize] = useState({ width: 500, height: 200 });

  useEffect(() => {
    const handleResize = (entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setEditorSize({ width, height });
      }
    };

    const observer = new ResizeObserver(handleResize);
    const editorContainer = document.getElementById('editor-container');
    if (editorContainer) {
      observer.observe(editorContainer);
    }

    return () => observer && observer.disconnect();
  }, []);

  return (
    <div
      id="editor-container"
      className="relative resize overflow-hidden rounded-lg shadow-lg"
      style={{ width: editorSize.width + 'px', height: editorSize.height + 'px', resize: 'both' }}
    >
      <CodeMirror
        value={`//console.log('hello world!');`}
        theme={sublime}
        extensions={[javascript({ jsx: true })]}
        onChange={(value, viewUpdate) => {
          console.log('value:', value);
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default EditorComponent;