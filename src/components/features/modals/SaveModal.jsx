import React, { useContext, useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-modal';
import { ColorsContext } from '../../../App';

// Icons
import { IoClose } from 'react-icons/io5';

// Common
import Message from '../../common/Message';

const SaveModal = ({ saveModal, closeModal }) => {
  const { colors, savedColors, setSavedColors } = useContext(ColorsContext);
  const inputRef = useRef(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    const { value } = e.target;
    setName(value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (savedColors.find((color) => color.name === name)) {
      return setError('The name already exist, please enter a different one');
    }

    let items = [];
    colors.map((color) => {
      return items.push({
        color: color.color,
        name: color.name,
      });
    });

    const newItems = {
      id: savedColors.length + 1,
      name,
      colors: items,
    };

    setError('');
    closeModal('saveModal');
    return setSavedColors([...savedColors, newItems]);
  };

  return (
    <Modal
      isOpen={saveModal}
      onRequestClose={() => closeModal('saveModal')}
      contentLabel="Save Modal"
      className="save-modal"
      overlayClassName="save-modal-overlay"
    >
      <div className="save-modal-header">
        <h5>Save Palette</h5>
        <IoClose size={25} onClick={() => closeModal('saveModal')} />
      </div>
      <div className="save-modal-content">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              ref={inputRef}
              placeholder="My new palette"
              onChange={handleTextChange}
              autoFocus
            />
            {error && <Message variant="error">{error}</Message>}
          </Form.Group>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default SaveModal;
