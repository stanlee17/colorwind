import React, { useState, Fragment, useContext } from 'react';
import { SketchPicker } from 'react-color';
import { RiSettings3Fill } from 'react-icons/ri';

import { ColorsContext } from '../../pages/GeneratePalette';

const ColorPicker = ({ hex, index }) => {
  const { colors, setColors } = useContext(ColorsContext);

  const [color, setColor] = useState(hex);
  const [display, setDisplay] = useState(false);

  const handleClick = () => {
    setDisplay(!display);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  const handleColorPicker = (color) => {
    let rgb = [color.rgb.r, color.rgb.g, color.rgb.b];
    let items = [...colors];
    items[index] = rgb;

    setColors(items);
    setColor(color.hex);
  };

  return (
    <Fragment>
      <div onClick={() => handleClick()}>
        <RiSettings3Fill />
      </div>

      {display && (
        <div className="color-picker">
          <div className="color-picker__wrapper">
            <div
              className="color-picker__wrapper--close"
              onClick={() => handleClose()}
            />
            <SketchPicker color={color} onChange={handleColorPicker} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ColorPicker;
