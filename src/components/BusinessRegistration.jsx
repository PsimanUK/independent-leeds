import React, { Component } from "react";
import * as api from "../utils/api";

class BusinessRegistration extends Component {
  state = {
    name: "",
    logo: "",
    postcode: "",
    businessType: "",
    about: "",
    tables: "",
  };

  handleInput = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, username } = this.props;
    const { name, logo, postcode, businessType, about, tables } = this.state;
    api.sendBusiness({
      email,
      username,
      name,
      logo,
      postcode,
      businessType,
      about,
      tables,
    });
  };

  render() {
    return (
      <main>
        <p>Please enter your business details to register:</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Business name:</label>
          <input type="text" id="name" onChange={this.handleInput} />
          <label htmlFor="logo">Logo URL:</label>
          <input type="text" id="logo" onChange={this.handleInput} />
          <label htmlFor="postcode">Postcode:</label>
          <input type="text" id="postcode" onChange={this.handleInput} />
          <label htmlFor="businessType">Business type:</label>
          <input type="text" id="businessType" onChange={this.handleInput} />
          <label htmlFor="about">About:</label>
          <input type="text" id="about" onChange={this.handleInput} />
          <label htmlFor="tables">Number of tables available to book:</label>
          <input type="text" id="tables" onChange={this.handleInput} />
          <button>Register</button>
        </form>
      </main>
    );
  }
}

export default BusinessRegistration;
