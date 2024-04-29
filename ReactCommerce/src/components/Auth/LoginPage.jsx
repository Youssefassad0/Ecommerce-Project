import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../../firebase/firebase.config'
import { getAuth } from "firebase/auth";
import NavItems from '../NavItems';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const provider = new GoogleAuthProvider();
const auth = getAuth();
function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                alert("Login Successfully Done !")
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    const [loginInputs, setLogin] = useState({
        email: '',
        password: '',
        error_list: {}
    })
    const handleInputs = (e) => {
        e.persist();
        setLogin({
            ...loginInputs, [e.target.name]: e.target.value
        })
    }
    const loginSubmit = (e) => {
        e.preventDefault();
    
        const data = {
            email: loginInputs.email,
            password: loginInputs.password,
        };
    
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post('http://localhost:8001/api/login', data)
                    .then(res => {
                        if (res.data.status === 200) {
                            localStorage.setItem('auth-token', res.data.token);
                            localStorage.setItem('auth-name', res.data.data.name);
                            Swal.fire('Success', `Welcome Back Mr. ${res.data.data.name}`, 'success'); // Change Swal to Swal.fire
                            navigate('/');
                        } else if (res.data.status === 404) {
                            Swal.fire('Warning', res.data.message, 'warning'); // Change Swal to Swal.fire
                        } else {
                            setLogin({
                                ...loginInputs,
                                error_list: res.data.errors,
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    
    return (
        <>
            <NavItems />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5 ">
                        <div className="card mt-5">
                            <div className="card-header">
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                {/* {message && (
                                   <Alert variant="outlined" severity="success">
                                   {message}
                                 </Alert>
                                )} */}
                                <form onSubmit={loginSubmit} >
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email </label>
                                        <input
                                            type="email"
                                            onChange={handleInputs}
                                            name="email"
                                            value={loginInputs.email}
                                            className="form-control"
                                        />
                                        <span className="text-danger">
                                            {loginInputs.error_list && loginInputs.error_list.email}
                                        </span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password </label>
                                        <input
                                            onChange={handleInputs}
                                            type="password"
                                            name="password"
                                            value={loginInputs.password}
                                            className="form-control"
                                        />
                                        <span className="text-danger">
                                            {loginInputs.error_list && loginInputs.error_list.password}
                                        </span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage