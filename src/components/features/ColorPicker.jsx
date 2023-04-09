import React, { useState, Fragment, useContext } from 'react';
import { SketchPicker } from 'react-color';
import { IoOptions } from 'react-icons/io5';

import { ColorsContext } from '../../pages/Colors';

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
    setColors(
      colors.map((item) => {
        if (item.id === index + 1) {
          return { ...item, color: color.hex.toUpperCase() };
        } else {
          return item;
        }
      })
    );

    setColor(color.hex);
  };

  return (
    <Fragment>
      <div onClick={() => handleClick()}>
        <IoOptions />
      </div>

      {display && (
        <div className="color-picker">
          <div className="color-picker-wrapper">
            <div className="color-picker-close" onClick={() => handleClose()} />
            <SketchPicker color={color} onChange={handleColorPicker} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ColorPicker;
