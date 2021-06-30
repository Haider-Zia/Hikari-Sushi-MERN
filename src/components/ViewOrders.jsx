import React, { Component } from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../component_styles/ViewOrders.css";
import logo from "../component_styles/logo.png";

class ViewOrders extends Component {
  state = {
    dashboardClicked: false,
    selectedValue: null,
    orders: [
      // {
      //   order:
      //     "Shrimp Nigri (2 Piece) | 600 \n Sashimi Platter (12 Piece) | 2500",
      // },
      // { order: "Salmon Maki (2 Piece) | 500 \n Tuna Maki (2 Pieces) | 500" },
    ],
  };
  componentWillUnmount() {
    window.location.reload();
  }
  handleDashboardClicked = () => {
    this.setState({ dashboardClicked: true });
  };
  selectValue = (event) => {
    this.setState({
      selectedValue: event.target.value,
      // selectedValue: this.state.orders[0],
    });
    console.log("event.target.value : ",event.target.value);
  };

  ////////////////////////////////////////////////////
  ///////////////////////////////Waseem code below
  componentDidMount() {
    this.getAllOrders()
  }

  AllOrders = [];


  //async function, waits till the data from DB is retrieved, at line where await occurrs.
  getAllOrders() {
    this.AllOrders = [];
    var tempOrders = [];
    const httpHandler = require('react-http-client');
     
    httpHandler.get(
      'http://localhost:3001/api/getAllOrders'
    ).then((responseData) => {
      
      for (let i = 0; i < Object.keys(responseData.orders).length; i++) {
        var obj = {order: ""};
        obj.order = responseData.orders[i].Order;
        tempOrders.push(obj)
        // this.AllOrders.push(responseData.orders[i]);
        // obj.seats = responseData.reservations[i].Seats;
        // obj.number = responseData.reservations[i].Phone;
        // tempReservations.push(obj)
      }
      console.log(tempOrders);

      this.setState({ orders: tempOrders });

    });
  }

  async removeOrder(obj) {
    const httpHandler = require('react-http-client');
    const postResponse = await httpHandler.post(
      'http://localhost:3001/api/RemoveOrder', obj
    );
    console.log(postResponse);
  }
  
///////////////////////////////////////////////////////
//////////////////////////////////waseem code above

  sendOutOrder = () => {
    for (var i = 0; i < this.state.orders.length; i++) {
      var concatenated = this.state.orders[i].order;
      if (this.state.selectedValue === concatenated) {
        const obj = {
          Order: this.state.orders[i].order,
          // Address: this.state.orders[i].address,
          // Phone: this.state.orders[i].number,
          // TotalPrice: this.state.orders[i].bill,
        };
        this.removeOrder(obj);
        alert("Reservation Has been removed successfuly : \n" + concatenated);
      }
    }

    this.setState({ dashboardClicked: true });
  };
  render() {
    if (this.state.dashboardClicked) {
      return <Redirect to="/AdminDashboard" />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>View Orders | Hikari Sushi</title>
        </Helmet>
        <body>
          <div className="ViewOrder_menu_bar">
            <img className="logo" src={logo} alt="logo" />
            <a onClick={this.handleDashboardClicked}>Dashboard</a>
          </div>
          <div className="ViewOrder_bodycontainer">
            <div className="ViewOrder_left">
              <p>Select Order</p>

              <select
                className="ViewOrder_select_items"
                onChange={this.selectValue}
                value={this.state.selectedValue}
                multiple>
                {this.state.orders
                  ? this.state.orders.map((orderEntry) => (
                      <option value={orderEntry.order}>Order</option>
                    ))
                  : () => {}}
              </select>
            </div>
            <div className="ViewOrder_right">
              <p>Order:</p>
              <div className="ViewOrder_items">
                <p>{this.state.selectedValue}</p>
              </div>
              <div className="ViewOrder_bottom_right">
                <button
                  className="ViewOrder_button"
                  onClick={this.sendOutOrder}>
                  Send
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

export default ViewOrders;
