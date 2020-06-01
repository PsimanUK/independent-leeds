import React from "react";
import { Link } from "@reach/router";

const BusinessCard = ({ businessName, logoUrl, username }) => {
  return (
    <section className="businessCard">
      <div className="thumbnail">
        <img
          src={logoUrl}
          alt={`logo for ${businessName}`}
          className="thumbnailPic"
        />
      </div>
      <h2>
        <Link className="businessCard__title" to={`/${username}`}>
          {businessName}
        </Link>
      </h2>
    </section>
  );
};

export default BusinessCard;
