import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class CustomSignOut extends Component {

    state = { username: '' };

    _validAuthStates = ['signedIn'];

    render() {

        return (
            <div>
                {this._validAuthStates.includes(this.props.authState) && (
                    <button onClick={this.handleSignOutSubmission} >SignOut</button>
                )}
            </div>
        );
    }

    handleSignOutSubmission = (event) => {
        event.preventDefault();
        this.signOut();
    };

    signOut = () => {
        console.log('Trying to sign out...')
        Auth.signOut()
            .then(() => {
                // this.props.onStateChange('signedOut', {});
                return <p>User signed out!</p>
            })
            .catch((err) => {
                return <p>{`Error: ${err.message}`}</p>
            });
    };

    // componentDidUpdate = (prevProps, prevState) => {
    //     console.log(this.state.username, '<-- the username in state')
    //     // const { username } = this.prevProps.authData;
    //     if (this.props.authState !== prevProps.authState && this.props.authData) {
    //         console.log('props in CustomSignOut has changed')
    //         this.setState({ username: this.props.authData.username || '', authState: this.props.authState });
    //     }
    // };
}

export default CustomSignOut;