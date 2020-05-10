import React from "react";
import Comment from "./Comment";
import { connect } from "react-redux";
import { deletePost } from "../redux/actions/lifegoalActions";
function LifeGoalPost(props) {
  console.log(props.data);

  let commentData = props.data.comments;

  //Group child comments with parents, reordering comment array
  commentData.forEach((comment) => {
    console.log(comment.parents);
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
        postID={props.data.postID}
        parents={parents}
      />
    );
  });
  return (
    <div>
      <h1 className="post-title">{props.data.postName}</h1>
      <h2 className="post-content">{props.data.postContent}</h2>
      <h3>Comments: </h3>
      <div className="comment-cont">{comments}</div>
      <button
        onClick={() =>
          props.deletePost({
            lifeGoalID: props.lifeGoalID,
            postID: props.data.postID,
          })
        }
      >
        Delete Post
      </button>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapActionsToProps = {
  deletePost,
};
export default connect(mapStateToProps, mapActionsToProps)(LifeGoalPost);
