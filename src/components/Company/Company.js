import React, { Component } from "react";
import "./Company.css";
import axios from "axios";
import BackImage from "../../assets/backimg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import HeaderMain from "../Header/HeaderMain";

export default class Company extends Component {
  constructor() {
    super();
    this.state = {
      company: []
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/companies/${id}`)
      .then(response =>
        this.setState({
          company: response.data.data
        })
      );
  }

  render() {
    const renderData = this.state.company.map(company => {
      return (
        <div id="page-wrap">
          <img
            src={BackImage}
            alt="Back Image"
            id="pic"
            width="220px"
            height="300px"
          />
          <img
            src={`${process.env.REACT_APP_HOST}/company/${company.image}`}
            alt={`Image of ${company.name}`}
            id="pic1"
            width="200px"
            height="280px"
          />

          <div id="contact-info" class="vcard">
            <h1 class="fn">{company.name}</h1>

            <p>
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
                {company.location}
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
                href={`mailto:${company.email}`}
              >
                {company.email}
              </a>
            </p>
          </div>
          <dl>
            <dd class="clear"></dd>

            <dt>Description</dt>
            <dd>
              <h2>{company.description}</h2>
            </dd>
          </dl>
        </div>
      );
    });

    return (
      <div className="main-id">
        <HeaderMain />
        {renderData}
      </div>
    );
  }
}
