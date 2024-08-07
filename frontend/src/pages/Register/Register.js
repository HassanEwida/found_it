import React, {useContext, useState} from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { AppContext } from "../../app-context";



const Register = () => {
    const { register, handleSubmit } = useForm();
    
    const navigate = useNavigate();
    
    const { state, setState } = useContext(AppContext);

    const onRegister = async (credentials) => {

        try {
            const { user, token} = (await axios.post(`http://localhost:3001/auth/register`, {
                email: credentials.email,
                username: credentials.username,
                password: credentials.password,
            })).data;

            setState({
                user,
                token
            });

            navigate('/login');

        } catch(err) {
            console.log(err);
        }
    }
    return(
        <div>
                <nav style={{display: 'flex', position: 'start', marginLeft: '30px'}}>
                    <Link to="/">
                        <button className="button-52">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span style={{ marginLeft: '10px' }}>Back</span>
                        </button>
                    </Link>
                </nav>
            <div className="pa5">
                <h1 className="f1">Register</h1>
                <form onSubmit={handleSubmit(onRegister)} style={{textAlign: 'left', margin: 'auto', width: '100%', maxWidth: '800px'}}>
                    <div className="input-wrapper">
                        <input {...register("email", {required: true})} type="email" className="input-field" />
                        <span className="input-label">Email:</span>
                        <span className="input-shadow"></span>
                    </div>
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
                    <div className="input-wrapper">
                        <input {...register("confirmPassword", {required: true})} type="password" className="input-field" />
                        <span className="input-label">Confirm Password:</span>
                        <span className="input-shadow"></span>
                    </div>
                    <button type="submit" className="button-52">
                    <FontAwesomeIcon icon={faPen}/>
                    <span style={{ marginLeft: '10px' }}>Register</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register;