import React from "react";
import { Link } from "@reach/router";

const BusinessCard = ({ businessName, logoURL, id }) => {
  return (
    <section>
      <p className="BusinessCard" >
        <Link className="BusinessCard__item" to={`/business/${id}`}>{businessName}</Link>
      </p>
      <p className="BusinessCard__item" >{logoURL}</p>
    </section>
  );
};

export default BusinessCard;
