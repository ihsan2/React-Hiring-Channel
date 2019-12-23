import { combineReducers } from "redux";

// import all reducer
import engineerList from "./engineers";

const rootReducer = combineReducers({
  engineerList
});

export default rootReducer;
