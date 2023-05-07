import React, { useContext, Fragment } from 'react';
import { ColorsContext, ModalsContext } from '../../App';
import { TfiTrash } from 'react-icons/tfi';

const ColorDelete = ({ id }) => {
  const { setSavedColorId } = useContext(ColorsContext);
  const { openModals } = useContext(ModalsContext);

  // FUNCTION: Open Delete Modal
  function handleOpen() {
    openModals('deleteModal');
    setSavedColorId(id);
  }

  return (
    <Fragment>
      <div className="color-delete" onClick={handleOpen}>
        <TfiTrash size={18} />
      </div>
    </Fragment>
  );
};

export default ColorDelete;
