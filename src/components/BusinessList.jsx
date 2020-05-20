import React, { Component } from 'react';
import BusinessCard from './BusinessCard';

class BusinessList extends Component {

    state = { businesses: [{ businessName: 'Wicked Business' }, { businessName: 'Fantastic Business' }] }

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
}

export default BusinessList;