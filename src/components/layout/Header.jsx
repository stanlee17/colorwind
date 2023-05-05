import React, { useContext } from 'react';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { ThemeContext } from '../../App';
import { Container } from 'react-bootstrap';

// Icons
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <Container>
        <div className="header-wrapper">
          <a href="/" className="header-logo">
            <Logo /> Colorwind
          </a>
          <div className="header-theme">
            <div className="header-switch" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <RiMoonLine size={25} />
              ) : (
                <RiSunLine size={25} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
