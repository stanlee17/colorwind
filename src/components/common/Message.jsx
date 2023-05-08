import React, { useEffect, useState } from 'react';

const Message = ({ variant, children, className }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }, []);

  return (
    show && (
      <div className={`message message-${variant} ${className}`}>
        {children}
      </div>
    )
  );
};

export default Message;
