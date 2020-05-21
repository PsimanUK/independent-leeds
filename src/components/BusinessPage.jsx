import React, { Component } from 'react';
import * as api from '../utils/api';

class BusinessPage extends Component {

    state = { businessName: '', businessEmail: '', about: '', postCode: '', logoURL: '', tables: '', businessUsername: '' }


    render() {
        const { businessName, businessEmail, about, postCode, logoURL, tables } = this.state;
        const loggedInUser = this.props.username;
        return (
            <section>
                <h2>{businessName}</h2>
                <img src={logoURL} alt={`Logo for ${businessName}`} />
                <p>{about}</p>
                {loggedInUser === this.state.businessUsername && <textarea name="update-about" id="update-about" placeholder="update your details..."></textarea>}
                <p>{businessEmail}</p>
                <p>{postCode}</p>
                <p>{tables}</p>
            </section>
        );
    }

    componentDidMount = () => {
        console.log(this.props, '<-- the props on BusinessPage props')
        api.fetchBusinessById(this.props.id)
            .then(({ businessName, businessEmail, about, postCode, logoURL, tables, username }) => {
                this.setState({ businessName, businessEmail, about, postCode, logoURL, tables, businessUsername: username })
            })
            .catch((err) => {
                console.log(err, '<-- error in BusinessPage cDM')
            })
    }
}

export default BusinessPage;