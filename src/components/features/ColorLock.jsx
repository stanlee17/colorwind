import React, { useContext, useState } from 'react';
import { IoLockOpen, IoLockClosed } from 'react-icons/io5';
import { ColorsContext } from '../../App';

const ColorLock = ({ index }) => {
  // ColorsContext
  const { colors, setColors } = useContext(ColorsContext);

  // INITIAL: Lock state
  const [lock, setLock] = useState(false);

  // FUNCTION: Toggles isLocked property (True/False) onClick
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
