import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
function Profile(props) {
  const [bio, setBio] = useState(props.user.userData.profile.bio);
  const [location, setLocation] = useState(
    props.user.userData.profile.location
  );
  const [editLocation, setEditLocation] = useState(false);
  const [editBio, setEditBio] = useState(false);
  console.log(props.user);

  const updateProfile = () => {
    let updatedUserProfile = {
      location: location,
      bio: bio,
      lifeGoalCategories: [],
    };
    console.log(window.localStorage.getItem("access_token"));
    axios
      .put("http://localhost:5000/users/profile/update", updatedUserProfile, {
        headers: {
          Authorization: window.localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log("Update Profile");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="profile-cont">
      <h2>{props.user.userData.profile.handle}'s Profile</h2>
      <img
        className="profile-pic"
        src={props.user.userData.profile.profileImageUrl}
        alt="profile image"
      ></img>
      <br></br>
      <span
        className="edit-btn"
        onClick={() => console.log("change pic")}
      ></span>
      <div className="profile-row">
        <h3>Bio: </h3>
        {!editBio ? (
          <span>{bio}</span>
        ) : (
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
        <span
          className="edit-btn"
          onClick={() => {
            setEditBio(!editBio);
            editBio && updateProfile();
          }}
        >
          {!editBio ? "Edit" : "Update"}
        </span>
      </div>
      <div className="profile-row">
        <h3>Location: </h3>
        {!editLocation ? (
          <span>{location}</span>
        ) : (
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        )}
        <span
          className="edit-btn"
          onClick={() => {
            setEditLocation(!editLocation);
            editLocation && updateProfile();
          }}
        >
          {!editLocation ? "Edit" : "Update"}
        </span>
      </div>
      <h3>
        Lifegoal interests: {props.user.userData.profile.lifeGoalCategories}
      </h3>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    // profileImg: state.user
  };
};
export default connect(mapStateToProps)(Profile);
