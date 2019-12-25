import React, { Component } from "react";
import "./Company.css";
import ReactLoading from "react-loading";
import BackImage from "../../assets/backimg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import HeaderMain from "../Header/HeaderMain";
import { connect } from "react-redux";
import { getCompany } from "../../public/redux/actions/companies";

class Company extends Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    let url = `${process.env.REACT_APP_BASE_URL}/companies/${id}`;
    this.props.get(url);
  }

  render() {
    const renderData = this.props.company.companyList.map(company => {
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
            src={`${process.env.REACT_APP_HOST}/company/${company.image}`}
            alt={company.image}
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
        {this.props.company.isLoading && (
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
  get: url => dispatch(getCompany(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Company);
