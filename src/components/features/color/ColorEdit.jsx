import React, { useContext, Fragment } from 'react';
import { ColorsContext, ModalsContext } from '../../../App';

// react-icons import
import { RiEditBoxLine } from 'react-icons/ri';

const ColorEdit = ({ id }) => {
  // useContext: ColorsContext & ModalsContext
  const { setSavedColorId } = useContext(ColorsContext);
  const { openModal } = useContext(ModalsContext);

  function handleOpen() {
    openModal('renameModal');
    setSavedColorId(id);
  }

  return (
    <Fragment>
      <RiEditBoxLine size={18} onClick={handleOpen} />
    </Fragment>
  );
};

export default ColorEdit;
