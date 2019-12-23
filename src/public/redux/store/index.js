import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";

// import reducer
import rootReducer from "../reducers";

const logger = createLogger({});
const store = createStore(
  rootReducer,
  applyMiddleware(logger, promiseMiddleware)
);

export default store;
