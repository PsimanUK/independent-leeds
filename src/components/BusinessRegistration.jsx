import React, { Component } from "react";

class BusinessRegistration extends Component {
  render() {
    return (
      <main>
        <p>Please enter your business details to register:</p>
        <form>
          <label htmlFor="name">Business name:</label>
          <input type="text" id="name" />
          <label htmlFor="logo">Logo URL:</label>
          <input type="text" id="logo" />
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" />
          <label htmlFor="businessType">Business type:</label>
          <input type="text" id="businessType" />
          <label htmlFor="about">About:</label>
          <input type="text" id="about" />
          <label htmlFor="tables">Number of tables available to book:</label>
          <input type="text" id="tables" />
        </form>
      </main>
    );
  }
}

export default BusinessRegistration;
