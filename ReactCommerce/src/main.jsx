import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider  } from "react-router-dom";
import "swiper/css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";
// components
import Home from "./Home/Home.jsx";
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
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth-token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/singleblog/:id",
        element: <SingleBlog />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:gender",
        element: <Shop />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      }, {
        path: "/about",
        element: <About />
      }, {
        path: "/contact",
        element: <Contact />
      }
    ],
  },
  {
    path: "/aboutAssad",
    element: <App2 />,
  }, {
    path: '/messages',
    element: <SupportAdmin />
  }, 
  {
    path: '/login',
    element: localStorage.getItem('auth-token') ? <AlreadyLogin/> : <LoginPage/>
  }, {
    path: '/register',
    element: localStorage.getItem('auth-token') ? <AlreadyLogin/> : <RegisterPage/>

  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
