import React, { Component } from "react";
import * as api from "../utils/api";
import BusinessRegCard from "./BusinessRegCard";

class BusinessRegistration extends Component {
  state = {
    businessName: "",
    businessEmail: "",
    logoUrl: "",
    postCode: "",
    postcodeInvalid: true,
    businessType: "",
    menu: "",
    about: "",
    phoneNumber: "",
    phoneNumberInvalid: true,
    address: "",
    facebook: "",
    twitter: "",
    instagram: "",
    updates: "",
    hasRegistered: false,
    vegetarian: "no",
    vegan: "no",
    halal: "no",
    glutenFree: "no",
    cuisine: "",
  };

  handleInput = (event) => {
    const { value, name } = event.target;
    if (event.target.checked === true) {
      value = "yes";
    }
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username } = this.props;
    const {
      businessName,
      businessEmail,
      logoUrl,
      postCode,
      businessType,
      about,
      phoneNumber,
      address,
      facebook,
      twitter,
      instagram,
      updates,
      vegetarian,
      vegan,
      halal,
      glutenFree,
      cuisine,
      menu,
    } = this.state;
    console.log(this.state, '<-- state just before api.SendBusiness')
    api
      .sendBusiness(username, {
        businessEmail,
        businessName,
        logoUrl,
        postCode,
        businessType,
        about,
        phoneNumber,
        address,
        facebook,
        twitter,
        instagram,
        updates,
        vegetarian,
        vegan,
        halal,
        glutenFree,
        cuisine,
        menu,
      })
      .then(() => {
        this.setState({ hasRegistered: true });
        console.log(
          this.state.hasRegistered,
          "<-- has registered after api request"
        );
      })
      .catch((err) => {
        this.setState({ error: err.code });
      });
  };

  render() {
    return (
      <main>
        {this.state.error && <p>An error has occurred, please try again.</p>}
        {this.state.hasRegistered === false && (
          <BusinessRegCard handleInput={this.handleinput} handleSubmit={this.handleSubmit} />
        )}
        {this.state.hasRegistered === true && (
          <p>
            Your registration has been successful. Our admin team will email you
            once they have verified your business.
          </p>
        )}
      </main>
    );
  }
}

export default BusinessRegistration;
