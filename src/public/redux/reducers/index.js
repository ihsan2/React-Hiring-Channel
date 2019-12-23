import { combineReducers } from "redux";

// import all reducer
import engineerList from "./engineers";
import companyList from "./companies";

const rootReducer = combineReducers({
  engineerList,
  companyList
});

export default rootReducer;
