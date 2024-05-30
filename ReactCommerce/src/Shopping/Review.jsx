/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const reviwtitle = "Add a Review";

let ReviewList = [
  {
    imgUrl: "/src/assets/images/instructor/01.jpg",
    imgAlt: "Client thumb",
    name: "Ganelon Boileau",
    date: "Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/02.jpg",
    imgAlt: "Client thumb",
    name: "Morgana Cailot",
    date: "Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/03.jpg",
    imgAlt: "Client thumb",
    name: "Telford Bois",
    date: "Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/04.jpg",
    imgAlt: "Client thumb",
    name: "Cher Daviau",
    date: "Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
];
const Review = ({ img }) => {
  const [reviewShow, setReviewShow] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: '',
  });
  useEffect(() => {
    async function fetchReview(id) {
      await axios.get(`http://localhost:8001/api/products/${id}/reviews`).then(res => setReviews(res.data)).catch(err => {
        console.log('Error de : ' + err);
      })
    }
    fetchReview(id);
    console.log(reviews);
  }, [id])
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ul
        className={`review-nav lab-ul ${reviewShow ? "RevActive" : "DescActive"
          } `}
      >

        <li className="rev" onClick={() => setReviewShow(!reviewShow)}>
          Reviews
        </li>
      </ul>
      {/* Review Content  */}
      <div
        className={`review-content ${reviewShow ? "review-content-show" : "description-show"
          }`}
      >
        <div className="review-showing">
          <ul className="content lab-ul">
            {ReviewList.map((review, i) => (
              <li key={i}>
                <div className="post-thumb">
                  <img src={review.imgUrl} alt="" />
                </div>
                <div className="post-content">
                  <div className="entry-meta">
                    <div className="posted-on">
                      <a href="#"> {review.name} </a>
                      <p> Posted On : {review.date} </p>
                    </div>
                  </div>
                  <div className="entry-content">
                    <p>{review.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Add Review Field  */}
          <div className="client-review">
            <div className="review-form">
              <div className="review-title">
                <h5>{reviwtitle}</h5>
              </div>
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-4 col-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name ..."
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 col-1">
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

                <button className="sendReview" style={{ background: 'transparent', color: "black" }} >
                  <span className="box">Send Review!</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
