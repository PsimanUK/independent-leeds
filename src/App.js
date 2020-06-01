import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import awsconfig from "./aws-exports";
import AuthWrapper from "./components/AuthWrapper";
import "./App.css";

Amplify.configure(awsconfig);

function App(props) {
  return (
    <div className="App">
      <Authenticator hideDefault={true} amplifyConfig={awsconfig}>
        <AuthWrapper />
      </Authenticator>
    </div>
  );
}

export default App;
