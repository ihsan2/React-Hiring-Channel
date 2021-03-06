import React, { Component } from "react";
import ToolbarCompany from "../Toolbar/ToolbarCompany";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../Backdrop/Backdrop";

export class HeaderMainCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false
    };
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  render() {
    let bakcDrop;

    if (this.state.sideDrawerOpen) {
      bakcDrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        <ToolbarCompany
          drawerClickHandler={this.drawerToggleClickHandler}
          change={this.props.onChange}
          search={this.props.search}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {bakcDrop}
      </div>
    );
  }
}

export default HeaderMainCompany;
