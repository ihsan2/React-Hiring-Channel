import React from "react";
import "./SideDrawer.css";
import "../Toolbar/ToolbarWelcome.css";
import { Link } from "react-router-dom";

const SideDrawerWelcome = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <div>
          <li>
            <button className="link" className="button-engineer">
              <Link to="/home"> Engineer </Link>
            </button>
          </li>
          <li>
            <button className="link" className="button-company">
              <Link to="/home"> Company </Link>
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default SideDrawerWelcome;
