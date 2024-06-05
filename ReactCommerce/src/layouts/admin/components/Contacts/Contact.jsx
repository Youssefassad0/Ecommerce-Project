// src/components/ContactList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8001/api/contact')
            .then(response => {
                setContacts(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contacts!', error);
            });
    }, []);

    return (

        <div className="dropdown-list">
            {contacts.map(contact => (
                <Link key={contact.id} className="dropdown-item d-flex align-items-center" to={`/dashboard/contact/${contact.id}`}>
                    <div className="dropdown-list-image mr-3">
                        <img
                            className="rounded-circle"
                            src={`http://localhost:8001/${contact.user.avatar}`}
                            alt="..."
                        />
                        <div className={`status-indicator ${contact.id % 2 === 0 ? '' : 'bg-success'}`}></div>
                    </div>
                    <div className="font-weight-bold">
                        <div className="text-truncate">
                            {contact.message}
                        </div>
                        <div className="small text-gray-500">{contact.name} · {new Date(contact.created_at).toLocaleString()}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ContactList;
