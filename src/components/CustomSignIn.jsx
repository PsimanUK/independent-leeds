import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "@reach/router";
import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
} from "@material-ui/core/";

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
      <Container>
        {this.state.error === "UserNotConfirmedException" ? (
          <p>
            Email not yet verified - please check your emails and click the link
            to verify.
          </p>
        ) : this.state.error === "NotAuthorizedException" ? (

          <p>Incorrect password / temporary password has expired</p>

        ) : this.state.error === "UserNotFoundException" ? (
          <p>Incorrect username</p>
        ) : this.state.error === "An error has occurred" ? (
          <p>An error has occurred - please try again</p>
        ) : null}

        {this._validAuthStates.includes(this.props.authState) && (
          <div className="login__card">
            <form>
              <TextField
                variant="outlined"
                id="username"
                key="username"
                name="username"
                label="Username"
                onChange={this.handleInputChange}
                type="text"
                className="textInput"
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="password"
                key="password"
                name="password"
                label="Password"
                onChange={this.handleInputChange}
                type="password"
                className="textInput"
              />
              <Button
                onClick={this.handleFormSubmission}
                className="submitButton"
                variant="contained"
              >
                Login
              </Button>
              <Grid item>
                <p>
                  Not yet registered? Sign up{" "}
                  <Link to="/register" className="redirect">
                    here
                  </Link>
                  .
                </p>
              </Grid>
            </form>
          </div>
        )}
        <Box mt={8}></Box>
      </Container>
    );
  }
}

export default CustomSignIn;
