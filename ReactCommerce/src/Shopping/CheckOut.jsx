/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./modal.css";
import { Navigate } from "react-router-dom";
const CheckOut = ({ pays, ville, postalCode, adresse }) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("Visa");
  const [isFormValid, setIsFormValid] = useState(true); // Added state for form validation
  const authUser = JSON.parse(localStorage.getItem("auth-user"));
      const name = authUser.name;
      const email = authUser.email;

  // Handle Tab Change

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  
  const handleShow = () => {    if (isFormValid) {
      setShow(true);

    } else {
      // If form is not valid, show a SweetAlert
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

  useEffect(() => {
    // Update isFormValid based on the conditions
    setIsFormValid(
      pays !== "" && ville !== "" && postalCode !== "" && adresse !== ""
    );
  }, [pays, ville, postalCode, adresse]);

  const handleOrderConfirm = async () => {
    // Display a confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You wanna buy this product !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i want it!",
    });

    // Check if the user clicked the 'Confirm' button
    if (result.isConfirmed) {
      // Display a success alert
      Swal.fire("Ordered!", "Your order has been well.", "success");
      // localStorage.removeItem('cart');
      Navigate('/home');


    }
  };

  

  return (
    <div className="modalCard">
      <Button variant="primary" className="py-2" onClick={handleShow}>
        Proceed To Checkout
      </Button>

      {isFormValid && (
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          className="modal fade"
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
                        className={`nav-link ${
                          activeTab === "visa" ? "active" : ""
                        }`}
                        id="visa-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="visa"
                        aria-selected={activeTab === "visa"}
                        onClick={() => handleTabChange("visa")}
                      >
                        <img
                          src="https://th.bing.com/th/id/R.576ab76e67d4c67bdea8b957309ff00c?rik=Mf3KGAIbIDLazw&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f3%2fCredit-Card-Visa-And-Master-Card-PNG-HD.png&ehk=eB8%2fdX9KPCLqTj68iWx4F5ykP1tOtACuL0ro4zIR3iY%3d&risl=&pid=ImgRaw&r=0"
                          alt="visa Logo "
                          style={{ width: "80px", height: "36px" }}
                        />
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        href="#paypal"
                        className={`nav-link ${
                          activeTab === "paypal" ? "active" : ""
                        }`}
                        id="paypal-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="paypal"
                        aria-selected={activeTab === "paypal"}
                        onClick={() => handleTabChange("paypal")}
                      >
                        <img
                          src="https://th.bing.com/th/id/OIP.mSu2j5BkATvkRDlJUDz_PgHaEK?rs=1&pid=ImgDetMain"
                          alt="paypal Logo "
                          style={{ width: "80px", height: "36px" }}
                        />
                      </a>
                    </li>
                  </ul>

                  {/* content  */}
                  <div className="tab-content" id="myTabContent">
                    {/* visa Content */}
                    <div
                      className={`tab-pane fade ${
                        activeTab === "visa" ? "show active" : ""
                      }`}
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
                              id="name"
                              className="form-control"
                              required
                            />
                            <span>Your Name </span>
                          </div>
                          <div className="inputbox">
                            <input
                              type="text"
                              min="1"
                              max="999"
                              id="number"
                              className="form-control"
                              required
                            />
                            <span>Your Card Nuber </span>
                            <i className="fa fa-eye"></i>
                          </div>
                          <div className="d-flex flex-row">
                            <div className="inputbox">
                              <input
                                type="text"
                                min="1"
                                max="999"
                                id="number"
                                className="form-control"
                                required
                              />
                              <span>Expiration Date </span>
                            </div>
                            <div className="inputbox">
                              <input
                                type="text"
                                min="1"
                                max="999"
                                id="number"
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
                              onClick={handleOrderConfirm}
                            >
                              Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* paypal Content */}
                    <div
                      className={`tab-pane fade ${
                        activeTab === "paypal" ? "show active" : ""
                      }`}
                      id="paypal"
                      role="tabpanel"
                      aria-labelledby="paypal-tab"
                    >
                      <div className="mt-4 mx-4">
                        <div className="text-center">
                          <h5>PayPal Account Info </h5>
                          <div className="form mt-3">
                            <div className="inputbox">
                              <input
                                type="text"
                                id="name"
                                className="form-control"
                                required
                              />
                              <span> Entre Your Email </span>
                            </div>
                            <div className="inputbox">
                              <input
                                type="email"
                                id="name"
                                className="form-control"
                                required
                              />
                              <span>Your Name </span>
                            </div>

                            <div className="d-flex flex-row">
                              <div className="inputbox">
                                <input
                                  type="text"
                                  id="name"
                                  className="form-control"
                                  required
                                />
                                <span>Your Extra info </span>
                              </div>
                              <div className="inputbox">
                                <input
                                  type="text"
                                  id="name"
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
                                onClick={handleOrderConfirm}
                              >
                                Order By Paypal
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Payment Dexclaimer  */}
                  <p className="mt-3 px-4 p-Disclaimer">
                    <em>
                      Payment Disclaimer : All transactions conducted through
                      our platform are subject to these terms and conditions.
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
