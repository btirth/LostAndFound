// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location = '/login';
  };

  const navbarStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
  };

  const navListStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0',
    padding: '0',
  };

  const navItemStyle = {
    marginRight: '20px',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: isHovered ? '#75e6a3' : '#fff',
    fontWeight: 'bold',
    transition: 'color 0.3s ease-in-out',
  };

  const logoutButtonStyle = {
    backgroundColor: isHovered ? '#75e6a3' : '#333',
    color: isHovered ? '#fff' : '#75e6a3',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  };

  return (
    <nav style={navbarStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link
            to="/home"
            style={navLinkStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Home
          </Link>
        </li>
        <li style={navItemStyle}>
          <button
            onClick={handleLogout}
            style={logoutButtonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
