import { GET_ALL_LIFEGOALS } from "../types";

const initialState = {
  lifegoalsData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LIFEGOALS:
      return {
        ...state,
        lifegoalsData: action.payload,
      };
    default:
      return { ...state };
  }
}
