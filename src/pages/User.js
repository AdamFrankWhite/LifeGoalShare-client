import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import LifeGoals from "../components/LifeGoals";

function User(props) {
  console.log(props.data);
  return (
    <div className="user-cont">
      <img
        style={props.user.loading ? { visibility: "hidden" } : {}}
        className="user-profile-pic"
        src={props.data.profile.profileImageUrl}
        alt="profile image"
      ></img>
      <h2>{props.data.profile.handle}</h2>
      <h2>LifeGoals</h2>
      {/* <LifeGoals lifegoals={}/> */}
      <hr></hr>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(User);
