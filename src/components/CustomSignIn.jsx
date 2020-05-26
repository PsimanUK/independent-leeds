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
        this.setState({ error: "" })
      })
      .catch((err) => {
        console.log(err, '<-- error in signIn');
        if (err.code === "UserNotConfirmedException") {
          // this.props.updateUsername(username);
          this.setState({ error: "Email not yet verified" })
          Auth.resendSignUp(username);
          this.props.onStateChange("confirmSignUp", {});
        } else if (err.code === "NotAuthorizedException") {
          this.setState({ error: "Forgot Password?" });
        } else if (err.code === "UserNotFoundException") {
          this.setState({ error: "User does not exist!" });
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
        {this.state.error === "Email not yet verified" ?
          <p>Email not yet verified - please check your emails and click the link to verify.</p> :
          this.state.error === "Forgot Password?" ? <p>Incorrect password</p> :
            this.state.error === "User does not exist!" ? <p>Incorrect username</p> :
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
            <p>Your password must contain minimum 8 characters, including a special character, a number, and upper and lower case letters.</p>
            <Link to="/register">Register</Link>
          </form>
        )}
      </section>
    );
  }
}

export default CustomSignIn;
