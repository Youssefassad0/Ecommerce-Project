/* eslint-disable react/prop-types */
import React from "react";
import { useTranslation } from "react-i18next";
import "./buttons.css";

const ShopCategory = ({ filterItem, selectedCategory, menuItems }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="widget-header">
        <h5 className="ms-2">{t("allCategories")}</h5>
      </div>
      <div>
        {menuItems.map((val, id) => {
          return (
            <button
              id="btn"
              key={id}
              className={`m-2 ${selectedCategory === val ? "bg-warning" : ""}`}
              onClick={() => filterItem(val)}
            >
              {val}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ShopCategory;
