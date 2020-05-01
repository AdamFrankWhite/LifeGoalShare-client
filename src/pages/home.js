import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllLifeGoals } from "../redux/actions/lifegoalActions";
import LifeGoalCard from "../components/LifeGoalCard.js";
import AddLifeGoal from "../pages/AddLifeGoal";

//Material UI
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
function Home(props) {
  useEffect(
    () => props.getAllLifeGoals(),
    []
    //TODO - Home component is working, it is the redirect with SET_AUTHENTICATION action that is changing/resetting application state
  );

  const lifeGoals = props.lifegoals
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .map((lifeGoal) => (
      <LifeGoalCard
        key={lifeGoal._id}
        data={lifeGoal}
        goToPost={props.goToPost}
        goToLifeGoal={props.goToLifeGoal}
      />
    ));

  const lifeGoalRoutes = props.lifegoals.map((lifeGoal) => {
    console.log(lifeGoal._id);
    return (
      <Route
        path={`/lifegoals/${lifeGoal._id}`}
        render={(props) => (
          <LifeGoalCard {...props} key={lifeGoal._id} data={lifeGoal} />
        )}
      />
    );
  });
  return (
    <Router>
      <div className="home-container">
        <Link to="/lifegoal/add">
          <span className="create-lifegoal-btn">
            Create LifeGoal
            <AddCircleOutlineIcon />
          </span>
        </Link>
        <Switch>
          {lifeGoalRoutes}
          <Route exact path="/">
            <div>{lifeGoals}</div>
          </Route>
          <Route
            path="/lifegoal/add"
            render={(props) => <AddLifeGoal {...props} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = function (state) {
  return {
    lifegoals: state.lifegoals.lifegoalsData,
  };
};

const mapActionsToProps = {
  getAllLifeGoals,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
