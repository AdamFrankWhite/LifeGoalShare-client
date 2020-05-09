import React, { useState } from "react";
import ReplyInput from "./ReplyInput";
import moment from "moment";
import { connect } from "react-redux";

function Comment(props) {
  const [toggleReplyInput, setToggleReplyInput] = useState(false);
  console.log(props.parents);
  // Check if comment deleted
  let author =
    props.comment.comment !== "DELETED" ? props.comment.author + ": " : "";
  let comment = props.comment.comment;

  return (
    <div className="goal-comment-cont" style={props.margin}>
      <div className="goal-comment">
        <div>
          <span className="comment-user">{author}</span>
          <span className="comment-time">
            {moment(props.comment.createdAt).fromNow()}
          </span>
        </div>
        {props.loggedIn && (
          <span
            onClick={() => setToggleReplyInput(!toggleReplyInput)}
            className="comment-reply-btn"
          >
            {toggleReplyInput ? "Cancel" : "Reply"}
          </span>
        )}
      </div>
      <p className="comment-content"> {comment}</p>

      {toggleReplyInput && (
        <ReplyInput
          commentType={props.postID ? "post" : "lifeGoal"}
          ID={props.postID ? props.postID : props.lifeGoalID}
          // Parents prop, checks when postcomment or lifegoal comment
          parents={props.parents}
        />
      )}
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    // profile: state.user.profile,
    loggedIn: state.user.loggedIn,
  };
};
export default connect(mapStateToProps)(Comment);
