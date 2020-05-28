import React from "react";
import { Link } from "@reach/router";

const BusinessCard = ({ businessName, logoUrl, username }) => {
  return (
    <section className="BusinessCard">
      <p>
        <Link className="BusinessCard__item" to={`/${username}`}>
          {businessName}
        </Link>
      </p>
      <img
        src={logoUrl}
        alt={`logo for ${businessName}`}
        className="thumbnailPic"
      />
    </section>
  );
};

export default BusinessCard;
