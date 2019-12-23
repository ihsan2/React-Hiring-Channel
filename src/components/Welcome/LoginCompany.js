import React, { Component } from "react";
import ToolbarWelcome from "../Toolbar/ToolbarWelcome";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

export class LoginCompany extends Component {
  constructor() {
    let loggedIn = false;
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
    this.handlerChange = this.handlerChange.bind(this);
  }

  handlerChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlerSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/auth/company`,
        {
          email: this.state.email,
          password: this.state.password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        localStorage.setItem("accessToken", res.data.accessToken);
        alert("Success Login!");
        this.props.history.push("/engineer");
        this.setState({ isLoading: false });
      })
      .catch(err => {
        alert("Error! Email or Password not found");
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <div>
        <ToolbarWelcome />
        <div className="register-engineer">
          <h1>Login Company</h1>
          <form onSubmit={this.handlerSubmit}>
            <td>
              <div
                className="form-group"
                style={{
                  width: "720px"
                }}
              >
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  required
                  onChange={this.handlerChange}
                ></input>
              </div>
              <br />
              <div
                className="form-group"
                style={{
                  width: "720px"
                }}
              >
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handlerChange}
                ></input>
              </div>
              <br />
              <div
                className="form-group"
                style={{
                  width: "720px"
                }}
              >
                {this.state.isLoading ? (
                  <div
                    style={{
                      float: "right"
                    }}
                  >
                    <ReactLoading type={"spokes"} color="#000" />
                  </div>
                ) : (
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-success"
                    style={{
                      float: "right"
                    }}
                  ></input>
                )}
              </div>
            </td>

            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td>
              <div>
                <img
                  src={require("../../assets/signin-image.jpg")}
                  style={{
                    position: "absolute"
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  marginBottom: "100px",
                  marginLeft: "20px"
                }}
              >
                <label>Haven't an Account?</label>
                <Link to="/register-company">
                  <button
                    className="btn btn-primary"
                    style={{
                      marginLeft: "20px"
                    }}
                  >
                    Register
                  </button>
                </Link>
              </div>
            </td>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginCompany;
