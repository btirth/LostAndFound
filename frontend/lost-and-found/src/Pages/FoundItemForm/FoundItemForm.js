import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './FoundItemForm.css';
import MapWrapper from './MapWrapper';
import axios from 'axios';

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./../../firebase-config.js";

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
      })
    }

    return () => {

    }
  }, [resetVariable])


  const onHideHandle = () => {
    setIsSubmitted(false);
    setFormData({
      itemName: '',
      itemDescription: '',
      isSensitive: false,
    })

  }

  const [mediaFiles, setMediaFiles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [locations, setLocations] = useState([]);

  const headers = {

    'Content-Type': 'application/json',

    'Authorization': `Bearer ${localStorage.getItem('access_token')}`

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

    //uploading images
    const fileLinks = await uploadImages(mediaFiles);
    console.log(locations);
    const coordinates = [locations[0].lng, locations[0].lat];

    //submitting form data
    try {
      const currentLoggedinUser = localStorage.getItem("user_email");
      const response = await axios.post('http://localhost:8080/api/v1/item', {
        title: formData["itemName"],
        description: formData["itemDescription"],
        createdBy: currentLoggedinUser,
        image: fileLinks,
        location: {
          coordinates: coordinates,
          type: "Point"
        },
        foundItem: true,
        sensitive: formData["isSensitive"]
      }, { headers });


      setErrorMessage(null);

      window.location = '/home'


    } catch (error) {
      // Handle login errors
      setErrorMessage(error.response?.data?.error_description || 'An error occurred during form submission');


    }
  };

  async function uploadImages(files) {
    try {
      const fileLinks = [];

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        let todayDate = new Date().getUTCMilliseconds().toString();
        const fileRef = ref(storage, `lostnfound/${file.name}-${todayDate}-${index}`);

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
              <Form.Group className="lost-item-group" style={{textAlign:'center'}}>
                {/* <Form.Label style={{ color: "#333", marginRight: "5px", fontWeight: "bold" }}>Item Category</Form.Label> */}
                <Form.Select style={{ width: "50%", height: "40px", }} aria-label="personal"
                  onChange={handleInputChange} name='category'>
                  <option>Select Category</option>
                  <option value="personal">Personal Item</option>
                  <option value="electronics">Electronics</option>
                  <option value="document">Document</option>
                </Form.Select>
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
              <div style={{width:'100%'}}>
              <div style={{textAlign:'center'}}>
                <Form.Label>Location Picker</Form.Label>
                {/* <LocationPicker onLocationChange={addLocation} /> */}
                <MapWrapper style={{width:'900px'}} locations={locations} setLocationsFun={setLocations} />
              </div>
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
