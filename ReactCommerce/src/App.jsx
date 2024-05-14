import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Blog from "./blog/Blog";
import SingleBlog from "./blog/SingleBlog";
import Shop from "./Shopping/Shop";
import SingleProduct from "./Shopping/SingleProduct";
import Contact from "./contact/Contact";
import About from './About/About'
import axios from "axios";
import MasterLAyouts from './layouts/admin/MasterLAyouts'
import AlreadyLogin from "./components/Auth/AlreadyLogin";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth-token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})

export default function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/singleblog/:id" element={<SingleBlog />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:gender" element={<Shop />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={localStorage.getItem('auth-token') ? <AlreadyLogin /> : <LoginPage />} />
                <Route path="/register" element={localStorage.getItem('auth-token') ? <AlreadyLogin /> : <RegisterPage />} />
                <Route path="/dashboard/*" element={<MasterLAyouts />} />
           
            </Routes>

        </BrowserRouter>
    );
}