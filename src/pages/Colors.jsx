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

const Colors = () => {
  // Initial States
  const [colors, setColors] = useState([
    { id: 1, color: '', isLocked: false },
    { id: 2, color: '', isLocked: false },
    { id: 3, color: '', isLocked: false },
    { id: 4, color: '', isLocked: false },
    { id: 5, color: '', isLocked: false },
  ]);

  const [savedColors, setSavedColors] = useState(() => {
    const saved = localStorage.getItem('savedColors');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

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
    data.map((rgb) => {
      hexColors.push(rgbToHex(rgb[0], rgb[1], rgb[2]));
      return hexColors;
    });

    // Store hex colors to colors array object color state & check for locked colors
    setColors(
      colors.map((color, index) => {
        if (color.isLocked) {
          return Object.freeze(color);
        } else {
          return { ...color, color: hexColors[index] };
        }
      })
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
    localStorage.setItem('savedColors', JSON.stringify(savedColors));

    document.addEventListener('keydown', handleSpacePress);
    return () => {
      document.removeEventListener('keydown', handleSpacePress);
    };
  }, [handleSpacePress, savedColors]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>`An error has occurred: ${error.message}`</div>;

  return (
    <div className="colors py-5">
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

export default Colors;
