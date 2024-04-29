import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo/AssadShopLogo.png";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const NavItems = () => {
  const { t, i18n } = useTranslation();
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const languageOptions = [
    { value: "en", label: "En" },
    { value: "fr", label: "Fr" },
    { value: "ar", label: "Ar" },
  ];

  // Add event listener for scroll
  window.addEventListener("scroll", () => {
    setHeaderFixed(window.scrollY > 200);
  });

  const handleLanguageChange = (selectedOption) => {
    const selectedLanguage = selectedOption.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <header
      className={`header-section style-4 ${
        headerFixed ? "header-fixed fadeInUp" : ""
      }`}
    >
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            <Link to="/register" className="lab-btn me-3">
              <span>{t("createAccount")}</span>
            </Link>
            <Link to="/login">{t("logIn")}</Link>
            <Link to="/logout">Logout</Link> 
          </div>
        </div>
      </div>

      <div className="header-button">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-search-acte">
              <div className="logo">
                <Link to="/">
                  <img
                    src={logo}
                    style={{ height: "100px", width: "160px" }}
                    alt="logoShopping"
                  />
                </Link>
              </div>
            </div>

            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <Select
                    options={languageOptions}
                    onChange={handleLanguageChange}
                    isSearchable={false}
                    defaultValue={languageOptions[0]}
                  />
                  <li>
                    <Link to="/">{t("home")}</Link>
                    <Link to="/shop">{t("shop")}</Link>
                    <Link to="/blog">{t("blog")}</Link>
                    <Link to="/about">{t("about")}</Link>
                    <Link to="/contact">{t("contact")}</Link>
                  </li>
                </ul>
              </div>

              <Link
                to="/register"
                className="lab-btn me-3 d-none d-md-block"
                style={{ color: "white", backgroundColor: "green" }}
              >
                {t("createAccount")}
              </Link>
              <Link to="/login" className="d-none d-md-block">
                {t("logIn")}
              </Link>
              <Link to="/logout"  className="d-none d-md-block">Logout</Link> 

              <div
                onClick={() => setMenuToggle(!menuToggle)}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              >
                <span style={{ backgroundColor: "green" }}></span>
                <span style={{ backgroundColor: "green" }}></span>
                <span style={{ backgroundColor: "green" }}></span>
              </div>

              <div
                className="ellepsis-bar d-md-none"
                onClick={() => setSocialToggle(!socialToggle)}
              >
                <i className="icofont-info"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavItems;
