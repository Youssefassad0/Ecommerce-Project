import React from "react";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  const subtitle = t("saveTheDay");
  const title = (
    <h2 className="title">
      {t("joinWorkshop")}{" "}
      <b>
        {t("advance")}<span>{t("mastering")}</span>
      </b>{" "}
      {t("onSales")}
    </h2>
  );
  const desc = t("limitedTimeOffer");

  return (
    <>
      <section className="register-section padding-tb pb-0">
        <div className="container">
          <div className="row g-4 row-cols-lg-2 row-cols-1 align-items-center">
            <div className="col">
              <div className="section-header">
                <span className="subtitle">{subtitle}</span>
                {title}
                <p>{desc}</p>
              </div>
            </div>
            <div className="col">
              <div className="section-wrapper">
                <h4>{t("registerNow")}</h4>
                <form className="register-form">
                  <input
                    type="text"
                    placeholder={t("userName")}
                    className="reg-input"
                  />
                  <input
                    type="email"
                    placeholder={t("email")}
                    className="reg-input"
                  />
                  <input
                    type="number"
                    placeholder={t("phone")}
                    className="reg-input"
                  />
                  <button type="submit" className="lab-btn">
                    {t("registerNow")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
