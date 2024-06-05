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

function ListOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      axios.get("http://localhost:8001/api/orders").then(res => {
        setOrders(res.data);
        // console.log(res.data);
      }).catch(err => {
        console.log('ERROR : ' + err);
      });
    }
    getOrders();
  }, []);

  const handleAccept = (id) => {
    axios.post(`http://localhost:8001/api/orders/${id}/accept`)
      .then(response => {
        setOrders(orders.map(order =>
          order.id === id ? { ...order, status: 'accepted' } : order
        ));
        toast.success('The Order Has Been accepted');
      })
      .catch(error => {
        console.error('There was an error accepting the order!', error);
      });
  };

  const handleReject = (id) => {
    axios.post(`http://localhost:8001/api/orders/${id}/reject`)
      .then(response => {
        setOrders(orders.map(order =>
          order.id === id ? { ...order, status: 'rejected' } : order
        ));
        toast.warning('The Order Has Been rejected');
      })
      .catch(error => {
        console.error('There was an error rejecting the order!', error);
      });
  };

  return (
    <>
      <Container fluid>
        <Toaster richColors  position="top-right" />
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">All Orders Pending</Card.Title>
                <p className="card-category">
                  You can accept or refuse an order
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Payment Mode</th>
                      <th className="border-0">Total</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Actions</th>
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
                          <td>{order.name}</td>
                          <td>{order.email}</td>
                          <td>{order.payment_mode}</td>
                          <td>{order.total}</td>
                          <td> <span className={`status ${order.status}`} > {order.status}</span></td>
                          <td>
                            <Button variant="success" onClick={() => handleAccept(order.id)}>Accept</Button>
                            <Button variant="danger" onClick={() => handleReject(order.id)}>Reject</Button>
                          </td>
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

export default ListOrder;
