import React, { Component } from "react";
import NavBar from "./NavBar";
import BusinessRegistration from "./BusinessRegistration";
import { Router } from "@reach/router";
import BusinessPage from "./BusinessPage";
import AllBusinesses from "./AllBusinesses";
import VerifyBusinesses from "./VerifyBusinesses";

class InternalApp extends Component {
  state = {
    alreadyRegistered: false,
  };

  handleBusinessRegistration = () => {
    this.setState({ alreadyRegistered: true });
  };

  render() {
    const { username } = this.props;
    if (this.props.authState === "signedIn") {
      return (
        <main>
          <NavBar loggedInUser={username} />
          <Router>
            <AllBusinesses path="/" />
            {this.state.alreadyRegistered === false && (
              <BusinessRegistration
                path="/register-business"
                username={username}
                handleBusinessRegistration={this.handleBusinessRegistration}
              />
            )}
            <BusinessPage path="/business/:id" username={username} />
            <VerifyBusinesses path="/verify" />
          </Router>
        </main>
      );
    } else return null;
  }
}

export default InternalApp;
