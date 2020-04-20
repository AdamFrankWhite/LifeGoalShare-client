import React, { Component } from "react";
import ReplyInput from "./ReplyInput";
import moment from "moment";

export default class Comment extends Component {
  constructor() {
    super();
    this.showReplyInput = this.showReplyInput.bind(this);
    this.state = {
      showComments: false,
      showReplyInput: false,
    };
  }

  showReplyInput() {
    this.setState({ showReplyInput: !this.state.showReplyInput });
    console.log(window.localStorage.getItem("access_token"));
  }
  render() {
    {
      /* Check if comment deleted */
    }
    let author =
      this.props.comment.comment !== "DELETED"
        ? this.props.comment.author + ": "
        : "";

    let comment = this.props.comment.comment;

    return (
      <div className="goal-comment-cont" style={this.props.margin}>
        <div className="goal-comment">
          <p>
            {author} {comment}
          </p>
          <span
            onClick={() => this.showReplyInput()}
            className="comment-reply-btn"
          >
            {this.state.showReplyInput ? "Cancel" : "Reply"}
          </span>
        </div>
        <p>{moment(this.props.comment.createdAt).fromNow()}</p>
        {this.state.showReplyInput && (
          <ReplyInput
            token={this.props.token}
            lifeGoalID={this.props.lifeGoalID}
            parents={this.props.parents}
          />
        )}
      </div>
    );
  }
}
