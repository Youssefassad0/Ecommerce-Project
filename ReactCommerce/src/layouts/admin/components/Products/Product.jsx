import React, { useState } from 'react'
import Loader from '../../../frontend/Loader';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import './Product.css'
import { Button } from 'react-bootstrap';
function Product() {
  const [loading, setLoading] = useState(true);
  const [data, setDate] = useState(['m']);
  const [age, setAge] = useState('');
  const [cate, setCate] = useState('');
  const [brand, setBrand] = useState('');
  setTimeout(() => {
    setLoading(false);
  }, 2000)
  return (
    <>

      {loading ? (
        <Loader />
      ) : data.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>No Products found.</p>
        </div>
      ) : (
        <div className="cardP shadow border-0 p-3 mt-4">
          <h3 className="hd">
            Best Selling Products
          </h3>
          <div className="row cardFilters mt-3">
            {/* First select */}
            <div className="col-md-3">
              <h4>Show BY : </h4>
              <Select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                className='w-100'
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>

            {/* Category Select  */}
            <div className="col-md-3">
              <h4>Category  BY : </h4>
              <Select
                value={cate}
                onChange={(e) => setCate(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                className='w-100'
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Homme</MenuItem>
                <MenuItem value={20}>Femme</MenuItem>
                <MenuItem value={30}>Enfant</MenuItem>
              </Select>
            </div>

            {/* Brand Select  */}
            <div className="col-md-3">
              <h4>Brand  BY : </h4>
              <Select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                className='w-100'
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Adidas</MenuItem>
                <MenuItem value={20}>Nike</MenuItem>
                <MenuItem value={30}>Gucci</MenuItem>
              </Select>
            </div>
          </div>
          <div className="table-responsive mt-3">
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Uid</th>
            <th>PRODUCT</th>
            <th>SEXE</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>STOCK</th>
            <th>RATING</th>
            <th>ORDER</th>
            <th>SALES</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody className="tbody">
          <tr>
            <td>#1</td>
            <td>Name of product</td>
            <td>Female</td>
            <td>Adidas</td>
            <td>$300</td>
            <td>5</td>
            <td>4.5 (16)</td>
            <td>380</td>
            <td>1k</td>
            <td>
              <div className="actions d-flex align-items-center">
                <button className="btnP btn-primary"><FaEye /></button>
                <button className="btnP btn-success"><FaPencil /></button>
                <button className="btnP btn-danger"><MdDelete /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
        </div>
      )}
    </>
  )
}

export default Product

