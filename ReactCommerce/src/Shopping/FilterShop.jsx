/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./filter.css";

const FilterShop = ({ filterByColor, filterBySize, filterByPrice }) => {
  const { t } = useTranslation();
  const colorOptions = ["black", "white", "pink", "red", "green", "gold", "blue"];
  const sizeOptions = ["S","M","XL","XXL"]; 

  const [priceValue, setPriceValue] = useState(0);

  const handlePriceChange = (e) => {
    setPriceValue(parseInt(e.target.value, 10));
    filterByPrice(parseInt(e.target.value, 10));
  };

  return (
    <div className="filter-shop">
      <h3>{t("filterBy")}</h3>
      {/* Color filter */}
      <div>
        <h4>{t("color")}</h4>
        <select className="selectColor" onChange={(e) => filterByColor(e.target.value)}>
          <option value="">{t("allColors")}</option>
          {colorOptions.map((color) => (
            <option key={color} value={color}>
              {color !== "" && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className={`${color} color-option`}></div>
                  {color}
                </div>
              )}
            </option>
          ))}
        </select>
      </div>

      {/* Size filter */}
      <div>
        <h4>{t("size")}</h4>
        <select onChange={(e) => filterBySize(parseInt(e.target.value, 10))}>
          <option value="">{t("allSizes")}</option>
          {sizeOptions.map((size,i) => (
            <option key={i} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      {/* Price filter */}
      <div>
        <h4>{t("price")}: ${priceValue}</h4>
        <input
          type="range"
          min="0"
          max="450" 
          step="1"
          value={priceValue}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
};

export default FilterShop;
