import React, { useState } from "react";
import { connect } from "react-redux";
import { postNewLifeGoal } from "../redux/actions/lifegoalActions";
//Material UI
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function CreateLifeGoal(props) {
  const [lifeGoalName, setLifeGoalTitle] = useState("");
  const [lifeGoalDescription, setLifeGoalDescription] = useState("");
  const [initialPostName, setInitialPostName] = useState("");
  const [initialPostContent, setInitialPostContent] = useState("");
  const initialPostHeaderImage = "some image";

  const newLifeGoalData = {
    lifeGoalName,
    lifeGoalDescription,
    initialPostName,
    initialPostContent,
    initialPostHeaderImage,
  };
  return (
    <div className="create-lifegoal-cont">
      <h1>Create New LifeGoal</h1>
      <input
        placeholder="Your LifeGoal title..."
        onChange={(e) => {
          setLifeGoalTitle(e.target.value);
        }}
      />
      <textarea
        placeholder="LifeGoal description"
        onChange={(e) => setLifeGoalDescription(e.target.value)}
      ></textarea>
      <br></br>
      <input
        placeholder="Your first post title..."
        onChange={(e) => {
          setInitialPostName(e.target.value);
        }}
      />
      <textarea
        placeholder="Your first post content"
        onChange={(e) => setInitialPostContent(e.target.value)}
      ></textarea>
      <span
        className="create-lifegoal-btn"
        onClick={() => props.postNewLifeGoal(newLifeGoalData)}
      >
        Create LifeGoal
        <AddCircleOutlineIcon />
      </span>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapActionsToProps = {
  postNewLifeGoal,
};

export default connect(mapStateToProps, mapActionsToProps)(CreateLifeGoal);
