import React from "react";
import "./CardMain.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function CardMain({ engineer }) {
  let image = engineer.image;
  let name = engineer.name;
  let description = engineer.description;
  let email = engineer.email;
  let expected_salary = engineer.expected_salary;
  let skill = engineer.skill;
  return (
    <div
      style={{
        paddingTop: "20px"
      }}
    >
      <Link to={`engineer/${engineer.id}`}>
        <img
          id="img1"
          alt={image}
          src={`${process.env.REACT_APP_HOST}/engineer/${image}`}
        />
      </Link>
      <div className="main__profile">
        <label
          style={{
            color: "#fff",
            marginTop: "7px",
            fontSize: "14px",
            marginBottom: "-0.5em",
            fontWeight: "bold"
          }}
        >
          {name}
        </label>
        <div>
          <div>
            <label
              style={{
                color: "#fff",
                fontSize: "10px",
                marginRight: "15px"
              }}
            >
              {description}
            </label>
            <FontAwesomeIcon
              icon={faDollarSign}
              color="#85bb65"
              size="1x"
              style={{ marginRight: "5px" }}
            />
            <label
              style={{
                color: "#fff",
                fontSize: "10px",
                paddingTop: "-5px"
              }}
            >
              {expected_salary}
            </label>
          </div>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faEnvelope}
            color="#d44638"
            size="1x"
            style={{ marginRight: "5px" }}
          />
          <label
            style={{
              color: "#fff",
              fontSize: "10px",
              paddingTop: "-5px"
            }}
          >
            {email}
          </label>
        </div>

        <label
          style={{
            color: "#fff",
            fontSize: "12px",
            marginTop: "-8px"
          }}
        >
          Skill: {skill}
        </label>
      </div>
    </div>
  );
}

export default CardMain;
