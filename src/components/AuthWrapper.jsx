import React, { Component } from "react";
import CustomSignIn from "./CustomSignIn";
import InternalApp from "./InternalApp";
import CustomSignUp from "./CustomSignUp";

class AuthWrapper extends Component {
  state = { username: "" };

  updateUsername = (newUsername) => {
    this.setState({ username: newUsername });
  };

  render() {
    console.log(this.props, "<-- this.props");
    return (
      <div>
        <CustomSignIn
          authState={this.props.authState}
          updateUsername={this.updateUsername}
          onStateChange={this.props.onStateChange}
        />
        <CustomSignUp
          authState={this.props.authState}
          onStateChange={this.props.onStateChange}
        />
        <InternalApp
          authState={this.props.authState}
          onStateChange={this.props.onStateChange}
        />
      </div>
    );
  }
}

export default AuthWrapper;
