import { useQuery } from 'react-query';
import React, { useEffect, useCallback, createContext, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

// Components
import ColorGenerator from '../components/features/ColorGenerator';

export const ColorsContext = createContext();

const GeneratePalette = () => {
  const [colors, setColors] = useState([]);
  const { isLoading, error, refetch } = useColor();

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
        onSuccess: setColors,
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
          <ColorGenerator refetch={refetch} />
        </ColorsContext.Provider>
      </Container>
    </div>
  );
};

export default GeneratePalette;
