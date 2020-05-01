export const Slide1 = () => {
  const [lifeGoalName, setLifeGoalName] = useState("");
  const [lifeGoalDescription, setLifeGoalDescription] = useState("");
  return (
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
  );
};

export const Slide2 = () => {
  const [initialPostName, setInitialPostName] = useState("");
  const [initialPostContent, setInitialPostContent] = useState("");
  return (
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
  );
};

export const Slide3 = () => {
  return (
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
  );
};
