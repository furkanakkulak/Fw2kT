import React, { useEffect, useRef, useState } from 'react';
import TextEditor from './TextEditor';
import Toolbar from './Toolbar';

const Editor = () => {
  const editorRef = useRef(null);
  const fontSizeRef = useRef(null);
  const [currentFontSize, setCurrentFontSize] = useState('4'); // varsayılan font boyutu
  const [styleStates, setStyleStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
    orderedList: false,
    unorderedList: false,
  });

  //seçili yazının özelliklerini alıp state'e atıyor bu sayede butonların durumunu güncelliyor
  useEffect(() => {
    const currentSize = document.queryCommandValue('fontSize');
    if (currentSize) {
      setCurrentFontSize(currentSize);
    }

    const stylesToUpdate = [
      'bold',
      'italic',
      'underline',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'insertOrderedList',
      'insertUnorderedList',
    ];

    const updatedStates = {};
    stylesToUpdate.forEach((command) => {
      updatedStates[command] = command.includes('justify')
        ? document.queryCommandState(command)
        : document.queryCommandState(command);
    });

    setStyleStates((prev) => ({ ...prev, ...updatedStates }));

    const handleSelectionChange = () => {
      stylesToUpdate.forEach((command) => {
        updatedStates[command] = command.includes('justify')
          ? document.queryCommandState(command)
          : document.queryCommandState(command);
      });
      setStyleStates((prev) => ({ ...prev, ...updatedStates }));

      const selectedFontSize = document.queryCommandValue('fontSize');
      if (selectedFontSize) {
        setCurrentFontSize(selectedFontSize);
      }

      adjustListItemsFontSize();
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const adjustListItemsFontSize = () => {
    const lists = editorRef.current.querySelectorAll('ol, ul');
    lists.forEach((list) => {
      const listItems = list.querySelectorAll('li');
      listItems.forEach((listItem) => {
        const font = listItem.querySelector('font');
        if (font) {
          const computedStyle = window.getComputedStyle(font);
          const fontSize = computedStyle.getPropertyValue('font-size');
          listItem.style.fontSize = fontSize;
        }
      });
    });
  }; // liste marklarının font boyutunu ayarlar

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateStyleState(command);
  };

  const updateStyleState = (command) => {
    setStyleStates((prev) => ({ ...prev, [command]: !prev[command] }));
  };

  const handleFontSizeChange = () => {
    const selectedFontSize = fontSizeRef.current.value;
    document.execCommand('fontSize', false, selectedFontSize);
    editorRef.current.focus();
    setCurrentFontSize(selectedFontSize);
  };

  const handleUndo = () => {
    document.execCommand('undo');
  };

  const handleRedo = () => {
    document.execCommand('redo');
  };

  const canUndo = () => {
    if (typeof window !== 'undefined') {
      return document.queryCommandEnabled('undo');
    }
    return false;
  };

  const canRedo = () => {
    if (typeof window !== 'undefined') {
      return document.queryCommandEnabled('redo');
    }
    return false;
  };
  return (
    <div className="card">
      <h1 className="title">Text Editor</h1>
      <div className="editor">
        <Toolbar
          onButtonClick={executeCommand}
          styleStates={styleStates}
          fontSizeRef={fontSizeRef}
          currentFontSize={currentFontSize}
          onFontSizeChange={handleFontSizeChange}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={canUndo()}
          canRedo={canRedo()}
        />
        <TextEditor editorRef={editorRef} />
      </div>
      <button className="send-button">Send</button>
    </div>
  );
};

export default Editor;
