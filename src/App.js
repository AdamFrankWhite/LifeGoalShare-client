import React, { Component } from "react";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import "./App.scss";

// Redux
import { connect } from "react-redux";
// import { Provider } from "react-redux";

import axios from "axios";

//Pages
import Home from "./pages/Home";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import CreateLifeGoal from "./pages/CreateLifeGoal";
import LifeGoalMain from "./components/LifeGoalMain";
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
    const lifeGoalRoutes = this.props.lifegoals.map((lifeGoal) => {
      return (
        <Route
          path={`/lifegoals/${lifeGoal._id}`}
          render={(props) => (
            <LifeGoalMain {...props} key={lifeGoal._id} data={lifeGoal} />
          )}
        />
      );
    });
    return (
      <div className="App">
        <Router>
          {this.handleRedirect()}
          <NavBar logout={this.handleLogout} />

          <Switch>
            {lifeGoalRoutes}
            <Route
              path="/lifegoal/add"
              render={(props) => <CreateLifeGoal {...props} />}
            />
            <Route exact path="/" render={(props) => <Home {...props} />} />
            {/* Protected routes */}
            <Route path="/logout">
              <Redirect to="/"></Redirect>
            </Route>
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

            <Route path="/post" exact render={(props) => <Post {...props} />} />

            <Route path="/login">
              {this.props.user.authenticated ? (
                <Redirect to="/dashboard" />
              ) : (
                <LogIn />
              )}
            </Route>
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    lifegoals: state.lifegoals.lifegoalsData,
  };
};

export default connect(mapStateToProps)(App);
