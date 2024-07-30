import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faList } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {


    return (
        <div className="welcome-section">
            <nav>
            <Navbar />
            </nav>
             <nav style={{ display: 'flex', position: 'end', marginLeft: '30px' }}></nav>
            <h1 className="welcome-heading">Welcome to Found It!</h1>
            <p className="motto">The virtual lost & found, at your fingertips.</p>
            <p className="description">
                If you lost anything in the past few days, you'll find it here. Help yourself and click the "Search" button below.
            </p>
            <p className="description">
                If you found something that doesn't belong to you or anyone you know, you can list it here until the owner contacts you.
            </p>
            <p className="description">
                <b>To do so, please click on the "List an Item" button.</b>
            </p>
            <div className="button-container">
                <Link to="/SearchItem">
                    <button className="button-52" style={{ marginRight: 25, fontSize: '50px' }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} beat size="lg" />
                        <span className="button-text">Search</span>
                    </button>
                </Link>
                <Link to="/ListItem">
                    <button className="button-52" style={{ marginLeft: 25, fontSize: '50px' }}>
                        <FontAwesomeIcon icon={faList} beat size="lg" />
                        <span className="button-text">List an Item</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;