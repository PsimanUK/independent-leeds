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
        api.sendUser({ username, emailAddress: email })
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "UsernameExistsException" || err.code === "InvalidPasswordException") {
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
      <section>
        {this.state.error === "UsernameExistsException" ?
          <p>Username already exists - please try another</p> :
          this.state.error === "InvalidPasswordException" ? <p>Passwords must contain 8 characters including a special character and upper and lower case lettersp.</p> :
            this.state.error === "An error has occurred" ? <p>An error has occurred - please try again</p> : null
        }
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
              value={this.state.username}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              key="email"
              name="email"
              onChange={this.handleInputChange}
              type="email"
              placeholder="email"
              value={this.state.email}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              key="password"
              name="password"
              onChange={this.handleInputChange}
              type="text"
              placeholder="********"
              value={this.state.password}
            />
            <button onClick={this.handleFormSubmission}>Register</button>
            <Link to="/">Log In</Link>
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
