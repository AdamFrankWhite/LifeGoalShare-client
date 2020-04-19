// import React, { Component } from "react";

// export class LifeGoalCard extends Component {
//   render() {
//     let comments = this.this.props.data.comments.map((comment) => comment.author);
//     let posts = this.props.data.posts.map((post) => post.postName);
//     let followers = this.props.data.followers.map(
//       (follower) => follower.followerID
//     );
//     return (
//       <div className="lifegoal-card">
//         <h1>{this.props.data.lifeGoalName}</h1>
//         <h2>
//           By{" "}
//           <a href={this.props.data.createdBy.profileUrl}>
//             {this.props.data.createdBy.handle}
//           </a>
//         </h2>
//         <h2>{this.props.data.lifeGoalDescription}</h2>
//         <p>Posts: {posts}</p>
//         <p>Comments:{comments}</p>
//         <p>
//           {followers.length}{" "}
//           {followers.length == 1 ? "Follower:" : "Followers:"} {followers}
//         </p>
//       </div>
//     );
//   }
// }

// export default LifeGoalCard;

import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Comment from "./Comment";
export default class LifeGoalCard extends Component {
  constructor() {
    super();
    this.showComments = this.showComments.bind(this);
    this.state = {
      showComments: false,
    };
  }

  showComments() {
    this.setState({ showComments: !this.state.showComments });
  }

  componentDidMount() {
    //TO DO - get profile images
  }

  getPost() {}
  render() {
    let commentData = this.props.data.comments;

    //Group child comments with parents, reordering comment array
    commentData.forEach((comment) => {
      //Checks if has parents
      if (comment.parents.length > 0) {
        let commentIndex = this.props.data.comments.findIndex(
          (x) => x.commentID == comment.commentID
        );
        //Find immediate parent
        let parentCommentIndex = this.props.data.comments.findIndex(
          (x) => x.commentID == comment.parents[comment.parents.length - 1]
        );
        // Removes comment
        commentData.splice(commentIndex, 1);
        commentData.splice(parentCommentIndex + 1, 0, comment);
      }
    });

    // Apply comment margins, based on comment level
    let comments = commentData.map((comment) => {
      let marginSize =
        comment.parents.length > 0
          ? comment.parents.length * 2 + 1 + "em"
          : "1em";
      // console.log(comment);
      return <Comment comment={comment} margin={{ marginLeft: marginSize }} />;
    });

    // for finding index, look for parents array last element, to find immediate parent
    let posts = this.props.data.posts.map((post) => post.postName);

    let followers = this.props.data.followers.map(
      (follower) => follower.followerID
    );
    return (
      <Card className="lifegoal-card">
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.data.lifeGoalName}{" "}
              <i>by {this.props.data.createdBy.handle}</i>
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {this.props.data.lifeGoalDescription}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Latest post: {posts[0]}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
          <Button size="small" color="primary">
            All Posts
          </Button>
          <Button onClick={this.showComments} size="small" color="primary">
            Comments ({comments.length})
          </Button>

          <Button size="small" color="primary">
            {followers.length}{" "}
            {followers.length == 1 ? "Follower:" : "Followers:"} {followers}
          </Button>
        </CardActions>
        {this.state.showComments && comments}
      </Card>
    );
  }
}
