import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ColorsContext, ModalsContext, ThemeContext } from '../../../App';
import Modal from 'react-modal';

// react-icons import
import { IoClose } from 'react-icons/io5';

const style = {
  modal: {
    content: { background: '#171717', color: '#fff' },
  },
};

const DeleteModal = () => {
  // useContext: ColorsContext & ModalsContext
  const { setSavedColors, savedColorId } = useContext(ColorsContext);
  const { modals, closeModal } = useContext(ModalsContext);
  const { theme } = useContext(ThemeContext);

  const handleDelete = (id) => {
    setSavedColors((current) => current.filter((color) => color.id !== id));
    closeModal('deleteModal');
  };

  return (
    <Modal
      isOpen={modals.deleteModal}
      onRequestClose={() => closeModal('deleteModal')}
      contentLabel="Delete Modal"
      className={`delete-modal ${theme}`}
      style={theme === 'dark' && style.modal}
      overlayClassName="delete-modal-overlay"
    >
      <div className={`delete-modal-header ${theme}`}>
        <h5>Delete Palette</h5>
        <IoClose size={25} onClick={() => closeModal('deleteModal')} />
      </div>
      <div className="delete-modal-content">
        <p>Are you sure you want to delete this color palette?</p>
        <Button
          variant="danger"
          className="delete-modal-button"
          onClick={() => handleDelete(savedColorId)}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
