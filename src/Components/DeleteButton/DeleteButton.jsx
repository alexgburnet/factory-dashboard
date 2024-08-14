// DeleteButton.js
import React from 'react';

const DeleteButton = (props) => {
  const handleClick = () => {
    if (props.onDelete) {
      props.onDelete(props.data);
    }
  };

  return (
    <button onClick={handleClick} style={{ color: 'white', border: 'none', borderRadius: '15px', padding: '7px', cursor: 'pointer' }}>
      ✖️
    </button>
  );
};

export default DeleteButton;
