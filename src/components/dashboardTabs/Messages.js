import React from "react";
import { connect } from "react-redux";
function Messages(props) {
  console.log(props.user);
  return <div>Messages</div>;
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Messages);
