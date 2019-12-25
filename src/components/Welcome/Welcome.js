import React, { Component } from "react";
import HeaderMain from "../Header/HeaderWelcome";
import "./Welcome.css";
import jwt_decode from "jwt-decode";
import HiringImg from "../../assets/hiring.png";

export class Welcome extends Component {
  constructor() {
    super();
    this.token = localStorage.accessToken;
  }

  componentDidMount() {
    this.token &&
      jwt_decode(this.token).role === "company" &&
      this.props.history.push("/engineer");
    this.token &&
      jwt_decode(this.token).role === "engineer" &&
      this.props.history.push("/company");
  }

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
