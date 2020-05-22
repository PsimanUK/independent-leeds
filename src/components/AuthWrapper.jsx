import React, { Component } from "react";
import CustomSignIn from "./CustomSignIn";
import InternalApp from "./InternalApp";
import CustomSignUp from "./CustomSignUp";
import CustomSignOut from "./CustomSignOut";
import Title from "./Title";
import { Router } from "@reach/router";

class AuthWrapper extends Component {
  state = { username: "" };

  updateUsername = (newUsername) => {
    this.setState({ username: newUsername });
  };

  render() {
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
          username={this.state.username}
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
