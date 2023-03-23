import { useQuery } from 'react-query';
import React, { useEffect, useCallback, createContext, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { rgbToHex } from '../utils/utils';

// Components
import ColorGenerator from '../components/features/ColorGenerator';

export const ColorsContext = createContext();

const GeneratePalette = () => {
  const [colors, setColors] = useState([
    { id: 1, color: '', isLocked: false },
    { id: 2, color: '', isLocked: false },
    { id: 3, color: '', isLocked: false },
    { id: 4, color: '', isLocked: false },
    { id: 5, color: '', isLocked: false },
  ]);
  const { isLoading, error, data, refetch } = useColor();

  function useColor() {
    return useQuery(
      'colorData',
      async () => {
        const { data } = await axios.post(
          'http://colormind.io/api/',
          JSON.stringify({ model: 'default' })
        );
        return data.result;
      },
      {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
          let hexColors = [];
          data.map((item) => {
            hexColors.push(rgbToHex(item[0], item[1], item[2]));
            return hexColors;
          });

          setColors(
            colors.map((color, index) => {
              return { ...color, color: hexColors[index] };
            })
          );
        },
      }
    );
  }

  // Refetches data when Spacebar is pressed
  const handleSpacePress = useCallback(
    (e) => {
      if (e.key === ' ') refetch();
    },
    [refetch]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleSpacePress);
    return () => {
      document.removeEventListener('keydown', handleSpacePress);
    };
  }, [handleSpacePress]);

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="generate-palette py-5">
      <Container>
        <ColorsContext.Provider value={{ colors, setColors }}>
          <ColorGenerator refetch={refetch} data={data} />
        </ColorsContext.Provider>
      </Container>
    </div>
  );
};

export default GeneratePalette;
