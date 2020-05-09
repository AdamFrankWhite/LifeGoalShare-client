import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

function ReplyInput(props) {
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (props.commentType === "post") {
      let data = {
        postID: props.ID,
        comment: newComment,
        parentComments: props.parents,
      };
      postComment(data, "post/comment");
    }
    if (props.commentType === "lifeGoal") {
      let data = {
        lifeGoalID: props.ID,
        comment: newComment,
        parentComments: props.parents,
      };
      postComment(data, "comment/new");
    }
  };

  return (
    <div>
      <textarea onChange={(e) => setNewComment(e.target.value)}></textarea>
      <button onClick={() => addComment()}>Send</button>
    </div>
  );
}

export default connect()(ReplyInput);

function postComment(data, commentType) {
  axios
    .post(`http://localhost:5000/lifegoals/${commentType}`, data, {
      headers: {
        Authorization: window.localStorage.getItem("access_token"),
      },
    })
    .then((data) => {
      console.log(data);
    });
}
