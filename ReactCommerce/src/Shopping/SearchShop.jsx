/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Data from "../products.json";
import { useTranslation } from "react-i18next"; // Import useTranslation
import "./search.css";

const SearchShop = ({ GridList }) => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [searchTerm, setSearchTerm] = useState("");
  
  const FilterProducts = Data.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="widget widget-search">
      <form className="search-wrapper mb-3">
        <input
          type="text"
          name="text"
          placeholder={t("searchPlaceholder")}
          defaultValue={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
      </form>
      {/* Showing Search  */}
      <div>
        {searchTerm &&
          FilterProducts.map((produit) => (
            <Link key={produit.id} to={`/shop/${produit.id}`}>
              <div className="d-flex gap-3 p-2">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="pro-thumb">
                    <img
                      src={produit.img}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                      alt={produit.name}
                    />
                  </div>
                  <div>
                    <p style={{ margin: 0 }}>{produit.name}</p>
                    <h6>$ {produit.price}</h6>
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
