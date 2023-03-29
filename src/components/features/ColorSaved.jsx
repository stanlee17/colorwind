import React, { useContext } from 'react';
import { ColorsContext } from '../../pages/GeneratePalette';

const ColorSaved = () => {
  const { savedColors } = useContext(ColorsContext);
  console.log(savedColors);

  return (
    <div className="colorsaved">
      {savedColors &&
        savedColors.map((color) => {
          return (
            <div className="colorsaved__wrapper" key={color.id}>
              <p className="colorsaved__name">{color.name}</p>
              <div className="colorsaved__colors">
                <div
                  className="colorsaved__color"
                  style={{
                    backgroundColor: color.colors[0],
                  }}
                ></div>
                <div
                  className="colorsaved__color"
                  style={{
                    backgroundColor: color.colors[1],
                  }}
                ></div>
                <div
                  className="colorsaved__color"
                  style={{
                    backgroundColor: color.colors[2],
                  }}
                ></div>
                <div
                  className="colorsaved__color"
                  style={{
                    backgroundColor: color.colors[3],
                  }}
                ></div>
                <div
                  className="colorsaved__color"
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
