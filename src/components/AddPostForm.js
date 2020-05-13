import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addNewPost, postImageUpload } from "../redux/actions/lifegoalActions";

//Image
import defaultPostImage from "../assets/defaultPostImage.jpg";
//Material UI
import SendIcon from "@material-ui/icons/Send";
import LinearIndeterminate from "./LoadingBar";
const randomstring = require("randomstring");
function AddPostForm(props) {
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState(defaultPostImage);
  const newPostID = randomstring.generate({
    length: 24,
    charset: "hex",
  });
  useEffect(() => {
    setImageFile(props.lifegoals.tempPostData);
  });

  const handleImageChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    // Create form data
    const formData = new FormData();
    formData.append("file", image);
    //Append lifegoal data to form
    formData.append("lifeGoalID", props.data._id);
    formData.append("postID", newPostID);
    // NEED TO VALIDATE INPUT
    //SEND TO SERVER
    props.postImageUpload(formData, image);
    e.preventDefault();
    // setImageFile(`/uploads/postImages/${props.data._id}/temp/${image.name}`);
  };

  let postData = {
    lifeGoalID: props.data._id,
    postData: {
      postName: postName,
      postContent: postContent,
      postID: newPostID,
      // postHeaderImage: image
    },
  };

  return (
    <div className="create-post-cont">
      <h3>New Post: </h3>
      <div className="create-post-form">
        <div className="multistep-form-fields">
          <input
            placeholder="Title..."
            value={postName}
            onChange={(e) => {
              setPostName(e.target.value);
            }}
          />
          <textarea
            placeholder="Content..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
        </div>
      </div>
      <img className="profile-pic" src={imageFile} alt="profile image"></img>
      <input type="file" id="fileInput" onChange={handleImageChange}></input>
      <span
        className="create-post-btn"
        onClick={() => {
          props.addNewPost(postData);
          props.showForm(false);
          //Reset form
          setPostName("");
          setPostContent("");
        }}
      >
        <span className="pr-1">Create Post </span>
        <SendIcon className="padding-left" />
      </span>
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
  addNewPost,
  postImageUpload,
};

export default connect(mapStateToProps, mapActionsToProps)(AddPostForm);
