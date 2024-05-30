/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const reviwtitle = "Add a Review";

const Review = () => {
  const [reviewShow, setReviewShow] = useState(true);
  const urlImg =
  "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: '',
  });

  useEffect(() => {
    async function fetchReviews(productId) {
      try {
        const res = await axios.get(`http://localhost:8001/api/products/${productId}/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error('ERROR: ' + err);
      }
    }
    fetchReviews(id);
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8001/api/products/${id}/reviews`, formData);
      console.log(response.data.message);
      Swal.fire('Success', 'Thank You for Your Review', 'success');
      // Optionally, you can refresh the reviews list here
      setFormData({ name: '', email: '', message: '', rating: '' });
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    }
  };
  const formatDate = (createdAt) => {
    const options = {
      month: 'short', // abbreviated month name (e.g., Jan)
      day: '2-digit', // day of the month (2 digits with leading zeros)
      year: 'numeric', // full year (e.g., 2022)
      hour: 'numeric', // hour (e.g., 6)
      minute: '2-digit', // minute (2 digits with leading zeros)
      hour12: true, // 12-hour time (true for am/pm)
    };
  
    // Create a new Date object from the createdAt timestamp
    const date = new Date(createdAt);
  
    // Return the formatted date string
    return date.toLocaleString('en-US', options);
  };
  
  return (
    <>
      <ul className={`review-nav lab-ul ${reviewShow ? "RevActive" : "DescActive"}`}>
        <li className="review" onClick={() => setReviewShow(!reviewShow)}>
          Reviews
        </li>
      </ul>
      <div className={`review-content ${reviewShow ? "review-content-show" : "description-show"}`}>
        <div className="review-showing">
          <ul className="content lab-ul">
            {reviews.map((review, i) => (
              <li key={i}>
                <div className="post-thumb">
                  <img src={review.user.avatar ? `http://localhost:8001/${review.user.avatar}` : urlImg} alt="Client thumb" />
                </div>
                <div className="post-content">
                  <div className="entry-meta">
                    <div className="posted-on">
                      <a href="#"> {review.user.name} </a>
                      <p> Posted On : {formatDate(review.created_at)} </p>
                    </div>
                  </div>
                  <div className="entry-content">
                    <p>{review.message}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="client-review">
            <div className="review-form">
              <div className="review-title">
                <h5>{reviwtitle}</h5>
              </div>
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-4 col-12">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name ..."
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 col-12">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email ..."
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 col-12">
                  <textarea
                    name="message"
                    id="message"
                    rows="8"
                    placeholder="Type Here Your Message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-12 col-12">
                  <button className="sendReview" style={{ background: 'transparent', color: 'black' }}>
                    <span className="box">Send Review!</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
