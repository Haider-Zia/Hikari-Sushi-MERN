import React, { Component } from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet"; 

import "../component_styles/AdminDashboard.css";
import logo from "../component_styles/logo.png";

class AdminDashboard extends Component {
  state = {
    viewOrdersClicked: false,
    viewReservationsClicked: false,
    logOutClicked: false,
  };
  componentWillUnmount() {
    window.location.reload();
  }

  handleViewOrdersClicked = () => {
    this.setState({ viewOrdersClicked: true });
  };
  handleViewReservationsClicked = () => {
    this.setState({ viewReservationsClicked: true });
  };
  handleLogOutClicked = () => {
    this.setState({ logOutClicked: true });
  };
  render() {
    if (this.state.logOutClicked) {
      return <Redirect to="/" />;
    }
    if (this.state.viewOrdersClicked) {
      return <Redirect to="/ViewOrders" />;
    }
    if (this.state.viewReservationsClicked) {
      return <Redirect to="/ViewReservations" />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>Hikari Sushi | Admin Dashboard</title>
        </Helmet>
        <body>
          <div className="menuBar">
            <a onClick={this.handleViewOrdersClicked}>View Orders</a>
            <a onClick={this.handleViewReservationsClicked}>
              View Reservations
            </a>
            <a onClick={this.handleLogOutClicked}>LogOut</a>
          </div>

          <div className="content">
            <img className="logo" src={logo} alt="logo" />
            <p className="resturauntName">Hikari Sushi | Admin Dashboard</p>
          </div>
          <div className="footer">
            <p>Hikari Sushi Copyright 2021 | Contact Us: 090078601</p>
          </div>
        </body>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
