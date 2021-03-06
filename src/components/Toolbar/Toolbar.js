import React, { Component } from "react";
import "./Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_decode from "jwt-decode";
import axios from "axios";
import swal from "sweetalert";
import {
  faCommentDots,
  faSignOutAlt,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { withRouter } from "react-router-dom";

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      image: ""
    };

    this.Logout = this.Logout.bind(this);
  }

  Logout = e => {
    e.preventDefault();
    swal({
      title: "Logout",
      text: "Are you sure want to logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(isOk => {
      if (isOk) {
        localStorage.removeItem("accessToken");
        this.props.history.push("/");
        swal("Success!", "You success logout", "success");
      }
    });
  };

  componentDidMount() {
    const token = localStorage.accessToken;
    const decoded = jwt_decode(token);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/engineers/${decoded.id}`)
      .then(response => {
        response.data.data.map(en => {
          return this.setState({
            id: en.id,
            name: en.name,
            image: en.image
          });
        });
      });
  }

  render() {
    const props = this.props;
    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
          </div>
          <div className="toolbar__logo">
            <a href="/">
              <img
                alt=""
                src="https://www.arkademy.com/img/logo%20arkademy-01.9c1222ba.png"
                width="120px"
                height="50px"
              />
            </a>
          </div>

          <div className="toolbar__search">
            <input
              type="search"
              placeholder="Search"
              value={this.props.search}
              onChange={this.props.change}
            ></input>
            <div>
              <FontAwesomeIcon icon={faSearch} color="#9B9B9B" />
            </div>
          </div>
          <div className="toolbar__navigation-items">
            <ul>
              <li>
                <label className="link">
                  <a href="/company">Home</a>
                </label>
              </li>
              <li>
                <div>
                  <img
                    alt=""
                    src={`${process.env.REACT_APP_HOST}/engineer/${this.state.image}`}
                  ></img>
                  <a href={`/profile-engineer/${this.state.id}`}>
                    {this.state.name}
                  </a>
                </div>
              </li>
              <hr></hr>
              <div style={{ marginLeft: "75px" }}>
                <li>
                  <a href="/#">
                    <FontAwesomeIcon
                      icon={faCommentDots}
                      color="#9B9B9B"
                      size="2x"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="/#"
                    onClick={this.Logout}
                    style={{
                      cursor: "pointer"
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      color="#9B9B9B"
                      size="2x"
                    />
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </nav>
        <div>
          <hr className="toolbar__line"></hr>
        </div>
      </header>
    );
  }
}

export default withRouter(Toolbar);
