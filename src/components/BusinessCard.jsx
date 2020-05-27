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
        src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        alt="veggies"
        className="thumbnailPic"
      />
    </section>
  );
};

export default BusinessCard;
