/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaSolarPanel } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import LayersIcon from '@mui/icons-material/Layers';
function SideBar() {
  const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const changeStyle = () => {
    if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
    }
    else {
      setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion')
    }
  }
  return (

    <>
      <ul
        className={style}
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <Link to={'/dashboard'} className="sidebar-brand d-flex align-items-center justify-content-center" >

          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Assad Shop <sup>2</sup></div>
        </Link>
        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />
        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link className="nav-link" to={'/dashboard'}>
            <i>
              <FaSolarPanel/>
            </i>
            <span>Dashboard</span></Link >
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Lists</div>
        {/* <!-- Nav Item - Pages Collapse Menu --> */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i>
              <LayersIcon />
            </i>
            <span> Products</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <Link className="collapse-item" to={'/dashboard/products'}>products</Link>
              <Link className="collapse-item" to={'/dashboard/add-product'}>Add Product</Link>
            </div>
          </div>
        </li>

        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i>
            <MdCategory />
            </i>
            <span>Category</span>
          </a>
          <div
            id="collapseUtilities"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Category:</h6>
              <Link className="collapse-item" to="/dashboard/category">Categories</Link>
              <Link className="collapse-item" to="/dashboard//new/cate">Add Categories</Link>
              <a className="collapse-item" href="utilities-animation.html"
              >Animations</a>
              <a className="collapse-item" href="utilities-other.html">Other</a>
            </div>
          </div>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Addons</div>

        {/* <!-- Nav Item - Pages Collapse Menu --> */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fas fa-fw fa-folder"></i>
            <span>Orders</span>
          </a>
          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">All orders</h6>
              <Link to={'/dashboard/orders'} className="collapse-item">Pending  Orders</Link>
              <a className="collapse-item" href="register.html"> Orders Accepted</a>
              <a className="collapse-item" href="forgot-password.html"
              >Orders Refused</a >
              <div className="collapse-divider"></div>
              <h6 className="collapse-header">Other Pages:</h6>
              <a className="collapse-item" href="404.html">404 Page</a>
              <a className="collapse-item" href="blank.html">Blank Page</a>
            </div>
          </div>
        </li>

        {/* <!-- Nav Item - Charts --> */}
        <li className="nav-item">
          <a className="nav-link" href="charts.html">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Charts</span></a  >
        </li>

        {/* <!-- Nav Item - Tables --> */}
        <li className="nav-item">
          <a className="nav-link" href="tables.html">
            <i className="fas fa-fw fa-table"></i>
            <span>Tables</span></a>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* <!-- Sidebar Toggler (Sidebar) --> */}
        <div className="text-center d-none d-md-inline">
          <button onClick={changeStyle} className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>


      </ul>
    </>
  )
}

export default SideBar