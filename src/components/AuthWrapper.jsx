import React, { Component } from "react";
import CustomSignIn from "./CustomSignIn";
import InternalApp from "./InternalApp";
import CustomSignUp from "./CustomSignUp";
import Title from "./Title";
import NavBar from "./NavBar";
import { Router } from "@reach/router";
import LoadingIndicator from "./LoadingIndicator";


class AuthWrapper extends Component {
  state = { username: "" };

  updateUsername = (newUsername) => {
    this.setState({ username: newUsername });
  };

  render() {
    console.log(this.props.authState, '<-- authState in AuthWrapper')
    if (this.state.isLoading) return <LoadingIndicator />;
    return (
      <div>
        {this.props.authState !== "signedIn" ?
          <Title /> : <NavBar loggedInUser={this.state.username} />
        }
        <Router>
          <CustomSignIn
            path="/"
            authState={this.props.authState}
            updateUsername={this.updateUsername}
            onStateChange={this.props.onStateChange}
            className="landingPage"
          />
          <CustomSignUp
            path="/register"
            authState={this.props.authState}
            onStateChange={this.props.onStateChange}
            className="landingPage"
          />
        </Router>
        <InternalApp
          authState={this.props.authState}
          onStateChange={this.props.onStateChange}
          username={this.state.username}
        />
      </div>
    );
  }
}

export default AuthWrapper;
