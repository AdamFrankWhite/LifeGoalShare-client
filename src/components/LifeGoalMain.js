import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import Typography from "@material-ui/core/Typography";
// Images
import lifegoalMainDefaultImage from "../assets/lifegoalMainDefaultImage.jpg";

//Redux
import { connect } from "react-redux";
import Comment from "./Comment";
// Material UI
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import PostCard from "../components/PostCard";
import AddPostForm from "./AddPostForm";
import LifeGoalPost from "./LifeGoalPost";
function LifeGoalMain(props) {
  //State
  const [imageFile, setImageFile] = useState(
    props.user.userData.profile.profileImageUrl
  );
  const [showAddPostForm, setShowAddPostForm] = useState(false);

  const [toggleComments, setToggleComments] = useState(true);

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
        margin={{ marginLeft: marginSize, marginRight: "1em" }}
        lifeGoalID={props.data._id}
        parents={parents}
      />
    );
  });

  // for finding index, look for parents array last element, to find immediate parent
  let posts = props.data.posts.map((post) => <PostCard post={post} />);

  // get follower images
  let followers = props.data.followers.map((follower) => (
    <img className="followerImageMini" src={follower.followerImage}></img>
    //TODO - request image url for each follower - axios.get/image/userID
  ));
  //get lifeGoalBannerImage
  let lifeGoalMainImage = props.lifeGoalImage
    ? `url(${props.lifeGoalImage})`
    : `url(${lifegoalMainDefaultImage})`;

  // console.log(props.user, props.data);

  let match = useRouteMatch();
  // LifeGoalPost routes
  const lifeGoalPostRoutes = props.data.posts.map((lifeGoalPost) => {
    // console.log(lifeGoalPost.postID);
    return (
      <Route
        path={`${match.path}/posts/${lifeGoalPost.postID}`}
        render={(props) => (
          <LifeGoalPost
            {...props}
            key={lifeGoalPost.postID}
            data={lifeGoalPost}
          />
        )}
      />
    );
  });

  const LatestPosts = () => (
    <div>
      <div className="latest-posts">{posts}</div>
      {showAddPostForm && (
        <div>
          <AddPostForm data={props.data} showForm={showAddPostForm} />
          <span
            onClick={() => setShowAddPostForm(false)}
            className="create-lifegoal-btn"
          >
            Cancel
            <RemoveIcon />
          </span>
        </div>
      )}
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
      <div></div>
      {toggleComments && comments}
    </div>
  );
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
      {/* Conditional render checks if author of lifeGoal */}
      {props.user.userData.profile.handle === props.data.createdBy.handle && (
        // <Link to="/lifegoal/add">
        <span
          onClick={() => {
            !showAddPostForm && setShowAddPostForm(true);
          }}
          className="create-lifegoal-btn"
        >
          New Post
          <AddCircleOutlineIcon />
        </span>
        // </Link>
      )}
      <h3>Latest posts: </h3>
      <Switch>
        <Route exact={true} path={`${match.path}/`} component={LatestPosts} />

        {lifeGoalPostRoutes}
      </Switch>
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
