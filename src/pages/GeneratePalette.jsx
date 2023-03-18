import { useQuery } from 'react-query';
import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

// Components
import CWButton from '../components/common/CWButton';

// Utils
import { convertToRGB } from '../utils/utils';

const GeneratePalette = () => {
  const { isLoading, error, data } = useColor();

  function useColor() {
    return useQuery('colorData', async () => {
      const { data } = await axios.post(
        'http://colormind.io/api/',
        JSON.stringify({ model: 'default' })
      );
      return data;
    });
  }

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="generate-palette py-5">
      <Container>
        <h1 className="generate-palette__heading">Color Generator</h1>
        <p className="generate-palette__paragraph">
          Press <b>spacebar</b> or click the <b>generate</b> button in order to
          generate new color palettes
        </p>
        <div className="generate-palette__colors py-4">
          {data.result.map((color, index) => {
            return (
              <div
                key={index}
                className="generate-palette__color"
                style={{ backgroundColor: convertToRGB(color) }}
              ></div>
            );
          })}
        </div>
        <CWButton>Generate</CWButton>
      </Container>
    </div>
  );
};

export default GeneratePalette;
