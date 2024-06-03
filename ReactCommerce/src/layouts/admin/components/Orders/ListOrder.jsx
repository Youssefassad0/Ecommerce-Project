import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
    <div>
      <div className="datatableTitle">
        <p>List Orders</p>
      </div>
      <div className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>No Tracking </th>
            <th>Email  </th>
            <th>payment_mode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((o, i) => (
              <tr key={i}>
                <td>{o.id}</td>
                <td> {o.tracking_no} </td>
                <td> {o.email} </td>
                <td> {o.payment_mode} </td>
                <td>
                  <button className='btn btn-success' onClick={() => handleAccept(o.id)}>Accept</button>
                  <button className='btn btn-danger' onClick={() => handleReject(o.id)}>Reject</button>

                </td>
              </tr>
            ))
          }
        </tbody>
      </div>
    </div>
  )
}

export default ListOrder