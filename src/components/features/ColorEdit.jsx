import React, { useContext, Fragment } from 'react';
import { ColorsContext, ModalsContext } from '../../App';

// Icons
import { RiEditBoxLine } from 'react-icons/ri';

const ColorEdit = ({ id }) => {
  const { setSavedColorId } = useContext(ColorsContext);
  const { openModals } = useContext(ModalsContext);

  function handleOpen() {
    openModals('renameModal');
    setSavedColorId(id);
  }

  return (
    <Fragment>
      <RiEditBoxLine size={18} onClick={handleOpen} />
    </Fragment>
  );
};

export default ColorEdit;
