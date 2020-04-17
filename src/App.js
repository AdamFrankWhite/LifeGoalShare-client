import React, { Component } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import axios from "axios";

//Pages
import home from "./pages/home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/signup";

class App extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      password: "",
      userData: null,
      sessionToken: ""
    };
  }

  handleChange(e) {
    let changeProp = e.target.name;
    this.setState({ [changeProp]: e.target.value });
  }

  handleSubmit(e) {
    console.log(this.state.username, this.state.password);
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", {
        username: this.state.username,        password: this.state.password,
      })
      .then((data) => {
        if (data.token) {
          this.setState({sessionToken: data.token})
          axios.get("http://localhost:5000/users/profile/get", {currentUser = this.state.sessionToken})
          .then(data => {console.log(data)
        this.setState({redirect = "Dashboard"}))
        } else {
          //Error
        }
      });
  }
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={home} />
            <Route
              path="/login"
              render={(props) => (
                <LogIn
                  {...props}
                  handleChange={this.handleChange}
                  username={this.state.username}
                  password={this.state.password}
                  handleSubmit={this.handleSubmit}
                />
              )}
            />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
