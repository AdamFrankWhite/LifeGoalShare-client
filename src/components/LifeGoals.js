import React from "react";
import LifeGoalCard from "./LifeGoalCard";

export default function LifeGoals(props) {
  console.log(props);
  const lifeGoals = props.lifegoals
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .map((lifeGoal) => <LifeGoalCard key={lifeGoal._id} data={lifeGoal} />);
  return <div>{lifeGoals}</div>;
}
