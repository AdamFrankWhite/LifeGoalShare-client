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
// import { Provider } from "react-redux";

import axios from "axios";

//Pages
import Home from "./pages/Home";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import CreateLifeGoal from "./pages/CreateLifeGoal";
//History
import history from "./history";

class App extends Component {
  constructor() {
    super();
    this.handleRedirect = this.handleRedirect.bind(this);
    this.getComments = this.getComments.bind(this);
    this.state = {
      username: "",
      password: "",
      userData: null,
      sessionToken: "",
      redirect: "",
      loggedIn: false,
      isAuthenticated: false,
      userComments: [],
      lifeGoals: [],
    };
  }

  getComments() {
    axios
      .get("http://localhost:5000/users/comments", {
        headers: { Authorization: window.localStorage.getItem("access_token") },
      })
      .then((data) => {
        this.setState({ userComments: data.data });
      });
  }

  componentDidMount() {
    // this.setState({ isAuthenticated: store.getState().user.authenticated });
    //needs to also authenticate on update, otherwise out of sync
  }

  handleRedirect(page) {
    let path = page ? page : "";
    return <Redirect to={`/${path}`} />;
  }

  render() {
    return (
      // <Provider store={store}>
      <div className="App">
        <Router history={history}>
          {this.handleRedirect()}
          <NavBar logout={this.handleLogout} />
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            {/* Protected routes */}
            {/* {this.state.isAuthenticated && ( */}
            <Route
              path="/dashboard"
              render={(props) => (
                <Dashboard
                  {...props}
                  getComments={this.getComments}
                  myComments={this.state.userComments}
                />
              )}
            />
            {this.state.isAuthenticated && (
              <Route
                path="/post"
                exact
                render={(props) => <Post {...props} />}
              />
            )}
            {/* <Route
                path="/lifegoal/add"
                render={(props) => <AddLifeGoal {...props} />}
              /> */}
            <Route path="/login">
              {this.state.loggedIn ? <Redirect to="/dashboard" /> : <LogIn />}
            </Route>
            {/* <Route
                path="/login"
                render={(props) => (
                  <LogIn {...props} handleRedirect={this.handleRedirect} />
                )}
              /> */}
            <Route path="/signup" component={SignUp} />
            {/* <Route
              path="/lifegoal/add"
              render={(props) => <CreateLifeGoal {...props} />}
            /> */}
          </Switch>
        </Router>
      </div>
      // </Provider>
    );
  }
}

export default App;
