import { useQuery } from 'react-query';
import React, { useEffect, useCallback, createContext, useState } from 'react';
import namer from 'color-namer';
import axios from 'axios';
import { Container } from 'react-bootstrap';

// Utils
import { rgbToHex, colorInput } from '../utils/utils';

// Components
import ColorGenerator from '../components/features/ColorGenerator';
import ColorSaved from '../components/features/ColorSaved';

// Services
import { apiBaseUrl } from '../services/apis';

// CREATE CONTEXT: ColorsContext
export const ColorsContext = createContext();

const Colors = () => {
  // INITIAL: Colors state
  const [colors, setColors] = useState([
    { id: 1, color: '', isLocked: false, name: '' },
    { id: 2, color: '', isLocked: false, name: '' },
    { id: 3, color: '', isLocked: false, name: '' },
    { id: 4, color: '', isLocked: false, name: '' },
    { id: 5, color: '', isLocked: false, name: '' },
  ]);

  // INITIAL: Saved colors state
  const [savedColors, setSavedColors] = useState(() => {
    const saved = localStorage.getItem('savedColors');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  // USEQUERY: Fetches 5 RGB colors
  const { isLoading, error, refetch } = useQuery({
    queryKey: ['colorData'],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    onSuccess: (data) => onSuccessFetch(data),
  });

  // FUNCTION: Fetches data
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

  function colorName(color) {
    return namer(color, { pick: ['ntc'] }).ntc[0].name;
  }

  // OnSuccess fetch
  function onSuccessFetch(data) {
    // Convert from RGB to HEX Colors
    let hexColors = [];
    data.map((rgb) => {
      hexColors.push(rgbToHex(rgb[0], rgb[1], rgb[2]));
      return hexColors;
    });

    // Get color names from color-namer
    const colorNames = [];
    hexColors.map((hex) => {
      colorNames.push(colorName(hex));
      return hexColors;
    });

    // Store converted hex colors to colors state & check for any locked colors
    setColors(
      colors.map((color, index) => {
        if (color.isLocked) {
          return Object.freeze(color);
        } else {
          return { ...color, color: hexColors[index], name: colorNames[index] };
        }
      })
    );
  }

  // Refetches data on "spacebar"
  const handleSpacePress = useCallback(
    (e) => {
      // Prevents refetching on input target
      if (e.target instanceof HTMLInputElement) {
        return;
      } else if (e.key === ' ') refetch();
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
    <div className="colors py-4">
      <Container>
        <ColorsContext.Provider
          value={{ colors, setColors, savedColors, setSavedColors, colorName }}
        >
          <ColorGenerator refetch={refetch} />
          <ColorSaved />
        </ColorsContext.Provider>
      </Container>
    </div>
  );
};

export default Colors;
