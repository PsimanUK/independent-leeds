import React, { Component } from 'react';
import * as api from '../utils/api';

class BusinessPage extends Component {

    state = { businessName: '', businessEmail: '', about: '', postCode: '', logoURL: '', tables: '', businessUsername: '', aboutUpdateText: "" }


    render() {
        const { businessName, businessEmail, about, postCode, logoURL, tables } = this.state;
        const loggedInUser = this.props.username;
        return (
            <section>
                <h2>{businessName}</h2>
                <img src={logoURL} alt={`Logo for ${businessName}`} />
                <p>{about}</p>
                {loggedInUser === this.state.businessUsername && <form name="aboutUpdateText" value="about" onSubmit={this.submitUpdate}><textarea name="aboutUpdateText" id="update-about" onChange={this.handleUpdate} placeholder="update your details..."></textarea><button >Update</button></form>}
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

    handleUpdate = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    submitUpdate = (event) => {
        console.log(this.state.aboutUpdateText, '<-- aboutUpdateText in state')
        const { id } = this.props;
        const { name, value } = event.target;
        const update = this.state[name];
        console.log(`The name is ${name} and the field to change is ${value} and the text going in is "${update}"`)
        event.preventDefault();
        api.updateBusinessById(id, { [value]: update })
            .then(() => {
                this.setState({ aboutUpdateText: "" })
            })
            .catch((err) => {
                console.log(err, '<--Error in BusinessPage submitUpdate')
            })
    }
}

// field to change currently undefined - value not working

export default BusinessPage;