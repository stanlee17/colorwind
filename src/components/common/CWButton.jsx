import React from 'react';

const CWButton = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={`cw-btn ${className}`}>
      {children}
    </button>
  );
};

export default CWButton;
