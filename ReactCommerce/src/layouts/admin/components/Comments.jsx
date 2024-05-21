import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductComments() {
    const [comments, setComments] = useState([]);
    // const productId = 1;
    useEffect(() => {
        axios.get(`http://127.0.0.1:8001/api/products/1/comments`)
            .then(response => {
               setComments(response.data.comments);
                // setComments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the comments!', error);
            });
    });

    return (
        <div>
            <h3>Comments</h3>
            {comments.length > 0 ? (
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>
                            <strong>{comment.user.name}</strong>: {comment.comment} (Rating: {comment.rating})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
}

export default ProductComments;
