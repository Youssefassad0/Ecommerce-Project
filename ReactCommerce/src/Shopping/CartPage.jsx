import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import delIMG from "../assets/images/shop/del.png";
import NavItems from "../components/NavItems";
import Footer from "../components/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import CheckOut from "./CheckOut";

const CartPage = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [selectPays, setSelectPays] = useState("");
  const [codePost, setCodePost] = useState("");
  const [ville, setVille] = useState("");
  const [numeroRue, setNumeroRue] = useState("");
  const [errors, setErrors] = useState([]);
  const [UserID, setUserID] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const Pays = ["Morocco", "France", "America", "Hind", "Russia"];
  let tarif = 0;

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
    async function getIdUser() {
      await axios.get('http://localhost:8001/api/place-order').then(res => setUserID(res.data.data));
    }
    getIdUser();
  }, []);

  const calculerTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  const handleIncrease = (item) => {
    item.quantity++;
    item.total = calculerTotalPrice(item);
    setCartItems([...cartItems]);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const decrease = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.total = calculerTotalPrice(item);
      setCartItems([...cartItems]);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  const HandleRemoveItem = (item) => {
    const updatedCart = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCart);
    updateLocaleStorage(updatedCart);
  };

  const updateLocaleStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + calculerTotalPrice(item);
  }, 0);

  switch (selectPays) {
    case "Morocco":
      tarif = 0;
      break;
    case "France":
      tarif = 30;
      break;
    case "America":
      tarif = 40;
      break;
    case "Hind":
      tarif = 33;
      break;
    case "Russia":
      tarif = 43;
      break;
    default:
  }

  const orderTotal = cartSubtotal + parseFloat(tarif);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const isFormValid = codePost && ville && numeroRue;
  
    if (!isFormValid) {
      setErrors(['All fields are mandatory']);
      Swal.fire('Error', 'All fields are mandatory', 'error');
      return;
    }
  
    const authUser = JSON.parse(localStorage.getItem('auth-user'));
    const name = authUser.name;
    const email = authUser.email;
    const formData = {
      id_user: UserID,
      name: name,
      email: email,
      pays: selectPays,
      city: ville,
      no_street: numeroRue,
      payment_mode:'OnDelivery',
      zipcode: codePost,
      cartItems: cartItems,
    };
  
    try {
      const response = await axios.post('http://localhost:8001/api/place-order', formData);
  
      if (response.data.status === 201) {
        console.log('Data sent successfully:', response.data);
        setErrors([]);
        Swal.fire('Success', 'Order placed successfully', 'success');
        localStorage.removeItem('cart');
        setCartItems([]);
      } else if (response.data.status === 422) {
        // console.log('HHHHHHHHHHHHH');
        setErrors(response.data.errors);
        Swal.fire('Error', 'All fields are mandatory', 'error');
      } else if (response.data.status === 400) {
        setErrors([response.data.message]);
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      setErrors(['There was an error placing your order']);
      Swal.fire('Error', 'There was an error placing your order', 'error');
    }
  };

  return (
    <div>
      <NavItems />
      <PageHeader title={t("Shop Cart")} curPage={t("cart Page")} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cart-product" scope="col">
                      {t("Product")}
                    </th>
                    <th className="cart-price" scope="col">
                      {t("Price")}
                    </th>
                    <th className="cart-quantity" scope="col">
                      {t("Quantity")}
                    </th>
                    <th className="cart-toprice" scope="col">
                      {t("Total")}
                    </th>
                    <th className="cart-edit" scope="col">
                      {t("Edit")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, i) => (
                    <tr key={i}>
                      <td className="product-item cart-product">
                        <div className="p-thumb">
                          <Link to={`/product/${item.id}`}>
                            <img
                              src={`http://127.0.0.1:8001/storage/${item.img}`}
                              alt=""
                              style={{ width: "60px", height: "60px" }}
                            />
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to={`/product/${item.id}`}>
                            {item.name}
                          </Link>
                        </div>
                      </td>
                      <td className="cat-price">${item.price}</td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={() => decrease(item)}
                          >
                            -
                          </div>
                          <input
                            type="text"
                            className="cart-plus-minus-box"
                            name="qtybutton"
                            value={item.quantity}
                            readOnly
                          />
                          <div
                            className="inc qtybutton"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td className="cart-toprice">
                        ${calculerTotalPrice(item)}
                      </td>
                      <td className="cat-edit">
                        <a href="#!" onClick={() => HandleRemoveItem(item)}>
                          <img src={delIMG} alt="" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-bottom">
              <div className="cart-checkout-box">
                <form className="coupon"></form>
                <form className="cart-checkout" onSubmit={handleFormSubmit}>
                  <input type="submit"  value={t("Update Cart")} />
                  <div>
                    {/* <Button variant="primary" className="py-2" onClick={handleFormSubmit}>
                      {t("Proceed To Checkout")}
                    </Button> */}
                  <CheckOut ville={ville} pays={selectPays} postalCode={codePost} numeroRue={numeroRue} UserID={UserID} cartItems={cartItems}
                    />
                  </div>
                </form>
              </div>

              <div className="shiping-box">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="calculate-shiping">
                      <h3>{t("Product Order Form")}</h3>
                      <div className="outline-select"></div>
                      <form>
                        <div className="outline-select">
                          <select
                            value={selectPays}
                            onChange={(e) => setSelectPays(e.target.value)}
                          >
                            <option value="">{t("--Select Pays--")}</option>
                            {Pays.map((p, i) => (
                              <option value={p} key={i}>
                                {p}
                              </option>
                            ))}
                          </select>
                          <div className="text-danger">
                            {errors.pays}
                          </div>
                          <span className="select-icon">
                            <i className="icofont-rounded-down"></i>
                          </span>
                        </div>
                        <div className="outline-select shiping-select">
                          <h6>{t("Adresse")}</h6>
                          <input
                            type="text"
                            className="m-2"
                            placeholder={t("Numéro de Rue")}
                            name="numeroRue"
                            value={numeroRue}
                            onChange={(e) => setNumeroRue(e.target.value)}
                            required
                          />
                          <div className="text-danger">
                            {errors.no_street}
                          </div>
                          <input
                            type="text"
                            className="m-2"
                            placeholder={t("Ville")}
                            name="ville"
                            value={ville}
                            onChange={(e) => setVille(e.target.value)}
                            required
                          />
                          <div className="text-danger">
                            {errors.city}
                          </div>
                          <input
                            type="text"
                            className="m-2"
                            placeholder={t("Postal Code /ZIP")}
                            name="codePost"
                            value={codePost}
                            onChange={(e) => setCodePost(e.target.value)}
                            required
                          />
                          <div className="text-danger">
                            {errors.zipcode}
                          </div>
                          <button type="submit">
                            {t("Update Address")}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3>{t("Cart Totals")}</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left">
                            {t("Cart Subtotal")}
                          </span>
                          <p className="pull-right">${cartSubtotal}</p>
                        </li>
                        <li>
                          <span className="pull-left">
                            {t("Shipping And Handling")}
                          </span>
                          <p className="pull-right">${tarif}</p>
                        </li>
                        <li>
                          <span className="pull-left">
                            {t("Order Total")}
                          </span>
                          <p className="pull-right">${orderTotal}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
