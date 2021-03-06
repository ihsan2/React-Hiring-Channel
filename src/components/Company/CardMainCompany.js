import React from "react";
import "./CardMainCompany.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function CardMainCompany({ company }) {
  let image = company.image;
  let name = company.name;
  let email = company.email;
  let location = company.location;
  return (
    <div
      style={{
        paddingTop: "20px"
      }}
    >
      <Link to={`company-id/${company.id}`}>
        <img
          id="img"
          alt={image}
          src={
            image
              ? `${process.env.REACT_APP_HOST}/company/${image}`
              : "https://www.logoground.com/uploads/201658352016-01-214991427dental-association-logo.jpg"
          }
        />
      </Link>
      <div className="main__profile">
        <label
          style={{
            color: "#fff",
            marginTop: "7px",
            fontSize: "22px",
            marginBottom: "-0.5em",
            fontWeight: "bold"
          }}
        >
          {name}
        </label>

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
              fontSize: "16px",
              paddingTop: "0px"
            }}
          >
            {email}
          </label>
        </div>

        <label
          style={{
            color: "#fff",
            fontSize: "18px",
            marginTop: "-8px"
          }}
        >
          Location: {location}
        </label>
      </div>
    </div>
  );
}

export default CardMainCompany;
