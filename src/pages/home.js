import React, { Component } from "react";
import axios from "axios";
import LifeGoalCard from "../components/LifeGoalCard";
export default class Home extends Component {
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
      .map((lifeGoal) => (
        <LifeGoalCard
          data={lifeGoal}
          token={this.props.token}
          goToPost={this.props.goToPost}
          goToLifeGoal={this.props.goToLifeGoal}
        />
      ));

    return <div>{lifeGoals}</div>;
  }
}
