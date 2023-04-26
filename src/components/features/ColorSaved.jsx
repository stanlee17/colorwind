import React, { useContext, Fragment } from 'react';
import { ColorsContext } from '../../pages/Colors';

// Components
import ColorDelete from './ColorDelete';

const ColorSaved = () => {
  // ColorsContext
  const { colors, setColors, savedColors } = useContext(ColorsContext);

  // FUNCTION: Select saved palette onClick
  const handleSaved = (id) => {
    const selectedPalette = savedColors.find((color) => color.id === id);

    setColors(
      colors.map((color, index) => {
        return { ...color, color: selectedPalette.colors[index] };
      })
    );
  };

  return (
    <Fragment>
      <h3 className="color-saved-heading">Library</h3>
      <div className="color-saved">
        {savedColors.length ? (
          savedColors.map((color) => {
            return (
              <div className="color-saved-wrapper" key={color.id}>
                <div className="color-saved-content">
                  <p className="color-saved-name">{color.name}</p>
                  <ColorDelete id={color.id} />
                </div>
                <div
                  className="color-saved-colors"
                  onClick={() => handleSaved(color.id)}
                >
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
          })
        ) : (
          <div className="color-saved-empty">
            Your saved palettes will appear here.
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ColorSaved;
