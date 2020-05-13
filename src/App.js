import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.scss";

// Redux
import { connect } from "react-redux";

//Pages
import Home from "./pages/Home";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import User from "./pages/User";
import CreateLifeGoal from "./pages/CreateLifeGoal";
import LifeGoalMain from "./components/LifeGoalMain";

//Socketio
import socketIOClient from "socket.io-client";

function App(props) {
  const ENDPOINT = "http://127.0.0.1:5000";
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
      console.log(response);
    });
  }, []);
  const lifeGoalRoutes = props.lifegoals.map((lifeGoal) => {
    return (
      <Route
        path={`/lifegoals/${lifeGoal._id}`}
        render={(props) => (
          <LifeGoalMain {...props} key={lifeGoal._id} data={lifeGoal} />
        )}
      />
    );
  });

  const userRoutes = props.user.users.map((user) => {
    return (
      <Route
        path={`/user/${user._id}`}
        render={(props) => <User {...props} data={user} />}
      />
    );
  });

  return (
    <div className="App">
      <Router>
        <NavBar />

        <Switch>
          {lifeGoalRoutes}
          {userRoutes}
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
            render={(props) => <Dashboard {...props} />}
          />

          <Route path="/post" exact render={(props) => <Post {...props} />} />

          <Route path="/login">
            {props.user.authenticated ? (
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    lifegoals: state.lifegoals.lifegoalsData,
  };
};

export default connect(mapStateToProps)(App);
