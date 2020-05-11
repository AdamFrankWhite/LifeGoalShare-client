import React from "react";
import moment from "moment";

export default function Message(props) {
  console.log(props);
  return (
    <div className="message">
      {props.type === "received" && (
        <h3 className="message-user">From: {props.data.sender}</h3>
      )}
      {props.type === "sent" && (
        <h3 className="message-user">To: {props.data.receiver}</h3>
      )}
      <h4 className="message-time">{moment(props.data.createdAt).fromNow()}</h4>
      <h4 className="message-content">Message: {props.data.message}</h4>
    </div>
  );
}
