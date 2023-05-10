import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ColorsContext, ModalsContext, ThemeContext } from '../../../App';
import Modal from 'react-modal';

// react-icons import
import { IoClose } from 'react-icons/io5';

// Common
import Message from '../../common/Message';

// Utils
import { capitalizeFirstLetter } from '../../../utils/utils';

const style = {
  modal: {
    content: { background: '#171717', color: '#fff' },
  },
};

const RenameModal = () => {
  // useContext: ColorsContext & ModalsContext
  const { savedColors, setSavedColors, savedColorId } =
    useContext(ColorsContext);
  const { modals, closeModal } = useContext(ModalsContext);
  const { theme } = useContext(ThemeContext);

  // Initial useRef
  const inputRef = useRef(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    const { value } = e.target;
    setName(value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      return setError('Input field cannot be empty');
    } else if (savedColors.find((color) => color.name === name)) {
      return setError('The name cannot be the same');
    }

    setError('');
    closeModal('renameModal');
    setSavedColors(
      savedColors.map((color) => {
        if (color.id === savedColorId) {
          return { ...color, name: name };
        }
        return color;
      })
    );
  };

  useEffect(() => {
    if (savedColorId) {
      const savedColor = savedColors.find(
        (savedColor) => savedColor.id === savedColorId
      );
      setName(savedColor.name);
    }
  }, [savedColors, savedColorId]);

  return (
    <Modal
      isOpen={modals.renameModal}
      onRequestClose={() => closeModal('renameModal')}
      contentLabel="Rename Modal"
      className={`rename-modal ${theme}`}
      style={theme === 'dark' && style.modal}
      overlayClassName="rename-modal-overlay"
    >
      <div className={`rename-modal-header ${theme}`}>
        <h5>Rename Palette</h5>
        <IoClose size={25} onClick={() => closeModal('renameModal')} />
      </div>
      <div className="rename-modal-content">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Rename</Form.Label>
            <Form.Control
              type="text"
              ref={inputRef}
              placeholder="My new palette"
              onChange={handleTextChange}
              value={capitalizeFirstLetter(name) || ''}
              autoFocus
            />
            {error && <Message variant="error">{error}</Message>}
          </Form.Group>
          <Button className="rename-modal-button" onClick={handleSubmit}>
            Save
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default RenameModal;
