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
          src={
            image
              ? `${process.env.REACT_APP_HOST}/engineer/${image}`
              : "data:image/jpeg;base64,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"
          }
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
