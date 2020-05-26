import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Link } from "@reach/router";

class CustomSignOut extends Component {

    state = { username: '' };

    _validAuthStates = ['signedIn'];

    render() {

        return (
            <div>
                {this._validAuthStates.includes(this.props.authState) && (
                    <button onClick={this.handleSignOutSubmission} ><Link to="/">SignOut</Link></button>
                )}
                {this.state.error && <p>An error has occurred while trying to sign you out, please try again.</p>}
            </div>
        );
    }

    handleSignOutSubmission = (event) => {
        event.preventDefault();
        this.signOut();
    };

    signOut = () => {
        Auth.signOut()
            .catch((err) => {
                this.setState({ error: err.code })
            });
    };

}

export default CustomSignOut;