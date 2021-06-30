import React, { Component } from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../component_styles/LogIn.css";
import logo from "../component_styles/logo.png";

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    adminAuthorized: false,
    customerAuthorized: false,
    homeClicked: false,
    accounts: [
      {
        username: "Haider_admin",
        password: "1234",
        type: "admin",
      },
      {
        username: "Haider_customer",
        password: "1234",
        type: "customer",
      },
    ],
  };

  componentWillUnmount() {
    window.location.reload();
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = (event) => {
    //find in array
    this.state.accounts.find((account) => {
      if (
        account.username === this.state.username &&
        account.password === this.state.password
      ) {
        if (account.type === "admin") {
          this.setState({ adminAuthorized: true });
        } else if (account.type === "customer") {
          this.setState({ customerAuthorized: true });
        }
      }
    });
  };

  handleHomeClicked = () => {
    this.setState({ homeClicked: true });
  };

  render() {
    if (this.state.adminAuthorized) {
      return <Redirect to="/AdminDashboard" />;
    }
    if (this.state.customerAuthorized) {
      return <Redirect to="/CustomerDashboard" />;
    }
    if (this.state.homeClicked) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>Hikari Sushi | LogIn </title>
        </Helmet>
        <body>
          <div className="SignInMenuBar">
            <img className="logo" src={logo} alt="logo" />
            <a onClick={this.handleHomeClicked}>Home</a>
          </div>
          <div className="SignInHeader">
            <div>
              <span>Hikari Sushi</span>
            </div>
          </div>
          <br />
          <div className="SignInLogin">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="username"
                name="user"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
              <br />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <br />
              <button type="submit">Login</button>
            </form>
          </div>
          <div className="footer">
            <p>Hikari Sushi Copyright 2021 | Contact Us: 090078601</p>
          </div>
        </body>
      </React.Fragment>
    );
  }
}

export default LogIn;
