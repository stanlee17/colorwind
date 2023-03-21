import { useQuery } from 'react-query';
import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

// Components
import ColorGenerator from '../components/features/ColorGenerator';
// import ColorList from '../components/features/ColorList';

const GeneratePalette = () => {
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
      }
    );
  }

  // Refetches data when Spacebar is pressed
  const handleSpacePress = useCallback(
    (e) => {
      if (e.key === ' ') {
        refetch();
      }
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
        <ColorGenerator data={data} refetch={refetch} />
        {/* <ColorList /> */}
      </Container>
    </div>
  );
};

export default GeneratePalette;
