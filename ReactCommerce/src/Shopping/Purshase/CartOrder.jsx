import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
function UserOrders() {
    const [orders, setOrders] = useState([]);

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

    return (
        <Container fluid>
            <Row>
                <Col md="12">
                    <Card className="strpied-tabled-with-hover">
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
                                        <th className="border-0">Payment Mode</th>
                                        <th className="border-0">Total</th>
                                        <th className="border-0">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No orders available.</td>
                                        </tr>
                                    ) : (
                                        orders.map(order => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.payment_mode}</td>
                                                <td>{order.total}</td>
                                                <td>{order.status}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default UserOrders;
