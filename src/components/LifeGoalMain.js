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
// Images
import lifegoalMainDefaultImage from "../assets/lifegoalMainDefaultImage.jpg";
//Redux
import { connect } from "react-redux";
import Comment from "./Comment";

function LifeGoalMain(props) {
  const [imageFile, setImageFile] = useState(
    props.user.userData.profile.profileImageUrl
  );

  const [toggleComments, setToggleComments] = useState(false);

  //TO DO - hook to get profile images
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
    //TODO - request image url for each follower - axios.get/image/userID
  ));
  //get lifeGoalBannerImage
  let lifeGoalMainImage = props.lifeGoalImage
    ? `url(${props.lifeGoalImage})`
    : `url(${lifegoalMainDefaultImage})`;

  console.log(props.lifegoals);
  return (
    <div className="lifegoal-main-cont">
      <div
        className="image-overlay"
        style={{
          backgroundImage: lifeGoalMainImage,
        }}
      >
        <img
          className="lifegoal-profile-pic"
          src={props.data.createdBy.profileImageUrl}
          alt="lifegoal profile image"
        ></img>
        <div className="lifegoal-title">
          <h1>{props.data.lifeGoalName}</h1>
          <h3>
            <i>by {props.data.createdBy.handle}</i>
          </h3>
        </div>
        <h2>{props.data.lifeGoalDescription}</h2>
      </div>

      <h3>Latest posts: {posts}</h3>

      <Button
        onClick={() => setToggleComments(!toggleComments)}
        size="small"
        color="primary"
      >
        Comments ({comments.length})
      </Button>

      <Button size="small" color="primary">
        {followers.length} {followers.length == 1 ? "Follower:" : "Followers:"}{" "}
        {followers}
      </Button>

      {toggleComments && comments}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    lifegoals: state.lifegoals,
  };
};

export default connect(mapStateToProps)(LifeGoalMain);
