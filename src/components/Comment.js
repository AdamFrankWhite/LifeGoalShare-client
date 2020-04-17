import React from "react";

export default function Comment(props) {
  return (
    <div className="comment-card">
      <h2>
        <em>{props.postName}</em>
      </h2>
      <h2>{props.comment}</h2>
      <h3>Date posted: {props.createdAt}</h3>
    </div>
  );
}
