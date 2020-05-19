import React, { Component } from "react";
import { Auth } from "aws-amplify";

class CustomSignUp extends Component {
  _validAuthStates = ["signIn", "signedOut", "signedUp"];

  state = {
    username: "",
    email: "",
    password: "",
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    this.signUp();
  };

  signUp = () => {
    const { username, password } = this.state;
    Auth.signUp(username, password)
      .then(() => {
        this.props.onStateChange("signedUp", {});
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "UserNotConfirmedException") {
          this.setState({ error: "Account not verified yet" });
        } else if (err.code === "PasswordResetRequiredException") {
          this.setState({
            error: "Existing user found. Please reset your password",
          });
        } else if (err.code === "NotAuthorizedException") {
          this.setState({ error: "Forgot Password?" });
        } else if (err.code === "UserNotFoundException") {
          this.setState({ error: "User does not exist!" });
        } else {
          this.setState({ error: err.code });
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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              key="email"
              name="email"
              onChange={this.handleInputChange}
              type="text"
              placeholder="email"
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
          </form>
        )}
      </section>
    );
  }
}

export default CustomSignUp;
