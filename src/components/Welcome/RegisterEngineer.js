import React, { Component } from "react";
import ToolbarWelcome from "../Toolbar/ToolbarWelcome";
import "./RegisterEngineer.css";
import "./RegisterLogin.css";
import { Link } from "react-router-dom";
import {
  registerEngineer,
  getEngineers
} from "../../public/redux/actions/engineers";
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
      showcase: "",
      emailUser: [],
      nameErr: "",
      emailErr: "",
      passwordErr: "",
      imageErr: "",
      descriptionErr: "",
      locationErr: "",
      skillErr: "",
      date_of_birthErr: "",
      expected_salaryErr: "",
      showcaseErr: ""
    };
    this.validationName = 1;
    this.validationEmail = 1;
    this.validationPassword = 1;
    this.validationImage = 1;
    this.validationDescription = 1;
    this.validationLocation = 1;
    this.validationSkill = 1;
    this.validationDateOfBirth = 1;
    this.validationExpectedSalary = 1;
    this.validationShowcase = 1;
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

  validateForm = () => {
    const {
      name,
      email,
      password,
      image,
      description,
      location,
      skill,
      date_of_birth,
      expected_salary,
      showcase
    } = this.state;
    const emailCheck = this.state.emailUser.findIndex(en => en.email === email);
    const emailRegex = `^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$`;
    const maxSize = 1024 * 1024 * 7;

    if (!name) {
      this.setState({
        nameErr: "Name Required!"
      });
      this.validationName = 1;
    } else {
      this.setState({
        nameErr: ""
      });
      this.validationName = 0;
    }

    if (!description) {
      this.setState({
        descriptionErr: "Description Required!"
      });
      this.validationDescription = 1;
    } else {
      this.setState({
        descriptionErr: ""
      });
      this.validationDescription = 0;
    }

    if (!location) {
      this.setState({
        locationErr: "Location Required!"
      });
      this.validationLocation = 1;
    } else {
      this.setState({
        locationErr: ""
      });
      this.validationLocation = 0;
    }

    if (!email) {
      this.setState({
        emailErr: "Email Required!"
      });
      this.validationEmail = 1;
    } else if (!email.match(emailRegex)) {
      this.setState({
        emailErr: "Invalid Email!"
      });
      this.validationEmail = 1;
    } else if (emailCheck !== -1) {
      this.setState({
        emailErr: "Email Was Registered!"
      });
      this.validationEmail = 1;
    } else {
      this.setState({
        emailErr: ""
      });
      this.validationEmail = 0;
    }

    if (!password) {
      this.setState({
        passwordErr: "Password Required!"
      });
      this.validationPassword = 1;
    } else if (password.length < 4) {
      this.setState({
        passwordErr: "Minimun Password Length is 4!"
      });
      this.validationPassword = 1;
    } else {
      this.setState({
        passwordErr: ""
      });
      this.validationPassword = 0;
    }

    if (!image) {
      this.setState({
        imageErr: "Image / Photos Required!"
      });
      this.validationImage = 1;
    } else if (
      image.name.substring(image.name.lastIndexOf(".") + 1).toLowerCase() !==
      "jpg"
    ) {
      this.setState({
        imageErr: "File must be image or Image must be .jpg!"
      });
      this.validationImage = 1;
    } else if (image.size > maxSize) {
      this.setState({
        imageErr: "File too Large!"
      });
      this.validationImage = 1;
    } else {
      this.setState({
        imageErr: ""
      });
      this.validationImage = 0;
    }

    if (!skill) {
      this.setState({
        skillErr: "Skill Required!"
      });
      this.validationSkill = 1;
    } else {
      this.setState({
        skillErr: ""
      });
      this.validationSkill = 0;
    }

    if (!date_of_birth) {
      this.setState({
        date_of_birthErr: "Date of Birth Required!"
      });
      this.validationDateOfBirth = 1;
    } else {
      this.setState({
        date_of_birthErr: ""
      });
      this.validationDateOfBirth = 0;
    }

    if (!expected_salary) {
      this.setState({
        expected_salaryErr: "Expected Salary Required!"
      });
      this.validationExpectedSalary = 1;
    } else {
      this.setState({
        expected_salaryErr: ""
      });
      this.validationExpectedSalary = 0;
    }

    if (!showcase) {
      this.setState({
        showcaseErr: "Showcase Required!"
      });
      this.validationShowcase = 1;
    } else {
      this.setState({
        showcaseErr: ""
      });
      this.validationShowcase = 0;
    }
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

    this.validateForm();
    let url = `${process.env.REACT_APP_BASE_URL}/engineers`;
    if (
      !this.validationEmail &&
      !this.validationPassword &&
      !this.validationName &&
      !this.validationImage &&
      !this.validationDescription &&
      !this.validationLocation &&
      !this.validationSkill &&
      !this.validationDateOfBirth &&
      !this.validationExpectedSalary &&
      !this.validationShowcase
    ) {
      this.props.register(url, formData);
      setTimeout(
        function() {
          swal(
            "Success!",
            "Success Create Engineer. Login Now.",
            "success"
          ).then(isOk => {
            isOk && this.props.history.push("/login-engineer");
          });
        }.bind(this),
        1000
      );
    }
  };

  componentDidMount() {
    this.props.get(`${process.env.REACT_APP_BASE_URL}/engineers`).then(() => {
      this.props.engineer.pageDetail.map(page => {
        return this.props
          .get(
            `${process.env.REACT_APP_BASE_URL}/engineers?limit=${page.totalRow}`
          )
          .then(() => {
            this.setState({
              emailUser: this.props.engineer.engineerList
            });
          });
      });
    });

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
                ></input>
                {this.state.nameErr && (
                  <label
                    style={{
                      color: "red",
                      fontStyle: "italic"
                    }}
                  >
                    {this.state.nameErr}
                  </label>
                )}
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="email">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  onChange={this.handlerChange}
                ></input>
                {this.state.emailErr && (
                  <label
                    style={{
                      color: "red",
                      fontStyle: "italic"
                    }}
                  >
                    {this.state.emailErr}
                  </label>
                )}
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={this.handlerChange}
                ></input>
                {this.state.passwordErr && (
                  <label
                    style={{
                      color: "red",
                      fontStyle: "italic"
                    }}
                  >
                    {this.state.passwordErr}
                  </label>
                )}
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="image">Photo</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={this.handlerChangeImage}
                ></input>
                {this.state.imageErr && (
                  <label
                    style={{
                      color: "red",
                      fontStyle: "italic"
                    }}
                  >
                    {this.state.imageErr}
                  </label>
                )}
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="description">Description</label>
                <select
                  className="form-control"
                  onChange={this.handlerChange}
                  name="description"
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
                {this.state.descriptionErr && (
                  <label
                    style={{
                      color: "red",
                      fontStyle: "italic"
                    }}
                  >
                    {this.state.descriptionErr}
                  </label>
                )}
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
                ></input>
                {this.state.skillErr && (
                  <label
                    style={{
                      color: "red",
                      fontStyle: "italic"
                    }}
                  >
                    {this.state.skillErr}
                  </label>
                )}
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="location">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  onChange={this.handlerChange}
                ></input>
                {this.state.locationErr && (
                  <label
                    style={{
                      color: "red",
                      fontStyle: "italic"
                    }}
                  >
                    {this.state.locationErr}
                  </label>
                )}
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="date_of_birth">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  className="form-control"
                  onChange={this.handlerChange}
                ></input>
                {this.state.date_of_birthErr && (
                  <label
                    style={{
                      color: "red",
                      fontStyle: "italic"
                    }}
                  >
                    {this.state.date_of_birthErr}
                  </label>
                )}
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="expected_salary">Expected Salary</label>
                <input
                  type="number"
                  name="expected_salary"
                  className="form-control"
                  onChange={this.handlerChange}
                ></input>
                {this.state.expected_salaryErr && (
                  <label
                    style={{
                      color: "red",
                      fontStyle: "italic"
                    }}
                  >
                    {this.state.expected_salaryErr}
                  </label>
                )}
              </div>
              <br />
              <div className={("form-group", "register-engineer-div")}>
                <label for="showcase">Showcase</label>
                <input
                  type="text"
                  name="showcase"
                  className="form-control"
                  onChange={this.handlerChange}
                ></input>
                {this.state.showcaseErr && (
                  <label
                    style={{
                      color: "red",
                      fontStyle: "italic"
                    }}
                  >
                    {this.state.showcaseErr}
                  </label>
                )}
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
  register: (url, dataEngineer) =>
    dispatch(registerEngineer(url, dataEngineer)),
  get: url => dispatch(getEngineers(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEngineer);
