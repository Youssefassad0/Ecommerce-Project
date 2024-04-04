import React from "react";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const About = () => {
  const { t } = useTranslation();

  const desc = t("desc");

  const countList = [
    {
      iconName: "icofont-users-alt-4",
      count: 12600,
      text: t("marchantEnrolled"),
    },
    {
      iconName: "icofont-graduate-alt",
      count: 30,
      text: t("certifiedCourses"),
    },
    {
      iconName: "icofont-notification",
      count: 100,
      text: t("rewardsAndGiftCards"),
    },
  ];

  return (
    <>
      <div className="instructor-section style-2 padding-tb section-bg-ash">
        <div className="container">
          <div className="section-wrapper">
            <div className="row g-4 justify-content-center align-items-center row-cols-1 row-cols-md-2 row-cols-xl-3">
              <div className="col">
                {countList.map((l, i) => (
                  <div className="count-item" key={i}>
                    <div className="count-inner">
                      <div className="count-icon">
                        <i className={l.iconName}></i>
                      </div>
                      <div className="count-content">
                        <h2>
                          <span className="count">
                            {" "}
                            <CountUp end={l.count} />{" +"}
                          </span>
                        </h2>
                        <p> {l.text} </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col">
                <div className="instructor-content">
                  <span className="subtitle">{t("whyChooseUs")}</span>
                  <h2 className="title">{t("becomeOurClient")}</h2>
                  <p> {desc} </p>
                  <Link to="/sign-up" className="lab-btn">
                    {t("joinUsNow")}
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="instructor-thumb">
                  <img src="/src/assets/images/instructor/01.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
