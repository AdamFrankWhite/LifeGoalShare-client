import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { connect } from "react-redux";
import { getAllLifeGoals } from "../redux/actions/lifegoalActions";
import LifeGoalMain from "../components/LifeGoalMain.js";
import LifeGoalCard from "../components/LifeGoalCard";
import CreateLifeGoal from "./CreateLifeGoal";

//Material UI
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
function Home(props) {
  let match = useRouteMatch();
  useEffect(
    () => props.getAllLifeGoals(),
    []
    //TODO - Home component is working, it is the redirect with SET_AUTHENTICATION action that is changing/resetting application state
  );

  const lifeGoals = props.lifegoals
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .map((lifeGoal) => <LifeGoalCard key={lifeGoal._id} data={lifeGoal} />);

  const lifeGoalRoutes = props.lifegoals.map((lifeGoal) => {
    // console.log(lifeGoal._id);
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
    <div className="home-container">
      <Link className="red-btn" to={"/lifegoal/add"}>
        Create LifeGoal
        <AddCircleOutlineIcon />
      </Link>

      {/* {lifeGoalRoutes} */}
      <div>{lifeGoals}</div>
      {/* <Route
        path="/lifegoal/add"
        render={(props) => <CreateLifeGoal {...props} />}
      /> */}
    </div>
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
