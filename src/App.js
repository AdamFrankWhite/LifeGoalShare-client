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
import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import LifeGoal from "./pages/LifeGoal";

class App extends Component {
  constructor() {
    super();
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
