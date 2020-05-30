import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "@reach/router";
import * as api from "../utils/api";

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
    this.setState({ username: "", email: "", password: "" });
  };

  signUp = () => {
    const { username, password, email } = this.state;
    Auth.signUp(username, password, email)
      .then(() => {
        this.props.onStateChange("signedUp", {});
      })
      .then(() => {
        api.sendUser({ username, emailAddress: email });
      })
      .catch((err) => {
        console.log(err);
        if (
          err.code === "UsernameExistsException" ||
          err.code === "InvalidPasswordException"
        ) {
          this.setState({
            error: err.code,
          });
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
      <section className="message">
        {this.state.error === "UsernameExistsException" ? (
          <p>Username already exists - please try another</p>
        ) : this.state.error === "InvalidPasswordException" ? (
          <p className="message">
            Passwords must contain 8 characters including special characters,
            numbers and upper and lower case letters
          </p>
        ) : this.state.error === "An error has occurred" ? (
          <p>An error has occurred - please try again</p>
        ) : null}
        {this._validAuthStates.includes(this.props.authState) && (
          <form>
            <input
              id="username"
              key="username"
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Username..."
              value={this.state.username}
              className="textInput"
            />
            <input
              id="email"
              key="email"
              name="email"
              onChange={this.handleInputChange}
              type="email"
              placeholder="Email..."
              value={this.state.email}
              className="textInput"
            />
            <input
              id="password"
              key="password"
              name="password"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Password..."
              value={this.state.password}
              className="textInput"
            />
            <button
              onClick={this.handleFormSubmission}
              className="submitButton"
            >
              Register
            </button>
            <p>
              Already registered? Please{" "}
              <Link to="/" className="redirect">
                log in
              </Link>
            </p>
            {this.props.authState === "signedUp" && (
              <p>
                Thank you for registering - please check your email for a
                confirmation link.
              </p>
            )}
          </form>
        )}
      </section>
    );
  }
}

export default CustomSignUp;
