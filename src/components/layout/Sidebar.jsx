import React from 'react';
import { ReactComponent as Logo } from '../../images/logo.svg';
// import { IoMenu } from 'react-icons/io5';

const Sidebar = () => {
  return (
    <header className="sidebar">
      <a href="/" className="sidebar__logo">
        <Logo />
      </a>
      <div className="sidebar__links">
        <a href="/" className="sidebar__link">
          Home
        </a>
        <a href="/generate-palette" className="sidebar__link">
          Generate Palette
        </a>
      </div>
    </header>
  );
};

export default Sidebar;
