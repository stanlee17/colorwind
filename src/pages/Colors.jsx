import { useQuery } from 'react-query';
import React, { useEffect, useContext, useCallback } from 'react';
import { ColorsContext } from '../App';
import axios from 'axios';
import { Container } from 'react-bootstrap';

// Utils
import { rgbToHex, colorInput } from '../utils/utils';

// Feature Components
import ColorGenerator from '../components/features/color/ColorGenerator';
import ColorSaved from '../components/features/color/ColorSaved';

// Common Components
import CardSkeleton from '../components/common/CardSkeleton';

// Services
import { apiBaseUrl } from '../services/apis';

const Colors = () => {
  // useContext: ColorsContext
  const { colors, setColors, savedColors, colorName } =
    useContext(ColorsContext);

  // UseQuery: Fetches 5 RGB colors
  const { isLoading, error, refetch } = useQuery({
    queryKey: ['colorData'],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    onSuccess: (data) => onSuccessFetch(data),
  });

  // Fetches data
  async function fetchData() {
    const { data } = await axios.post(
      '/api/',
      JSON.stringify({
        model: 'default',
        input: colorInput(colors),
      })
    );
    return data.result;
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

  if (isLoading)
    return (
      <Container>
        <CardSkeleton savedCards={savedColors.length} colorCards={5} />
      </Container>
    );

  if (error) return <div>`An error has occurred: ${error.message}`</div>;

  return (
    <div className="colors py-4">
      <Container>
        <ColorGenerator refetch={refetch} />
        <ColorSaved />
      </Container>
    </div>
  );
};

export default Colors;
