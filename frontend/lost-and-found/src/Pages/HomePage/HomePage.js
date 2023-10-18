import React, { useState } from 'react';
import Navbar from '../../Components/Navbar'; // Import the Navbar component

const HomePage = () => {

  const openLostForm = () => {
    window.location = '/lost-form'
  };


  return (
    <div>
        <Navbar></Navbar>
      <h2>Welcome to the Home Page</h2>
      <button onClick={openLostForm}>Report Lost Item</button>
    </div>
  );
};

export default HomePage;