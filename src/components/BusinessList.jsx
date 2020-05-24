import React from "react";
import BusinessCard from "./BusinessCard";

const BusinessList = ({ businesses, mapBoundaries }) => {
  const viableBusinesses = businesses.filter(
    (business) =>
      business.businessName &&
      business.longitude > mapBoundaries.west &&
      business.longitude < mapBoundaries.east &&
      business.latitude > mapBoundaries.south &&
      business.latitude < mapBoundaries.north
  );

  return (
    <section>
      {viableBusinesses.map((business) => {
        return <BusinessCard key={business.id} {...business} />;
      })}
    </section>
  );
};

export default BusinessList;
