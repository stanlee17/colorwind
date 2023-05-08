import React from 'react';

// react-icons import
import {
  BsFillClipboard2Fill,
  BsFillClipboard2CheckFill,
} from 'react-icons/bs';

// import useCopyToClipboard hook
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';

const ColorCopy = ({ hex }) => {
  // useCopyToClipboard hook
  const [isCopied, handleCopy] = useCopyToClipboard(3000);

  return (
    <div onClick={() => handleCopy(hex)}>
      {isCopied ? <BsFillClipboard2CheckFill /> : <BsFillClipboard2Fill />}
    </div>
  );
};

export default ColorCopy;
