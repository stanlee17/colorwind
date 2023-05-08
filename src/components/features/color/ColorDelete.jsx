import React, { useContext, Fragment } from 'react';
import { ColorsContext, ModalsContext } from '../../../App';

// react-icons import
import { TfiTrash } from 'react-icons/tfi';

const ColorDelete = ({ id }) => {
  const { setSavedColorId } = useContext(ColorsContext);
  const { openModal } = useContext(ModalsContext);

  // FUNCTION: Open Delete Modal
  function handleOpen() {
    openModal('deleteModal');
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
