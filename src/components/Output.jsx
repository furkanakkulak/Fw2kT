import React from 'react';

const Output = ({ content }) => {
  return (
    <div className="output bg-gray-200 p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Output</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Output;
