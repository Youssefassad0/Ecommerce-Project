import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const DashBoard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login');
      Swal.fire('Warning', `You are not loggedin yet `, 'error'); // Change Swal to Swal.fire
    }
  }, [])
  return (
    <div>
      <Link to="/messages" >
        Messages
      </Link>
      <div className="container py-5">
        <div className="col-md-4">
          Hello This is Dashboard page !!!
        </div>
      </div>
    </div>
  )
}

export default DashBoard