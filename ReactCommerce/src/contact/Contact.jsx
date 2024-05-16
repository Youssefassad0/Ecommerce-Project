import React from "react";
import PageHeader from "../components/PageHeader";
import GoogleMap from "../components/GoogleMap";
import { useTranslation } from "react-i18next";
import NavItems from "../components/NavItems";
import Footer from "../components/Footer";
import IndexHome from "../ChatSupport/Home/IndexHome";
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
    link:'mailto:youssefassad158@gmail.com'
  },
  {
    imgUrl: "/src/assets/images/icon/02.png",
    imgAlt: "contact icon",
    title: "Phone number",
    desc: "+212 638048315",
    link:'mailto:youssefassad158@gmail.com'
  },
  {
    imgUrl: "/src/assets/images/icon/03.png",
    imgAlt: "contact icon",
    title: "Send email",
    desc: "assad@assadShop.com",
    link:'mailto:youssefassad158@gmail.com'
  },
  {
    imgUrl: "/src/assets/images/icon/04.png",
    imgAlt: "contact icon",
    title: "Our website",
    desc: "www.assadshop.com",
    link:'localhost:5173'
  },
];
const Contact = () => {
  const {t}=useTranslation();
  return (
    <div>
      <NavItems/>
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
            <h2> {conTitle} </h2>
          </div>
          <div className="section-wrapper">
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name.." />
              </div>

              <div className="form-group">
                <input type="email" placeholder="Your Email.." />
              </div>

              <div className="form-group">
                <input type="number" placeholder="Phone Number" />
              </div>

              <div className="form-group">
                <input type="text" placeholder="Your Subject..." />
              </div>
              <div className="form-group w-100 ">
                <textarea rows="8"> Your Message Here .  </textarea>
              </div>
              <div className="form-group w-100 text-center ">
                <button className="lab-btn" >
                    Send To us 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <IndexHome/>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;
