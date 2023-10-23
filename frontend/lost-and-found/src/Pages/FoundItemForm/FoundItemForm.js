import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap'; 
import { CSSTransition } from 'react-transition-group';
import './FoundItemForm.css';
import MapWrapper from './MapWrapper';
const FoundItemForm = ({ isOpen, onRequestClose,resetVariable }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    isSensitive: false,
  });

  useEffect(() => {
    if (resetVariable) {
      setIsSubmitted(false); 
      setFormData({
        itemName: '',
        itemDescription: '',
        isSensitive: false,
      })
    }
  
    return () => {
      
    }
  }, [resetVariable])
  

  const onHideHandle = () =>{
      setIsSubmitted(false); 
      setFormData({
        itemName: '',
        itemDescription: '',
        isSensitive: false,
      })

    }

  const [mediaFiles, setMediaFiles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitted(true); 
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <Modal show={isOpen} onHide={onRequestClose} size={'xl'} >
        <Modal.Header closeButton>
          <Modal.Title>Report Found Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSubmitted ? ( 
            <Alert variant="success">
              Thank you for your submission!
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit} className="found-item-form">
              <Form.Group className="found-item-group">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  className="found-item-input"
                  required
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
                  required
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
                  required
                />
              </Form.Group>
              <div className="lost-item-group">
                    <Form.Label>Location Picker</Form.Label>
                    {/* <LocationPicker onLocationChange={addLocation} /> */}
                    <MapWrapper />
                </div>

              <Button variant="primary" type="submit" className="found-item-button">
                Submit
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </CSSTransition>
  );
};

export default FoundItemForm;
