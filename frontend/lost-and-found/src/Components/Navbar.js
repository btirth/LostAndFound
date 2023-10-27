// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../actions/authActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(null); // Track the hovered item

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    dispatch(logout());
    window.location = '/login';
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
  };

  const navItemStyle = {
    marginRight: '20px',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#fff', 
    fontWeight: 'bold',
  };

  const logoutButtonStyle = {
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const highlightStyle = {
    color: '#75e6a3',
    transition: 'color 0.3s ease-in-out',
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
      </ul>

      <button
        onClick={handleLogout}
        style={isHovered === 'logout' ? { ...logoutButtonStyle, ...highlightStyle } : logoutButtonStyle}
        onMouseEnter={() => setIsHovered('logout')}
        onMouseLeave={() => setIsHovered(null)}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
