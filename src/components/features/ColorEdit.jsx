import React, { useContext, Fragment } from 'react';
import { ColorsContext, ModalsContext } from '../../App';

// Icons
import { RiEditBoxLine } from 'react-icons/ri';

import RenameModal from './RenameModal';

const ColorEdit = ({ id }) => {
  const { setSavedColorId } = useContext(ColorsContext);
  const { modals, openModals, closeModals } = useContext(ModalsContext);

  function handleOpen() {
    openModals('renameModal');
    setSavedColorId(id);
  }

  return (
    <Fragment>
      <RiEditBoxLine size={18} onClick={handleOpen} />
      <RenameModal closeModals={closeModals} renameModal={modals.renameModal} />
    </Fragment>
  );
};

export default ColorEdit;
