import React from 'react';
import {
  BsFillClipboard2Fill,
  BsFillClipboard2CheckFill,
} from 'react-icons/bs';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';

const ColorCopy = ({ hex }) => {
  const [isCopied, handleCopy] = useCopyToClipboard(3000);

  return (
    <div onClick={() => handleCopy(hex)}>
      {isCopied ? <BsFillClipboard2CheckFill /> : <BsFillClipboard2Fill />}
    </div>
  );
};

export default ColorCopy;
