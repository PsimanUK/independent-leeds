import React, { Component } from "react";
import NavBar from "./NavBar";
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
          <NavBar loggedInUser={username} />
          <Router>
            <AllBusinesses path="/" />
            <BusinessRegistration
              path="/register-business"
              username={username}
            />
            <BusinessPage path="/business/:id" username={username} />
            <VerifyBusinesses path="/verify" />
          </Router>
        </main>
      );
    } else return null;
  }
}

export default InternalApp;
