import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Col,Row } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './FoundItemForm.css';
import MapWrapper from './MapWrapper';
import axios from 'axios';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './../../firebase-config.js';

const FoundItemForm = ({ isOpen, onRequestClose, resetVariable }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    isSensitive: false,
  });

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (resetVariable) {
      setIsSubmitted(false);
      setFormData({
        itemName: '',
        itemDescription: '',
        isSensitive: false,
      });
    }

    return () => {};
  }, [resetVariable]);

  const onHideHandle = () => {
    setIsSubmitted(false);
    setFormData({
      itemName: '',
      itemDescription: '',
      isSensitive: false,
    });
  };

  const [mediaFiles, setMediaFiles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [locations, setLocations] = useState([]);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Uploading images
    const fileLinks = await uploadImages(mediaFiles);
    const coordinates = [locations[0].lng, locations[0].lat];

    // Submitting form data
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/item',
        {
          title: formData['itemName'],
          description: formData['itemDescription'],
          createdBy: 'test@gmail.com',
          image: fileLinks,
          location: {
            coordinates: coordinates,
            type: 'Point',
          },
          foundItem: true,
          sensitive: formData['isSensitive'],
        },
        { headers }
      );

      setErrorMessage(null);

      window.location = '/home';
    } catch (error) {
      // Handle login errors
      setErrorMessage(
        error.response?.data?.error_description ||
          'An error occurred during form submission'
      );
    }
  };

  async function uploadImages(files) {
    try {
      const fileLinks = [];

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        let todayDate = new Date().getUTCMilliseconds().toString();
        const fileRef = ref(
          storage,
          `lostnfound/${file.name}-${todayDate}-${index}`
        );

        try {
          const snapshot = await uploadBytes(fileRef, file);
          const url = await getDownloadURL(snapshot.ref);
          fileLinks.push(url);
          console.log(file.name, url);
        } catch (error) {
          console.error('Error getting download URL:', error);
        }
      }

      console.log('Images uploaded successfully.');
      return fileLinks;
    } catch (error) {
      console.error('Error uploading images:', error);
      return [];
    }
  }

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <Modal show={isOpen} onHide={onRequestClose} size={'lg'}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#75e6a3' }}>Report Found Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSubmitted ? (
            <Alert variant="success">Thank you for your submission!</Alert>
          ) : (
            <Form onSubmit={handleSubmit} className="found-item-form">
              <Form.Group as={Col} controlId="formItemName">
                <Form.Label style={{ fontWeight: 'bold' }}>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formItemDescription">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Item Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              {/* <Form.Group as={Col} controlId="formIsSensitive" className='mt-2'>
                <Form.Check
                  type="checkbox"
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      Is this item sensitive?
                    </span>
                  }
                  name="isSensitive"
                  checked={formData.isSensitive}
                  onChange={handleInputChange}
                  style={{ fontSize: '1rem' }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formCategory" className='mt-2'>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Item Category :
                </Form.Label>
                <Form.Select
                  style={{  height: '40px',
                  marginLeft:'10px',
                  borderRadius: '0', 
                  border: '1px solid #ced4da', 
                }}
                  aria-label="category"
                  onChange={handleInputChange}
                  name="category"
                >
                  <option>Select Category</option>
                  <option value="personal">Personal Item</option>
                  <option value="electronics">Electronics</option>
                  <option value="document">Document</option>
                </Form.Select>
              </Form.Group> */}


              <Row className="mb-3 mt-4" style={{width:'100%'}}>
              <Col xs={5} md={5} className="d-flex">
              <Form.Check
                  type="checkbox"
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      Is item sensitive?
                    </span>
                  }
                  name="isSensitive"
                  checked={formData.isSensitive}
                  onChange={handleInputChange}
                  style={{ fontSize: '1rem' }}
                />
                </Col>
                <Col xs={7} md={7} className="d-flex">
                  <Form.Label style={{ fontWeight: 'bold' ,marginRight:'15px',marginTop:'5px'}}>
                    Item Category:
                  </Form.Label>
                {/* </Col>
                <Col xs={4} md={4}> */}
                  <Form.Select
                    style={{
                      height: '40px',
                      borderRadius: '0'
                    }}
                    aria-label="category"
                    onChange={handleInputChange}
                    name="category"
                  >
                    <option>Select Category</option>
                    <option value="personal">Personal Item</option>
                    <option value="electronics">Electronics</option>
                    <option value="document">Document</option>
                  </Form.Select>
                </Col>
              </Row>



              <Form.Group as={Col} controlId="formMedia" className='mt-2'>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Upload Images or Videos
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formLocation" className='mt-2'>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Location Picker
                </Form.Label>
                <MapWrapper
                  style={{ width: '900px' }}
                  locations={locations}
                  setLocationsFun={setLocations}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="found-item-button"
                style={{ backgroundColor: '#75e6a3', borderColor: '#75e6a3' }}
              >
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
