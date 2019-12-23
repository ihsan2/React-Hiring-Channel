import React, { Component } from "react";
import axios from "axios";
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
      isLoading: false,
      isError: false,
      search: "",
      limit: 12,
      order: "name",
      sort: "ASC",
      engineer: [],
      page: []
    };

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  setLimit = e => {
    this.setState({ limit: e.target.value, isLoading: true, isError: false });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/engineers?limit=${e.target.value}&sort=${this.state.order}&order=${this.state.sort}&searchValue=${this.state.search}`
      )
      .then(res => {
        // console.log(res.data)
        this.setState({
          engineer: res.data.data,
          page: res.data.pageDetail,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          isError: true
        });
      });
  };

  setOrder = e => {
    this.setState({ order: e.target.value, isLoading: true, isError: false });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/engineers?sort=${e.target.value}&limit=${this.state.limit}&order=${this.state.sort}&searchValue=${this.state.search}`
      )
      .then(res => {
        this.setState({
          engineer: res.data.data,
          page: res.data.pageDetail,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          isError: true
        });
      });
  };

  setSort = e => {
    this.setState({ sort: e.target.value, isLoading: true, isError: false });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/engineers?sort=${this.state.order}&limit=${this.state.limit}&order=${e.target.value}&searchValue=${this.state.search}`
      )
      .then(res => {
        // console.log(res.data)
        this.setState({
          engineer: res.data.data,
          page: res.data.pageDetail,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          isError: true
        });
      });
  };

  onSearch = e => {
    this.setState({ search: e.target.value, isLoading: true, isError: false });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/engineers?sort=${this.state.order}&limit=${this.state.limit}&order=${this.state.sort}&searchValue=${e.target.value}`
      )
      .then(res => {
        // console.log(res.data)
        this.setState({
          engineer: res.data.data,
          page: res.data.pageDetail,
          isLoading: false,
          isError: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          isError: true
        });
      });
  };

  nextPage() {
    this.setState({ isLoading: true, isError: false });
    let next;
    this.state.page.map(page => {
      return (next = page.nextLink);
    });
    axios
      .get(`http://${next}`)
      .then(response =>
        this.setState({
          engineer: response.data.data,
          page: response.data.pageDetail,
          isLoading: false
        })
      )
      .catch(err => {
        this.setState({
          isLoading: false,
          isError: true
        });
      });
  }

  prevPage() {
    this.setState({ isLoading: true, isError: false });
    let prev;
    this.state.page.map(page => {
      return (prev = page.prevLink);
    });
    axios
      .get(`http://${prev}`)
      .then(response =>
        this.setState({
          engineer: response.data.data,
          page: response.data.pageDetail,
          isLoading: false
        })
      )
      .catch(err => {
        this.setState({
          isLoading: false,
          isError: true
        });
      });
  }

  async fetchData() {
    await this.props.dispatch(getEngineers());
    // console.log(this.props.engineer.engineerList);
    // console.log(this.props.engineer.isLoading);
    this.setState({
      engineer: this.props.engineer.engineerList,
      page: this.props.engineer.pageDetail
    });
  }

  componentDidMount() {
    this.fetchData();
    // axios
    //   .get(`${process.env.REACT_APP_BASE_URL}/engineers?sort=name&limit=12`)
    //   .then(response =>
    //     this.setState({
    //       engineer: response.data.data,
    //       page: response.data.pageDetail,
    //       isLoading: false,
    //       isError: false
    //     })
    //   )
    //   .catch(err => {
    //     this.setState({
    //       isLoading: false,
    //       isError: true
    //     });
    //   });
  }

  render() {
    const renderData = this.state.engineer.map(engineer => {
      return (
        <div>
          <div>
            <CardMain engineer={engineer} />
          </div>
        </div>
      );
    });

    let currentPage;
    let totalPage;
    this.state.page.map(page => {
      return (currentPage = page.currentPage), (totalPage = page.totalPage);
    });

    return (
      <div className="main1">
        <HeaderMainCompany
          onChange={this.onSearch}
          search={this.state.search}
        />
        <div className="pagination">
          {currentPage > 1 ? (
            <span onClick={this.prevPage} className="span-radius1">
              Prev
            </span>
          ) : (
            <span
              onClick={this.prevPage}
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
            <span onClick={this.nextPage} className="span-radius2">
              Next
            </span>
          ) : (
            <span
              onClick={this.nextPage}
              className="span-radius2"
              style={{
                pointerEvents: "none"
              }}
            >
              Next
            </span>
          )}

          <label className="label-option">Limit</label>
          <select onChange={this.setLimit} align="center">
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
          <select onChange={this.setOrder} align="center">
            <option value="name">Name</option>
            <option value="skill">Skill</option>
            <option value="date_updated">Date Updated</option>
            <option value="expected_salary">Expected Salary</option>
          </select>

          <label className="label-option">Sort</label>
          <select onChange={this.setSort} align="center">
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </div>
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
        {!this.state.isError && !this.state.isLoading && renderData}
        {this.state.isError && !this.state.isLoading && (
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
              Data Not Found
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

export default connect(mapStateToProps)(Main);
