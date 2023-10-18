import React, { useState } from 'react';
import Navbar from '../../Components/Navbar'; // Import the Navbar component
import FoundItemForm from '../FoundItemForm/FoundItemForm';

const HomePage = () => {

  const openLostForm = () => {
    window.location = '/lost-form'
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [resetVariable, setResetVariable] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
    setResetVariable(false)

  };

  const closeForm = () => {
    setIsFormOpen(false);
    setResetVariable(true)

  };

  return (
    <div>
      <Navbar />
      <h2>Welcome to the Home Page</h2>
      <button onClick={openLostForm}>Report Lost Item</button>
      <button onClick={openForm}>Report Found Item</button>
      <FoundItemForm isOpen={isFormOpen} onRequestClose={closeForm} resetVariable ={resetVariable} />
      {/* Other content */}
    </div>
  );
};

export default HomePage;