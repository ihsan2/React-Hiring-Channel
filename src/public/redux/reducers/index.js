import { combineReducers } from "redux";

// import all reducer
import engineerList from "./engineers";
import companyList from "./companies";
import login from "./login";

const rootReducer = combineReducers({
  engineerList,
  companyList,
  login
});

export default rootReducer;
