/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./modal.css";

const CheckOut = ({ pays, ville, postalCode, numeroRue }) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("visa");
  const [errors, setErrors] = useState([]);
  const [UserID, setUserID] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isFormValid, setIsFormValid] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
    const getIdUser = async () => {
      const res = await axios.get("http://localhost:8001/api/place-order");
      setUserID(res.data.data);
    };
    getIdUser();
  }, []);

  useEffect(() => {
    setIsFormValid(
      pays !== "" && ville !== "" && postalCode !== "" && numeroRue !== ""
    );
  }, [pays, ville, postalCode, numeroRue]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleShow = () => {
    if (isFormValid) {
      setShow(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please complete all inputs before proceeding.",
      });
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOrderConfirm = async (e, payment_mode) => {
    e.preventDefault();
    const authUser = JSON.parse(localStorage.getItem("auth-user"));
    const { name, email } = authUser;

    const formData = {
      id_user: UserID,
      name,
      email,
      pays,
      city: ville,
      no_street: numeroRue,
      zipcode: postalCode,
      payment_mode,
      cartItems,
    };

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to buy these products!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want it!",
    });

    switch (payment_mode) {
      case 'paypal':
        try {
          axios.post('http://localhost:8001/api/validate-order').then(res => {
            if (res.data.status === 201) {
              setErrors([]);
            }
            else if (res.data.status === 422) {
              setErrors(res.data.errors);
              Swal.fire("Error", "All fields are mandatory", "error");
            }
          })

        } catch (error) {
          console.error("Error sending data:", error);
          setErrors(["There was an error placing your order"]);
          Swal.fire("Error", "There was an error placing your order", "error");
        }
        break;
      default:
        break;
    }


  };

  return (
    <div className="modalCard">
      <Button variant="primary" className="py-2" onClick={handleShow}>
        {t("Online Payment")}
      </Button>

      {isFormValid && (
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          centered
        >
          <div className="modal-dialog">
            <h5 className="px-3 mb-3">Select Your Payment Method</h5>
            <div className="modal-content">
              <div className="modal-body">
                <div className="tab mt-3">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <a
                        href="#visa"
                        className={`nav-link ${activeTab === "visa" ? "active" : ""}`}
                        id="visa-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="visa"
                        aria-selected={activeTab === "visa"}
                        onClick={() => handleTabChange("visa")}
                      >
                        <img
                          src="https://th.bing.com/th/id/R.576ab76e67d4c67bdea8b957309ff00c?rik=Mf3KGAIbIDLazw&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f3%2fCredit-Card-Visa-And-Master-Card-PNG-HD.png&ehk=eB8%2fdX9KPCLqTj68iWx4F5ykP1tOtACuL0ro4zIR3iY%3d&risl=&pid=ImgRaw&r=0"
                          alt="visa Logo"
                          style={{ width: "80px", height: "36px" }}
                        />
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        href="#paypal"
                        className={`nav-link ${activeTab === "paypal" ? "active" : ""}`}
                        id="paypal-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="paypal"
                        aria-selected={activeTab === "paypal"}
                        onClick={() => handleTabChange("paypal")}
                      >
                        <img
                          src="https://th.bing.com/th/id/OIP.mSu2j5BkATvkRDlJUDz_PgHaEK?rs=1&pid=ImgDetMain"
                          alt="paypal Logo"
                          style={{ width: "80px", height: "36px" }}
                        />
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">
                    <div
                      className={`tab-pane fade ${activeTab === "visa" ? "show active" : ""}`}
                      id="visa"
                      role="tabpanel"
                      aria-labelledby="visa-tab"
                    >
                      <div className="mt-4 mx-4">
                        <div className="text-center">
                          <h5>Credit Card</h5>
                        </div>
                        <div className="form mt-3">
                          <div className="inputbox">
                            <input
                              type="text"
                              className="form-control"
                              required
                            />
                            <span>Your Name </span>
                          </div>
                          <div className="inputbox">
                            <input
                              type="text"
                              className="form-control"
                              required
                            />
                            <span>Your Card Number </span>
                            <i className="fa fa-eye"></i>
                          </div>
                          <div className="d-flex flex-row">
                            <div className="inputbox">
                              <input
                                type="text"
                                className="form-control"
                                required
                              />
                              <span>Expiration Date </span>
                            </div>
                            <div className="inputbox">
                              <input
                                type="text"
                                className="form-control"
                                required
                              />
                              <span>CVV </span>
                            </div>
                          </div>
                          <div className="px-5 pay">
                            <button
                              type="submit"
                              className="btn btn-success btn-block"
                              onClick={(e) => handleOrderConfirm(e, "VISA")}
                            >
                              Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`tab-pane fade ${activeTab === "paypal" ? "show active" : ""}`}
                      id="paypal"
                      role="tabpanel"
                      aria-labelledby="paypal-tab"
                    >
                      <div className="mt-4 mx-4">
                        <div className="text-center">
                          <h5>PayPal Account Info</h5>
                          <div className="form mt-3">
                            <div className="inputbox">
                              <input
                                type="email"
                                className="form-control"
                                required
                              />
                              <span>Enter Your Email</span>
                            </div>
                            <div className="inputbox">
                              <input
                                type="text"
                                className="form-control"
                                required
                              />
                              <span>Your Name</span>
                            </div>
                            <div className="d-flex flex-row">
                              <div className="inputbox">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                                <span>Your Extra Info</span>
                              </div>
                              <div className="inputbox">
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                />
                                <span></span>
                              </div>
                            </div>
                            <div className="px-5 pay">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                                onClick={(e) => handleOrderConfirm(e, "paypal")}
                              >
                                Order By PayPal
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 px-4 p-Disclaimer">
                    <em>
                      Payment Disclaimer: All transactions conducted through our platform are subject to these terms and conditions.
                    </em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CheckOut;
