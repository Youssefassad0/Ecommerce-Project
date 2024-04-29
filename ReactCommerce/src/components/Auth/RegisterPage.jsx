import React, { useState } from "react";
import NavItems from "../NavItems";
import axios from "axios";

function RegisterPage() {
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [message,setMessage]=useState('');
    const handleInputs = (e) => {
        e.presist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value })
    }
    const RegisterSubmit = (e) => {
        e.preventDefault();
        const data={
            name:registerInput.name,
            email:registerInput.email,
            password:registerInput.password,
        }
        axios.get('/sunctum/csrf-cookie').then(response=>{
            axios.post('http://127.0.0.1:8001/api/register',data).then(res=>
            setMessage(res.data.message)
        )
    })
    }
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
                                <form onSubmit={RegisterSubmit} >
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Full Name </label>
                                        <input type="text" 
                                        onChange={handleInputs}
                                            name="name"
                                        value={registerInput.name} 
                                        className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email </label>
                                        <input type="email" onChange={handleInputs}
                                            name="email" value={registerInput.email} className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password </label>
                                        <input
                                            onChange={handleInputs} type="password"
                                            name="password"
                                            value={registerInput.password} className="form-control"
                                        />
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
