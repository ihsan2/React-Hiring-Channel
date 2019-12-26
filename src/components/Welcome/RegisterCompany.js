import React, { Component } from "react";
import ToolbarWelcome from "../Toolbar/ToolbarWelcome";
import "./RegisterEngineer.css";
import "./RegisterLogin.css";
import ReactLoading from "react-loading";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import {
  registerCompany,
  getCompanies
} from "../../public/redux/actions/companies";
import { connect } from "react-redux";

export class RegisterCompany extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      image: null,
      description: "",
      location: "",
      emailUser: [],
      nameErr: "",
      emailErr: "",
      passwordErr: "",
      imageErr: "",
      descriptionErr: "",
      locationErr: ""
    };
    this.validationName = 1;
    this.validationEmail = 1;
    this.validationPassword = 1;
    this.validationImage = 1;
    this.validationDescription = 1;
    this.validationLocation = 1;
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
    const { name, email, password, image, description, location } = this.state;
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
  };

  handlerSubmit = async event => {
    event.preventDefault();
    this.validateForm();
    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("image", this.state.image);
    formData.append("description", this.state.description);
    formData.append("location", this.state.location);

    let url = `${process.env.REACT_APP_BASE_URL}/companies`;
    if (
      !this.validationEmail &&
      !this.validationPassword &&
      !this.validationName &&
      !this.validationImage &&
      !this.validationDescription &&
      !this.validationLocation
    ) {
      this.props.register(url, formData);
      setTimeout(
        function() {
          swal(
            "Success!",
            "Success Create Company. Login Now.",
            "success"
          ).then(isOk => {
            isOk && this.props.history.push("/login-company");
          });
        }.bind(this),
        1000
      );
    }
  };

  componentDidMount() {
    this.props.get(`${process.env.REACT_APP_BASE_URL}/companies`).then(() => {
      this.setState({
        emailUser: this.props.company.companyList
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
                ></textarea>
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
                {this.props.company.isLoading ? (
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

const mapStateToProps = state => {
  return {
    company: state.companyList
  };
};
const mapDispatchToProps = dispatch => ({
  register: (url, dataCompany) => dispatch(registerCompany(url, dataCompany)),
  get: url => dispatch(getCompanies(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCompany);
