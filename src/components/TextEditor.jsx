import React from 'react';

const TextEditor = ({ editorRef }) => {
  return (
    <div
      ref={editorRef}
      contentEditable
      className="text-area"
    />
  );
};

export default TextEditor;
