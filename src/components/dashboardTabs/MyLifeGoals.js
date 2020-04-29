import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserLifeGoals } from "../../redux/actions/lifegoalActions";
import LifeGoalCard from "../LifeGoalCard";
function MyLifeGoals(props) {
  let lifeGoals = props.lifegoals.userLifeGoals.map((lifeGoal) => (
    <LifeGoalCard key={lifeGoal._id} data={lifeGoal} />
  ));
  useEffect(() => {
    props.getUserLifeGoals(props.user.userData.profile.handle);
  }, []);
  return (
    <div>
      My LifeGoals
      {lifeGoals}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    lifegoals: state.lifegoals,
  };
};

const mapActionsToProps = {
  getUserLifeGoals,
};

export default connect(mapStateToProps, mapActionsToProps)(MyLifeGoals);
