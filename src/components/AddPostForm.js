import React, { useState } from "react";
import { connect } from "react-redux";
import { addNewPost } from "../redux/actions/lifegoalActions";
//Material UI
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function AddPostForm(props) {
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  //   const initialPostHeaderImage = "some image";

  let postData = {
    lifeGoalID: props.data._id,
    postData: {
      postName: "A New Post",
      postContent: "Some new content",
    },
  };

  return (
    <div>
      <span
        className="create-lifegoal-btn"
        onClick={() => {
          console.log(props.user.userData.profile.handle);

          props.addNewPost(postData);
        }}
      >
        Create Post
        <AddCircleOutlineIcon />
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
  addNewPost,
};

export default connect(mapStateToProps, mapActionsToProps)(AddPostForm);
