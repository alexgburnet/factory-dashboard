// DeleteButton.js
import React from 'react';

const DeleteButton = (props) => {
  const handleClick = () => {
    // You can call your API or perform other actions here.
    if (props.onDelete) {
      props.onDelete(props.data); // Placeholder for actual delete logic
    }
  };

  return (
    <button onClick={handleClick} style={{ color: 'white', border: 'none', borderRadius: '15px', padding: '7px', cursor: 'pointer' }}>
      ✖️
    </button>
  );
};

export default DeleteButton;
