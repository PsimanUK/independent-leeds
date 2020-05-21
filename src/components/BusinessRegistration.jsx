import React, { Component } from "react";
import * as api from "../utils/api";

class BusinessRegistration extends Component {
  state = {
    name: "",
    businessEmail: "",
    logo: "",
    postcode: "",
    businessType: "restaurant",
    about: "",
    tables: "",
    hasRegistered: false
  };

  handleInput = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username } = this.props;
    const { businessName, businessEmail, logo, postcode, businessType, about, tables } = this.state;
    console.log(this.state, '<-- state before registration submission')
    api.sendBusiness({
      username,
      businessEmail,
      businessName,
      logo,
      postcode,
      businessType,
      about,
      tables,
    })
      .then(() => {
        this.setState({ hasRegistered: true })
      })
      .catch((err) => {
        console.log(err, '<-- error from handleSubmit in BusinessRegistration')
      });
  };

  render() {
    return (
      <main>
        {this.state.hasRegistered === false ?
          <>
            <p>Please enter your business details to register:</p>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="businessName">Business name:</label>
              <input type="text" id="businessName" name="businessName" onChange={this.handleInput} />
              <label htmlFor="businessEmail">Business email:</label>
              <input type="text" id="businessEmail" name="businessEmail" onChange={this.handleInput} />
              <label htmlFor="logo">Logo URL:</label>
              <input type="text" id="logo" name="logo" onChange={this.handleInput} />
              <label htmlFor="postcode">Postcode:</label>
              <input type="text" id="postcode" name="postcode" onChange={this.handleInput} />
              <label htmlFor="about">About:</label>
              <input type="text" id="about" name="about" onChange={this.handleInput} />
              <label htmlFor="tables">Number of tables available to book:</label>
              <input type="text" id="tables" name="tables" onChange={this.handleInput} />
              <button>Register</button>
            </form>
          </>
          : <p>Your registration has been successful. Our admin team will email you once they verified your business.</p>}
      </main>
    );
  }
}

export default BusinessRegistration;
