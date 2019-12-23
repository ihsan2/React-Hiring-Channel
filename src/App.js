import React, { Component } from "react";
import MainRoute from "./components/Route/MainRoute";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

// import store
import store from "./public/redux/store";

class App extends Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        <MainRoute />
      </div>
    );
  }
}

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

export default Root;
