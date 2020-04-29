import React from "react";
import { connect } from "react-redux";
import { getUserLifeGoals } from "../../redux/actions/lifegoalActions";
function MyLifeGoals(props) {
  return (
    <div>
      <span
        onClick={() =>
          props.getUserLifeGoals(props.user.userData.profile.handle)
        }
      >
        My LifeGoals
      </span>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapActionsToProps = {
  getUserLifeGoals,
};

export default connect(mapStateToProps, mapActionsToProps)(MyLifeGoals);
