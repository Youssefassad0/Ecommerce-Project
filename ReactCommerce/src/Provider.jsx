import React from 'react'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import App from './App'
import Blog from "./blog/Blog.jsx";
import App2 from "./Portfolio/App2.jsx";
import Shop from "./Shopping/Shop.jsx";
import SingleProduct from "./Shopping/SingleProduct.jsx";
import CartPage from "./Shopping/CartPage.jsx";
import SingleBlog from "./blog/SingleBlog.jsx";
import About from "./About/About.jsx";
import Contact from "./contact/Contact.jsx";
import SupportAdmin from "./ChatSupport/SupportAdmin/chatAdmine.jsx";
import RegisterPage from "./components/Auth/RegisterPage.jsx";
import axios from "axios";
import LoginPage from "./components/Auth/LoginPage.jsx";
import AlreadyLogin from "./components/Auth/AlreadyLogin.jsx";
import MasterLAyouts from "./layouts/admin/MasterLAyouts.jsx";
import Footer from './components/Footer';
import NavItems from './components/NavItems';
import Home from './Home/Home';

function Provider() {
  return (
    <Router>
    <NavItems />
    <div className="">
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />}>
            <Route path="singleblog/:id" element={<SingleBlog />} />
          </Route>
          <Route path="shop" element={<Shop />}>
            <Route path=":gender" element={<Shop />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="cart-page" element={<CartPage />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
          <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
    <Footer />
  </Router>
  )
}

export default Provider