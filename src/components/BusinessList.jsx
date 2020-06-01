import React from "react";
import BusinessCard from "./BusinessCard";

const BusinessList = ({ businesses }) => {
  return (
    <section className="businessList">
      {businesses.map((business) => {
        return <BusinessCard key={business.username} {...business} />;
      })}
    </section>
  );
};

export default BusinessList;
