import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './FoundItemForm.css'; // Import custom CSS for styling and animation

const FoundItemForm = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    isSensitive: false,
  });

  const [mediaFiles, setMediaFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleMediaChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setMediaFiles(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRequestClose(); 
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <Modal show={isOpen} onHide={onRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report Found Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="found-item-form">
            <Form.Group className="found-item-group">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className="found-item-input"
              />
            </Form.Group>
            <Form.Group className="found-item-group">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                as="textarea"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleInputChange}
                className="found-item-textarea"
              />
            </Form.Group>
            <Form.Group className="found-item-group">
              <Form.Check
                type="checkbox"
                label="Is this item sensitive?"
                name="isSensitive"
                checked={formData.isSensitive}
                onChange={handleInputChange}
                className="found-item-checkbox"
              />
            </Form.Group>
            <Form.Group className="found-item-group">
              <Form.Label>Upload Images or Videos</Form.Label>
              <Form.Control
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMediaChange}
                className="found-item-input"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="found-item-button">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </CSSTransition>
  );
};

export default FoundItemForm;
