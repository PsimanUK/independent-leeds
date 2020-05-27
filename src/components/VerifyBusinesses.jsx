import React, { Component } from "react";
import BusinessCard from "./BusinessCard";
import * as api from "../utils/api";

class VerifyBusinesses extends Component {
  state = { businesses: [] };

  componentDidMount = () => {
    api
      .fetchBusinessesToVerify()
      .then(({ Items }) => {
        this.setState({ businesses: Items });
      })
      .catch((err) => {
        this.this.setState({ error: err.code });
      });
  };

  render() {
    const { businesses } = this.state;
    return (
      <main>
        {this.state.error && <p>An error has occured - please try again.</p>}
        {businesses.map((business) => {
          return (
            <BusinessCard key={business.username} {...business} />
          )
        })}
      </main>
    );
  }
}

export default VerifyBusinesses;
