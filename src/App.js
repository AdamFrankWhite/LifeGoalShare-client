import React, { Component } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

//Pages
import home from "./pages/home";
import SignIn from "./pages/login";
import SignUp from "./pages/signup";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={home} />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
