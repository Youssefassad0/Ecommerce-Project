/* eslint-disable react/no-unknown-property */
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaRegMessage } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { BsList } from "react-icons/bs";
import ContactList from './components/Contacts/Contact';
import { IoIosRefresh } from "react-icons/io";

function Navbar() {
  const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const changeStyle = () => {
    if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
    }
    else {
      setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion')
    }
  }
  const getUser = () => {
    const user = localStorage.getItem('auth-user') || sessionStorage.getItem('auth-user');
    return user ? JSON.parse(user) : null;
  };

  const user = getUser(); const navigate = useNavigate();
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
        navigate("/");
        window.location.reload();
      }
    })
  };
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
  const avatarUrl = user && user.avatar ? `http://localhost:8001/${user.avatar}` : defaultAvatar;

  return (
    <>
      <nav
        className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
      >
        {/* <!-- Sidebar Toggle (Topbar) --> */}
        <button
          onClick={changeStyle}
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <BsList />
        </button>
        {/* <!-- Topbar Search --> */}
        <form
          className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
        >
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <CiSearch />
              </button>
            </div>
          <div onClick={()=>{window.location.reload()}} style={{ cursor:'pointer' }} className="input-group-append ml-2 mt-2" >
        <IoIosRefresh />
          </div>
          </div>
        </form>


        {/* <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">
          {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-search fa-fw"></i>
            </a>
            {/* <!-- Dropdown - Messages --> */}
            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          {/* <!-- Nav Item - Alerts --> */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <IoNotificationsOutline />
              {/* <!-- Counter - Alerts --> */}
              <span className="badge badge-danger badge-counter">3+</span>
            </a>
            {/* <!-- Dropdown - Alerts --> */}
            <div
              className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="alertsDropdown"
            >
              <h6 className="dropdown-header">Alerts Center</h6>
              <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="mr-3">
                  <div className="icon-circle bg-primary">
                    <i className="fas fa-file-alt text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">December 12, 2019</div>
                  <span className="font-weight-bold"
                  >A new monthly report is ready to download!</span>
                </div>
              </a>
              {/* <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="mr-3">
                  <div className="icon-circle bg-success">
                    <i className="fas fa-donate text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">December 7, 2019</div>
                  $290.29 has been deposited into your account!
                </div>
              </a>
              <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="mr-3">
                  <div className="icon-circle bg-warning">
                    <i className="fas fa-exclamation-triangle text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">December 2, 2019</div>
                  Spending Alert: We ve noticed unusually high spending for
                  your account.
                </div>
              </a> */}
              <a
                className="dropdown-item text-center small text-gray-500"
                href="#"
              >Show All Alerts</a>
            </div>
          </li>

          {/* <!-- Nav Item - Messages --> */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="messagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FaRegMessage />
              {/* <!-- Counter - Messages --> */}
              <span className="badge badge-danger badge-counter">7</span>
            </a>
            {/* <!-- Dropdown - Messages --> */}
            <div
              className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="messagesDropdown"
            >
              <h6 className="dropdown-header">Message Center</h6>
              <a className="dropdown-item d-flex align-items-center" href="#">
                <ContactList />

              </a>
              <a
                className="dropdown-item text-center small text-gray-500"
                href="#"
              >Read More Messages</a>
            </div>
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small"
              >{user.name}</span>
              <img
                className="img-profile rounded-circle"
                src={avatarUrl}
              />
            </a>
            {/* <!-- Dropdown - User Information --> */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <Link className="dropdown-item" to={'/'}>
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                WebSite
              </Link>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i
                  className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                ></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content" style={{ height: '300px' }} >
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true"> × </span>
                </button>
              </div>
              <div className="modal-body">
                Select Logout below if you are ready to end your current session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" onClick={logOut}>Logout</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar