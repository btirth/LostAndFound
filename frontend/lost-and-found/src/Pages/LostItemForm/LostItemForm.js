import React, { useState } from 'react';
import { Alert,Form, Button, Card } from 'react-bootstrap';
// import { CSSTransition } from 'react-transition-group';
// import LocationPicker from './LocationPicker';
// import 'leaflet/dist/leaflet.css';

import './LostItemForm.css'; // Import custom CSS for styling and animation
import Navbar from '../../Components/Navbar';
import MapWrapper from './MapWrapper';
import { XLg, X, XCircle } from 'react-bootstrap-icons'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./../../firebase-config.js";
import axios from 'axios';
import { toast } from 'react-toastify'


const LostItemForm = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemDescription: '',
        isSensitive: false
    });

    const headers = {

        'Content-Type': 'application/json',

        'Authorization':`Bearer ${localStorage.getItem('access_token')}`

      };

    const [errorMessage, setErrorMessage] = useState(null)
    const [alertType, setAlertType] = useState(true);

    const [locations, setLocations] = useState([]);

    const [mediaFiles, setMediaFiles] = useState([]);
    const selectedFileNames = new Set();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleMediaChange = (e) => {

        const selectedFiles = Array.from(e.target.files);
        const newFiles = selectedFiles.filter((file) => !selectedFileNames.has(file.name));
        console.log("here inside event", newFiles)
        setMediaFiles([...mediaFiles, ...newFiles]);
        newFiles.forEach((file) => selectedFileNames.add(file.name));
        // console.log(mediaFiles,selectedFileNames)
    };

    const handleSubmit =async(e) => {
        e.preventDefault();
        console.log(formData)
        console.log(mediaFiles)

        //uploading images
        const fileLinks=await uploadImages(mediaFiles);
        const coordinates=[locations[0].lng,locations[0].lat];

        //submitting form data
        try {
            const response = await axios.post('http://localhost:8080/api/v1/item', {
                
                title: formData["itemName"],
                description: formData["itemDescription"],
                createdBy: "test@gmail.com",
                image: fileLinks,
                location: {
                    coordinates: coordinates,
                    type: "Point"
                },
                foundItem: false,
                sensitive: formData["isSensitive"]
            },{headers}
            );
      
            setFormData([]);
            setLocations([]);
            setMediaFiles([]);      
            setErrorMessage("Lost Item Reported!!");
            // toast.success('Lost Item Reported!!');
            // window.location = '/home'

    
          } catch (error) {
            // Handle login errors
            setErrorMessage(error.response?.data?.error_description || 'An error occurred during form submission');
            setAlertType(false);
          
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



    const removeFile = (index) => {
        console.log("here delete", index);
        const updatedMediaList = [...mediaFiles];
        const filename = updatedMediaList[index].name
        updatedMediaList.splice(index, 1);
        setMediaFiles(updatedMediaList);
        selectedFileNames.delete(filename);
    };

    return (
        <div className='app'>
            <Navbar></Navbar>
            <h2 style={{ textAlign: 'center' }}>Add your lost item here!</h2>
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
                <div className="lost-item-group" style={{ textAlign: 'center' }} >
                    <h5>Select Files</h5>
                    <ul>
                        {mediaFiles.map((mediaFile, index) => (
                            <Card className='border shadow pl-2 pr-2' key={index}>
                                <li >
                                    {mediaFile.name}
                                    <Button className="ml-1"
                                        style={{ backgroundColor: "white", height: "10xp", width: "10xp", border: "1px solid white" }}
                                        onClick={() => removeFile(index)}>
                                        <XCircle style={{ color: "red" }} />
                                    </Button>
                                </li>
                            </Card>
                        ))}
                    </ul>
                </div>
                <div className="lost-item-group">
                    <Form.Label>Location Picker</Form.Label>
                    {/* <LocationPicker onLocationChange={addLocation} /> */}
                    <MapWrapper locations={locations} setLocationsFun={setLocations} />
                </div>

                <Button variant="primary" type="submit" className="lost-item-button">
                    Submit
                </Button>

                {errorMessage && (
            <Alert variant={alertType ? 'success' : 'danger'} style={{ marginTop: '10px' }}>
              {errorMessage}
            </Alert>)}
            </Form>

        </div>
    );
};

export default LostItemForm;
