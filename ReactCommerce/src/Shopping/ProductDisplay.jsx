/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductDisplay = ({ item }) => {
  const { t } = useTranslation();
  const [prequantity, setPrequantity] = useState(1);
  const [selectSize, setSelectSize] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const color = item.colors;
  const size = item.sizes;

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      id: item.id,
      img: item.first_image,
      name: item.name,
      price: item.original_price,
      quantity: prequantity,
      size: selectSize,
      color: selectColor,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = existingCart.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += prequantity;
    } else {
      existingCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setSelectSize("");
    setSelectColor("");
    setPrequantity(1);
  };

  return (
    <div>
      <div>
        <h4>{item.name}</h4>
        <p className="rating">
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <span>{item.rating_count} {t("review")}</span>
        </p>
        <h4>${item.original_price}</h4>
        <h6>{item.brand}</h6>
        <p>{item.description}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="select-product size">
            <select
              value={selectSize}
              onChange={(e) => setSelectSize(e.target.value)}
              disabled={item.stock === 0}
            >
              <option value="">{t("selectSize")}</option>
              {size.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="select-product color">
            <select
              value={selectColor}
              onChange={(e) => setSelectColor(e.target.value)}
              disabled={item.stock === 0}
            >
              <option value="">{t("selectColor")}</option>
              {color.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="cart-plus-minus">
            <div
              className="dec qtybutton"
              onClick={() => {
                if (prequantity > 1) {
                  setPrequantity(prequantity - 1);
                }
              }}
              disabled={item.stock === 0}
            >
              -
            </div>
            <input
              className="cart-plus-minus-box"
              type="text"
              name="qtybutton"
              value={prequantity}
              onChange={(e) => setPrequantity(parseInt(e.target.value))}
              disabled={item.stock === 0}
            />
            <div
              className="inc qtybutton"
              onClick={() => {
                setPrequantity(prequantity + 1);
              }}
              disabled={item.stock === 0}
            >
              +
            </div>
          </div>
          {item.stock > 0 ? (
            <button type="submit" className="lab-btn">
              <span>{t("addToCart")}</span>
            </button>
          ) : (
            <del><div style={{ fontSize:'20px', marginRight:'20px' }} className="text-danger"  >{t("outOfStock")}</div></del>
          )}
          <Link to="/cart-page" className="lab-btn bg-primary ">
            <span>{t("checkOut")}</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ProductDisplay;
