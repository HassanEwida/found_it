import React from "react";
import FoundIt from './found_it_logo.png';
import { Tilt } from 'react-next-tilt';
import { Link } from "react-router-dom";
import './Header.css';

const Logo = ({ path }) => {
    if(path !== "/Login" || path !== "/Register"){
        return(
            <Link to={"/home"}>
            <header className="center w-100" style={{paddingTop: 10, paddingBottom: 50,}}>
                <Tilt options={{ max: 25, scale: 1.1 }} preserve3dEnable={true} className="tilt-container">
                    <div className='tilt-box'>
                        <img src={FoundIt} alt="logo" height='auto' width='250'/>
                    </div>
                </Tilt>
            </header>
            </Link>
        );
    }
}

export default Logo;