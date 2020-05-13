import {
  GET_ALL_LIFEGOALS,
  GET_USER_LIFEGOALS,
  GET_PROFILE_IMAGES,
  ADD_NEW_POST,
  SET_TEMP_POST,
} from "../types";

const initialState = {
  lifegoalsData: [],
  userLifeGoals: [],
  userImages: [],
  tempPostData: "/uploads/postImages/defaultPostImage.jpg",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LIFEGOALS:
      return {
        ...state,
        lifegoalsData: action.payload,
      };
    case GET_USER_LIFEGOALS:
      return {
        ...state,
        userLifeGoals: action.payload,
      };
    case GET_PROFILE_IMAGES:
      return {
        ...state,
        userImages: action.payload,
      };
    case SET_TEMP_POST:
      return {
        ...state,
        tempPostData: action.payload,
      };
    // case ADD_NEW_POST:
    // return {
    //   ...state,

    // }
    default:
      return { ...state };
  }
}
