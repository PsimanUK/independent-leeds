import React, { Component } from 'react';
import NavBar from './NavBar';

class InternalApp extends Component {

    render() {
        if (this.props.authState === 'signedIn') {
            return (
                <main>
                    <NavBar />
                </main>
            )
        } else return null;
    }
}

export default InternalApp;