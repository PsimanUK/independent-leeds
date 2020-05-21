import React, { Component } from "react";
import NavBar from "./NavBar";
import BusinessList from "./BusinessList";
import BusinessRegistration from "./BusinessRegistration";
import { Router } from "@reach/router";

class InternalApp extends Component {
  render() {
    const { email, username } = this.props;
    console.log(this.props);
    if (this.props.authState === "signedIn") {
      return (
        <main>
          <NavBar />
          <Router>
            <BusinessList path="/" />
            <BusinessRegistration
              path="/register-business"
              email={email}
              username={username}
            />
          </Router>
        </main>
      );
    } else return null;
  }
}

export default InternalApp;
