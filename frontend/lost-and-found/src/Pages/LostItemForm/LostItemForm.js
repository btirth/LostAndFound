import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
// import { CSSTransition } from 'react-transition-group';
// import LocationPicker from './LocationPicker';
// import 'leaflet/dist/leaflet.css';

import './LostItemForm.css'; // Import custom CSS for styling and animation
import Navbar from '../../Components/Navbar';
import MapWrapper from './MapWrapper';


const LostItemForm = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemDescription: '',
        isSensitive: false
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
        const selectedFile = Array.from(e.target.files)[0];
        setMediaFiles([...mediaFiles,selectedFile]);
        // console.log(mediaFiles)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        console.log(mediaFiles)

    };

    return (
        <div>
            <Navbar></Navbar>
            <h2 style={{textAlign:'center'}}>Add your lost item here!</h2>
            <Form onSubmit={handleSubmit} className="lost-item-form">
                <Form.Group className="lost-item-group">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleInputChange}
                        className="lost-item-input"
                        required
                    />
                </Form.Group>
                <Form.Group className="lost-item-group">
                    <Form.Label>Item Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="itemDescription"
                        value={formData.itemDescription}
                        onChange={handleInputChange}
                        className="lost-item-textarea"
                        required
                    />
                </Form.Group>
                <Form.Group className="lost-item-group">
                    <Form.Check
                        type="checkbox"
                        label="Is this item sensitive? or consists any sensitive items?"
                        name="isSensitive"
                        checked={formData.isSensitive}
                        onChange={handleInputChange}
                        className="lost-item-checkbox"
                    />
                </Form.Group>
                <Form.Group className="lost-item-group">
                    <Form.Label>Upload Images or Videos</Form.Label>
                    <Form.Control
                        style={{ height: 'fit-content' }}
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleMediaChange}
                        className="lost-item-input"
                        required
                    />
                </Form.Group>
                <div className="lost-item-group">
                    <Form.Label>Location Picker</Form.Label>
                    {/* <LocationPicker onLocationChange={addLocation} /> */}
                    <MapWrapper />
                </div>
                
                <Button variant="primary" type="submit" className="lost-item-button">
                    Submit
                </Button>
            </Form>

        </div>
    );
};

export default LostItemForm;
