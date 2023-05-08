import React, { useContext, useState } from 'react';
import { ColorsContext } from '../../../App';

// react-icons import
import { IoLockOpen, IoLockClosed } from 'react-icons/io5';

const ColorLock = ({ index }) => {
  // useContext: ColorsContext
  const { colors, setColors } = useContext(ColorsContext);

  // Initial state
  const [lock, setLock] = useState(false);

  // Toggles isLocked property (True/False) onClick
  const handleClick = () => {
    setColors(
      colors.map((item) => {
        if (item.id === index + 1) {
          return { ...item, isLocked: !lock };
        }
        return item;
      })
    );
    setLock(!lock);
  };

  return (
    <div onClick={handleClick}>{lock ? <IoLockClosed /> : <IoLockOpen />}</div>
  );
};

export default ColorLock;
