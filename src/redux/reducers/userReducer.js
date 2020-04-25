import {
  SET_USER,
  SET_AUTHENTICATION,
  SET_UNAUTHENTICATED,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
} from "../types";

const initialState = {
  authenticated: false,
  token: "",
  userData: {},
  loggedIn: false,
};

//NOTE - if dispatch is called without case for it, it will use default and reset state between dispatches
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return {
        ...state,
        authenticated: true,
        loggedIn: true,
        token: action.payload,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case LOADING_UI:
      return { ...state };
    default:
      return initialState;
  }
}
