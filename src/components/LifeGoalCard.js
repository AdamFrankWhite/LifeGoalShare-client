import React, { useState } from "react";
import { Link } from "react-router-dom";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";

//Redux
import { connect } from "react-redux";
import {
  followLifeGoal,
  unfollowLifeGoal,
} from "../redux/actions/lifegoalActions";
import Comment from "./Comment";

function LifeGoalCard(props) {
  const [toggleComments, setToggleComments] = useState(false);
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
    //grab static src from store
    <img
      className="followerImageMini"
      src={props.lifegoals.userImages[follower.followerID]}
    ></img>
    //TODO - request image url for each follower - axios.get/image/userID
  ));

  //Check if already followed
  const alreadyFollowed = props.data.followers.filter(
    (follower) => follower.followerID === props.user.userData._id
  );
  console.log(alreadyFollowed);

  //Follow button
  const FollowButton = () => {
    return (
      <span
        className="follow-btn"
        onClick={() => props.followLifeGoal(props.data._id)}
      >
        <AccessibilityNewIcon />
        <span>Follow</span>
      </span>
    );
  };
  //Unfollow button
  const UnfollowButton = () => {
    return (
      <span
        className="unfollow-btn"
        onClick={() => props.unfollowLifeGoal(props.data._id)}
      >
        <IndeterminateCheckBoxIcon />
        <span>Unfollow</span>
      </span>
    );
  };
  console.log(props);
  return (
    <Card className="lifegoal-card">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.lifeGoalName} <i>by {props.data.createdBy.handle}</i>
            <Link to={`user/${props.data.createdBy.userID}`}>
              <img
                className="followerImageMini"
                alt={`${props.data.createdBy.handle} 's profile image'`}
                src={props.lifegoals.userImages[props.data.createdBy.userID]}
              ></img>
            </Link>
            {/* Check if followed */}
            {alreadyFollowed.length > 0 ? <UnfollowButton /> : <FollowButton />}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {props.data.lifeGoalDescription}
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
        <Link to={`/lifegoals/${props.data._id}`}>
          <Button
            onClick={() => {
              console.log(props.data._id);
            }}
            size="small"
            color="primary"
          >
            Learn More
          </Button>
        </Link>
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    lifegoals: state.lifegoals,
  };
};

const mapActionsToProps = {
  followLifeGoal,
  unfollowLifeGoal,
};
export default connect(mapStateToProps, mapActionsToProps)(LifeGoalCard);
