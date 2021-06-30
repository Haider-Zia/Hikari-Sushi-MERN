import React, { Component } from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../component_styles/Home.css";
import logo from "../component_styles/logo.png";

class Home extends Component {
  state = {
    LogInClicked: false,
    SignUpClicked: false,
  };

  componentWillUnmount() {
    window.location.reload();
  }
  handleLogInClicked = () => {
    this.setState({
      LogInClicked: true,
    });
  };
  handleSignUpClicked = () => {
    this.setState({
      SignUpClicked: true,
    });
  };

  render() {
    if (this.state.LogInClicked) {
      return <Redirect to="/LogIn" />;
    }
    if (this.state.SignUpClicked) {
      return <Redirect to="/SignUp" />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>Hikari Sushi | Home Page</title>
        </Helmet>
        <body>
          <div className="menuBar">
            <a onClick={this.handleLogInClicked}>Log In</a>
            <a onClick={this.handleSignUpClicked}>Sign Up</a>
          </div>

          <div className="content">
            <img className="logo" src={logo} alt="logo" />
            <p className="resturauntName">Hikari Sushi | Home Page</p>
            <p>
              At Hikari Sushi & Grill, our food is prepared by skilled and
              experienced chefs, made from fresh, select ingredients, and served
              at a reasonable price for our guests. Our dining area is complete
              with a free fresh salad bar as well as a kids’ area and menu, in
              order to give our customers a more enjoyable family dining
              experience!
            </p>
          </div>
          <div className="footer">
            <p>Hikari Sushi Copyright 2021 | Contact Us: 090078601</p>
          </div>
        </body>
      </React.Fragment>
    );
  }
}

export default Home;
