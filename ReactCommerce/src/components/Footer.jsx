import React from "react";
import { Link } from "react-router-dom";
const ItemTitle = "Categories";
const quickTitle = "Quick Links";
const tweetTitle = "Recent Tweets";

const addressList = [
  {
    iconName: "icofont-google-map",
    text: "Morroco , casa-blanca",
  },
  {
    iconName: "icofont-phone",
    text: "+212 638048315",
  },
  {
    iconName: "icofont-envelope",
    text: "youssefassad158@gmail.com",
  },
];

const socialList = [
  {
    iconName: "icofont-facebook",
    siteLink: "https://web.facebook.com/youssef.assad.75/",
    className: "facebook",
  },
  {
    iconName: "icofont-twitter",
    siteLink: "#",
    className: "twitter",
  },
  {
    iconName: "icofont-linkedin",
    siteLink: "#",
    className: "linkedin",
  },
  {
    iconName: "icofont-instagram",
    siteLink: "#",
    className: "instagram",
  },
  {
    iconName: "icofont-pinterest",
    siteLink: "#",
    className: "pinterest",
  },
];

const ItemList = [
  {
    text: "All Products",
    link: "/shop",
  },
  {
    text: "Shop",
    link: "/shop",
  },
  {
    text: "Blog",
    link: "/blog",
  },
  {
    text: "About",
    link: "/about",
  },
  {
    text: "Policy",
    link: "#",
  },
  {
    text: "FAQs",
    link: "/about",
  },
];

const quickList = [
  {
    text: "Summer Sessions",
    link: "#",
  },
  {
    text: "Events",
    link: "#",
  },
  {
    text: "Gallery",
    link: "#",
  },
  {
    text: "Forums",
    link: "#",
  },
  {
    text: "Privacy Policy",
    link: "#",
  },
  {
    text: "Terms of Use",
    link: "#",
  },
];

const tweetList = [
  {
    iconName: "icofont-twitter",
    desc: (
      <p>
        Assad Youssef<a href="#">@ShopCart Greetings! #HTML_Template</a> Grab
        your item, 50% Big Sale Offer !!
      </p>
    ),
  },
  {
    iconName: "icofont-twitter",
    desc: (
      <p>
        Assadb Youssef<a href="#">@ShopCart Hey! #HTML_Template</a> Grab your
        item, 50% Big Sale Offer !!
      </p>
    ),
  },
];

const footerbottomList = [
  {
    text: "Ista",
    link: "#",
  },
  {
    text: "ntic",
    link: "#",
  },
  {
    text: "Isfo",
    link: "#",
  },
  {
    text: "CFMOTI",
    link: "#",
  },
];
const Footer = () => {
  return (
    <footer className="style-2">
      <div className="footer-top dark-view padding-tb ">
        <div className="container">
          <div className="row g-4 row-cols-xl-4 row-cols-sm-2 row-cols-1 justify-center  ">
            <div className="col">
              <div className="footer-item our-address">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>About ShopCart</h4>
                    </div>
                    <div className="content">
                      <p>
                        Welcome To us , we are every where , with the best sales
                        , we also offer to our client some courses online , don
                        t Forhet to join us
                      </p>
                      <ul className="lab-ul office-address">
                        {addressList.map((val, i) => (
                          <li key={i}>
                            <i className={val.iconName}>{val.text}</i>
                          </li>
                        ))}
                      </ul>
                      <ul className="lab-ul social-icons">
                        {socialList.map((val, i) => (
                          <li key={i}>
                            <a href="#" className={val.className}>
                              <i className={val.iconName}>{val.text}</i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="footer-item our-address">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>{quickTitle}</h4>
                    </div>
                    <div className="content">
                      <ul className="lab-ul office-address">
                        {quickList.map((val, i) => (
                          <li key={i}>
                            <a href="#" className={val.iconName}>
                              {val.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="footer-item our-address">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>{ItemTitle}</h4>
                    </div>
                    <div className="content">
                      <ul className="lab-ul office-address">
                        {ItemList.map((val, i) => (
                          <li key={i}>
                            <a href="#" className={val.iconName}>
                              {val.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="footer-item our-address">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>{tweetTitle}</h4>
                    </div>
                    <div className="content">
                      <ul className="lab-ul office-address">
                        {tweetList.map((val, i) => (
                          <li key={i}>
                            <i className={val.iconName}></i>
                            {val.desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom  */}
      <div className="footer-bottom">
        <div className="container">
          <div className="section-wrapper">
            <p>
              &copy; 2023 <Link to="/">Shop Cart</Link> Designed By{" "}
              <Link to="/aboutAssad">
                Assad Youssef
              </Link>
            </p>
            <div className="footer-bottom-list">
              {footerbottomList.map((val, i) => (
                <a key={i} href="#">
                  {val.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
