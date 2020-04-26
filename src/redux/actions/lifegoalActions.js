import { GET_ALL_LIFEGOALS } from "../types";
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
