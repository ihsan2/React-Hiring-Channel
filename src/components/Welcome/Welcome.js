import React, { Component } from "react";
import HeaderMain from "../Header/HeaderWelcome";
import "./Welcome.css";
import HiringImg from "../../assets/hiring.png";

export class Welcome extends Component {
  render() {
    return (
      <div>
        <HeaderMain />
        <div className="welcome">
          <h1>Welcome to Hiring Partner Channel</h1>
          <img alt="" src={HiringImg} width="680px" height="320px" />
        </div>
      </div>
    );
  }
}

export default Welcome;
