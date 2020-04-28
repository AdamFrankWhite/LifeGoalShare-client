import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import {
  logOut,
  authenticateUserOnRefresh,
} from "../redux/actions/userActions";
const logo = require("../assets/LifeGoalSHARE.png");

class Navbar extends Component {
  constructor(props) {
    super();
    this.logOut = this.logOut.bind(this);
  }
  componentWillMount() {
    if (window.localStorage.getItem("access_token")) {
      console.log(window.localStorage.getItem("access_token"));
      this.props.authenticateUserOnRefresh(); //error - on refresh, you are logging in without username/password

      // console.log(this.props.user);
    }
    // axios.get("http://localhost:5000/lifegoals/").then((data) => {
    //   this.setState({ lifeGoals: data.data });
    // });
  }
  logOut() {
    this.props.logOut();
  }
  render() {
    return (
      <nav>
        <div className="navbar-container">
          <img alt="logo" src={logo} className="nav-logo" />
          <div className="btn-group">
            {this.props.loggedIn && (
              <NavLink to="/dashboard">
                <span className="nav-btn">My Dashboard</span>
              </NavLink>
            )}
            {!this.props.loggedIn && (
              <NavLink to="/login">
                <span className="nav-btn">Login</span>
              </NavLink>
            )}
            {!this.props.loggedIn && (
              <NavLink to="/signup">
                <span className="nav-btn">Sign Up</span>
              </NavLink>
            )}
            <NavLink to="/">
              <span className="nav-btn">Home</span>
            </NavLink>
            {this.props.loggedIn && (
              <NavLink to="/logout" onClick={() => this.logOut()}>
                <span className="nav-btn">Log Out</span>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    // profile: state.user.profile,
    loggedIn: state.user.loggedIn,
  };
};

const mapActionsToProps = {
  logOut,
  authenticateUserOnRefresh,
};

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
