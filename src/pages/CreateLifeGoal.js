import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { postNewLifeGoal } from "../redux/actions/lifegoalActions";
//Material UI
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function CreateLifeGoal(props) {
  let match = useRouteMatch();
  console.log(match.url);
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
      <h1 className="text-center">Create New LifeGoal</h1>
      <div className="step-tracker">
        <div className="form-step-title">
          <span
            className={
              stepCount === 0 ? "step-selected form-step-num" : "form-step-num"
            }
          >
            1
          </span>
          <span className="form-step-text">
            LifeGoal<br></br>Details
          </span>
        </div>
        <div className="form-step-title">
          <span
            className={
              stepCount === 1 ? "step-selected form-step-num" : "form-step-num"
            }
          >
            2
          </span>
          <span className="form-step-text">First Post</span>
        </div>
        <div className="form-step-title">
          <span
            className={
              stepCount === 2 ? "step-selected form-step-num" : "form-step-num"
            }
          >
            3
          </span>
          <span className="form-step-text">Review</span>
        </div>
      </div>
      <div className="progress-bar-cont">
        <div className={`progress-bar-step-${stepCount}`}></div>
      </div>
      {/* Step 1 */}
      {stepCount === 0 && (
        <div>
          <h1>Step 1</h1>
          <h2>Create LifeGoal</h2>
          <div className="multistep-form-fields">
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
          </div>
          <button onClick={() => setStepCount(stepCount + 1)}>Next</button>
        </div>
      )}
      {/* Step 2 */}
      {stepCount === 1 && (
        <div>
          <h1>Step 2</h1>
          <h2>First Post</h2>
          <div className="multistep-form-fields">
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
          </div>
          <button onClick={() => setStepCount(stepCount - 1)}>Back</button>
          <button onClick={() => setStepCount(stepCount + 1)}>Next</button>
        </div>
      )}
      {/* Step 3 */}
      {stepCount === 2 && (
        <div>
          <h1>Step 3</h1>
          <h2>Review</h2>
          <h4>LifeGoal Title:</h4>
          <p>{lifeGoalName}</p>
          <h4>LifeGoal Description</h4>
          <p>{lifeGoalDescription}</p>
          <h4>First Post Title:</h4>
          <p>{initialPostName}</p>
          <h4>First Post Content:</h4>
          <p>{initialPostContent}</p>
          <button onClick={() => setStepCount(stepCount - 1)}>Back</button>
          <span
            className="red-btn"
            onClick={() => {
              console.log(props.user.userData.profile.handle);
              props.postNewLifeGoal(newLifeGoalData);
            }}
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
