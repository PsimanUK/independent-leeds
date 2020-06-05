import React, { Component, Suspense } from "react";
import Title from "./Title";
import NavBar from "./NavBar";
import { Router } from "@reach/router";

class AuthWrapper extends Component {
  state = { username: "" };

  updateUsername = (newUsername) => {
    this.setState({ username: newUsername });
  };

  render() {

    const CustomSignIn = React.lazy(() => import("./CustomSignIn"));
    const CustomSignUp = React.lazy(() => import("./CustomSignUp"));
    const InternalApp = React.lazy(() => import("./InternalApp"));
    return (
      <div className="authWrapper">
        {this.props.authState !== "signedIn" ? (
          <Title />
        ) : (
            <NavBar loggedInUser={this.state.username} />
          )}
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </div>
    );
  }
}

export default AuthWrapper;
