import React, { Component } from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../component_styles/ViewReservations.css";
import logo from "../component_styles/logo.png";

class ViewReservations extends Component {

  //ARS code below


  // componentDidMount() is a lifecycle hook, its a built-in method
  // following method calls this.getAllReservations() on loading of the page 
  componentDidMount() {
    this.getAllReservations()
  }


  //async function, waits till the data from DB is retrieved, at line where await occurrs.
  getAllReservations() {
    var tempReservations = [];
    const httpHandler = require('react-http-client');

    httpHandler.get(
      'http://localhost:3001/api/getAllReservations'
    ).then((responseData) => {

      for (let i = 0; i < Object.keys(responseData.reservations).length; i++) {
        var obj = { dateAndTime: "", seats: 0, number: "" };
        obj.dateAndTime = responseData.reservations[i].DateAndTime;
        obj.seats = responseData.reservations[i].Seats;
        obj.number = responseData.reservations[i].Phone;
        tempReservations.push(obj)
      }

      this.setState({ reservations: tempReservations });

    });
  }

  //ARS code above




  state = {
    dashboardClicked: false,
    selectedValue: null,
    reservations: []
    // [
    //   // {
    //   //   dateAndTime: "",
    //   //   seats: "",
    //   //   number: "",
    //   // },
    //   // {
    //   //   dateAndTime: "9th June 10 pm",
    //   //   seats: "6",
    //   //   number: "090078601",
    //   // },
    // ]
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
    });
  };
  async removeReservation2(obj) {
    const httpHandler = require('react-http-client');
    const postResponse = await httpHandler.post(
      'http://localhost:3001/api/RemoveReservation', obj
    );
    console.log(postResponse);
  }
  removeReservation = () => {
    for (var i = 0; i < this.state.reservations.length; i++) {
      var concatenated = this.state.reservations[i].dateAndTime + " | " +
        this.state.reservations[i].seats + " seats | " + this.state.reservations[i].number;
      if (this.state.selectedValue === concatenated) {
        const obj = {
          Seats: this.state.reservations[i].seats,
          Phone: this.state.reservations[i].number,
          DateAndTime: this.state.reservations[i].dateAndTime
        };
        this.removeReservation2(obj);
        alert("Reservation Has been removed successfuly : \n" + concatenated);
      }
    }
    //Iterate over reservations in the db
    //for each reservation, concatenate its dateAndTime, seats, and number
    //let x= i.dateAndTime + " | " + i.seats + " seats | " + i.number
    // You should end up with a string of a pattern like "5th June 5 pm | 5 seats | 090078601"
    //Now, compare this string to this.state.selectedValue. If it matches, remove it.


    this.setState({ dashboardClicked: true });
  }
  render() {
    if (this.state.dashboardClicked) {
      return <Redirect to="/AdminDashboard" />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>View reservations | Hikari Sushi</title>
        </Helmet>
        <body>
          <div className="ViewReservation_menu_bar">
            <img className="logo" src={logo} alt="logo" />
            <a onClick={this.handleDashboardClicked}>Dashboard</a>
          </div>
          <div className="ViewReservation_bodycontainer">
            <div className="ViewReservation_left">
              <p>Select Items</p>

              <select
                className="ViewReservation_select_items"
                onChange={this.selectValue}
                value={this.state.selectedValue}
                multiple>   
                {this.state.reservations
                  ? this.state.reservations.map((reservationEntry) => (
                    <option
                      value={
                        reservationEntry.dateAndTime +
                        " | " +
                        reservationEntry.seats +
                        " seats | " +
                        reservationEntry.number
                      }>
                      Reservation
                    </option>
                  ))
                  : () => { }}
              </select>
            </div>
            <div className="ViewReservation_right">
              <p>Order:</p>
              <div className="ViewReservation_items">
                <p>{this.state.selectedValue}</p>
              </div>
              <div className="ViewReservation_bottom_right">
                <button
                  className="ViewReservation_button"
                  onClick={this.removeReservation}>
                  Visited
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

export default ViewReservations;
