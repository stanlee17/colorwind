import React from 'react';
import CWButtonLink from '../components/common/CWButtonLink';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="home">
      <Container>
        <h1>Explore our fast color palette generator & more!</h1>
        <p>
          Our color generator uses machine learning. It can generate matching
          color palettes for your projects and can also learn color styles from
          photographs, movies, and popular arts.
        </p>
        <CWButtonLink url="/generate-palette">Color Generator</CWButtonLink>
      </Container>
    </div>
  );
};

export default Home;
