import React, { Component } from "react";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.scss";

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

import axios from "axios";

//Pages
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import LifeGoal from "./pages/LifeGoal";

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.getComments = this.getComments.bind(this);
    this.goToPost = this.goToPost.bind(this);
    this.goToLifeGoal = this.goToLifeGoal.bind(this);
    this.state = {
      username: "",
      password: "",
      userData: null,
      sessionToken: "",
      redirect: "",
      loggedIn: false,
      isAuthenticated: false,
      userComments: [],
    };
  }

  getComments() {
    axios
      .get("http://localhost:5000/users/comments", {
        headers: { Authorization: this.state.sessionToken },
      })
      .then((data) => {
        console.log(data.data);
        this.setState({ userComments: data.data });
      });
  }

  goToPost() {
    this.setState({ redirect: "post" });
  }

  goToLifeGoal() {
    this.setState({ redirect: "lifegoal" });
  }

  componentDidMount() {
    let token = window.localStorage.getItem("access_token");
    if (token) {
      this.setState({
        sessionToken: token,
        isAuthenticated: true,
        loggedIn: true,
      });
    } else {
      this.setState({ isAuthenticated: false, loggedIn: false });
    }
  }
  handleChange(e) {
    let changeProp = e.target.name;
    this.setState({ [changeProp]: e.target.value });
  }

  handleLogin(e) {
    console.log(this.state.username, this.state.password);
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((data) => {
        console.log(data.data.token);
        if (data.data.token) {
          this.setState({
            sessionToken: data.data.token,
            loggedIn: true,
            isAuthenticated: true,
          });
          window.localStorage.setItem("access_token", data.data.token);
          axios
            .get("http://localhost:5000/users/profile/get", {
              headers: {
                Authorization: data.data.token,
              },
            })
            .then((data) => {
              console.log(data.data);
              this.setState({ userData: data.data, redirect: "dashboard" });
            });
        } else {
          //Error
        }
      });
  }

  handleLogout() {
    this.setState({
      loggedIn: false,
      username: "",
      userData: null,
      sessionToken: "",
      redirect: "",
      isAuthenticated: false,
    });
    window.localStorage.clear();

    //TODO - redux reducer
  }

  handleRedirect() {
    return <Redirect to={`/${this.state.redirect}`} />;
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            {this.handleRedirect()}
            <NavBar loggedIn={this.state.loggedIn} logout={this.handleLogout} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home
                    {...props}
                    token={this.state.sessionToken}
                    goToPost={this.goToPost}
                    goToLifeGoal={this.goToLifeGoal}
                  />
                )}
              />

              {/* Protected routes */}
              {this.state.isAuthenticated && (
                <Route
                  path="/dashboard"
                  exact
                  render={(props) => (
                    <Dashboard
                      {...props}
                      getComments={this.getComments}
                      myComments={this.state.userComments}
                    />
                  )}
                />
              )}

              {this.state.isAuthenticated && (
                <Route
                  path="/post"
                  exact
                  render={(props) => <Post {...props} />}
                />
              )}
              {this.state.isAuthenticated && (
                <Route
                  path="/lifegoal"
                  exact
                  render={(props) => <LifeGoal {...props} />}
                />
              )}

              <Route
                path="/login"
                render={(props) => (
                  <LogIn
                    {...props}
                    handleChange={this.handleChange}
                    username={this.state.username}
                    password={this.state.password}
                    handleLogin={this.handleLogin}
                  />
                )}
              />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
