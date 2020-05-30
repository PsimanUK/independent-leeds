import React from "react";
import { Link } from "@reach/router";

const BusinessCard = ({ businessName, logoUrl, username }) => {
  return (
    <section className="businessCard">
      <div className="logoContainer">
        <img
          src={logoUrl}
          alt={`logo for ${businessName}`}
          className="thumbnailPic"
        />
      </div>
      <p>
        <Link className="businessCard__title" to={`/${username}`}>
          {businessName}
        </Link>
      </p>
    </section>
  );
};

export default BusinessCard;
