import React, { Component, Suspense } from "react";
import { Router } from "@reach/router";

class InternalApp extends Component {
  render() {
    const { username } = this.props;

    const AllBusinesses = React.lazy(() => import("./AllBusinesses"));
    const BusinessPage = React.lazy(() => import("./BusinessPage"));
    const VerifyBusinesses = React.lazy(() => import("./VerifyBusinesses"));
    const BusinessRegistration = React.lazy(() => import("./BusinessRegistration"));

    if (this.props.authState === "signedIn") {
      return (
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Router primary={false}>
              <AllBusinesses path="/" />
              <BusinessRegistration
                path="/register-business"
                username={username}
              />
              <BusinessPage path="/:username" loggedInUser={username} />
              <VerifyBusinesses path="/verify" username={username} />
            </Router>
          </Suspense>


        </main>
      );
    } else return null;
  }
}

export default InternalApp;
