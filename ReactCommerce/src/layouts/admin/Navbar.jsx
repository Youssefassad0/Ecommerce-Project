import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faBell, faEnvelope, faUser, faCogs, faList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

        {/* Sidebar Toggle (Topbar) */}
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Topbar Search */}
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
              aria-label="Search" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </form>

        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto">

          {/* Nav Item - Search Dropdown (Visible Only XS) */}
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <FontAwesomeIcon icon={faSearch} />
            </a>
            {/* Dropdown - Messages */}
            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown">
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input type="text" className="form-control bg-light border-0 small"
                    placeholder="Search for..." aria-label="Search"
                    aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          {/* Nav Item - Alerts */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <FontAwesomeIcon icon={faBell} />
              {/* Counter - Alerts */}
              <span className="badge badge-danger badge-counter">3+</span>
            </a>
            {/* Dropdown - Alerts */}
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="alertsDropdown">
              <h6 className="dropdown-header">
                Alerts Center
              </h6>
              <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="mr-3">
                  <div className="icon-circle bg-primary">
                    {/* <FontAwesomeIcon icon={faFileAlt} className="text-white" /> */}
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">December 12, 2019</div>
                  <span className="font-weight-bold">A new monthly report is ready to download!</span>
                </div>
              </a>
              {/* Other alerts... */}
            </div>
          </li>

          {/* Nav Item - Messages */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <FontAwesomeIcon icon={faEnvelope} />
              {/* Counter - Messages */}
              <span className="badge badge-danger badge-counter">7</span>
            </a>
            {/* Dropdown - Messages */}
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="messagesDropdown">
              <h6 className="dropdown-header">
                Message Center
              </h6>
              {/* Messages items... */}
            </div>
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
              <img className="img-profile rounded-circle"
                src="img/undraw_profile.svg" alt="Profile" />
            </a>
            {/* Dropdown - User Information */}
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown">
              <a className="dropdown-item" href="#">
                <FontAwesomeIcon icon={faUser} className="fa-sm fa-fw mr-2 text-gray-400" />
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <FontAwesomeIcon icon={faCogs} className="fa-sm fa-fw mr-2 text-gray-400" />
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <FontAwesomeIcon icon={faList} className="fa-sm fa-fw mr-2 text-gray-400" />
                Activity Log
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                <FontAwesomeIcon icon={faSignOutAlt} className="fa-sm fa-fw mr-2 text-gray-400" />
                Logout
              </a>
            </div>
          </li>

        </ul>

      </nav>
    </>
  );
}

export default Navbar;
