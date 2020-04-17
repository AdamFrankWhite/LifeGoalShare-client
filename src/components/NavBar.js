import React, { Component } from "react";
import { NavLink } from "react-router-dom";
const logo = require("../assets/LifeGoalSHARE.png");
export class Navbar extends Component {
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
              <NavLink to="/logout" onClick={this.props.logout}>
                <span className="nav-btn">Log Out</span>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
