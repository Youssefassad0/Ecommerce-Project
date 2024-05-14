import React, { useState } from "react";
import NavItems from "../NavItems";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
function RegisterPage() {
    const navigate = useNavigate();
    const [registerInput, setRegisterInput] = useState({
        name: "",
        email: "",
        password: "",
        error_list: {},
    });
    const [message, setMessage] = useState("");

    const handleInputs = (e) => {
        e.persist();
        setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        };
        axios
            .get("http://127.0.0.1:8001/sanctum/csrf-cookie").then((response) => {
                axios
                    .post("http://127.0.0.1:8001/api/register", data)
                    .then((res) => {
                        if (res.data.status !== 201) {
                            setRegisterInput({
                                ...registerInput,
                                error_list: res.data.errors,
                            });
                        }
                        else {
                            localStorage.setItem('auth-token', res.data.token)
                            localStorage.setItem('auth-user', JSON.stringify(res.data.data));
                            setMessage('Welcome Mr ' + registerInput.name)
                            setTimeout(() => {
                                navigate('/')
                            }, 1000)
                        }
                    })
                    .catch((error) => console.error("Error:", error));
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
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                {message && (
                                    <Alert variant="outlined" severity="success">
                                        {message}
                                    </Alert>
                                )}
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Full Name </label>
                                        <input
                                            type="text"
                                            onChange={handleInputs}
                                            name="name"
                                            value={registerInput.name}
                                            className="form-control"
                                        />
                                        <span className="text-danger">
                                            {registerInput.error_list &&
                                                registerInput.error_list.name}{" "}
                                        </span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email </label>
                                        <input
                                            type="email"
                                            onChange={handleInputs}
                                            name="email"
                                            value={registerInput.email}
                                            className="form-control"
                                        />
                                        <span className="text-danger">
                                            {registerInput.error_list &&
                                                registerInput.error_list.email}{" "}
                                        </span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password </label>
                                        <input
                                            type="password"
                                            onChange={handleInputs}
                                            name="password"
                                            value={registerInput.password}
                                            className="form-control"
                                        />
                                        <span className="text-danger">
                                            {registerInput.error_list &&
                                                registerInput.error_list.password}{" "}
                                        </span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;
