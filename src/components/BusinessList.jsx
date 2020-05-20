import React, { Component } from 'react';
import BusinessCard from './BusinessCard';
import * as api from '../utils/api';

class BusinessList extends Component {

    state = { businesses: [] }

    render() {
        const { businesses } = this.state;
        return (
            <section>
                {businesses.map((business) => {
                    return <BusinessCard key={business.businessName} {...business} />
                })}
            </section>
        );
    }

    componentDidMount = () => {
        api.fetchBusinesses().then(({ Items }) => {
            this.setState({ businesses: Items });
        }).catch((err) => {
            console.log(`Encountered error: ${err}`);
        })
    };
};

export default BusinessList;