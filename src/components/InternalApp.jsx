import React, { Component } from 'react';

class InternalApp extends Component {



    render() {
        if (this.props.authState === 'signedIn') {
            return (
                <h1>Independent Leeds</h1>
            )
        } else return null;
    }
}

export default InternalApp;