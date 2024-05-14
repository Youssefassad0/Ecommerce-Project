import React, { useState } from 'react';
import Navbar from './Navbar';
import SideBar from './SideBar';
import './Dashboard.css';
import FootterD from './components/FootterD';
import Home from './components/Home';
import Profile from './components/Profile/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';

function MasterLAyouts() {
  const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const changeStyle = () => {
    if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
    } else {
      setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion');
    }
  };

  return (
    <>
      <div>
        <body id="page-top">
          <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
              <Navbar changeStyle={changeStyle} />
              <div id="content">
                <div className="container-fluid">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </div>
              </div>
              <FootterD />
            </div>
          </div>
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
        </body>
      </div>
    </>
  );
}

export default MasterLAyouts;
