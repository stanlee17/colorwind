import React, { useContext } from 'react';
import { ColorsContext } from '../../pages/Colors';
import { TfiTrash } from 'react-icons/tfi';

const ColorDelete = ({ id }) => {
  const { setSavedColors } = useContext(ColorsContext);

  const handleDelete = (id) =>
    setSavedColors((current) => current.filter((color) => color.id !== id));

  return (
    <div className="color-delete" onClick={() => handleDelete(id)}>
      <TfiTrash />
    </div>
  );
};

export default ColorDelete;
