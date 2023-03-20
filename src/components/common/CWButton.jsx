import React from 'react';

const CWButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="cw-btn">
      {children}
    </button>
  );
};

export default CWButton;
