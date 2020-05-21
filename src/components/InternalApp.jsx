import React, { Component } from "react";
import NavBar from "./NavBar";
import BusinessList from "./BusinessList";
import BusinessRegistration from "./BusinessRegistration";
import { Router } from "@reach/router";
import BusinessPage from "./BusinessPage";

class InternalApp extends Component {
  render() {
    const { username } = this.props;
    if (this.props.authState === "signedIn") {
      return (
        <main>
          <NavBar />
          <Router>
            <BusinessList path="/" />
            <BusinessRegistration
              path="/register-business"
              username={username}
            />
            <BusinessPage path="/business/:id" username={username} />
          </Router>
        </main>
      );
    } else return null;
  }
}

export default InternalApp;
