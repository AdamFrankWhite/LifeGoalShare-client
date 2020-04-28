import React, { useState } from "react";
import { connect } from "react-redux";
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
  const [imageFile, setImageFile] = useState();
  const [toggleUploadImage, setToggleUploadImage] = useState(false);

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
  let upload;
  return (
    <div className="profile-cont">
      <h2>{props.user.userData.profile.handle}'s Profile</h2>
      <img
        className="profile-pic"
        src={props.user.userData.profile.profileImageUrl}
        alt="profile image"
      ></img>
      <input
        type="file"
        ref={(ref) => (upload = ref)}
        style={toggleUploadImage ? { display: "block" } : { display: "none" }}
      ></input>
      {toggleUploadImage && (
        <span
          onClick={() => {
            let formData = new FormData();
            console.log(upload.files);
            // axios.post("http://localhost:5000/users/profile/update/img");  UPLOAD IMAGE, THEN UPDATE STATE AND GET NEW IMAGE TO DISPLAY
          }}
        >
          Upload
        </span>
      )}
      <br></br>
      <span
        className="upload-link"
        onClick={(e) => {
          upload.click();
          setToggleUploadImage(true);
        }}
      >
        Change image...
      </span>
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
export default connect(mapStateToProps)(Profile);
