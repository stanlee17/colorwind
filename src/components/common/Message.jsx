import React, { useEffect, useState } from 'react';

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }, []);

  return show && <div className={`message message-${variant}`}>{children}</div>;
};

export default Message;
