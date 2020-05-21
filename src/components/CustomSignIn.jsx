import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "@reach/router";

class CustomSignIn extends Component {
  _validAuthStates = ["signIn", "signedOut", "signedUp"];

  state = {
    username: "",
    password: "",
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    this.signIn();
  };

  signIn = () => {
    const { username, password } = this.state;
    Auth.signIn(username, password)
      .then(() => {
        this.props.onStateChange("signedIn", {});
        this.props.updateUsername(username);
      })
      .catch((err) => {
        console.log(err, '<-- error in signIn');
        if (err.code === "UserNotConfirmedException") {
          this.props.updateUsername(username);
          Auth.resendSignUp(username);
          this.props.onStateChange("confirmSignUp", {});
        } else if (err.code === "NotAuthorizedException") {
          this.setState({ error: "Login Failed" });
        } else if (err.code === "UserNotFoundException") {
          this.setState({ error: "Login Failed" });
        } else {
          this.setState({ error: "An Error Has Occurred" });
        }
      });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <section>
        {this._validAuthStates.includes(this.props.authState) && (
          <form>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              key="username"
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="username"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              key="password"
              name="password"
              onChange={this.handleInputChange}
              type="text"
              placeholder="********"
            />
            <button onClick={this.handleFormSubmission}>Login</button>
            <Link to="/register">Register</Link>
          </form>
        )}
      </section>
    );
  }
}

export default CustomSignIn;
