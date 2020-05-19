import React, { Component } from "react";
import { Auth } from "aws-amplify";

class CustomConfirmSignUp extends Component {
  state = { code: "", username: "", error: "" };

  _validAuthStates = ["signIn", "signedOut", "signedUp"];

  ConfirmSignUp = () => {
    const { username, code } = this.state;
    Auth.confirmSignUp(username, code)
      .then(() => {
        this.setState({ username, code });
      })
      .catch((err) => {
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
        }
      });
  };

  handleInputChange = (event) => {
    const { code } = event.target;
    this.setState({ code: code });
  };

  handleConfirm = (event) => {
    event.preventDefault();
    this.ConfirmSignUp();
  };

  render() {
    return (
      <section>
        {this._validAuthStates.includes(this.props.authState) && (
          <form>
            <label htmlFor="code">Code</label>
            <input
              id="code"
              key="code"
              name="code"
              onChange={this.handleInputChange}
              type="text"
              placeholder="code"
            />
            <button onClick={this.handleConfirm}>Confirm</button>
          </form>
        )}
      </section>
    );
  }
}

export default CustomConfirmSignUp;
