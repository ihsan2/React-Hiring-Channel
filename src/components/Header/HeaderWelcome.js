import React, { Component } from "react";
import ToolbarWelcome from "../Toolbar/ToolbarWelcome";
import SideDrawerWelcome from "../SideDrawer/SideDrawerWelcome";
import Backdrop from "../Backdrop/Backdrop";

export class HeaderMain extends Component {
  constructor() {
    super();
    this.state = {
      SideDrawerWelcomeOpen: false
    };
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { SideDrawerWelcomeOpen: !prevState.SideDrawerWelcomeOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ SideDrawerWelcomeOpen: false });
  };
  render() {
    let bakcDrop;

    if (this.state.SideDrawerWelcomeOpen) {
      bakcDrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        <ToolbarWelcome drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawerWelcome show={this.state.SideDrawerWelcomeOpen} />
        {bakcDrop}
      </div>
    );
  }
}

export default HeaderMain;
