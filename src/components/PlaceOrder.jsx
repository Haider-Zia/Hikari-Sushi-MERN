import React, { Component } from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../component_styles/PlaceOrder.css";
import logo from "../component_styles/logo.png";

class PlaceOrder extends Component {
  state = {
    bill: 0,
    order: "",
    dashboardClicked: false,
    selectedValue: "",
    address: "",
    number: "",
    menu: [
      {
        name: "Shrimp Nigri (2 Piece)",
        price: 600,
      },
      {
        name: "Sashimi Platter (12 Piece)",
        price: 2500,
      },
      {
        name: "Salmon Maki (2 Piece)",
        price: 500,
      },
      {
        name: "Salmon Nigri (2 Piece)",
        price: 550,
      },
      {
        name: "Tuna Maki (2 Pieces)",
        price: 500,
      },
    ],
  };
  componentWillUnmount() {
    window.location.reload();
  }
  handleDashboardClicked = () => {
    this.setState({ dashboardClicked: true });
  };
  handleNumberChange = (event) => {
    this.setState({
      number: event.target.value,
    });
    console.log(this.state.number);
  };
  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value,
    });
    console.log(this.state.address);
  };
  selectValue = (event) => {
    this.setState({
      selectedValue: event.target.value,
    });
  };
  addToOrder = () => {
    var priceString = "";
    var priceNumber = 0;

    this.state.menu.find((menuEntry) => {
      if (menuEntry.name === this.state.selectedValue) {
        priceString = menuEntry.price;
        priceNumber = menuEntry.price;
      }
    });
    this.setState({
      order:
        this.state.order +
        this.state.selectedValue +
        " | " +
        priceString +
        "Rs." +
        "\n",
      bill: this.state.bill + priceNumber,
    });
  };

  async createOrderinDB() {
    // alert("alskdfasdfjasodifj");
    const httpHandler = require('react-http-client');

    //make sure spellings of key are exactly same as backend collection models
    var obj = {
      Order: this.state.order,
      Address: this.state.address,
      Phone: this.state.number,
      TotalPrice: this.state.bill,
    };
    console.log("obj::::!!@@@@###",obj);

    var postResponse = await httpHandler.post(
      'http://localhost:3001/api/createOrderinDB', obj
    );

    console.log(postResponse);

    
  };

  placeOrder = () => {
    if (
      this.state.address !== "" &&
      this.state.number !== "" &&
      this.state.order !== ""
    ) {
      //Add number, address, and order to the db as an order
      this.createOrderinDB();
      //this.setState({ dashboardClicked: true });
    } else {
      alert("Fill all fields and place an order.");
    }
  };
  render() {
    if (this.state.dashboardClicked) {
      return <Redirect to="/CustomerDashboard" />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>Place Order | Hikari Sushi</title>
        </Helmet>
        <body>
          <div className="OrderOnlineMenuBar">
            <img class="logo" src={logo} alt="logo" />
            <a onClick={this.handleDashboardClicked}>Dashboard</a>
          </div>
          <div className="OrderOnlineBodycontainer">
            <div className="OrderOnlineLeft">
              <p>Select Items</p>
              <select
                className="OrderOnlineSelectItems"
                onChange={this.selectValue}
                value={this.state.selectedValue}
                multiple>
                {this.state.menu
                  ? this.state.menu.map((menuEntry) => (
                      <option value={menuEntry.name}>
                        {menuEntry.name + " | " + menuEntry.price + " Rs."}
                      </option>
                    ))
                  : () => {}}
              </select>
              <button className="OrderOnlineButton" onClick={this.addToOrder}>
                Add
              </button>
            </div>
            <div className="OrderOnlineMiddle">
              <p>Enter Info</p>

              <div className="ContactNumber">
                <label>Contact Number </label>
                <input
                  name="contact_number"
                  value={this.state.number}
                  onChange={this.handleNumberChange}
                />
              </div>
              <div className="Address">
                <label>Address </label>
                <input
                  name="address"
                  value={this.state.address}
                  onChange={this.handleAddressChange}
                />
              </div>
            </div>
            <div className="OrderOnlineRight">
              <p>Bill:</p>
              <div className="items">
                <p>{this.state.order}</p>
              </div>
              <div className="OrderOnlineBottomRight">
                <p>Total-----------------------{this.state.bill} Rs</p>
                <button className="OrderOnlineButton" onClick={this.placeOrder}>
                  Order
                </button>
              </div>
            </div>
          </div>
          <div className="footer">
            <p>Hikari Sushi Copyright 2021 | Contact Us: 090078601</p>
          </div>
        </body>
      </React.Fragment>
    );
  }
}

export default PlaceOrder;
