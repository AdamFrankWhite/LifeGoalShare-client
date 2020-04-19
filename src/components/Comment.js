import React, { Component } from "react";
import ReplyInput from "./ReplyInput";

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
    this.setState({ showReplyInput: !this.showReplyInput });
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

        {this.state.showReplyInput && <ReplyInput />}
      </div>
    );
  }
}
