import React, { Component } from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../component_styles/CustomerDashboard.css";
import logo from "../component_styles/logo.png";

class CustomerDashboard extends Component {
  state = {
    placeOrderClicked: false,
    makeReservationClicked: false,
    logOutClicked: false,
  };
  componentWillUnmount() {
    window.location.reload();
  }
  handleplaceOrderClicked = () => {
    this.setState({ placeOrderClicked: true });
  };
  handleMakeReservationClicked = () => {
    this.setState({ makeReservationClicked: true });
  };
  handleLogOutClicked = () => {
    this.setState({ logOutClicked: true });
  };
  render() {
    if (this.state.logOutClicked) {
      return <Redirect to="/" />;
    }
    if (this.state.placeOrderClicked) {
      return <Redirect to="/PlaceOrder" />;
    }
    if (this.state.makeReservationClicked) {
      return <Redirect to="/MakeReservation" />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>Hikari Sushi | Admin Dashboard</title>
        </Helmet>
        <body>
          <div className="menuBar">
            <a onClick={this.handleplaceOrderClicked}>Place Order</a>
            <a onClick={this.handleMakeReservationClicked}>Make Reservation</a>
            <a onClick={this.handleLogOutClicked}>LogOut</a>
          </div>

          <div className="content">
            <img className="logo" src={logo} alt="logo" />
            <p className="resturauntName">Hikari Sushi | Customer Dashboard</p>
          </div>
          <div className="footer">
            <p>Hikari Sushi Copyright 2021 | Contact Us: 090078601</p>
          </div>
        </body>
      </React.Fragment>
    );
  }
}

export default CustomerDashboard;
