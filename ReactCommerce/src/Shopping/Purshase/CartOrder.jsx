import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Pagination } from 'react-bootstrap';
import './Style.scss'
import NavItems from '../../components/NavItems';
function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    useEffect(() => {
        async function getUserOrders() {
            axios.get(`http://localhost:8001/api/user/orders`)
                .then(res => {
                    setOrders(res.data);
                })
                .catch(err => {
                    console.log('ERROR : ' + err);
                });
        }
        getUserOrders();
    }, []);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
        <div className="div">
        <NavItems/>
        </div>
            <Container fluid className="user-orders-container">
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover custom-card">
                            <Card.Header>
                                <Card.Title as="h4">Your Orders</Card.Title>
                                <p className="card-category">
                                    Check the status of your orders
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">ID</th>
                                            <th className="border-0">City</th>
                                            <th className="border-0">Payment Mode</th>
                                            <th className="border-0">Total</th>
                                            <th className="border-0">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentOrders.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center">No orders available.</td>
                                            </tr>
                                        ) : (
                                            currentOrders.map(order => (
                                                <tr key={order.id}>
                                                    <td>{order.id}</td>
                                                    <td>{order.city}</td>
                                                    <td>{order.payment_mode}</td>
                                                    <td>{order.total}</td>
                                                    <td> <span className={`status ${order.status}`} > {order.status}</span></td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                                <Pagination>
                                    {[...Array(Math.ceil(orders.length / ordersPerPage)).keys()].map(number => (
                                        <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)}>
                                            {number + 1}
                                        </Pagination.Item>
                                    ))}
                                </Pagination>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UserOrders;
