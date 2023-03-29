import React, { useContext } from 'react';
import ReactSwitch from 'react-switch';
import { ThemeContext } from '../../App';

const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className="footer">
      <div className="footer__switch">
        <p>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
        <ReactSwitch
          onChange={toggleTheme}
          checked={theme === 'dark'}
        ></ReactSwitch>
      </div>
      <p>© Colorwind by Yves Koesumo</p>
    </footer>
  );
};

export default Footer;
