import React, { useState } from "react";
import ReplyInput from "./ReplyInput";
import moment from "moment";
import { connect } from "react-redux";

function Comment(props) {
  // const [toggleComments, setToggleComments] = useState(false);
  const [toggleReplyInput, setToggleReplyInput] = useState(false);

  // Check if comment deleted

  let author =
    props.comment.comment !== "DELETED" ? props.comment.author + ": " : "";
  let comment = props.comment.comment;

  return (
    <div className="goal-comment-cont" style={props.margin}>
      <div className="goal-comment">
        <p>
          {author} {comment}
        </p>
        {props.loggedIn && (
          <span
            onClick={() => setToggleReplyInput(!toggleReplyInput)}
            className="comment-reply-btn"
          >
            {toggleReplyInput ? "Cancel" : "Reply"}
          </span>
        )}
      </div>
      <p>{moment(props.comment.createdAt).fromNow()}</p>
      {toggleReplyInput && (
        <ReplyInput lifeGoalID={props.lifeGoalID} parents={props.parents} />
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
