// UserDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/users/${id}`);
                console.log(response);
                setUser(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>User Details</h1>
            {user && (
                <div>
                    <h2>{user.name}</h2>
                    {/* Display other user details */}
                    
                    <h3>Reviews</h3>
                    <ul>
                        {user.reviews.map(review => (
                            <li key={review.id}>
                                <p>Product: {review.product.name}</p>
                                <p>Review: {review.content}</p>
                            </li>
                        ))}
                    </ul>

                    <h3>Orders</h3>
                    <ul>
                        {user.orders.map(order => (
                            <li key={order.id}>
                                <p>Order ID: {order.id}</p>
                                <p>Total Price: {order.total_price}</p>
                                <h4>Order Details</h4>
                                <ul>
                                    {order.order_details.map(detail => (
                                        <li key={detail.id}>
                                            <p>Product: {detail.product.name}</p>
                                            <p>Price: {detail.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserDetail;
