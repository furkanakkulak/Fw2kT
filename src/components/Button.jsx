import Image from 'next/image';
import React from 'react';

const Button = ({ onClick, isActive, label, icon, disabled }) => {
  const filterStyles = disabled
    ? 'filter invert-[95%] sepia-[4%] saturate-[132%] brightness-[92%] contrast-[92%]'
    : '';

  return (
    <button
      onClick={onClick}
      className={`btn ${isActive ? 'bg-primary' : ''}`}
      disabled={disabled}
    >
      <Image
        src={icon}
        width={24}
        height={24}
        alt={label}
        className={filterStyles}
      />
    </button>
  );
};

export default Button;
