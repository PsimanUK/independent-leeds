import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "@reach/router";

class CustomSignIn extends Component {
  _validAuthStates = ["signIn", "signedOut", "signedUp", "confirmSignUp"];

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
        this.setState({ error: "" });
      })
      .catch((err) => {
        console.log(err, "<-- error in signIn");
        if (err.code === "UserNotConfirmedException") {
          this.setState({ error: err.code });
          Auth.resendSignUp(username);
          this.props.onStateChange("confirmSignUp", {});
        } else if (
          err.code === "NotAuthorizedException" ||
          err.code === "UserNotFoundException"
        ) {
          this.setState({ error: err.code });
        } else {
          this.setState({ error: "An error has occurred" });
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
        {this.state.error === "UserNotConfirmedException" ? (
          <p>
            Email not yet verified - please check your emails and click the link
            to verify.
          </p>
        ) : this.state.error === "NotAuthorizedException" ? (
          <p>Incorrect password</p>
        ) : this.state.error === "UserNotFoundException" ? (
          <p>Incorrect username</p>
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
              className="textInput"
            />
            <input
              id="password"
              key="password"
              name="password"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Password..."
              className="textInput"
            />
            <button
              onClick={this.handleFormSubmission}
              className="submitButton"
            >
              Login
            </button>
            <p>
              Not yet registered? Sign up{" "}
              <Link to="/register" className="redirect">
                here
              </Link>
            </p>
          </form>
        )}
      </section>
    );
  }
}

export default CustomSignIn;
