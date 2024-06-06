import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
function Widgets() {
    const [users, setUsers] = useState(0);
    const [products, setProducts] = useState(0);
    const [orders, setOrders] = useState(0);
    const [requests, setRequests] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, productsRes, orders,requests] = await Promise.all([
                    axios.get("http://localhost:8001/api/users"),
                    axios.get("http://localhost:8001/api/products"),
                    axios.get("http://localhost:8001/api/place-order"),
                    axios.get("http://localhost:8001/api/orders")
                ]);
                setUsers(usersRes.data.length);
                setProducts(productsRes.data.data.length);
                setOrders(orders.data.length);
                setRequests(requests.data.length);

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="container mt-4">
            <div className="row">
                {/* Total Products Card */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total Products
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {products} Products
                                    </div>
                                </div>
                                <div className="col-auto mr-3">
                                    <i>
                                        <LocalOfferIcon />
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customers Card */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Customers
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {users} Users
                                    </div>
                                </div>
                                <div className="col-auto mr-3">
                                    <i>
                                        <AccountCircleIcon />
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Earnings (Monthly) Card */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                        Total Orders
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {orders} Orders
                                    </div>
                                </div>
                                <div className="col-auto mr-3">
                                    <ShoppingBasketIcon />
                                {/* <i style='font-size:24px' className='fas'>&#xf217;</i> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Requests Card */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Pending Requests
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {requests}
                                    </div>
                                </div>
                                <div className="col-auto mr-3">
                                    <i>
                                    <PendingActionsIcon/>
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Widgets;
