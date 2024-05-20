import React, { useState } from 'react';
import Navbar from './Navbar';
import SideBar from './SideBar';
import './Dashboard.css';
import FootterD from './components/FootterD';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Category from './components/Category/Category';
import AddCategory from './components/Category/AddCategory';
import Edit from './components/Category/Edit';
import Product from './components/Products/Product';
import { FaArrowUp } from "react-icons/fa";
import ProductForm from './components/Products/AddProduct';
import ProductDetails from './components/Products/ProductDetails';
import Profile from './components/Profile/profile';

function MasterLAyouts() {
  
  const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const changeStyle = () => {
    if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
    } else {
      setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion');
    }
  };
  // console.log(user.role);

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
                    <Route path="/products" element={<Product />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/new/cate" element={<AddCategory />} />
                    <Route path="/edit/cate/:id" element={<Edit />} />
                    <Route path="/add-product" element={<ProductForm />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                  </Routes>
                </div>
              </div>
              <FootterD />
            </div>
          </div>
          <a className="scroll-to-top rounded" href="#page-top">
            {/* <i className="fas fa-angle-up"></i> */}
            <FaArrowUp/>
          </a>
        </body>
      </div>
    </>
  );
}

export default MasterLAyouts;
