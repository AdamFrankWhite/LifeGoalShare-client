import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

function ReplyInput(props) {
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    let data = {
      lifeGoalID: props.lifeGoalID,
      comment: newComment,
      parentComments: props.parents,
    };
    postComment(data);
  };

  return (
    <div>
      <textarea onChange={(e) => setNewComment(e.target.value)}></textarea>
      <button onClick={() => addComment()}>Send</button>
    </div>
  );
}

export default connect()(ReplyInput);

function postComment(data) {
  axios
    .post("http://localhost:5000/lifegoals/comment/post", data, {
      headers: {
        Authorization: window.localStorage.getItem("access_token"),
      },
    })
    .then((data) => {
      console.log(data);
    });
}
