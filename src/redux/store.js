import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import lifegoalReducer from "./reducers/lifegoalReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  lifegoals: lifegoalReducer,
  UI: uiReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware), reduxDevTools)
);

export default store;
