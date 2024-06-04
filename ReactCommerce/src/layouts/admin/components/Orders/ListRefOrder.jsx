import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import './Order.scss'
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function ListOrderRejected() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      axios.get("http://localhost:8001/api/ordersRef").then(res => {
        setOrders(res.data);
      }).catch(err => {
        console.log('ERROR : ' + err);
      });
    }
    getOrders();
  }, []);

  
  return (
    <>
      <Container fluid>
        <Toaster position="top-right" />
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">All Orders Accepted</Card.Title>
                <p className="card-category">

                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Payment Mode</th>
                      <th className="border-0">Total</th>
                      <th className="border-0">Status</th>

                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">No orders available.</td>
                      </tr>
                    ) : (
                      orders.map(order => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.email}</td>
                          <td>{order.payment_mode}</td>
                          <td>{order.total}</td>
                          <td> <span className={`status ${order.status}`} > {order.status}</span></td>
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
    </>
  );
}

export default ListOrderRejected;
