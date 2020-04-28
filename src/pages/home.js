import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllLifeGoals } from "../redux/actions/lifegoalActions";
import LifeGoalCard from "../components/LifeGoalCard";
class Home extends Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    this.props.getAllLifeGoals();
    //TODO - Home component is working, it is the redirect with SET_AUTHENTICATION action that is changing/resetting application state
  }
  render() {
    const lifeGoals = this.props.lifegoals
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .map((lifeGoal) => (
        <LifeGoalCard
          key={lifeGoal._id}
          data={lifeGoal}
          goToPost={this.props.goToPost}
          goToLifeGoal={this.props.goToLifeGoal}
        />
      ));

    return <div>{lifeGoals}</div>;
  }
}

const mapStateToProps = function (state) {
  return {
    lifegoals: state.lifegoals.lifegoalsData,
  };
};

const mapActionsToProps = {
  getAllLifeGoals,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
