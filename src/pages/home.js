import React, { Component } from "react";
import axios from "axios";
import LifeGoalCard from "../components/LifeGoalCard";
export class home extends Component {
  constructor() {
    super();
    this.state = {
      lifeGoals: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/lifegoals/").then((data) => {
      this.setState({ lifeGoals: data.data });
    });
  }
  render() {
    const lifeGoals = this.state.lifeGoals
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .map((lifeGoal) => <LifeGoalCard data={lifeGoal} />);

    return <div>{lifeGoals}</div>;
  }
}

export default home;
