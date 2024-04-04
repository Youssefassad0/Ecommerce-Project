import { useState, useEffect } from "react";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import "../App2.css";
const NavBar2 = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [scroll, setScrolle] = useState(false);

  useEffect(() => {
    const OnScroll = () => {
      if (window.scrollY > 50) {
        setScrolle(true);
      } else {
        setScrolle(false);
      }
    };
    window.addEventListener("scroll", OnScroll);
    return () => window.removeEventListener("scroll", OnScroll);
  }, []);
  function OnUpdateActiveLink(value) {
    setActiveLink(value);
  }

  return (
    <>
      <Navbar expand="lg" className={scroll ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/" >
            <a href="">
              <img src={logo} alt="logo" />
            </a></Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#home"
                className={
                  activeLink === "home" ? "active-navbar-link" : "navbar-link"
                }
                onClick={() => OnUpdateActiveLink("home")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#skills"
                className={
                  activeLink === "skills" ? "active-navbar-link" : "navbar-link"
                }
                onClick={() => OnUpdateActiveLink("skills")}
              >
                Skills
              </Nav.Link>
              <Nav.Link
                href="#Projects"
                className={
                  activeLink === "projects"
                    ? "active-navbar-link"
                    : "navbar-link"
                }
                onClick={() => OnUpdateActiveLink("projects")}
              >
                projects
              </Nav.Link>{" "}
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="#">
                  <img src={navIcon1} alt="" />
                </a>
                <a href="#">
                  <img src={navIcon2} alt="" />
                </a>
                <a href="#">
                  <img src={navIcon3} alt="" />
                </a>
              </div>
              <button className="vvd" onClick={() => console.log("connect")}>
                <span>Lets Connect</span>
              </button>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar2;
