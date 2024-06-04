import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/material';
import {DataGrid} from "@mui/x-data-grid"
import axios from 'axios';
function UsersPage() {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
async function getData(){
  await axios.get('http://localhost:8001/api/users').then(res=>setData(res.data)).catch(err=>{
    console.log('UN ERROR DE : '+err);
  })
  setLoading(false)

}  getData();
  },[])
  return (
    <div>UsersPage</div>
  )
}

export default UsersPage