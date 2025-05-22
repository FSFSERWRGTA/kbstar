import React from 'react';

const ToastAlert = ({ message }) => {
  return (
    <div className="toast">
      {message}
    </div>
  );
};

export default ToastAlert;