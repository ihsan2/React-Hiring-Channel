import React, { Component } from "react";
import CardMainCompany from "./CardMainCompany";
import HeaderMain from "../Header/HeaderMain";
import ReactLoading from "react-loading";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { getCompanies } from "../../public/redux/actions/companies";

class MainCompany extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };
    this.token = localStorage.accessToken;
    this.timeout = 0;
  }

  getData() {
    let url = `${process.env.REACT_APP_BASE_URL}/companies`;
    this.props.get(url);
  }

  searchData = e => {
    this.setState({ search: e.target.value });
    let url = `${process.env.REACT_APP_BASE_URL}/companies?search=${e.target.value}`;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.get(url);
    }, 750);
  };

  componentDidMount() {
    !this.token
      ? this.props.history.push("/login-engineer")
      : jwt_decode(this.token).role === "company" &&
        this.props.history.push("/engineer");

    this.getData();
  }

  render() {
    const renderData = this.props.company.companyList.map(company => {
      return (
        <div>
          <div>
            <CardMainCompany company={company} />
          </div>
        </div>
      );
    });

    return (
      <div className="main">
        {this.token && (
          <HeaderMain onChange={this.searchData} search={this.state.search} />
        )}
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
        {this.props.company.companyList.length !== 0 &&
          !this.props.company.isLoading &&
          renderData}
        {this.props.company.companyList.length === 0 &&
          !this.props.company.isLoading && (
            <div
              style={{
                width: "1600px",
                textAlign: "center",
                justifyContent: "center"
              }}
            >
              {" "}
              <h2
                style={{
                  fontWeight: "bold",
                  fontSize: "40px"
                }}
              >
                No Results
              </h2>
            </div>
          )}
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
  get: url => dispatch(getCompanies(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainCompany);
