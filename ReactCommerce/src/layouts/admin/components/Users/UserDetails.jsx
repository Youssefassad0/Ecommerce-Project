import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useParams();
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/users/${userId}`);
                setUser(response.data);
                console.log(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>User Details</h1>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <h2>Orders</h2>
            <ul>
                {/* {user.orders.map(order => (
                    <li key={order.id}>
                        <p><strong>Product:</strong> {order.product_name}</p>
                        <p><strong>Quantity:</strong> {order.quantity}</p>
                        <p><strong>Price:</strong> ${order.price}</p>
                        <h3>Reviews</h3>
                        <ul>
                            {order.reviews.map(review => (
                                <li key={review.id}>
                                    <p><strong>Review:</strong> {review.review}</p>
                                    <p><strong>Rating:</strong> {review.rating}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))} */}
            </ul>

            <h2>Reviews</h2>
            <ul>
                {user.reviews.map(review => (
                    <li key={review.id}>
                        <p><strong>Order ID:</strong> {review.order_id}</p>
                        <p><strong>Review:</strong> {review.review}</p>
                        <p><strong>Rating:</strong> {review.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDetails;
