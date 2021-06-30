import React, { Component } from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../component_styles/SignUp.css";
import logo from "../component_styles/logo.png";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    email: "",
    homeClicked: false,
    accounts: [
      // {
      //   username: "Haider_admin",
      //   password: "1234",
      //   type: "admin",
      // },
      // {
      //   username: "Haider_customer",
      //   password: "1234",
      //   type: "customer",
      // },
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
  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleHomeClicked = () => {
    this.setState({ homeClicked: true });
  };

  async createCustomerinDB(obj){
    const httpHandler = require('react-http-client');
    const postResponse = await httpHandler.post(
      'http://localhost:3001/api/createCustomerinDB', obj
    );
    console.log(postResponse);

  }

  handleSubmit = (event) => {
    if (
      this.state.email !== "" &&
      this.state.username !== "" &&
      this.state.name !== "" &&
      this.state.password !== ""
    ) {
      //find in array
      this.state.accounts.find((account) => {
        if (account.username === this.state.username) {
          alert("Username already taken");
        } else {
          // Create new account in database
          //set type:"customer"
          //set username as this.state.username
          //set password as this.state.password
          //set name as this.state.name
          //set email as this.state.email
          let obj = {
            Username: this.state.username,
            Name: this.state.name,
            Password: this.state.password,
            Email: this.state.email,
            UserType: "customer",
          }

          this.createCustomerinDB(obj);


        }
        this.setState({ homeClicked: true });
      });
    } else {
      alert("Please fill all fields");
    }
  };
  render() {
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
              <input
                type="text"
                placeholder="name"
                name="name"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
              <br />
              <input
                type="text"
                placeholder="email"
                name="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <br />
              <button type="submit">SignUp</button>
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

export default SignUp;
