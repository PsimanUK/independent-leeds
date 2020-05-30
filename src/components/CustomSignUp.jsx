import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import { Button, TextField, Container } from '@material-ui/core';

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
      <Container>
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
          <div className="sign-up__card" >
            <form>
              <TextField
                variant="outlined"
                id="username"
                key="username"
                name="username"
                label="Username"
                onChange={this.handleInputChange}
                type="text"
                value={this.state.username}
                className="textInput"
              />
              <TextField
                variant="outlined"
                id="email"
                key="email"
                name="email"
                label="Email"
                onChange={this.handleInputChange}
                type="email"
                value={this.state.email}
                className="textInput"
              />
              <TextField
                variant="outlined"
                id="password"
                key="password"
                name="password"
                label="Password"
                onChange={this.handleInputChange}
                type="password"
                value={this.state.password}
                className="textInput"
              />
              <Button
                onClick={this.handleFormSubmission}
                className="submitButton"
                variant="contained"
                color="primary"
              >
                Register
            </Button>
              <p>
                Already registered? Please{" "}
                <Link to="/" className="redirect">
                  log in
              </Link>
              .
            </p>
              {this.props.authState === "signedUp" && (
                <p>
                  Thank you for registering - please check your email for a
                  confirmation link.
                </p>
              )}
            </form>
          </div>
        )}
      </Container>
    );
  }
}

export default CustomSignUp;
