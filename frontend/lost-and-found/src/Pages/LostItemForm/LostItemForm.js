import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
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

    const [locations, setLocations] = useState([]);

    const addLocation = (newLocation) => {
        console.log(newLocation)
        setLocations([...locations, newLocation]);
    };

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
        const tempfiles = mediaFiles.copyWithin();
        tempfiles.push(selectedFile)
        setMediaFiles(tempfiles);
        // console.log(mediaFiles)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        console.log(locations)
        console.log(mediaFiles)

    };

    return (
        <div>
            <Navbar></Navbar>
            <h2>Add your lost item here!</h2>
            <Form onSubmit={handleSubmit} className="lost-item-form">
                <Form.Group className="lost-item-group">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleInputChange}
                        className="lost-item-input"
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
                    />
                </Form.Group>
                <h1>Location Picker</h1>
                {/* <LocationPicker onLocationChange={addLocation} /> */}
                <MapWrapper />
                <h2>Pinned Locations:</h2>
                <ul>
                    {locations.map((location, index) => (
                        <li key={index}>
                            Latitude: {location[0]}, Longitude: {location[1]}
                        </li>
                    ))}
                </ul>
                <Button variant="primary" type="submit" className="lost-item-button">
                    Submit
                </Button>
            </Form>

        </div>
    );
};

export default LostItemForm;
