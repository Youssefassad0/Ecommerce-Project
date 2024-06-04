import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
      })
    }
    getOrders();
  }, [])
  const handleAccept = (id) => {
    axios.post(`/api/orders/${id}/accept`)
      .then(response => {
        setOrders(orders.map(order =>
          order.id === id ? { ...order, status: 'accepted' } : order
        ));
      })
      .catch(error => {
        console.error('There was an error accepting the order!', error);
      });
  };

  const handleReject = (id) => {
    axios.post(`/api/orders/${id}/reject`)
      .then(response => {
        setOrders(orders.map(order =>
          order.id === id ? { ...order, status: 'rejected' } : order
        ));
      })
      .catch(error => {
        console.error('There was an error rejecting the order!', error);
      });
  };
  return (
    // <div>
    //   <div className="datatableTitle">
    //     <p>List Orders</p>
    //   </div>
    //   <table className="table">
    //     <thead>
    //       <tr>
    //         <th>ID</th>
    //         <th>No Tracking </th>
    //         <th>Email  </th>
    //         <th>payment_mode</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {
    //         orders.map((o, i) => (
    //           <tr key={i}>
    //             <td>{o.id}</td>
    //             <td> {o.tracking_no} </td>
    //             <td> {o.email} </td>
    //             <td> {o.payment_mode} </td>
    //             <td>
    //               <button className='btn btn-success' onClick={() => handleAccept(o.id)}>Accept</button>
    //               <button className='btn btn-danger' onClick={() => handleReject(o.id)}>Reject</button>

    //             </td>
    //           </tr>
    //         ))
    //       }
    //     </tbody>
    //   </table>
    // </div>
    <>
    <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Striped Table with Hover</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ListOrder