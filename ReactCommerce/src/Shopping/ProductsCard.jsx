/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Ratting from "../components/Ratting";

const ProductsCard = ({ GridList, products }) => {
  return (
    <div
      className={`shop-product-wrap row justify-content-center ${
        GridList ? "grid" : "list"
      } `}
    >
      {products.map((product, index) => (
        <div key={index} className="col-lg-4 col-md-6 col-12">
          <div className="product-item">
            {/* Product-image */}
            <div className="product-thumb">
              <div className="pro-thumb">
                <img
                  src={`http://localhost:8001/storage/${product.first_image}`}
                  alt={product.name}
                  style={{ height: "230px" }}
                />
              </div>
              {/* Products-actionsLink */}
              <div className="product-action-link">
                <Link to={`/product/${product.id}`}>
                  <i className="icofont-eye"></i>
                </Link>
                <a href="#">
                  <i className="icofont-heart"></i>
                </a>
                <Link to="/cart-page">
                  <i className="icofont-cart-alt"></i>
                </Link>
              </div>
            </div>
            {/* Product Content */}
            <div className="product-content">
              <h5>
                <Link to={`/shop/${product.id}`}>{product.name}</Link>
              </h5>
              <p className="productRatting">
                <Ratting />
              </p>
              <h6>$ {product.original_price}</h6>
            </div>
          </div>
          {/* List style */}

          <div className="product-list-item ">
            {/* Product-image */}
            <div className="product-thumb">
              <div className="pro-thumb">
                <img src={`http://localhost:8001/storage/${product.first_image}`} alt={product.name} />
              </div>
              {/* Products-actionsLink */}
              <div className="product-action-link">
                <Link to={`/product/${product.id}`}>
                  <i className="icofont-eye"></i>
                </Link>
                <a href="#">
                  <i className="icofont-heart"></i>
                </a>
                <Link to="/cart-page">
                  <i className="icofont-cart-alt"></i>
                </Link>
              </div>
            </div>
            {/* Product Content */}
            <div className="product-content">
              <h5>
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h5>
              <p className="productRatting">
                <Ratting />
              </p>
              <h6>$ {product.original_price}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsCard;
