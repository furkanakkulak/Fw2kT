import React from 'react';
import Button from './Button';
import boldIcon from '@/assets/icons/bold.svg';
import italicIcon from '@/assets/icons/italic.svg';
import underlineIcon from '@/assets/icons/underline.svg';
import alignLeftIcon from '@/assets/icons/alignleft.svg';
import alignCenterIcon from '@/assets/icons/aligncenter.svg';
import alignRightIcon from '@/assets/icons/alignright.svg';
import alignJustifyIcon from '@/assets/icons/alignjustify.svg';
import numberedlistIcon from '@/assets/icons/numberedlist.svg';
import bulletedlistIcon from '@/assets/icons/bulletedlist.svg';
import undoIcon from '@/assets/icons/undo.svg';
import redoIcon from '@/assets/icons/redo.svg';
import arrows from '@/assets/icons/arrows.svg';
import Image from 'next/image';

const Toolbar = ({
  onButtonClick,
  styleStates,
  fontSizeRef,
  currentFontSize,
  onFontSizeChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  const fontSizeOptions = [
    { value: '1', label: '9 pt' },
    { value: '2', label: '10 pt' },
    { value: '3', label: '13 pt' },
    { value: '4', label: '16 pt' },
    { value: '5', label: '18 pt' },
    { value: '6', label: '24 pt' },
    { value: '7', label: '32 pt' },
  ];

  return (
    <div className="toolbar">
      <Button
        onClick={() => onButtonClick('bold')}
        isActive={styleStates.bold}
        label="Bold"
        icon={boldIcon}
      />
      <Button
        onClick={() => onButtonClick('italic')}
        isActive={styleStates.italic}
        label="Italic"
        icon={italicIcon}
      />
      <Button
        onClick={() => onButtonClick('underline')}
        isActive={styleStates.underline}
        label="Underline"
        icon={underlineIcon}
      />
      <Button
        onClick={() => onButtonClick('justifyLeft')}
        isActive={styleStates.justifyLeft}
        label="Align Left"
        icon={alignLeftIcon}
      />
      <Button
        onClick={() => onButtonClick('justifyCenter')}
        isActive={styleStates.justifyCenter}
        label="Align Center"
        icon={alignCenterIcon}
      />
      <Button
        onClick={() => onButtonClick('justifyRight')}
        isActive={styleStates.justifyRight}
        label="Align Right"
        icon={alignRightIcon}
      />
      <Button
        onClick={() => onButtonClick('justifyFull')}
        isActive={styleStates.justifyFull}
        label="Justify"
        icon={alignJustifyIcon}
      />
      <Button
        onClick={() => onButtonClick('insertUnorderedList')}
        isActive={styleStates.insertUnorderedList}
        label="Bulleted List"
        icon={bulletedlistIcon}
      />
      <Button
        onClick={() => onButtonClick('insertOrderedList')}
        isActive={styleStates.insertOrderedList}
        label="Numbered List"
        icon={numberedlistIcon}
      />

      <label className="btn-font">
        <select
          onChange={onFontSizeChange}
          ref={fontSizeRef}
          value={currentFontSize}
        >
          {fontSizeOptions.map((x) => (
            <option
              key={x.value}
              value={x.value}
            >
              {x.label}
            </option>
          ))}
        </select>
        <Image
          src={arrows}
          width={24}
          height={24}
          alt="font size"
          className="ml-auto mr-0"
        />
      </label>

      <Button
        onClick={onUndo}
        label="Undo"
        icon={undoIcon}
        disabled={!canUndo}
      />
      <Button
        onClick={onRedo}
        label="Redo"
        icon={redoIcon}
        disabled={!canRedo}
      />
    </div>
  );
};

export default Toolbar;
