import React, { useState, Fragment } from 'react';
import { SketchPicker } from 'react-color';
import { RiSettings3Fill } from 'react-icons/ri';

const ColorPicker = ({ hex }) => {
  const [color, setColor] = useState(hex);
  const [display, setDisplay] = useState(false);

  const handleClick = () => {
    setDisplay(!display);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  console.log(color);

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
            <SketchPicker
              color={color}
              onChange={(color) => {
                setColor(color.hex);
              }}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ColorPicker;
