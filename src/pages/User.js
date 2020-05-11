import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

function User(props) {
  console.log(props.data);
  return (
    <div className="user-cont">
      <img
        className="user-profile-pic"
        src={props.data.profile.profileImageUrl}
        alt="profile image"
      ></img>
      <h2>{props.data.profile.handle}</h2>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(User);
