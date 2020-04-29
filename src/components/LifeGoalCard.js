import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Comment from "./Comment";
export default function LifeGoalCard(props) {
  const [toggleComments, setToggleComments] = useState(false);

  //TO DO - hook to get profile images
  const followLifeGoal = () => {};
  // getPost() {}
  let commentData = props.data.comments;

  //Group child comments with parents, reordering comment array
  commentData.forEach((comment) => {
    //Checks if has parents
    if (comment.parents.length > 0) {
      let commentIndex = props.data.comments.findIndex(
        (x) => x.commentID == comment.commentID
      );
      //Find immediate parent
      let parentCommentIndex = props.data.comments.findIndex(
        (x) => x.commentID == comment.parents[comment.parents.length - 1]
      );
      // Removes comment
      commentData.splice(commentIndex, 1);
      // Inserts comment after parent
      commentData.splice(parentCommentIndex + 1, 0, comment);
    }
  });

  // Apply comment margins, based on comment level
  let comments = commentData.map((comment) => {
    let marginSize =
      comment.parents.length > 0
        ? comment.parents.length * 2 + 1 + "em"
        : "1em";

    //Concat parents array with current commentID
    let parents = comment.parents.concat(comment.commentID);
    return (
      <Comment
        comment={comment}
        margin={{ marginLeft: marginSize }}
        lifeGoalID={props.data._id}
        parents={parents}
      />
    );
  });

  // for finding index, look for parents array last element, to find immediate parent
  let posts = props.data.posts.map((post) => post.postName);

  // get follower images
  let followers = props.data.followers.map((follower) => (
    <img className="followerImageMini" src={follower.followerImage}></img>
  ));
  return (
    <Card className="lifegoal-card">
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => props.goToLifeGoal()}
          >
            {props.data.lifeGoalName} <i>by {props.data.createdBy.handle}</i>
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {props.data.lifeGoalDescription}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            onClick={() => props.goToPost()}
          >
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
        <Button
          onClick={() => setToggleComments(!toggleComments)}
          size="small"
          color="primary"
        >
          Comments ({comments.length})
        </Button>

        <Button size="small" color="primary">
          {followers.length}{" "}
          {followers.length == 1 ? "Follower:" : "Followers:"} {followers}
        </Button>
        {/* <Button onClick={() => followLifeGoal()} size="small" color="primary">
          Follow
        </Button> */}
      </CardActions>
      {toggleComments && comments}
    </Card>
  );
}
