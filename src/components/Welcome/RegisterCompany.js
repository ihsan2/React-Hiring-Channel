import React, { Component } from "react";
import ToolbarWelcome from "../Toolbar/ToolbarWelcome";
import "./RegisterEngineer.css";
import "./RegisterLogin.css";
import axios from "axios";
import { Link } from "react-router-dom";

export class RegisterCompany extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      image: null,
      description: "",
      location: ""
    };

    this.handlerChange = this.handlerChange.bind(this);
    this.handlerChangeImage = this.handlerChangeImage.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  handlerChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlerChangeImage = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  handlerSubmit = async event => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("image", this.state.image);
    formData.append("description", this.state.description);
    formData.append("location", this.state.location);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/companies`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    alert("Success Create Company. Login Now!");
    this.props.history.push("/login-company");
  };

  render() {
    return (
      <div>
        <ToolbarWelcome />
        <div className="register-engineer">
          <h1>Register Company</h1>
          <form onSubmit={this.handlerSubmit}>
            <td>
              <div className={("form-group", "register-engineer-div")}>
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={this.handlerChange}
                  required
                ></input>
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={this.handlerChange}
                  required
                ></input>
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={this.handlerChange}
                  required
                ></input>
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="image">Photo</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={this.handlerChangeImage}
                  required
                ></input>
              </div>
              <br />
              <br />
            </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td> &nbsp; </td>
            <td>
              <div className={("form-group", "register-engineer-div")}>
                <label for="description">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  onChange={this.handlerChange}
                  required
                ></textarea>
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="location">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  onChange={this.handlerChange}
                  required
                ></input>
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <br />
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary"
                  style={{
                    float: "right"
                  }}
                ></input>
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
                  alt=""
                  src={require("../../assets/signup-image.jpg")}
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
                  marginLeft: "60px"
                }}
              >
                <label>Have an Account?</label>
                <Link to="/login-company">
                  <button
                    className="btn btn-success"
                    style={{
                      marginLeft: "20px"
                    }}
                  >
                    Login
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

export default RegisterCompany;
