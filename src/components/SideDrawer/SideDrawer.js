import React from "react";
import "./SideDrawer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBell } from "@fortawesome/free-solid-svg-icons";

const SideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <div>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <div>
              <input value="A" type="text" disabled="true"></input>
              <a href="/">Achmad</a>
            </div>
          </li>
          <div>
            <hr></hr>
          </div>
          <li>
            <FontAwesomeIcon
              icon={faCommentDots}
              color="#9B9B9B"
              size="2x"
              style={{ marginRight: "16px" }}
            />
            <a href="/">Chat</a>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faBell}
              color="#9B9B9B"
              size="2x"
              style={{ marginRight: "16px" }}
            />
            <a href="/">Notification</a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default SideDrawer;
