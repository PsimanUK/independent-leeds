import React, { Component } from 'react';
import * as api from '../utils/api';

class BusinessPage extends Component {

    state = { businessName: '', businessEmail: '', about: '', postCode: '', logoURL: '', tables: '' }

    render() {
        const { businessName, businessEmail, about, postCode, logoURL, tables } = this.state;
        return (
            <section>
                <h2>{businessName}</h2>
                <img src={logoURL} alt={`Logo for ${businessName}`} />
                <p>{about}</p>
                <p>{businessEmail}</p>
                <p>{postCode}</p>
                <p>{tables}</p>
            </section>
        );
    }

    componentDidMount = () => {
        console.log(this.props.id, '<-- the id on BusinessPage props')
        api.fetchBusinessById(this.props.id)
            .then(({ businessName, businessEmail, about, postCode, logoURL, tables }) => {
                this.setState({ businessName, businessEmail, about, postCode, logoURL, tables })
            })
            .catch((err) => {
                console.log(err, '<-- error in BusinessPage cDM')
            })
    }
}

export default BusinessPage;