import React, { Component } from "react";
import "./Engineer.css";
import ReactLoading from "react-loading";
import BackImage from "../../assets/backimg.jpg";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faDollarSign,
  faCalendarAlt,
  faMapMarkedAlt
} from "@fortawesome/free-solid-svg-icons";
import HeaderMainCompany from "../Header/HeaderMainCompany";
import { connect } from "react-redux";
import { getEngineer } from "../../public/redux/actions/engineers";

class Engineer extends Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    let url = `${process.env.REACT_APP_BASE_URL}/engineers/${id}`;
    this.props.get(url);
  }

  render() {
    const renderData = this.props.engineer.engineerList.map(engineer => {
      return (
        <div id="page-wrap">
          <img
            src={BackImage}
            alt="backimage"
            id="pic"
            width="220px"
            height="300px"
          />
          <img
            src={`${process.env.REACT_APP_HOST}/engineer/${engineer.image}`}
            alt={engineer.image}
            id="pic1"
            width="200px"
            height="280px"
          />

          <div id="contact-info" class="vcard">
            <h1 class="fn">{engineer.name}</h1>

            <p>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                color="#57a0d2"
                size="2x"
                style={{ marginRight: "5px" }}
              />
              <Moment
                style={{
                  marginLeft: "16px"
                }}
                format="MMMM DD, YYYY"
              >
                {engineer.date_of_birth}
              </Moment>
              <br />
              <FontAwesomeIcon
                className="fa-icon"
                icon={faMapMarkedAlt}
                color="#66d3fa"
                size="2x"
                style={{ marginRight: "5px" }}
              />{" "}
              <span
                style={{
                  marginLeft: "4px"
                }}
              >
                {engineer.location}
              </span>
              <br />
              <FontAwesomeIcon
                className="fa-icon"
                icon={faEnvelope}
                color="#d44638"
                size="2x"
                style={{ marginRight: "5px" }}
              />
              <a
                style={{
                  marginLeft: "12px"
                }}
                class="email"
                href={`mailto:${engineer.email}`}
              >
                {engineer.email}
              </a>
              <br />
              <FontAwesomeIcon
                className="fa-icon"
                icon={faDollarSign}
                color="#85bb65"
                size="2x"
                style={{ marginRight: "5px" }}
              />{" "}
              <span
                style={{
                  marginLeft: "20px"
                }}
              >
                {engineer.expected_salary}
              </span>
            </p>
          </div>

          <div class="clear"></div>

          <dl>
            <dd class="clear"></dd>

            <dt>Description</dt>
            <dd>
              <h2>{engineer.description}</h2>
            </dd>

            <dd class="clear"></dd>

            <dt>Skills</dt>
            <dd>
              <h2>{engineer.skill}</h2>
            </dd>
          </dl>
        </div>
      );
    });

    return (
      <div className="main-id">
        <HeaderMainCompany />
        {this.props.engineer.isLoading && (
          <div
            align="center"
            style={{
              width: "1600px"
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
        {!this.props.engineer.isLoading && renderData}
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
  get: url => dispatch(getEngineer(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Engineer);
