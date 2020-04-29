import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { uploadImage } from "../../redux/actions/userActions";

import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import Tooltip from "@material-ui/core/Tooltip";
function Profile(props) {
  const [bio, setBio] = useState(props.user.userData.profile.bio);
  const [location, setLocation] = useState(
    props.user.userData.profile.location
  );
  const [editLocation, setEditLocation] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [imageFile, setImageFile] = useState(
    props.user.userData.profile.profileImageUrl
  );

  console.log(props.user);
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    console.log(image);
    // Create form data
    const formData = new FormData();
    formData.append("file", image);
    //SEND TO SERVER
    props.uploadImage(formData, image);
    e.preventDefault();
    setImageFile(props.user.userData.profile.profileImageUrl); // need async await, uploadImage, returns blob, which then setImageFile with,
  };

  const updateProfile = () => {
    let updatedUserProfile = {
      location: location,
      bio: bio,
      lifeGoalCategories: [],
    };
    axios
      .put("http://localhost:5000/users/profile/update", updatedUserProfile, {
        headers: {
          Authorization: window.localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log("Update Profile");
      })
      .catch((err) => console.log(err));
  };

  // Main Return
  return (
    <div className="profile-cont">
      <h2>{props.user.userData.profile.handle}'s Profile</h2>
      {/* Profile Picture */}
      <img
        className="profile-pic"
        src={imageFile}
        // src={props.user.userData.profile.profileImageUrl}
        alt="profile image"
      ></img>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleImageChange}
      ></input>
      <br></br>
      <Tooltip title="Change image" aria-label="Edit Image">
        <EditIcon
          className="edit-btn"
          onClick={() => {
            document.getElementById("fileInput").click();
            // axios.post("http://localhost:5000/users/profile/update/img");  UPLOAD IMAGE, THEN UPDATE STATE AND GET NEW IMAGE TO DISPLAY
          }}
        ></EditIcon>
      </Tooltip>
      <br></br>
      <span
        className="edit-btn"
        onClick={() => console.log("change pic")}
      ></span>

      {/* Profile Biography */}
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

        {!editBio ? (
          <Tooltip title="Edit" aria-label="Edit">
            <EditIcon
              className="edit-btn"
              onClick={() => {
                setEditBio(!editBio);
              }}
            ></EditIcon>
          </Tooltip>
        ) : (
          <Tooltip title="Save" aria-label="Save">
            <CheckIcon
              className="edit-btn"
              onClick={() => {
                setEditBio(!editBio);
                updateProfile();
              }}
            ></CheckIcon>
          </Tooltip>
        )}
      </div>

      {/* Profile Location */}
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
        {!editLocation ? (
          <Tooltip title="Edit" aria-label="Edit">
            <EditIcon
              className="edit-btn"
              onClick={() => {
                console.log(props.user);
                setEditLocation(!editLocation);
              }}
            ></EditIcon>
          </Tooltip>
        ) : (
          <Tooltip title="Save" aria-label="Save">
            <CheckIcon
              className="edit-btn"
              onClick={() => {
                setEditLocation(!editLocation);
                updateProfile();
              }}
            ></CheckIcon>
          </Tooltip>
        )}
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

const mapActionsToProps = {
  uploadImage,
};
export default connect(mapStateToProps, mapActionsToProps)(Profile);
