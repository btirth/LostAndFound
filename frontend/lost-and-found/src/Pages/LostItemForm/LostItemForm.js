import React, { useState, useEffect } from 'react';
import { Alert, Form, Button, Card } from 'react-bootstrap';
// import { CSSTransition } from 'react-transition-group';
// import LocationPicker from './LocationPicker';
// import 'leaflet/dist/leaflet.css';

import './LostItemForm.css'; // Import custom CSS for styling and animation
import Navbar from '../../Components/Navbar';
import MapWrapper from './MapWrapper';
import { XLg, X, XCircle, FileArrowUpFill } from 'react-bootstrap-icons'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./../../firebase-config.js";
import axios from 'axios';
import { toast } from 'react-toastify'


const LostItemForm = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemDescription: '',
        isSensitive: false,
        category:''
    });

    const headers = {

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${localStorage.getItem('access_token')}`

    };

    const userEmail = localStorage.getItem('user_email');
    const [errorMessage, setErrorMessage] = useState(null)
    const [alertType, setAlertType] = useState(true);

    const [lostItems, setlostItems] = useState([]);
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

    useEffect(() => {
        // for getting list of lost items
        console.log(localStorage.getItem('access_token'))
        // setlostItems([{ name: "Iphone 15", imageUrl: "https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/lostnfound%2FspaceWalk.jpg-850-0?alt=media&token=20b1177a-98c9-4812-bd19-29426783a736" }
        //     , { name: "Iphone 15", imageUrl: "https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/lostnfound%2FspaceWalk.jpg-850-0?alt=media&token=20b1177a-98c9-4812-bd19-29426783a736" }
        //     , { name: "Iphone 15", imageUrl: "https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/lostnfound%2FspaceWalk.jpg-850-0?alt=media&token=20b1177a-98c9-4812-bd19-29426783a736" }
        //     , { name: "Iphone 15", imageUrl: "https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/lostnfound%2FspaceWalk.jpg-850-0?alt=media&token=20b1177a-98c9-4812-bd19-29426783a736" }
        //     , { name: "Iphone 15", imageUrl: "https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/lostnfound%2FspaceWalk.jpg-850-0?alt=media&token=20b1177a-98c9-4812-bd19-29426783a736" }
        //     , { name: "Iphone 15", imageUrl: "https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/lostnfound%2FspaceWalk.jpg-850-0?alt=media&token=20b1177a-98c9-4812-bd19-29426783a736" }
        //     , { name: "Iphone 15", imageUrl: "https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/lostnfound%2FspaceWalk.jpg-850-0?alt=media&token=20b1177a-98c9-4812-bd19-29426783a736" }
        //     , { name: "Iphone 15", imageUrl: "https://firebasestorage.googleapis.com/v0/b/lostnfound-7c21c.appspot.com/o/lostnfound%2FspaceWalk.jpg-850-0?alt=media&token=20b1177a-98c9-4812-bd19-29426783a736" }
        // ]);
        fetchItemsData();
    }, [])

    async function fetchItemsData() {
        try {
            console.log(headers);
           
            const lostItemList = await axios.get('http://localhost:8080/api/v1/item/get-list-by-user', {
  params: {
    createdBy: userEmail,
    isFoundItem: false,
    postedAt: -1,
  },
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  },
});
            console.log("getting list");
            console.log("lostItemList",lostItemList)
            setlostItems([...lostItemList.data]);
        } catch (e) {
            console.error(e);
        }
    };

    const handleMediaChange = (e) => {

        const selectedFiles = Array.from(e.target.files);
        const newFiles = selectedFiles.filter((file) => !selectedFileNames.has(file.name));
        console.log("here inside event", newFiles)
        setMediaFiles([...mediaFiles, ...newFiles]);
        newFiles.forEach((file) => selectedFileNames.add(file.name));
        // console.log(mediaFiles,selectedFileNames)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        console.log(mediaFiles)

        //uploading images
        const fileLinks = await uploadImages(mediaFiles);
        const coordinates = [locations[0].lng, locations[0].lat];

        //submitting form data
        try {
            const response = await axios.post('http://localhost:8080/api/v1/item', {

                title: formData["itemName"],
                description: formData["itemDescription"],
                createdBy: userEmail,
                image: fileLinks,
                location: {
                    coordinates: coordinates,
                    type: "Point"
                },
                foundItem: false,
                sensitive: formData["isSensitive"]
            }, { headers }
            );

            setFormData([]);
            setLocations([]);
            setMediaFiles([]);
            setErrorMessage("Lost Item Reported!!");
            // toast.success('Lost Item Reported!!');
            // window.location = '/home'

            fetchItemsData();

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
        <>
            <Navbar></Navbar>
            <div className='app'>
                <div className="section" style={{ width: '40%', overflowY: 'scroll' }}>
                    <h2 style={{ textAlign: "center", color: '#333', fontWeight: "bold" }}>Your lost items</h2>
                    <div style={{ marginRight: "20px", marginLeft: "20px" }}>
                        {lostItems.length == 0 ? <h6 style={{textAlign:'center'}}>You haven't posted any lost item</h6> :
                            lostItems.map((lostItem, index) => (
                                <Card className="border shadow mb-2 p-2 rounded-3" style={{ width: "100%", height: "200px" }} key={index}>
                                    <li className="item-card" style={{ height: "100%" }}>
                                        <img className="card-image" src={lostItem.image[0]}></img>
                                        <div className='item-detail'>
                                            <h6 className="item-row"><strong>Name: </strong>{lostItem.title}</h6>
                                            <h6 className="item-row"><strong>Description: </strong>{lostItem.description.slice(0, 12) + '...'}</h6>
                                            <h6 className="item-row"><strong>Category: </strong>{'Personal Item'}</h6>
                                            <h6 className="item-row"><strong>Date: </strong>{lostItem.postedAt}</h6>
                                            <h6 className="item-row"><strong>Found Status: </strong>{lostItem.foundItem ? 'Found' : 'Not Found'}</h6>
                                        </div>
                                    </li>
                                </Card>
                            ))}
                    </div>
                </div>
                <div className="section" style={{ width: '60%', overflowY: 'scroll' }}>
                    <h2 style={{ textAlign: 'center', color: '#333', fontWeight: "bold" }}>Add your lost item here!</h2>
                    <Form onSubmit={handleSubmit} className="lost-item-form">
                        <Form.Group className="lost-item-group">
                            <Form.Label style={{ color: "#333", fontWeight: "bold" }}>Item Name</Form.Label>
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
                            <Form.Label style={{ color: "#333", fontWeight: "bold" }}>Item Description</Form.Label>
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
                            <Form.Label style={{ color: "#333",marginRight:"5px", fontWeight: "bold" }}>Item Category</Form.Label>
                            <Form.Select style={{width:"100%",height:"40px",}} aria-label="personal"
                            onChange={handleInputChange} name='category'>
                                <option>Select Category</option>
                                <option value="personal">Personal Item</option>
                                <option value="electronics">Electronics</option>
                                <option value="document">Document</option>
                            </Form.Select>
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
                            <Form.Label style={{ color: "#333", fontWeight: "bold" }}>Upload Images or Videos</Form.Label>
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
                            <h6 style={{ color: "#333", fontWeight: "bold" }}>Select Files</h6>
                            <ul>
                                {mediaFiles.map((mediaFile, index) => (
                                    <Card key={index}>
                                        <li className='border shadow p-2' style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div style={{ overflow: "hidden" }}>
                                                <FileArrowUpFill className='mr-2' />
                                                {mediaFile.name}
                                            </div>
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
                            <Form.Label style={{ color: "#333", fontWeight: "bold" }}>Location Picker</Form.Label>
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
            </div>
        </>
    );
};

export default LostItemForm;
