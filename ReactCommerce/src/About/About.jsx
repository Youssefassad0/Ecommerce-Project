import React from "react";
import PageHeader from "../components/PageHeader";
import NavItems from "../components/NavItems";
import Footer from "../components/Footer";
const subTitle = "About Us";
const title = "Good Qualification Services And Better Expriences";
const desc =
  "At AssadShop, we're committed to delivering top-notch services and ensuring exceptional experiences for our users. Our mission is to provide accessible and multifunctional solutions, all while maintaining transparent processes that incentivize efficiency.";

const year = "10+";
const expareance = "Years Of Experiences";

const aboutList = [
  {
    imgUrl: "/src/assets/images/about/icon/01.jpg",
    imgAlt: "about icon ",
    title: "Skilled Instructors",
    desc: "Distinctively provide acces mutfuncto users whereas communicate leveraged services",
  },
  {
    imgUrl: "/src/assets/images/about/icon/02.jpg",
    imgAlt: "about icon ",
    title: "Secure Payment Processing",
    desc: "Protect your financial information with industry-standard encryption technology.",
  },
  {
    imgUrl: "/src/assets/images/about/icon/03.jpg",
    imgAlt: "about icon ",
    title: "Effortless Order Tracking",
    desc: "Enjoy a seamless shopping experience with convenient order tracking features.",
  },
];
const About = () => {
  return (
    <div>
      <NavItems/>
      <PageHeader title={"Abour US "} curPage={"About"} />
      <div className="about-section style-3 padding-tb section-bg">
        <div className="container">
          <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-center ">
            <div className="col">
              <div className="about-left">
                <div className="about-thumb">
                  <img src="/src/assets/images/about/01.jpg" alt="" />
                </div>
                <div className="abs-thumb">
                  <img src="/src/assets/images/about/02.jpg" alt="" />
                </div>
                <div className="about-left-content">
                  <h3>{year}</h3>
                  <p>{expareance}</p>
                </div>
              </div>
            </div>
            {/* 2 eme col */}
            <div className="col">
              <div className="about-right">
                <div className="section-header">
                  <span className="subtitle">{subTitle}</span>
                  <h2> {title} </h2>
                  <p>{desc}</p>
                </div>
                <div className="section-wrapper">
                  <ul className="lab-ul">
                    {aboutList.map((a, i) => (
                      <li key={i}>
                        <div className="sr-left">
                          <img src={a.imgUrl} alt="" />
                        </div>
                        <div className="sr-right">
                          <h5>{a.title}</h5>
                          <p>{a.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
