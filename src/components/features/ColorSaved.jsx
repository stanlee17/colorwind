import React, { useContext } from 'react';
import { ColorsContext } from '../../pages/Colors';
import { FaTrash } from 'react-icons/fa';

const ColorSaved = () => {
  const { colors, setColors, savedColors } = useContext(ColorsContext);

  const handlePalette = (id) => {
    const selectedPalette = savedColors.find((color) => color.id === id);
    let allColors = selectedPalette.colors;
    setColors(
      colors.map((color, index) => {
        return { ...color, color: allColors[index] };
      })
    );
  };

  return (
    <div className="color-saved">
      {savedColors &&
        savedColors.map((color) => {
          return (
            <div
              className="color-saved-wrapper"
              key={color.id}
              onClick={() => handlePalette(color.id)}
            >
              <div className="color-saved-content">
                <p className="color-saved-name">{color.name}</p>
                <FaTrash />
              </div>
              <div className="color-saved-colors">
                <div
                  className="color-saved-color"
                  style={{
                    backgroundColor: color.colors[0],
                  }}
                ></div>
                <div
                  className="color-saved-color"
                  style={{
                    backgroundColor: color.colors[1],
                  }}
                ></div>
                <div
                  className="color-saved-color"
                  style={{
                    backgroundColor: color.colors[2],
                  }}
                ></div>
                <div
                  className="color-saved-color"
                  style={{
                    backgroundColor: color.colors[3],
                  }}
                ></div>
                <div
                  className="color-saved-color"
                  style={{
                    backgroundColor: color.colors[4],
                  }}
                ></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ColorSaved;
