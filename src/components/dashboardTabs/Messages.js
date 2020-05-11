import React, { useState } from "react";
import { connect } from "react-redux";
import Message from "./Message";
function Messages(props) {
  const [tab, setTab] = useState("");
  let receivedMessages = props.user.messages.map((message) => {
    if (message.receiver === props.user.userData.profile.handle) {
      return <Message type={"sent"} data={message} />;
    }
  });
  let sentMessages = props.user.messages.map((message) => {
    if (message.sender === props.user.userData.profile.handle) {
      return <Message type={"sent"} data={message} />;
    }
  });
  //TODO - DELETE MESSAGE - add senderDeleted and receiverDeleted to message object, then add conditional below "&& !message.senderDeleted", also add condition Read
  const SentMessages = () => {
    return (
      <div>
        <h1>Sent Messages </h1>
        {sentMessages}
      </div>
    );
  };

  const ReceivedMessages = () => {
    return (
      <div>
        <h1>Received Messages</h1>
        {receivedMessages}
      </div>
    );
  };

  return (
    <div className="messages-tab">
      <div className="messages-tab-head">
        <h1>Messages</h1>
        <div className="message-tab-group">
          <span
            className={
              tab === "sent" ? "tab-selected message-tab" : " message-tab"
            }
            onClick={() => setTab("sent")}
          >
            Sent ({sentMessages.length})
          </span>
          <span> | </span>
          <span
            className={
              tab === "received" ? "tab-selected message-tab" : " message-tab"
            }
            onClick={() => setTab("received")}
          >
            Received ({receivedMessages.length})
          </span>
        </div>
      </div>

      {tab === "sent" && <SentMessages />}
      {tab === "received" && <ReceivedMessages />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Messages);
