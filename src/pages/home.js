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
    axios
      .get("http://localhost:5000/lifegoals/", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlOTg3YmY3ZWM2YzM2MmVmMDNkNTkzNiIsInVzZXJuYW1lIjoiY2Fycm90IiwicGFzc3dvcmQiOiIkMmIkMTAkd0R0b2NvM2dRQWVCWmp3WnhiWDUydXUyNW9JSDdnMUJCNi4zQkd1WGd4L3pCRC5QaUQ2YksiLCJlbWFpbCI6ImNhcnJvdEB0aGluZy5jb20iLCJwcm9maWxlIjp7ImxvY2F0aW9uIjoiTG9uZG9uIiwiYmlvIjoidXAgZm9yIGFueXRoaW5nIiwibGlmZUdvYWxDYXRlZ29yaWVzIjpbImZpbmFuY2UiLCJoZWFsdGgiXX0sImNyZWF0ZWRBdCI6IjIwMjAtMDQtMTZUMTU6Mzg6MzEuOTM3WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDQtMTZUMTY6Mjg6MjAuMjY1WiIsIl9fdiI6MH0sImlhdCI6MTU4NzEyNjE3OCwiZXhwIjoxNTg3MTM2OTc4fQ.tCJBB9sVLsaF3p9HlAPCIPUpDH6NLf_l0DcwS4IHHUQ",
        },
      })
      .then((data) => {
        this.setState({ lifeGoals: data.data });
        console.log(data.data);
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
