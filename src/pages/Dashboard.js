import React, { Component } from "react";
import Comment from "../components/Comment";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getComments();
  }
  render() {
    const myComments = this.props.myComments
      .sort((a, b) => (a.comment.createdAt < b.comment.createdAt ? 1 : -1))
      .map((comment) => (
        <Comment
          postName={comment.post}
          comment={comment.comment.comment}
          createdAt={comment.comment.createdAt}
        />
      ));
    return (
      <div>
        <h1>Welcome To Your Dashboard</h1>

        <h2>My Comments</h2>
        {myComments}
      </div>
    );
  }
}

export default Dashboard;
