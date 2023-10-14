import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import FoundItemForm from '../FoundItemForm/FoundItemForm';

const HomePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <Navbar />
      <h2>Welcome to the Home Page</h2>
      <button onClick={openForm}>Report Found Item</button>
      <FoundItemForm isOpen={isFormOpen} onRequestClose={closeForm} />
      {/* Other content */}
    </div>
  );
};

export default HomePage;