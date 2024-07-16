import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faArrowLeft } from '@fortawesome/free-solid-svg-icons';



const Register = () => {
    const { register, handleSubmit } = useForm();
    const [ newRegister, setNewRegister ] = useState("");
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
                <form onSubmit={handleSubmit((newRegister) => setNewRegister(JSON.stringify(newRegister)))} style={{textAlign: 'left', margin: 'auto', width: '100%', maxWidth: '800px'}}>
                    <div className="input-wrapper">
                        <input {...register("username", {required: true})} type="email" className="input-field" />
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
                    <p>{console.log(newRegister)}</p>
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