import React, { useContext, useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ColorsContext } from '../../pages/Colors';

const SaveModal = (props) => {
  const { colors, savedColors, setSavedColors } = useContext(ColorsContext);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (savedColors.find((color) => color.name === name)) {
      setError('The name already exist, please enter a different one');
      return;
    }

    let items = [];
    colors.map((color) => {
      return items.push(color.color);
    });

    const newItems = {
      id: savedColors.length + 1,
      name,
      colors: items,
      isLocked: false,
    };

    props.onHide();
    return setSavedColors([...savedColors, newItems]);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Name of your color palette
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={handleTextChange}
            />
            <div className="text-danger">{error}</div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SaveModal;
