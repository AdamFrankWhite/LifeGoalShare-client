import React, { Component } from "react";

export class LifeGoalCard extends Component {
  render() {
    let comments = this.props.data.comments.map((comment) => comment.author);
    let posts = this.props.data.posts.map((post) => post.postName);
    let followers = this.props.data.followers.map(
      (follower) => follower.followerID
    );
    return (
      <div className="lifegoal-card">
        <h1>{this.props.data.lifeGoalName}</h1>
        <h2>
          By{" "}
          <a href={this.props.data.createdBy.profileUrl}>
            {this.props.data.createdBy.handle}
          </a>
        </h2>
        <h2>{this.props.data.lifeGoalDescription}</h2>
        <p>Posts: {posts}</p>
        <p>Comments:{comments}</p>
        <p>
          {followers.length}{" "}
          {followers.length == 1 ? "Follower:" : "Followers:"} {followers}
        </p>
      </div>
    );
  }
}

export default LifeGoalCard;
