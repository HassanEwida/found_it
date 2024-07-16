import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { AppContext } from "../../app-context";


const Login = () => {
    const { register, handleSubmit } = useForm();
    
    const navigate = useNavigate();

    const { state, setState } = useContext(AppContext);

    const onLogin = async (credentials) => {

        try {
            const { user, token } = (await axios.post(`http://localhost:3001/auth/login`, {
                username: credentials.username,
                password: credentials.password,
            })).data;


            setState({
                user,
                token
            });

            navigate('/home');

        } catch(err) {
            alert('Incorrect credentials');
        }
    }

    return(
        <div className="pa5">
        <h1 className="welcome-heading">Welcome to Found It!</h1>
        <p className="motto">The virtual lost & found, at your fingertips.</p>
        <h1 className="f1">Login</h1>
        <form onSubmit={handleSubmit(onLogin)} style={{textAlign: 'left', margin: 'auto', width: '100%', maxWidth: '800px'}}>
            <div className="input-wrapper">
                <input {...register("username", {required: true})} className="input-field" />
                <span className="input-label">Username:</span>
                <span className="input-shadow"></span>
            </div>
            <div className="input-wrapper">
                <input {...register("password", {required: true})} type="password" className="input-field" />
                <span className="input-label">Password:</span>
                <span className="input-shadow"></span>
            </div>

            <button type="submit" className="button-52">
            <FontAwesomeIcon icon={faRightToBracket} />
            <span style={{ marginLeft: '10px' }}>Login</span>
            </button>

            <p>New user?</p>
            <Link to='/Register'>
                <button className="button-52">
                <FontAwesomeIcon icon={faPen} />
                <span style={{ marginLeft: '10px' }}>Register</span>
                </button>
            </Link>
        </form>
    </div>
    )
}


export default Login;




