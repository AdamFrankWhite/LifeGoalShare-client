import React, { useState } from "react";
import { connect } from "react-redux";
import { postNewLifeGoal } from "../redux/actions/lifegoalActions";
//Material UI
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function CreateLifeGoal(props) {
  const [lifeGoalName, setLifeGoalName] = useState("");
  const [lifeGoalDescription, setLifeGoalDescription] = useState("");
  const [initialPostName, setInitialPostName] = useState("");
  const [initialPostContent, setInitialPostContent] = useState("");
  const [stepCount, setStepCount] = useState(0);
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
      {/* Step 1 */}
      {stepCount === 0 && (
        <div>
          <input
            placeholder="Your LifeGoal title..."
            value={lifeGoalName}
            onChange={(e) => setLifeGoalName(e.target.value)}
          />
          <textarea
            value={lifeGoalDescription}
            placeholder="LifeGoal description"
            onChange={(e) => setLifeGoalDescription(e.target.value)}
          ></textarea>
          <button onClick={() => setStepCount(stepCount + 1)}>Next</button>
        </div>
      )}
      {/* Step 2 */}
      {stepCount === 1 && (
        <div>
          <input
            placeholder="Your first post title..."
            value={initialPostName}
            onChange={(e) => {
              setInitialPostName(e.target.value);
            }}
          />
          <textarea
            placeholder="Your first post content"
            value={initialPostContent}
            onChange={(e) => setInitialPostContent(e.target.value)}
          ></textarea>
          <button onClick={() => setStepCount(stepCount - 1)}>Back</button>
          <button onClick={() => setStepCount(stepCount + 1)}>Next</button>
        </div>
      )}
      {/* Step 3 */}
      {stepCount === 2 && (
        <div>
          <button onClick={() => setStepCount(stepCount - 1)}>Back</button>
          <span
            className="create-lifegoal-btn"
            onClick={() => props.postNewLifeGoal(newLifeGoalData)}
          >
            Create LifeGoal
            <AddCircleOutlineIcon />
          </span>
        </div>
      )}
      <br></br>
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
