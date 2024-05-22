/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const ProductDisplay = ({ item }) => {
  const { t } = useTranslation(); // Use useTranslation hook
  const descProduitSingle = t("descProduitSingle");
  const [prequantity, setPrequantity] = useState(item.quantity);
  const color = item.colors;
  const size = item.sizes;
  const [selectSize, setSelectSize] = useState("");
  const [selectColor, setSelectColor] = useState("");

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
    console.log(product);

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = existingCart.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += prequantity;
    } else {
      existingCart.push(product);
    }

    // Update LocalStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setSelectSize("");
    setSelectColor("");
    setPrequantity(0);
  };

  return (
    <div>
      <div className="">
        <h4> {item.name} </h4>
        <p className="rating">
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <span>
            {" "}
            {item.rating_count}
            review
          </span>
        </p>
        <h4>$ {item.original_price}</h4>
        <h6>{item.brand}</h6>
        <p> {item.description} </p>
      </div>
      {/* Cart component */}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="select-product size">
            <select
              value={selectSize}
              onChange={(e) => setSelectSize(e.target.value)}
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
          {/* Minus plus */}
          <div className="cart-plus-minus">
            <div
              className="dec qtybutton"
              onClick={() => {
                if (prequantity > 1) {
                  setPrequantity(prequantity - 1);
                }
              }}
            >
              -
            </div>
            <input
              className="cart-plus-minus-box"
              type="text"
              name="qtybutton"
              id="qtybutton"
              value={prequantity}
              onChange={(e) => setPrequantity(parseInt(e.target.value))}
            />
            <div
              className="inc qtybutton"
              onClick={() => {
                setPrequantity(prequantity + 1);
              }}
            >
              +
            </div>
          </div>

          <button type="submit" className="lab-btn">
            <span>{t("addToCart")}</span>
          </button>
          <Link to="/cart-page" className="lab-btn bg-primary">
            <span>{t("checkOut")}</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ProductDisplay;
