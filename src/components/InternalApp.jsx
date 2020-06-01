import React, { Component } from "react";
import BusinessRegistration from "./BusinessRegistration";
import { Router } from "@reach/router";
import BusinessPage from "./BusinessPage";
import AllBusinesses from "./AllBusinesses";
import VerifyBusinesses from "./VerifyBusinesses";

class InternalApp extends Component {
  render() {
    const { username } = this.props;
    if (this.props.authState === "signedIn") {
      return (
        <main>
          <Router primary={false}>
            <AllBusinesses path="/" />
            <BusinessRegistration
              path="/register-business"
              username={username}
            />
            <BusinessPage path="/:username" loggedInUser={username} />
            <VerifyBusinesses path="/verify" username={username} />
          </Router>
        </main>
      );
    } else return null;
  }
}

export default InternalApp;
