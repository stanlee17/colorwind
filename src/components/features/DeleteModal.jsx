import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ColorsContext, ModalsContext } from '../../App';
import Modal from 'react-modal';

// Icons
import { IoClose } from 'react-icons/io5';

const DeleteModal = () => {
  const { setSavedColors, savedColorId } = useContext(ColorsContext);
  const { modals, closeModals } = useContext(ModalsContext);

  const handleDelete = (id) => {
    setSavedColors((current) => current.filter((color) => color.id !== id));
    closeModals('deleteModal');
  };

  return (
    <Modal
      isOpen={modals.deleteModal}
      onRequestClose={() => closeModals('deleteModal')}
      contentLabel="Delete Modal"
      className="export-modal"
      overlayClassName="export-modal-overlay"
    >
      <div className="export-modal-header">
        <h5>Delete Palette</h5>
        <IoClose size={25} onClick={() => closeModals('deleteModal')} />
      </div>
      <div className="export-modal-content">
        <p>Are you sure you want to delete this palette?</p>
        <Button variant="danger" onClick={() => handleDelete(savedColorId)}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
