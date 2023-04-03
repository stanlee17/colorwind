import React, { useContext } from 'react';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { ThemeContext } from '../../App';
import ReactSwitch from 'react-switch';
import { Container } from 'react-bootstrap';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <Container>
        <div className="header-wrapper">
          <a href="/" className="header-logo">
            <Logo /> Colorwind
          </a>
          <div className="header-switch">
            <p>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
            <ReactSwitch
              onChange={toggleTheme}
              checked={theme === 'dark'}
            ></ReactSwitch>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
