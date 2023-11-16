// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../actions/authActions';
import FoundItemForm from '../Pages/FoundItemForm/FoundItemForm';

const Navbar = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(null); // Track the hovered item
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [resetVariable, setResetVariable] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem('access_token');
    dispatch(logout());
    window.location = '/login';
  };

  const openForm = () => {
    setIsFormOpen(true);
    setResetVariable(false)

  };

  const closeForm = () => {
    setIsFormOpen(false);
    setResetVariable(true)

  };

  const navbarStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between', // Center items in the navbar
  };

  const navListStyle = {
    listStyle: 'none',
    display: 'flex',
    margin: '0',
    padding: '0',
    alignItems: "center",
  };

  const navItemStyle = {
    marginRight: '20px',
    height: '24px'
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const logoutButtonStyle = {
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#75e6a3'
  };

  const highlightStyle = {
    color: '#75e6a3',
    transition: 'color 0.3s ease-in-out',
    cursor: 'pointer'

  };
  const logoutHighlightStyle = {

    color: '#333',
    transition: 'color 0.3s ease-in-out',
    cursor: 'pointer'

  };

  return (
    <nav style={navbarStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link
            to="/home"
            style={isHovered === 'home' ? { ...navLinkStyle, ...highlightStyle } : navLinkStyle}
            onMouseEnter={() => setIsHovered('home')}
            onMouseLeave={() => setIsHovered(null)}
          >
            Home
          </Link>
        </li>

        <li style={navItemStyle}>
          <Link
            to="/lost-catalogue"
            style={isHovered === 'lost-catalogue' ? { ...navLinkStyle, ...highlightStyle } : navLinkStyle}
            onMouseEnter={() => setIsHovered('lost-catalogue')}
            onMouseLeave={() => setIsHovered(null)}
          >
            Lost Catalogue
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link
            to="/lost-form"
            style={isHovered === 'lost-form' ? { ...navLinkStyle, ...highlightStyle } : navLinkStyle}
            onMouseEnter={() => setIsHovered('lost-form')}
            onMouseLeave={() => setIsHovered(null)}
          >
            Report Lost Item
          </Link>
        </li>
        <li style={navItemStyle}>
          <p
            onClick={openForm}

            style={isHovered === 'found-form' ? { ...navLinkStyle, ...highlightStyle } : navLinkStyle}
            onMouseEnter={() => setIsHovered('found-form')}
            onMouseLeave={() => setIsHovered(null)}
          >
            Report Found Item
          </p>
        </li>
        <li style={navItemStyle}>
          <Link
            to="/chat"
            style={isHovered === 'chat' ? { ...navLinkStyle, ...highlightStyle } : navLinkStyle}
            onMouseEnter={() => setIsHovered('chat')}
            onMouseLeave={() => setIsHovered(null)}
          >
            Chat
          </Link>
        </li>
      </ul>

      <button
        onClick={handleLogout}
        style={isHovered === 'logout' ? { ...logoutButtonStyle, ...logoutHighlightStyle } : logoutButtonStyle}
        onMouseEnter={() => setIsHovered('logout')}
        onMouseLeave={() => setIsHovered(null)}
      >
        Logout
      </button>
      <FoundItemForm isOpen={isFormOpen} onRequestClose={closeForm} resetVariable={resetVariable} />

    </nav>
  );
};

export default Navbar;
