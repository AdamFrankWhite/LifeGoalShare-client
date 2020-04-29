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
      console.log(res.data, "boo");
      dispatch({ type: SET_USER, payload: res.data });
    });
};

export const authenticateUserOnRefresh = () => (dispatch) => {
  dispatch({
    type: SET_AUTHENTICATION,
    payload: window.localStorage.getItem("access_token"),
  });
  dispatch(getUserData());
};

export const logOut = () => (dispatch) => {
  dispatch({ type: SET_UNAUTHENTICATED });
  window.localStorage.clear();
};

export const uploadImage = (formData, file) => (dispatch) => {
  console.log(file);

  dispatch({ type: LOADING_UI });

  axios
    .post("http://localhost:5000/users/profile/upload", formData, {
      headers: {
        Authorization: window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      let user = res.data.user;
      // update profile image property
      user.profile.profileImageUrl = res.data.clientFileUrl;
      //update appstate
      dispatch({ type: SET_USER, payload: user });
    })
    .catch((err) => console.log(err));
};
