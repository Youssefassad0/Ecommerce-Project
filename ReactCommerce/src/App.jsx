import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import AuthPage from "./components/Auth/Auth";
import CartPage from "./Shopping/CartPage";
import NotFound from "./layouts/frontend/NotFound";
import LoaderShop from "./layouts/frontend/LoaderShop";
import PageProfile from "./layouts/frontend/ProfileUser/PageProfile";
import UserOrders from "./Shopping/Purshase/CartOrder";

axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth-token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default function App() {
    const user = JSON.parse(localStorage.getItem('auth-user'));
    // console.log(user.role);
    // const user = JSON.parse(localStorage.getItem('auth-user'));
    const rememberMe = localStorage.getItem('remember-me') === 'true';

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                {/* <Route exact path="/load" element={<LoaderShop />} /> */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/singleblog/:id" element={<SingleBlog />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:gender" element={<Shop />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart-page" element={<CartPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/my-profile"  element={ <PageProfile/> } />
                <Route path="/my-purshase"  element={ <UserOrders/> } />
                <Route path="*" element={ <NotFound link={"/"}  /> }/> 
                <Route
                    path="/login"
                    element={
                        rememberMe || !user ? (
                            <AuthPage etat={true} />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        rememberMe || !user ? (
                            <AuthPage etat={false} />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/dashboard/*"
                    element={user && user.role==='admin' ? <MasterLAyouts /> : <Navigate to="/login" />}
                />
            </Routes>
        </BrowserRouter>
    );
}
