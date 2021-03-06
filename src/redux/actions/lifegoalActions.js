import {
  GET_ALL_LIFEGOALS,
  GET_USER_LIFEGOALS,
  GET_PROFILE_IMAGES,
  LOADING_UI,
  SUCCESS_RES,
  FAIL_RES,
  SET_TEMP_POST,
} from "../types";
import axios from "axios";

export const getAllLifeGoals = () => (dispatch) => {
  // dispatch({ type: LOADING_UI });
  axios
    .get("http://localhost:5000/lifegoals/")
    .then((data) => {
      dispatch({ type: GET_ALL_LIFEGOALS, payload: data.data });
      let lifeGoalIDs = data.data.map((lifeGoal) => lifeGoal._id);
      dispatch(getProfileImages({ lifeGoalIDs: lifeGoalIDs }));
    })
    .catch((err) => {
      // dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserLifeGoals = (userHandle) => (dispatch) => {
  // dispatch({ type: LOADING_UI });
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
  // dispatch({ type: LOADING_UI });
  console.log(formData);
  axios
    .post("http://localhost:5000/lifegoals/add", formData, {
      headers: {
        Authorization: window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

export const addNewPost = (postData) => (dispatch) => {
  dispatch({ type: LOADING_UI, payload: true });
  axios
    .post("http://localhost:5000/lifegoals/post/add", postData, {
      headers: {
        Authorization: window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      // dispatch({ type: LOADING_UI, payload: false });
      dispatch({ type: SUCCESS_RES, payload: true });
      //Update state.lifegoals
      dispatch(getAllLifeGoals());
    })
    .catch((err) => {
      dispatch({ type: FAIL_RES, payload: true });
    });
};

export const deletePost = (postData) => (dispatch) => {
  console.log(window.localStorage.getItem("access_token"));
  console.log(postData);
  axios
    .put("http://localhost:5000/lifegoals/post/delete", postData, {
      headers: {
        Authorization: window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      //Update state.lifegoals
      dispatch(getAllLifeGoals());
    });
};
export const getProfileImages = (lifeGoals) => (dispatch) => {
  axios
    .post("http://localhost:5000/lifegoals/images", lifeGoals)

    .then((res) => {
      dispatch({ type: GET_PROFILE_IMAGES, payload: res.data });
      dispatch({ type: LOADING_UI, payload: false });
    });
};

export const followLifeGoal = (lifeGoalID) => (dispatch) => {
  axios
    .post(
      "http://localhost:5000/lifegoals/follow",
      { lifeGoalID },
      {
        headers: {
          Authorization: window.localStorage.getItem("access_token"),
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      dispatch(getAllLifeGoals());
      console.log("ahh");
    });
};

export const unfollowLifeGoal = (lifeGoalID) => (dispatch) => {
  axios
    .put(
      "http://localhost:5000/lifegoals/unfollow",
      { lifeGoalID },
      {
        headers: {
          Authorization: window.localStorage.getItem("access_token"),
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      dispatch(getAllLifeGoals());
      console.log("boo");
    });
};

export const postImageUpload = (formData, file) => (dispatch) => {
  console.log(file);
  // dispatch({ type: LOADING_UI });

  axios
    .post("http://localhost:5000/lifegoals/post/image", formData, {
      headers: {
        Authorization: window.localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      console.log(res.data.clientFileUrl);
      //update - NEED TO CHANGE - DON'T UPDATE ALL LIFEGOALS, JUSTTHE ONE YOU HAVE CHANGED?
      dispatch(getAllLifeGoals());
      dispatch({ type: SET_TEMP_POST, payload: res.data.clientFileUrl });
      // update profile image property
      // user.profile.profileImageUrl = res.data.clientFileUrl;
      //update appstate
      // dispatch({ type: SET_USER, payload: user });
    })
    .catch((err) => console.log(err));
};
