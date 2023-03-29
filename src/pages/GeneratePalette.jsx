import { useQuery } from 'react-query';
import React, { useEffect, useCallback, createContext, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { rgbToHex, colorInput } from '../utils/utils';

// Components
import ColorGenerator from '../components/features/ColorGenerator';
import ColorSaved from '../components/features/ColorSaved';

// Services
import { apiBaseUrl } from '../services/apis';

export const ColorsContext = createContext();

const GeneratePalette = () => {
  // Initial States
  const [colors, setColors] = useState([
    { id: 1, color: '', isLocked: false },
    { id: 2, color: '', isLocked: false },
    { id: 3, color: '', isLocked: false },
    { id: 4, color: '', isLocked: false },
    { id: 5, color: '', isLocked: false },
  ]);
  const [savedColors, setSavedColors] = useState([]);

  // useQuery
  const { isLoading, error, refetch } = useQuery({
    queryKey: ['colorData'],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    onSuccess: (data) => onSuccessFetch(data),
  });

  async function fetchData() {
    const { data } = await axios.post(
      apiBaseUrl,
      JSON.stringify({
        model: 'default',
        input: colorInput(colors),
      })
    );
    return data.result;
  }

  // This code runs when data is finished fetching successfully
  function onSuccessFetch(data) {
    // Convert api data from rgb to hex colors
    let hexColors = [];
    data.map((item) => {
      hexColors.push(rgbToHex(item[0], item[1], item[2]));
      return hexColors;
    });
    // Store hex colors to colors array object color state
    setColors(
      colors.map((color, index) => {
        return { ...color, color: hexColors[index] };
      })
    );
  }

  const handleSpacePress = useCallback(
    (e) => {
      if (e.key === ' ') refetch();
    },
    [refetch]
  );

  // Refetches data when Spacebar is pressed
  useEffect(() => {
    document.addEventListener('keydown', handleSpacePress);
    return () => {
      document.removeEventListener('keydown', handleSpacePress);
    };
  }, [handleSpacePress, savedColors]);

  if (isLoading) return <div style={{ minHeight: '100vh' }}>Loading...</div>;
  if (error)
    return (
      <div style={{ minHeight: '100vh' }}>
        `An error has occurred: ${error.message}`
      </div>
    );

  return (
    <div className="generate-palette py-5">
      <Container>
        <ColorsContext.Provider
          value={{ colors, setColors, savedColors, setSavedColors }}
        >
          <ColorGenerator refetch={refetch} />
          <ColorSaved />
        </ColorsContext.Provider>
      </Container>
    </div>
  );
};

export default GeneratePalette;
