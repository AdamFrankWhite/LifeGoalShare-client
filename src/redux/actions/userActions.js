import {
  SET_USER,
  SET_AUTHENTICATION,
  SET_UNAUTHENTICATED,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
} from "../types";
import axios from "axios";

export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("http://localhost:5000/users/login", userData)
    .then((res) => {
      dispatch({ type: SET_AUTHENTICATION, payload: res.data.token });
      dispatch({ type: LOADING_UI, payload: false });

      // dispatch({ type: CLEAR_ERRORS });
      window.localStorage.setItem("access_token", res.data.token);
      dispatch(getUserData());
    })
    .catch((err) => {
      // dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserData = () => (dispatch) => {
  console.log(window.localStorage.getItem("access_token"));
  axios
    .get("http://localhost:5000/users/profile/get", {
      headers: {
        Authorization: window.localStorage.getItem("access_token"),
      },
      //try removing header here, as think is set above
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: SET_USER, payload: res.data });

      // this.setState({ userData: data.data, redirect: "dashboard" });
    });
};

export const authenticateUserOnRefresh = () => (dispatch) => {
  dispatch({
    type: SET_AUTHENTICATION,
    payload: window.localStorage.getItem("access_token"),
  });
};

export const logOut = () => (dispatch) => {
  dispatch({ type: SET_UNAUTHENTICATED });
};
