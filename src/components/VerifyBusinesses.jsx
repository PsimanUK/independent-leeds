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

  verifyBusiness = (businessUsername) => {
    api
      .updateBusiness(businessUsername, { key: "verified", value: "yes" })
      .then(() => {
        api
          .fetchBusinessesToVerify()
          .then(({ Items }) => {
            this.setState({ businesses: Items });
          })
          .catch((err) => {
            this.setState({ error: err.code });
          });
      });
  };

  render() {
    const { businesses } = this.state;
    return (
      <main>
        {this.state.error && <p>An error has occured - please try again.</p>}
        {businesses.length === 0 && <p>No businesses to verify</p>}
        {businesses.map((business) => {
          const { username } = business;
          return (
            <section className="businessList">
              <BusinessCard key={username} {...business} />
              <button
                onClick={() => this.verifyBusiness(username)}
                className="verify"
              >
                Verify {business.businessName}
              </button>
            </section>
          );
        })}
      </main>
    );
  }
}

export default VerifyBusinesses;
