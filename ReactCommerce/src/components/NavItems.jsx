import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo/AssadShopLogo.png";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import axios from "axios";
import { Dropdown, Nav, NavDropdown } from "react-bootstrap";

const NavItems = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Hook for navigation
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const user = JSON.parse(localStorage.getItem('auth-user'));
  // Function to handle logout
  // const logOut = () => {
  //   // Clear auth tokens and navigate to home page
  //   localStorage.removeItem('auth-token');
  //   localStorage.removeItem('auth-name');
  //   navigate('/');
  // }

  const logOut = (e) => {
    // localStorage.removeItem("auth-token");
    // localStorage.removeItem("auth-name");
    // axios.post("http://localhost:8001/api/logout")
    //   .then(response => {
    //     navigate("/login");
    //   })
    //   .catch(error => { 
    //     console.error("Logout failed:", error);
    //   });
    e.preventDefault();
    axios.post('http://localhost:8001/api/logout').then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("auth-user");
        console.log('deleted successfuly');
        navigate("/");

      }
    })
  };
  const infouser = () => {
    if (localStorage.getItem('auth-token')) {
      return (
        <>
          <Nav>
            <NavDropdown alignRight title={<span>ahmed</span>}>
              <Dropdown.Item>
                <Link to="/profile">Your Profile</Link>
              </Dropdown.Item>
              {user.role === 'admin' && <Dropdown.Item><Link to="/dashboard">Dashboard</Link></Dropdown.Item>}
              <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
            </NavDropdown>
          </Nav>
        </>
      )
    }
    else {
      return (
        <>
          <Link to="/register" className="lab-btn me-3">
            <span>{t("createAccount")}</span>
          </Link>
          <Link to="/login">{t("logIn")}</Link>
        </>
      )
    }
  }

  const renderAuthButton = () => {
    if (!localStorage.getItem('auth-token')) {
      return (
        <>
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
        </>
      );
    } else {
      return (
        <Nav className="me-3 d-none d-md-block" >
          {/* { user && user.name  }  */}
          <NavDropdown alignRight title={<span> <img src="/src/assets/images/author/03.jpg" alt="profile image" style={{ width: '50px', height: '50px' , borderRadius:'25px' }} /> </span>}>
            <Dropdown.Item>
              <Link to="/profile">Your Profile</Link>
            </Dropdown.Item>
            {user.role === 'admin' && <Dropdown.Item><Link to="/dashboard">Dashboard</Link></Dropdown.Item>}
            <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
          </NavDropdown>
        </Nav>
      );
    }
  }

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
      className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""
        }`}
    >
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            {infouser()}
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
              {/* Render either login/register or logout link based on auth status */}
              {renderAuthButton()}
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
