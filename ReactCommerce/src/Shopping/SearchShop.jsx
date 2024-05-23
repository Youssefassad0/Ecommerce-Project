/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation
import "./search.css";

const SearchShop = ({ GridList }) => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch the data from the API
    fetch("http://localhost:8001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data); // Ensure data is correctly set
      });
  }, []);

  useEffect(() => {
    // Filter products based on the search term
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="widget widget-search">
      <form className="search-wrapper mb-3">
        <input
          type="text"
          name="text"
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
      </form>
      {/* Showing Search */}
      <div>
        {searchTerm &&
          filteredProducts.map((product) => (
            <Link key={product.id} to={`/shop/${product.id}`}>
              <div className="d-flex gap-3 p-2">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="pro-thumb">
                    <img
                      src={`http://localhost:8001/storage/${product.first_image}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                      alt={product.name}
                    />
                  </div>
                  <div>
                    <p style={{ margin: 0 }}>{product.name}</p>
                    <h6>$ {product.original_price}</h6>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchShop;
