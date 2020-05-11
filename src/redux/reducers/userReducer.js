import {
  SET_USER,
  SET_AUTHENTICATION,
  SET_UNAUTHENTICATED,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  SUCCESS_RES,
  FAIL_RES,
  GET_USER_MESSAGES,
} from "../types";

const initialState = {
  authenticated: false,
  token: "",
  userData: {},
  loggedIn: false,
  loading: false,
  success_res: false,
  fail_res: false,
  messages: [],
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
    case GET_USER_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case LOADING_UI:
      return { ...state, loading: action.payload };
    case SUCCESS_RES:
      return { ...state, success_res: action.payload };
    case FAIL_RES:
      return { ...state, fail_res: action.payload };
    default:
      return { ...state };
  }
}
