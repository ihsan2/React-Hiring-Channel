import React, { Component } from "react";
import "../Welcome/RegisterEngineer.css";
import swal from "sweetalert";
import ToolbarCompany from "../Toolbar/ToolbarCompany";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import {
  getCompany,
  updateCompany,
  deleteCompany
} from "../../public/redux/actions/companies";

export class ProfileCompany extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      image: null,
      description: "",
      location: "",
      imageTmp: ""
    };

    this.handlerChange = this.handlerChange.bind(this);
    this.handlerChangeImage = this.handlerChangeImage.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
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
    formData.append("id", this.state.id);
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("image", this.state.image);
    formData.append("description", this.state.description);
    formData.append("location", this.state.location);

    let url = `${process.env.REACT_APP_BASE_URL}/companies/${this.state.id}`;
    this.props.update(url, formData);
    setTimeout(
      function() {
        swal("Success!", "Success Update Company", "success").then(isOk => {
          isOk && this.props.history.push(`/company/${this.state.id}`);
        });
      }.bind(this),
      1000
    );
  };

  deleteAccount = async event => {
    event.preventDefault();
    let url = `${process.env.REACT_APP_BASE_URL}/companies/${this.state.id}`;

    swal({
      title: "Delete Account!",
      text: "Are you sure want to delete your account?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(isOk => {
      if (isOk) {
        this.props.delete(url);
        localStorage.removeItem("accessToken");
        this.props.history.push("/");
        swal("Success!", "You success delete your account", "success");
      }
    });
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    let url = `${process.env.REACT_APP_BASE_URL}/companies/${id}`;
    this.props.get(url).then(() =>
      this.props.company.companyList.map(en => {
        return this.setState({
          id: en.id,
          name: en.name,
          email: en.email,
          password: en.password,
          image: en.image,
          description: en.description,
          location: en.location
        });
      })
    );
  }

  render() {
    const renderData = (
      <div className="register-engineer">
        <h1>Update Profile</h1>
        <form onSubmit={this.handlerSubmit}>
          <td>
            <div hidden className={("form-group", "register-engineer-div")}>
              <label for="id">ID</label>
              <input
                type="text"
                name="id"
                className="form-control"
                onChange={this.handlerChange}
                required
                value={this.state.id}
              ></input>
            </div>

            <div className={("form-group", "register-engineer-div")}>
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={this.handlerChange}
                required
                value={this.state.name}
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
                value={this.state.email}
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
                value={this.state.password}
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
                // value={this.state.name}
              ></input>
              {/* <input
                  type="text"
                  name="imageTmp"
                  className="form-control"
                  onChange={this.handlerChange}
                  required
                  value={engineer.image}
                ></input> */}
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
                value={this.state.description}
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
                value={this.state.location}
              ></input>
            </div>

            <br />
            {this.props.company.isLoadingUpdate ? (
              <div
                style={{
                  float: "right"
                }}
              >
                <ReactLoading type={"spokes"} color="#000" />
              </div>
            ) : (
              <div className={("form-group", "register-engineer-div")}>
                <br />
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary"
                  style={{
                    float: "right"
                  }}
                ></input>
              </div>
            )}
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
                alt={this.state.image}
                src={`${process.env.REACT_APP_HOST}/company/${this.state.image}`}
                width="200px"
                height="280px"
                style={{
                  position: "absolute",
                  borderRadius: "20px",
                  margin: "80px 0"
                }}
              />

              <button
                onClick={this.deleteAccount}
                className="btn btn-danger"
                style={{
                  marginLeft: "30px",
                  marginTop: "400px",
                  position: "absolute"
                }}
              >
                Delete Account
              </button>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0",
                marginBottom: "100px",
                marginLeft: "60px"
              }}
            ></div>
          </td>
        </form>
      </div>
    );

    return (
      <div>
        <ToolbarCompany />
        {this.props.company.isLoading && (
          <div
            align="center"
            style={{
              width: "1600px",
              marginTop: "150px"
            }}
          >
            <ReactLoading
              type={"spokes"}
              color="#000"
              width="120px"
              height="120px"
            ></ReactLoading>
          </div>
        )}
        {!this.props.company.isLoading && renderData}
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
  get: url => dispatch(getCompany(url)),
  update: (url, dataCompany) => dispatch(updateCompany(url, dataCompany)),
  delete: url => dispatch(deleteCompany(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCompany);
