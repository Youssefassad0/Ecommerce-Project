/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./filter.css";

const FilterShop = ({ filterByColor, filterBySize, filterByPrice }) => {
  const { t } = useTranslation();
  const colorOptions = ["black", "white", "Pink", "red", "green", "gold", "blue"]; // Add more colors if needed
  const sizeOptions = [10, 11, 12, 13, 15, 16, 17, 20, 24, 26, 30, 35, 38, 40]; // Add more sizes if needed

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
        <select className="" onChange={(e) => filterByColor(e.target.value)}>
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
          {sizeOptions.map((size) => (
            <option key={size} value={size}>
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
          max="450" // Adjust the maximum value as needed
          step="1"
          value={priceValue}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
};

export default FilterShop;
