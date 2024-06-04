import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo/AssadShopLogo.png";
import defaultAvatar from "../assets/images/clients/avater.jpg";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import axios from "axios";
import { Dropdown, Nav, NavDropdown } from "react-bootstrap";
import Swal from "sweetalert2";

const NavItems = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Hook for navigation
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);

  // Function to retrieve user info from storage
  const getUser = () => {
    const user = localStorage.getItem('auth-user') || sessionStorage.getItem('auth-user');
    return user ? JSON.parse(user) : null;
  };

  const user = getUser();

  // Function to handle logout
  const logOut = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8001/api/logout').then(res => {
      if (res.data.status === 200) {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("auth-user");
        localStorage.removeItem("auth-token");
        localStorage.removeItem("auth-user");
        Swal.fire('LogOut ', `Goodbye`, 'warning');
        console.log('deleted successfully');
        navigate("/");
        window.location.reload();
      }
    }).catch(error => {
      console.error("Logout failed:", error);
    });
  };

  const infouser = () => {
    if (localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token')) {
      return (
        <>
          <Nav>
            <NavDropdown alignRight title={<span>{user && user.name}</span>}>
              <Dropdown.Item>
                <Link to="/my-profile">Your Profile</Link>
              </Dropdown.Item>
              {user && user.role === 'admin' && <Dropdown.Item><Link to="/dashboard">Dashboard</Link></Dropdown.Item>}
              <Dropdown.Item> <Link to={"/cart-page"} > {t("Panier")}</Link></Dropdown.Item>
              <Dropdown.Item> <Link to={"/my-purshase"} > {t("purchase")}</Link></Dropdown.Item>      
                      <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
            </NavDropdown>
          </Nav>
        </>
      )
    } else {
      return (
        <>
          <Link to="/register" className="lab-btn mda-3">
            <span>{t("createAccount")}</span>
          </Link>
          <Link to="/login">{t("logIn")}</Link>
        </>
      )
    }
  }

  const renderAuthButton = () => {
    if (!localStorage.getItem('auth-token') && !sessionStorage.getItem('auth-token')) {
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
      const avatarUrl = user && user.avatar ? `http://localhost:8001/${user.avatar}` : defaultAvatar;
      return (
        <Nav className="me-3 d-none d-md-block">
          <NavDropdown alignRight title={<span> <img src={avatarUrl} alt="profile image" style={{ width: '50px', height: '50px', borderRadius: '25px' }} /> </span>}>
            <Dropdown.Item>
              <Link to="/my-profile">Your Profile</Link>
            </Dropdown.Item>
            {user && user.role === 'admin' && <Dropdown.Item><Link to="/dashboard">Dashboard</Link></Dropdown.Item>}
            <Dropdown.Item> <Link to={"/cart-page"} > {t("Panier")}</Link></Dropdown.Item>
            <Dropdown.Item> <Link to={"/my-purshase"} > {t("purchase")}</Link></Dropdown.Item>
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
  useEffect(() => {
    const handleScroll = () => setHeaderFixed(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (selectedOption) => {
    const selectedLanguage = selectedOption.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <header
      className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""}`}
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
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`} style={{ color: 'red' }}>
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
