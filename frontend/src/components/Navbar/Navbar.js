// src/components/Navbar.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../app-context';
import axios from 'axios';
import './Navbar.css'; // Create and import CSS file for styling

const Navbar = () => {
    const { state, setState } = useContext(AppContext);
    const navigate = useNavigate();
  
    const handleSignOut = async () => {
      try {
        // First, clear the token and user data from the client-side state
        setState({ user: null, token: null });
    
        // Then, attempt to notify the server (but don't wait for the response)
        axios.post('http://localhost:3001/auth/signOut', {}, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        }).catch(error => {
          // Log any errors, but don't block the sign-out process
          console.log('Error notifying server about sign-out:', error);
        });
    
        // Immediately redirect the user
        navigate('/login');
      } catch (error) {
        console.error('Error during sign-out:', error);
      }
    };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={handleSignOut}>Sign Out</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
