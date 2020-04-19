import React from "react";

function ReplyInput() {
  return (
    <div>
      <textarea></textarea>
      <button onClick={() => alert("Sent")}>Send</button>
    </div>
  );
}

export default ReplyInput;
