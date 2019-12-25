import React, { Component } from "react";
import ToolbarWelcome from "../Toolbar/ToolbarWelcome";
import "./RegisterEngineer.css";
import "./RegisterLogin.css";
import { Link } from "react-router-dom";
import { registerEngineer } from "../../public/redux/actions/engineers";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

export class RegisterEngineer extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      image: null,
      description: "",
      skill: "",
      location: "",
      date_of_birth: "",
      expected_salary: "",
      showcase: ""
    };
    this.token = localStorage.accessToken;
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
    formData.append("skill", this.state.skill);
    formData.append("location", this.state.location);
    formData.append("date_of_birth", this.state.date_of_birth);
    formData.append("expected_salary", this.state.expected_salary);
    formData.append("showcase", this.state.showcase);

    let url = `${process.env.REACT_APP_BASE_URL}/engineers`;
    this.props.register(url, formData);
    setTimeout(
      function() {
        swal("Success!", "Success Create Engineer. Login Now.", "success").then(
          isOk => {
            isOk && this.props.history.push("/login-engineer");
          }
        );
      }.bind(this),
      1000
    );
  };

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
        <ToolbarWelcome />
        <div className="register-engineer">
          <h1>Register Engineer</h1>
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
              <div className={("form-group", "register-engineer-div")}>
                <label for="description">Description</label>
                <select
                  className="form-control"
                  onChange={this.handlerChange}
                  name="description"
                  required
                >
                  <option value="">-- Select Description --</option>
                  <option value="Front-End Developer">
                    Front-End Developer
                  </option>
                  <option value="Back-End Developer">Back-End Developer</option>
                  <option value="Full-Stack Developer">
                    Full-Stack Developer
                  </option>
                </select>
              </div>
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
                <label for="skill">Skill</label>
                <input
                  type="text"
                  name="skill"
                  className="form-control"
                  onChange={this.handlerChange}
                  required
                ></input>
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
                <label for="date_of_birth">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  className="form-control"
                  onChange={this.handlerChange}
                  required
                ></input>
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="expected_salary">Expected Salary</label>
                <input
                  type="number"
                  name="expected_salary"
                  className="form-control"
                  onChange={this.handlerChange}
                  required
                ></input>
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="showcase">Showcase</label>
                <input
                  type="text"
                  name="showcase"
                  className="form-control"
                  onChange={this.handlerChange}
                  required
                ></input>
                <br />
                {this.props.engineer.isLoading ? (
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
                    value="Register"
                    className="btn btn-primary"
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
                  alt="signupimage"
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
                <Link to="/login-engineer">
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

const mapStateToProps = state => {
  return {
    engineer: state.engineerList
  };
};
const mapDispatchToProps = dispatch => ({
  register: (url, dataEngineer) => dispatch(registerEngineer(url, dataEngineer))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEngineer);
