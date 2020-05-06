import { GET_ALL_LIFEGOALS, GET_USER_LIFEGOALS, ADD_NEW_POST } from "../types";

const initialState = {
  lifegoalsData: [],
  userLifeGoals: [],
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
    // case ADD_NEW_POST:
    // return {
    //   ...state,

    // }
    default:
      return { ...state };
  }
}
