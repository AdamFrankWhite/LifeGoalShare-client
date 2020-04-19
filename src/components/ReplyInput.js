import React, { Component } from "react";
import axios from "axios";

export default class ReplyInput extends Component {
  constructor() {
    super();
    this.addComment = this.addComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      comment: "",
      parents: [],
    };
  }

  handleChange(e) {
    this.setState({ comment: e.target.value });
  }

  addComment() {
    let data = {
      lifeGoalID: this.props.lifeGoalID,
      comment: this.state.comment,
      parentComments: this.props.parents,
    };
    console.log(data);
    axios
      .post("http://localhost:5000/lifegoals/comment/post", data, {
        headers: {
          Authorization: this.props.token,
        },
      })
      .then((data) => {
        console.log(data);
      });
  }
  render() {
    return (
      <div>
        <textarea onChange={this.handleChange}></textarea>
        <button onClick={() => this.addComment()}>Send</button>
      </div>
    );
  }
}
