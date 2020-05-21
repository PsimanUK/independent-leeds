import React from "react";
import { Link } from '@reach/router';

const BusinessCard = ({ businessName, logoURL, id }) => {
  return (
    <section>
      <ul>
        <li><Link to={`/business/${id}`}>{businessName}</Link></li>
        <li>{logoURL}</li>
      </ul>
    </section>
  );
};

export default BusinessCard;
