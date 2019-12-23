import React from "react";
import "./ToolbarWelcome.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { Link } from "react-router-dom";

const Toolbar = props => {
  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          <Link to="/">
            <img
              src="https://www.arkademy.com/img/logo%20arkademy-01.9c1222ba.png"
              width="120px"
              height="50px"
            />
          </Link>
        </div>
        <div className="spacer"></div>
        <div className="toolbar__navigation-items">
          <ul>
            <li>
              <Link to="/login-engineer">
                <button className="link" className="button-engineer">
                  Engineer
                </button>
              </Link>
            </li>
            <li>
              <Link to="/login-company">
                <button className="link" className="button-company">
                  Company
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <hr className="toolbar__line"></hr>
      </div>
    </header>
  );
};

export default Toolbar;
