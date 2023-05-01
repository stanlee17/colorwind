import React, { useContext } from 'react';
import { ColorsContext } from '../../App';
import { TfiTrash } from 'react-icons/tfi';

const ColorDelete = ({ id }) => {
  const { setSavedColors } = useContext(ColorsContext);

  // FUNCTION: Delete saved colors
  const handleDelete = (id) =>
    setSavedColors((current) => current.filter((color) => color.id !== id));

  return (
    <div className="color-delete" onClick={() => handleDelete(id)}>
      <TfiTrash size={18} />
    </div>
  );
};

export default ColorDelete;
