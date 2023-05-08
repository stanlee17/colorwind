import React, { useState, Fragment, useContext } from 'react';
import { ChromePicker } from 'react-color';
import { ColorsContext } from '../../../App';

// react-icons import
import { IoOptions } from 'react-icons/io5';

const ColorPicker = ({ hex, index }) => {
  // useContext: ColorsContext
  const { colors, setColors, colorName } = useContext(ColorsContext);

  // Initial states
  const [color, setColor] = useState('');
  const [display, setDisplay] = useState(false);

  const handleClick = () => {
    setColor(hex);
    setDisplay(!display);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  const handleColorPicker = (color) => {
    setColors(
      colors.map((item) => {
        if (item.id === index + 1) {
          return {
            ...item,
            color: color.hex.toUpperCase(),
            name: colorName(color.hex),
          };
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
            <ChromePicker
              color={color}
              onChange={handleColorPicker}
              disableAlpha={true}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ColorPicker;
