import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


const Login = () => {
    const { register, handleSubmit } = useForm();
    const [ newCredintials, setNewCredintials ] = useState("");
    return(
        <div className="pa5">
        <h1 className="f1">Login</h1>
        <form onSubmit={handleSubmit((newCredintials) => setNewCredintials(JSON.stringify(newCredintials)))} style={{textAlign: 'left', margin: 'auto', width: '100%', maxWidth: '800px'}}>
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

            <p>{console.log(newCredintials)}</p>
            <Link to='/home'>
                <button type="submit" className="button-52">Login</button>
            </Link>

            <p>New user?</p>
            <Link to='/Register'>
                <button type="submit" className="button-52">Register</button>
            </Link>
        </form>
    </div>
    )
}


export default Login;




