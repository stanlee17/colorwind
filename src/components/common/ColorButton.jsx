import React from 'react';

const ColorButton = ({ onClick, children, className, secondary, icon }) => {
  return (
    <button
      onClick={onClick}
      className={
        secondary
          ? `color-btn-secondary ${className}`
          : `color-btn ${className}`
      }
    >
      {icon} {children}
    </button>
  );
};

export default ColorButton;
