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
    let comments = this.props.data.comments
      //re-order comments

      .map((comment) => {
        let marginSize =
          comment.parents.length > 0
            ? comment.parents.length + 1 + "em"
            : "1em";
        // console.log(comment);
        return (
          <Comment comment={comment} margin={{ marginLeft: marginSize }} />
        );
      });

    // for finding index, look for parents array last element, to find immediate parent
    let posts = this.props.data.posts.map((post) => post.postName);

    let followers = this.props.data.followers.map(
      (follower) => follower.followerID
    );
    return (
      <Card className="lifegoal-card">
        <CardActionArea>
          <CardMedia
          // component="img"
          // alt="Contemplative Reptile"
          // height="140"
          // image="/static/images/cards/contemplative-reptile.jpg"
          // title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.data.lifeGoalName} by{" "}
              {this.props.data.createdBy.handle}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {this.props.data.lifeGoalDescription}
            </Typography>
            <Typography variant="body3" color="textSecondary" component="p">
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
