import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavItems from '../../../components/NavItems';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PageProfile() {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        location: '',
        password: '',
        password2: '',
        avatar: null
    });
    const [avatarPreview, setAvatarPreview] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');
    const [reviewCount, setReviewCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://127.0.0.1:8001/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const reviews = await axios.get('http://127.0.0.1:8001/api/getUserReviews', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const orders = await axios.get('http://127.0.0.1:8001/api/getUserOrders', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setReviewCount(reviews.data.length);
                setOrderCount(orders.data.length);

                setFormData({
                    ...res.data,
                    password: '',
                    password2: ''
                });

                if (res.data.avatar) {
                    setAvatarPreview(`http://localhost:8001/${res.data.avatar}`);
                }
            } catch (error) {
                navigate('/');
                const er = error.response?.data?.message || 'An error occurred';
                Swal.fire('Error', er, 'error');
                console.error('Error fetching user data:', error);
            }
        }
        fetchData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            setFormData({
                ...formData,
                avatar: file
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Name and Email are required!'
            });
            return;
        }

        if (formData.password && formData.password !== formData.password2) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Passwords do not match!'
            });
            return;
        }

        const data = new FormData();
        data.append('_method', 'PUT');
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post(`http://127.0.0.1:8001/api/user/profile/update`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success("Your Profile Has Been Updated!");
        } catch (error) {
            console.error('Error updating profile:', error);
            const er = error.response?.data?.message || 'An error occurred while updating your profile.';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: er
            });
        }
    };

    const reset = () => {
        setFormData({
            name: '',
            mobile: '',
            email: '',
            location: '',
            password: '',
            password2: '',
            avatar: null
        });
        setAvatarPreview('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');
        toast.info('Your Information is Empty Now');
    };

    return (
        <>
            <div className="nav mb-5" style={{ height: "40px" }}>
                <NavItems />
            </div>
            <ToastContainer />
            <div className="container bootstrap snippet mt-5">
                <div className="row">
                    <div className="col-sm-10 mt-3">
                        <h3>User Profile</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="text-center">
                            <img src={avatarPreview} className="avatar img-circle img-thumbnail" alt="avatar" />
                            <h6>Upload a different photo...</h6>
                            <input type="file" className="text-center center-block file-upload" onChange={handleFileChange} />
                        </div>
                        <br />
                        <ul className="list-group">
                            <li className="list-group-item text-muted">Activity</li>
                            <li className="list-group-item text-right"><span className="pull-left"><strong>Reviews</strong></span> {reviewCount}</li>
                            <li className="list-group-item text-right"><span className="pull-left"><strong>Orders</strong></span>{orderCount} </li>
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        <div className="tab-content">
                            <div className="tab-pane active" id="home">
                                <hr />
                                <form className="form" onSubmit={handleSubmit} id="registrationForm">
                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label htmlFor="name"><h4>Full name</h4></label>
                                            <input type="text" className="form-control" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Full name" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label htmlFor="mobile"><h4>Mobile</h4></label>
                                            <input type="text" className="form-control" name="mobile" id="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile number"  />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label htmlFor="email"><h4>Email</h4></label>
                                            <input type="email" className="form-control" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label htmlFor="location"><h4>Location</h4></label>
                                            <input type="text" className="form-control" name="location" id="location" value={formData.location} onChange={handleChange} placeholder="Location"  />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label htmlFor="password"><h4>Password</h4></label>
                                            <input type="password" className="form-control" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label htmlFor="password2"><h4>Verify</h4></label>
                                            <input type="password" className="form-control" name="password2" id="password2" value={formData.password2} onChange={handleChange} placeholder="Verify password" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <br />
                                            <button className="btn btn-lg btn-success" type="submit">
                                                <i className="glyphicon glyphicon-ok-sign"></i> Save
                                            </button>
                                            <button className="btn btn-lg" onClick={reset} type="button">
                                                <i className="glyphicon glyphicon-repeat"></i> Reset
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PageProfile;
