import React, { useContext } from 'react';
import { ColorsContext } from '../../pages/Colors';
import { FaTrashAlt } from 'react-icons/fa';

const ColorDelete = ({ id }) => {
  const { setSavedColors } = useContext(ColorsContext);

  const handleDelete = (id) =>
    setSavedColors((current) => current.filter((color) => color.id !== id));

  return (
    <div className="color-delete" onClick={() => handleDelete(id)}>
      <FaTrashAlt />
    </div>
  );
};

export default ColorDelete;
