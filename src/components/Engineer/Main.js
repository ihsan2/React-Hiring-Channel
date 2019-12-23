import React, { Component } from "react";
import CardMain from "./CardMain";
import "./PaginationButton.css";
import HeaderMainCompany from "../Header/HeaderMainCompany";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import { getEngineers } from "../../public/redux/actions/engineers";
require("dotenv").config();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      limit: 12,
      order: "name",
      sort: "DESC"
    };

    this.nextData = this.nextData.bind(this);
    this.prevData = this.prevData.bind(this);
  }

  getData() {
    let url = `${process.env.REACT_APP_BASE_URL}/engineers?sort=name&limit=12&order=desc`;
    this.props.get(url);
  }

  searchData = e => {
    this.setState({ search: e.target.value });
    let url = `${process.env.REACT_APP_BASE_URL}/engineers?sort=${this.state.order}&limit=${this.state.limit}&order=${this.state.sort}&searchValue=${e.target.value}`;
    this.props.get(url);
  };

  sortData = e => {
    this.setState({ sort: e.target.value });
    let url = `${process.env.REACT_APP_BASE_URL}/engineers?sort=${this.state.order}&limit=${this.state.limit}&order=${e.target.value}&searchValue=${this.state.search}`;
    this.props.get(url);
  };

  orderData = e => {
    this.setState({ order: e.target.value });
    let url = `${process.env.REACT_APP_BASE_URL}/engineers?sort=${e.target.value}&limit=${this.state.limit}&order=${this.state.sort}&searchValue=${this.state.search}`;
    this.props.get(url);
  };

  limitData = e => {
    this.setState({ limit: e.target.value });
    let url = `${process.env.REACT_APP_BASE_URL}/engineers?limit=${e.target.value}&sort=${this.state.order}&order=${this.state.sort}&searchValue=${this.state.search}`;
    this.props.get(url);
  };

  nextData() {
    let next;
    this.props.engineer.pageDetail.map(page => {
      return (next = page.nextLink);
    });
    let url = `http://${next}`;
    this.props.get(url);
  }

  prevData() {
    let prev;
    this.props.engineer.pageDetail.map(page => {
      return (prev = page.prevLink);
    });
    let url = `http://${prev}`;
    this.props.get(url);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const renderData = this.props.engineer.engineerList.map(engineer => {
      return (
        <div>
          <div>
            <CardMain engineer={engineer} />
          </div>
        </div>
      );
    });

    let valAsc, valDesc;

    if (this.state.order === "name" || this.state.order === "skill") {
      valAsc = "A - Z";
      valDesc = "Z - A";
    } else if (this.state.order === "date_updated") {
      valAsc = "Oldest";
      valDesc = "Newest";
    } else {
      valAsc = "Lowest";
      valDesc = "Highest";
    }
    let currentPage;
    let totalPage;
    this.props.engineer.pageDetail.map(page => {
      currentPage = page.currentPage;
      totalPage = page.totalPage;
      return true;
    });

    return (
      <div className="main1">
        <HeaderMainCompany
          onChange={this.searchData}
          search={this.state.search}
        />
        <div className="pagination">
          {currentPage > 1 ? (
            <span onClick={this.prevData} className="span-radius1">
              Prev
            </span>
          ) : (
            <span
              onClick={this.prevData}
              className="span-radius1"
              style={{
                pointerEvents: "none"
              }}
            >
              Prev
            </span>
          )}
          <span className="active">
            {" "}
            {currentPage} / {totalPage}{" "}
          </span>
          {totalPage > currentPage ? (
            <span onClick={this.nextData} className="span-radius2">
              Next
            </span>
          ) : (
            <span
              onClick={this.nextData}
              className="span-radius2"
              style={{
                pointerEvents: "none"
              }}
            >
              Next
            </span>
          )}

          <label className="label-option">Limit</label>
          <select onChange={this.limitData} align="center">
            <option value="6">6</option>
            <option value="12" selected>
              12
            </option>
            <option value="18">18</option>
            <option value="24">24</option>
            <option value="30">30</option>
            <option value="36">36</option>
          </select>

          <label className="label-option">Order By</label>
          <select onChange={this.orderData} align="center">
            <option value="name">Name</option>
            <option value="skill">Skill</option>
            <option value="date_updated">Date Updated</option>
            <option value="expected_salary">Expected Salary</option>
          </select>

          <label className="label-option">Sort</label>
          <select onChange={this.sortData} align="center">
            <option value="DESC">{valDesc}</option>
            <option value="ASC">{valAsc}</option>
          </select>
        </div>
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
        {this.props.engineer.isFulfilled &&
          !this.props.engineer.isLoading &&
          renderData}
        {this.props.engineer.isRejected && !this.props.engineer.isLoading && (
          <div
            style={{
              width: "1600px",
              textAlign: "center"
            }}
          >
            {" "}
            <h2
              style={{
                fontWeight: "bold",
                fontSize: "40px"
              }}
            >
              No results
            </h2>
          </div>
        )}
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
  get: url => dispatch(getEngineers(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
