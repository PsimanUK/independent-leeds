import React, { Component } from "react";
import BusinessCard from "./BusinessCard";
import * as api from "../utils/api";

class VerifyBusinesses extends Component {
  state = { businesses: [] };

  componentDidMount = () => {
    api
      .fetchBusinessesToVerify()
      .then(({ Items }) => {
        console.log(Items);
        this.setState({ businesses: Items });
      })
      .catch((err) => {
        console.log(`Encountered error: ${err}`);
      });
  };

  render() {
    const { businesses } = this.state;
    console.log(businesses);
    return (
      <main>
        {businesses.map((business) => {
          return <BusinessCard key={business.id} {...business} />;
        })}
      </main>
    );
  }
}

export default VerifyBusinesses;
