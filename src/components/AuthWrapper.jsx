import React, { Component } from "react";
import CustomSignIn from "./CustomSignIn";
import InternalApp from "./InternalApp";
import CustomSignUp from "./CustomSignUp";
import CustomSignOut from "./CustomSignOut";
import Title from "./Title";
import { Router } from "@reach/router";

class AuthWrapper extends Component {
  state = { username: "", email: "" };

  updateEmail = (newEmail) => {
    this.setState({ email: newEmail });
  };

  render() {
    let email = "";
    let username = "";
    if (this.props.authState === "loading") {
      email = "";
      username = "";
    } else {
      email = this.props.authData.attributes.email;
      username = this.props.authData.username;
    }
    return (
      <div>
        <Title />
        <Router>
          <CustomSignIn
            path="/"
            authState={this.props.authState}
            updateUsername={this.updateUsername}
            onStateChange={this.props.onStateChange}
          />
          <CustomSignUp
            path="/register"
            authState={this.props.authState}
            onStateChange={this.props.onStateChange}
          />
        </Router>

        <InternalApp
          authState={this.props.authState}
          onStateChange={this.props.onStateChange}
          email={email}
          username={username}
        />
        <CustomSignOut
          authState={this.props.authState}
          onStateChange={this.props.onStateChange}
        />
      </div>
    );
  }
}

export default AuthWrapper;
