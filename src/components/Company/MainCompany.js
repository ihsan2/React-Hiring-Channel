import React, { Component } from "react";
import axios from "axios";
import CardMainCompany from "./CardMainCompany";
import HeaderMain from "../Header/HeaderMain";
import ReactLoading from "react-loading";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      company: [],
      isLoading: false
    };
  }

  onSearch = e => {
    this.setState({ search: e.target.value, isLoading: true });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/companies?search=${e.target.value}`
      )
      .then(res => {
        // console.log(res.data)
        this.setState({
          company: res.data.data,
          isLoading: false
        });
      });
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    axios.get(`${process.env.REACT_APP_BASE_URL}/companies`).then(response =>
      this.setState({
        company: response.data.data,
        isLoading: false
      })
    );
  }

  render() {
    const renderData = this.state.company.map(company => {
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
        <HeaderMain onChange={this.onSearch} search={this.state.search} />
        {this.state.isLoading && (
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
        {this.state.company.length !== 0 && !this.state.isLoading && renderData}
        {this.state.company.length === 0 && !this.state.isLoading && (
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
              Data Not Found
            </h2>
          </div>
        )}
      </div>
    );
  }
}
