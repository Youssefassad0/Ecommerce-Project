import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ContactDetail = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8001/api/contact/${id}`)
            .then(response => {
                setContact(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contact!', error);
            });
    }, [id]);

    if (!contact) {
        return <div>Loading...</div>;
    }

    return (
        <div className="contact-detail-container mt-4 ml-4">
            <div className="contact-detail-card">
                <h2>{contact.subject}</h2>
                <div className="contact-detail-info">
                    <div className="contact-detail-item">
                        <strong>Name:</strong> {contact.name}
                    </div>
                    <div className="contact-detail-item">
                        <strong>Email:</strong> {contact.email}
                    </div>
                    <div className="contact-detail-item">
                        <strong>Phone:</strong> {contact.phone}
                    </div>
                    <div className="contact-detail-item">
                        <strong>Message:</strong> 
                        <p>{contact.message}</p>
                    </div>
                    <div className="contact-detail-item">
                        <strong>Received:</strong> {new Date(contact.created_at).toLocaleString()}
                    </div>
                </div>
                <div className="contact-detail-actions">
                    <Link to={`/dashboard/user/${contact.id_user}`} className="back-button"> See Details User  </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactDetail;
