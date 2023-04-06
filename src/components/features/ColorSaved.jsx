import React, { useContext } from 'react';
import { ColorsContext } from '../../pages/Colors';

const ColorSaved = () => {
  const { savedColors } = useContext(ColorsContext);

  return (
    <div className="color-saved">
      {savedColors &&
        savedColors.map((color) => {
          return (
            <div className="color-saved-wrapper" key={color.id}>
              <p className="color-saved-name">{color.name}</p>
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
