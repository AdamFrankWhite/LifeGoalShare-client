import React, { useState } from "react";
import { connect } from "react-redux";
import { addNewPost } from "../redux/actions/lifegoalActions";
//Material UI
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SendIcon from "@material-ui/icons/Send";
import LinearIndeterminate from "./LoadingBar";
function AddPostForm(props) {
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  //   const initialPostHeaderImage = "some image";

  let postData = {
    lifeGoalID: props.data._id,
    postData: {
      postName: postName,
      postContent: postContent,
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
      {console.log(props)}
      {!props.user.loading && !props.user.success_res && (
        <span
          className="create-post-btn"
          onClick={() => {
            props.addNewPost(postData);
          }}
        >
          <span className="pr-1">Create Post </span>
          )}
          <SendIcon className="padding-left" />
        </span>
      )}

      {!props.user.loading && props.user.success_res && <span>Success</span>}
      {!props.user.loading && props.user.fail_res && <span>Try again</span>}
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
