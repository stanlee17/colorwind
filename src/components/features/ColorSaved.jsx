import React, { useContext, Fragment } from 'react';
import { ColorsContext } from '../../App';

// Components
import ColorDelete from './ColorDelete';
import ColorEdit from './ColorEdit';

const ColorSaved = () => {
  // ColorsContext
  const { colors, setColors, savedColors } = useContext(ColorsContext);

  // FUNCTION: Select saved palette onClick
  const handleSaved = (id) => {
    const selectedPalette = savedColors.find((color) => color.id === id);

    setColors(
      colors.map((color, index) => {
        return {
          ...color,
          color: selectedPalette.colors[index].color,
          name: selectedPalette.colors[index].name,
        };
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
                <div
                  className="color-saved-colors"
                  onClick={() => handleSaved(color.id)}
                >
                  <div
                    className="color-saved-color"
                    style={{
                      backgroundColor: color.colors[0].color,
                      borderTopLeftRadius: '10px',
                      borderBottomLeftRadius: '10px',
                    }}
                  ></div>
                  <div
                    className="color-saved-color"
                    style={{
                      backgroundColor: color.colors[1].color,
                    }}
                  ></div>
                  <div
                    className="color-saved-color"
                    style={{
                      backgroundColor: color.colors[2].color,
                    }}
                  ></div>
                  <div
                    className="color-saved-color"
                    style={{
                      backgroundColor: color.colors[3].color,
                    }}
                  ></div>
                  <div
                    className="color-saved-color"
                    style={{
                      backgroundColor: color.colors[4].color,
                      borderTopRightRadius: '10px',
                      borderBottomRightRadius: '10px',
                    }}
                  ></div>
                </div>
                <div className="color-saved-content">
                  <p>{color.name}</p>
                  <div className="color-saved-options">
                    <ColorEdit id={color.id} />
                    <ColorDelete id={color.id} />
                  </div>
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
