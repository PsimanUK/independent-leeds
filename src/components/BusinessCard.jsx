import React from "react";

const BusinessCard = ({ businessName }) => {
  return (
    <section>
      <ul>
        <li>{businessName}</li>
      </ul>
    </section>
  );
};

export default BusinessCard;
