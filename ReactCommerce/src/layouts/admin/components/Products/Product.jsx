import React, { useState, useEffect } from 'react';
import Loader from '../../../frontend/Loader';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';

import './Product.css';
import axios from 'axios';

function Product() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [age, setAge] = useState('');
  const [cate, setCate] = useState('');
  const [brand, setBrand] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;


    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/products')
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <div className="datatableTitle">
                <p>Add New Product</p>
                <Link to="/dashboard/add-product" className="link">
                    Add New
                </Link>
            </div>
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>No Products found.</p>
        </div>
      ) : (
        <div className="cardP shadow border-0 p-3 mt-4">
          <h3 className="hd">Best Selling Products</h3>
          <div className="row cardFilters mt-3">
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
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>Uid</th>
                  <th style={{ width: '300px' }}>PRODUCT</th>
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
                {currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td>
                      <div className="d-flex align-items-center productBox">
                        <div className="imgPWapper">
                          <div className="imgP">
                            <img src={product.imageUrl} alt="Product" className='w-100' />
                          </div>
                        </div>
                        <div className="info pl-0">
                          <h6>{product.name}</h6>
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>{product.sex}</td>
                    <td>{product.category}</td>
                    <td>
                      <div style={{ width: '70px' }}>
                        <del className="old">${(product.price * 1.2).toFixed(2)}</del>
                        <span className="new text-danger ">${product.price}</span>
                      </div>
                    </td>
                    <td>{product.stock}</td>
                    <td>{product.rating_count}</td>
                    <td>{product.order}</td>
                    <td>{product.colors}</td>
                    <td>
                      <div className="actions d-flex align-items-center">
                        <button className="btnP btn-primary"><FaEye className='svg1' /></button>
                        <button className="btnP btn-success"><FaPencil className='svg2' /></button>
                        <button className="btnP btn-danger"><MdDelete className='svg3' /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex tableFooter ">
              <p>Showing <b>{productsPerPage}</b> of <b>{products.length}</b> results</p>
              <Pagination
                count={Math.ceil(products.length / productsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
                className='pagination'
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
