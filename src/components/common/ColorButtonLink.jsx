import React from 'react';
import { Link } from 'react-router-dom';

const ColorButtonLink = ({ onClick, children, url }) => {
  return (
    <Link to={url} onClick={onClick} className="cw-btn">
      {children}
    </Link>
  );
};

export default ColorButtonLink;
