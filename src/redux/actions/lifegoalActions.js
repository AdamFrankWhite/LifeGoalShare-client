import { GET_ALL_LIFEGOALS, GET_USER_LIFEGOALS, LOADING_UI } from "../types";
import axios from "axios";

export const getAllLifeGoals = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get("http://localhost:5000/lifegoals/")
    .then((data) => {
      dispatch({ type: GET_ALL_LIFEGOALS, payload: data.data });
    })
    .catch((err) => {
      // dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserLifeGoals = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`http://localhost:5000/lifegoals/${userHandle}`, {
      headers: {
        Authorization: window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: GET_USER_LIFEGOALS, payload: res.data });
    })
    .catch((err) => {
      // dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const postNewLifeGoal = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(formData);
  axios
    .post("http://localhost:5000/lifegoals/add", formData, {
      headers: {
        Authorization: window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};
