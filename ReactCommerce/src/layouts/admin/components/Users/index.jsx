/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from 'sonner'

const ProfileTemplate = () => {
    const [activeTab, setActiveTab] = useState("account-general");
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        location: '',
        password: '',
        password2: '',
        avatar: null
    });
    const defaultImgUrl = "https://bootdey.com/img/Content/avatar/avatar1.png";
    const [avatarPreview, setAvatarPreview] = useState(defaultImgUrl);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            setFormData({
                name: '',
                mobile: '',
                email: '',
                location: '',
                password: '',
                password2: '',
                avatar: null
            });
        }
    };

    const handleReset = () => {
        setAvatarPreview(user && user.avatar ? `http://localhost:8001/${user.avatar}` : defaultImgUrl);
        setFormData({
            name: '',
            mobile: '',
            email: '',
            location: '',
            password: '',
            password2: '',
            avatar: null
        });
        toast.warning('Avatar reset to default.');
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/users/${id}`);
                const response2 = await axios.get(`http://localhost:8001/api/reviews/${IdleDeadline}`)
                const userData = response.data;
                setReviews(userData.reviews);
                // console.log(reviews);
                setUser(userData);
                setAvatarPreview(userData.avatar ? `http://localhost:8001/${userData.avatar}` : defaultImgUrl);
                setFormData({
                    ...formData,
                    name: userData.name,
                    email: userData.email,
                    mobile: userData.mobile,
                    location: userData.location,
                    password: userData.password
                });
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };
        fetchUser();
    }, [id]);


    return (
        <div className="container light-style flex-grow-1 container-p-y">
            <Toaster richColors />
            <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
            <div className="card overflow-hidden">
                <div className="row no-gutters row-bordered row-border-light">
                    <div className="col-md-3 pt-0">
                        <div className="list-group list-group-flush account-settings-links">
                            <a
                                className={`list-group-item list-group-item-action ${activeTab === "account-general" ? "active" : ""}`}
                                onClick={() => handleTabClick("account-general")}
                            >
                                General
                            </a>
                            <a
                                className={`list-group-item list-group-item-action ${activeTab === "account-change-password" ? "active" : ""}`}
                                onClick={() => handleTabClick("account-change-password")}
                            >
                                Password
                            </a>
                            <a
                                className={`list-group-item list-group-item-action ${activeTab === "account-info" ? "active" : ""}`}
                                onClick={() => handleTabClick("account-info")}
                            >
                                Reviews
                            </a>
                            <a
                                className={`list-group-item list-group-item-action ${activeTab === "account-social-links" ? "active" : ""}`}
                                onClick={() => handleTabClick("account-social-links")}
                            >
                                Social links
                            </a>
                           
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="tab-content">
                            <div className={`tab-pane fade ${activeTab === "account-general" ? "active show" : ""}`} id="account-general">
                                <div className="card-body media align-items-center">
                                    <img
                                        src={avatarPreview}
                                        alt="avatar"
                                        className="d-block ui-w-80"
                                    />
                                    <div className="media-body ml-4">
                                        <label className="btn btn-outline-primary">
                                            Upload new photo
                                            <input type="file" className="account-settings-fileinput" onChange={handleFileChange} />
                                        </label>
                                        &nbsp;
                                        <button type="button" className="btn btn-default md-btn-flat" onClick={handleReset}>
                                            Reset
                                        </button>
                                        <div className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                                    </div>
                                </div>
                                <hr className="border-light m-0" />
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control mb-1" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">E-mail</label>
                                        <input type="text" className="form-control mb-1" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Company</label>
                                        <input type="text" className="form-control" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className={`tab-pane fade ${activeTab === "account-change-password" ? "active show" : ""}`} id="account-change-password">
                                <div className="card-body pb-2">
                                    <div className="form-group">
                                        <label className="form-label">Current password</label>
                                        <input type="password" value={formData.password} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">New password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Repeat new password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className={`tab-pane fade ${activeTab === "account-info" ? "active show" : ""}`} id="account-info">
                                <div className="card-body pb-2">
                                    <ul>
                                        {reviews.map((review, index) => (
                                            <li key={index} className="mb-3">
                                                <div>
                                                    <strong>Review:</strong> {review.message}
                                                </div>
                                                <div>
                                                    <strong>Date de review:</strong> {new Date(review.created_at).toLocaleString()}
                                                </div>
                                                <div>
                                                    <strong>Rating:</strong> {review.rating}
                                                </div>
                                                <div>
                                                    <strong>Product:</strong> {review.product.name}
                                                </div>
                                               
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <hr className="border-light m-0" />
                               
                            </div>
                            <div className={`tab-pane fade ${activeTab === "account-social-links" ? "active show" : ""}`} id="account-social-links">
                                <div className="card-body pb-2">
                                    <div className="form-group">
                                        <label className="form-label">Twitter</label>
                                        <input type="text" className="form-control" defaultValue="https://twitter.com/user" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Facebook</label>
                                        <input type="text" className="form-control" defaultValue="https://www.facebook.com/user" />
                                    </div>
                                    <div className="card-body pb-2">
                                    <h6 className="mb-4">Contacts</h6>
                                    <div className="form-group">
                                        <label className="form-label">Phone</label>
                                        <input type="text" className="form-control" value={formData.mobile}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Website</label>
                                        <input type="text" className="form-control" defaultValue="" />
                                    </div>
                                </div>
                                </div>
                            </div>
                          
                         
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right mt-3">
                <button type="button" className="btn btn-primary">
                    Save changes
                </button>
                &nbsp;
                <button type="button" className="btn btn-default">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ProfileTemplate;
