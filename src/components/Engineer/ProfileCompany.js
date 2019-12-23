import React, { Component } from "react";
import "../Welcome/RegisterEngineer.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ToolbarCompany from "../Toolbar/ToolbarCompany";

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

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/companies/${this.state.id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(res => {
        alert("Success Update Company");
        this.props.history.push(`/company/${this.state.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteAccount = async event => {
    event.preventDefault();
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_BASE_URL}/companies/${this.state.id}`
    })
      .then(res => {
        alert("Success Delete Account");
        localStorage.removeItem("accessToken");
        this.props.history.push(`/register-company`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/companies/${id}`)
      .then(response =>
        response.data.data.map(en => {
          this.setState({
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
    const token = localStorage.accessToken;
    const decoded = jwt_decode(token);
    return (
      <div>
        <ToolbarCompany />
        <div className="register-engineer">
          <h1>Update Profile</h1>
          <form onSubmit={this.handlerSubmit}>
            <td>
              <div
                hidden
                className="form-group"
                className="register-engineer-div"
              >
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

              <div className="form-group" className="register-engineer-div">
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
              <div className="form-group" className="register-engineer-div">
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
              <div className="form-group" className="register-engineer-div">
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
              <div className="form-group" className="register-engineer-div">
                <label for="image">Photo</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={this.handlerChangeImage}
                  required
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
              <div className="form-group" className="register-engineer-div">
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
              <div className="form-group" className="register-engineer-div">
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
              <div className="form-group" className="register-engineer-div">
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
      </div>
    );
  }
}

export default ProfileCompany;
