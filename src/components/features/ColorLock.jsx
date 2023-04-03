import React, { useContext, useState } from 'react';
import { IoLockOpen, IoLockClosed } from 'react-icons/io5';
import { ColorsContext } from '../../pages/Colors';

const ColorLock = ({ hex, index }) => {
  const { colors, setColors } = useContext(ColorsContext);
  const [lock, setLock] = useState(false);

  const handleClick = () => {
    setColors(
      colors.map((item) => {
        if (item.id === index + 1) {
          return { ...item, isLocked: !lock };
        } else {
          return item;
        }
      })
    );

    setLock(!lock);
  };

  return (
    <div onClick={handleClick}>{lock ? <IoLockClosed /> : <IoLockOpen />}</div>
  );
};

export default ColorLock;
