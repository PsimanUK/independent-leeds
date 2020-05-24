import React from "react";
import BusinessCard from "./BusinessCard";

const BusinessList = ({ businesses, mapBoundaries }) => {
  const viableBusinesses = businesses.filter(
    (business) => business.businessName
  );
  console.log(mapBoundaries);
  return (
    <section>
      {viableBusinesses.map((business) => {
        console.log([business.latitude, business.longitude]);
        return <BusinessCard key={business.id} {...business} />;
      })}
    </section>
  );
};

export default BusinessList;
