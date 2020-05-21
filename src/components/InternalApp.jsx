import React, { Component } from "react";
import NavBar from "./NavBar";
import BusinessList from "./BusinessList";
import BusinessRegistration from "./BusinessRegistration";
import { Router } from "@reach/router";

class InternalApp extends Component {
  render() {
    if (this.props.authState === "signedIn") {
      return (
        <main>
          <NavBar />
          <Router>
            <BusinessList path="/" />
            <BusinessRegistration path="/register-business" />
          </Router>
        </main>
      );
    } else return null;
  }
}

export default InternalApp;
