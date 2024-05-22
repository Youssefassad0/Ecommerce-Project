import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import GoogleMap from "../components/GoogleMap";
import { useTranslation } from "react-i18next";
import NavItems from "../components/NavItems";
import Footer from "../components/Footer";
import IndexHome from "../ChatSupport/Home/IndexHome";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const title = "We're Always Eager To Hear From You!";
const conSubTitle = "Get in touch with Contact us";
const conTitle =
  "Fill The Form Below So We Can Get To Know You And Your Needs Better.";

const contactList = [
  {
    imgUrl: "/src/assets/images/icon/01.png",
    imgAlt: "contact icon",
    title: "Office Address",
    desc: "OFPPT NTIC1, Casa Blanca",
    link: 'mailto:youssefassad158@gmail.com'
  },
  {
    imgUrl: "/src/assets/images/icon/02.png",
    imgAlt: "contact icon",
    title: "Phone number",
    desc: "+212 638048315",
    link: 'mailto:youssefassad158@gmail.com'
  },
  {
    imgUrl: "/src/assets/images/icon/03.png",
    imgAlt: "contact icon",
    title: "Send email",
    desc: "assad@assadShop.com",
    link: 'mailto:youssefassad158@gmail.com'
  },
  {
    imgUrl: "/src/assets/images/icon/04.png",
    imgAlt: "contact icon",
    title: "Our website",
    desc: "www.assadshop.com",
    link: 'localhost:5173'
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const nav = useNavigate('/contact');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8001/api/contact', formData);
      alert(response.data.success)
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'the Message  sended  successfully!',
        });

        nav('/dashboard/category')
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
          console.log(errors);
        }
      } else {
        console.error('Request failed:', error.message);
      }
    }
  };
  return (
    <div>
      <NavItems />
      <div className="">

        <PageHeader title={"Get In Touch With Us "} curPage={"Contact Us"} />
        <div className="map-address-section padding-tb section-bg">
          <div className="container">
            <div className="section-header text-center">
              <span className="subtitle"> {(`subTitle`)} </span>
              <h2 className="title"> {(`title`)} </h2>
            </div>
            <div className="section-wrapper">
              <div className="row flex-row-reverse ">
                <div className="col-xl-4 col-lg-5 col-12">
                  {contactList.map((val, i) => (
                    <div key={i} className="contact-item">
                      <div className="contact-thumb">
                        <img src={val.imgUrl} alt={val.imgAlt} />
                      </div>
                      <div className="contact-content">
                        <h6 className="title">{val.title}</h6>
                        <a href={val.link}>  <p>{val.desc}</p></a>
                      </div>
                    </div>
                  ))}
                </div>
                {/* google Map */}
                <div className="col-xl-8 xol-lg-7 col-12">
                  <GoogleMap />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-section padding-tb">
          <div className="container">
            <div className="section-header text-center">
              <span className="subtitle">{conSubTitle}</span>
              <h2>{conTitle}</h2>
            </div>
            <div className="section-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name.."
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className='text-danger'>{errors.name[0]}</span>}

                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email.."
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className='text-danger'>{errors.email[0]}</span>}

                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}

                  />
                  {errors.phone && <span className='text-danger'>{errors.phone[0]}</span>}

                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Your Subject..."
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && <span className='text-danger'>{errors.subject[0]}</span>}

            °    </div>
                <div className="form-group w-100">
                  <textarea
                    name="message"
                    rows="8"
                    placeholder="Your Message Here"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && <span className='text-danger'>{errors.message[0]}</span>}

                </div>
                <div className="form-group w-100 text-center">
                  <button className="lab-btn" type="submit">
                    Send To us
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <IndexHome />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
