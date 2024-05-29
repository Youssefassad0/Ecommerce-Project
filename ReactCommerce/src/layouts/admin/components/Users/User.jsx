import React from 'react'
// import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import {
    Alert,
    Badge,
    Button,
    Card,
    Modal,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
} from "react-bootstrap";
function User() {
    return (
        <div>
            Hello

            <Alert variant="danger">
                <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="alert"
                    type="button"
                >
                    <i className="nc-icon nc-simple-remove"></i>
                </button>
                <span>
                    <b>Danger -</b>
                    This is a regular notification made with 
                </span>
            </Alert>
        </div>
    )
}

export default User