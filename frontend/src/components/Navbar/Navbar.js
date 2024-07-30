// src/components/Navbar.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../app-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
    <nav style={{ position: 'end', marginLeft: '30px'}}>
        <Link to={"./profile"}>
        <button className="button-52">
          <FontAwesomeIcon icon={faUser} />
          <span style={{ marginLeft: '10px' }}>Profile</span>
        </button>
        </Link>

        <button className="button-52" onClick={handleSignOut}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span style={{ marginLeft: '10px' }}>Sign Out</span>
        </button>
    </nav>
  );
};

export default Navbar;
