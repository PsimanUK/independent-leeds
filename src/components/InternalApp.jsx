import React, { Component } from 'react';
import NavBar from './NavBar';
import BusinessList from './BusinessList';

class InternalApp extends Component {

    render() {
        if (this.props.authState === 'signedIn') {
            return (
                <main>
                    <NavBar />
                    <BusinessList />
                </main>
            )
        } else return null;
    }
}

export default InternalApp;