import React, { Component } from "react";
import ToolbarWelcome from "../Toolbar/ToolbarWelcome";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { loginCompany } from "../../public/redux/actions/login";
import { getCompanies } from "../../public/redux/actions/companies";

class LoginCompany extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailUser: [],
      password: "",
      emailErr: "",
      passwordErr: ""
    };
    this.validationEmail = 1;
    this.validationPassword = 1;
    this.token = localStorage.accessToken;
    this.handlerChange = this.handlerChange.bind(this);
  }

  handlerChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validateForm = () => {
    const { email, password } = this.state;
    const emailCheck = this.state.emailUser.findIndex(en => en.email === email);
    const emailRegex = require('regex-email')
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
    } else if (emailCheck === -1) {
      this.setState({
        emailErr: "User / Email Not Registered!"
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
  };

  handlerSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };

    this.validateForm();
    if (!this.validationEmail && !this.validationPassword) {
      this.props
        .login(data)
        .then(res => {
          localStorage.setItem("accessToken", this.props.loginData.accessToken);
          swal("Success!", "You success to login!", "success").then(isOk => {
            isOk && this.props.history.push("/engineer");
          });
        })
        .catch(err => {
          swal(
            "Failed!",
            "Make sure the email and password are correct.",
            "error"
          );
        });
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
                  type="text"
                  name="email"
                  className="form-control"
                  value={this.state.email}
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
                  className="form-control"
                  value={this.state.password}
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
              <div
                className="form-group"
                style={{
                  width: "720px"
                }}
              >
                {this.props.loginData.isLoading ? (
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
                  alt=""
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

const mapStateToProps = state => {
  return {
    loginData: state.login,
    company: state.companyList
  };
};
const mapDispatchToProps = dispatch => ({
  login: data => dispatch(loginCompany(data)),
  get: url => dispatch(getCompanies(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginCompany);
