import React, { useState, useEffect } from 'react';
import Loader from '../../../frontend/Loader';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import './Product.css';
import Swal from 'sweetalert2';

function Product() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    // Fetch products
    axios.get('http://127.0.0.1:8001/api/products')
      .then(response => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
        setLoading(false);
      });

    // Fetch categories
    axios.get('http://127.0.0.1:8001/api/category')
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const deleteProduct = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8001/api/products/${id}`);
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
        Swal.fire('Error!', 'Failed to delete product.', 'error');
      }
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    if (category && product.category_id !== parseInt(category)) return false;
    if (brand && product.brand !== brand) return false;
    return true;
  });

  const getCategoryName = (id) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.nom : 'Unknown';
  };

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
        ) : (
      <div className="cardP shadow border-0 p-3 mt-4">
        <h3 className="hd">Best Selling Products</h3>
          
            <div className="row cardFilters mt-3">
              <div className="col-md-3">
                <h4>Category BY:</h4>
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.nom}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="col-md-3">
                <h4>Brand BY:</h4>
                <Select
                  value={brand}
                  onChange={handleBrandChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {[...new Set(products.map(pro => pro.brand))].map((brand, index) => (
                    <MenuItem key={index} value={brand}>{brand}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>No Products found.</p>
              </div>
            ) : (
              <div className="table-responsive mt-3">
                <table className="table table-bordered v-align">
                  <thead className="thead-dark">
                    <tr>
                      <th>Uid</th>
                      <th style={{ width: '300px' }}>PRODUCT</th>
                      <th>GENDER</th>
                      <th>CATEGORY</th>
                      <th>PRICE</th>
                      <th>STOCK</th>
                      <th>RATING</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {filteredProducts
                      .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                      .map((product, i) => (
                        <tr key={i}>
                          <td>#{product.id}</td>
                          <td>
                            <div className="d-flex align-items-center productBox">
                              <div className="imgPWapper">
                                <div className="imgP">
                                  <img src={`http://localhost:8001/storage/${product.first_image}`} alt="Product" className="w-100" />
                                </div>
                              </div>
                              <div className="info pl-0">
                                <h6>{product.name}</h6>
                                <p>{product.description}</p>
                              </div>
                            </div>
                          </td>
                          <td>{product.gender}</td>
                          <td>{getCategoryName(product.category_id)}</td>
                          <td>
                            <div style={{ width: '70px' }}>
                              {product.new_price ? (
                                <>
                                  <del className="old">${product.original_price}</del>
                                  <span className="new text-danger">${product.new_price}</span>
                                </>
                              ) : (
                                <span>${product.original_price}</span>
                              )}
                            </div>
                          </td>
                          <td>{product.stock}</td>
                          <td>{product.rating}</td>
                          <td>
                            <div className="actions d-flex align-items-center">
                              <Link to={`/dashboard/product/${product.id}`}>
                                <button className="btnP btn-primary"><FaEye className="svg1" /></button>
                              </Link>
                              <Link to={`/dashboard/edit-product/${product.id}`}>
                                <button className="btnP btn-success"><FaPencil className="svg2" /></button>
                              </Link>
                              <button className="btnP btn-danger" onClick={() => deleteProduct(product.id)}><MdDelete className="svg3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="d-flex tableFooter">
                  <p>Showing <b>{productsPerPage}</b> of <b>{filteredProducts.length}</b> results</p>
                  <Pagination
                    count={Math.ceil(filteredProducts.length / productsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                    className="pagination"
                    showFirstButton
                    showLastButton
                  />
                </div>
              </div>
            )}
        
      </div>)}
    </>
  );
}

export default Product;
