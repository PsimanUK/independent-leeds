import React, { Component } from "react";
import * as api from "../utils/api";

class BusinessRegistration extends Component {
  state = {
    name: "",
    businessEmail: "",
    logoUrl: "",
    postCode: "",
    postcodeInvalid: true,
    businessType: "",
    about: "",
    phoneNumber: "",
    phoneNumberInvalid: true,
    address: "",
    facebook: "",
    twitter: "",
    instagram: "",
    updates: "",
    hasRegistered: false,
    vegetarian: "",
    vegan: "",
    halal: "",
    glutenFree: "",
    cuisine: "",
  };

  handleInput = (event) => {
    const { value, name } = event.target;
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
    } = this.state;
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
      })
      .then(() => {
        this.setState({ hasRegistered: true });
        console.log(this.state.hasRegistered, '<-- has registered after api request')
      })
      .catch((err) => {
        this.setState({ error: err.code })
      });
  };

  render() {
    console.log(this.state.hasRegistered, '<-- has registered in state')
    return (
      <main>
        {this.state.error && <p>An error has occurred, please try again.</p>}
        {this.state.hasRegistered === false &&
          <>
            <p>Please enter your business details to register:</p>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="businessName">Business name:</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                onChange={this.handleInput}
                required
              />
              <label htmlFor="businessEmail">Business email:</label>
              <input
                type="email"
                id="businessEmail"
                name="businessEmail"
                onChange={this.handleInput}
              />
              <label htmlFor="phoneNumber">Phone number:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={this.handleInput}
                pattern="(0|(\+44))(044)?(7|1|2)(\d{9})"
                required
              />
              <label htmlFor="logoUrl">Logo URL:</label>
              <input
                type="url"
                id="logoUrl"
                name="logoUrl"
                onChange={this.handleInput}
              />
              <label htmlFor="menu">Menu image URL:</label>
              <input
                type="url"
                id="menu"
                name="menu"
                onChange={this.handleInput}
              />
              <label htmlFor="postCode">Postcode (no spaces):</label>
              <input
                type="text"
                id="postCode"
                name="postCode"
                onChange={this.handleInput}
                pattern="^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$"
                required
              />
              <label htmlFor="businessType">Type of Business:</label>
              <select
                id="businessType"
                name="businessType"
                onChange={this.handleInput}
                required
              >
                <option value="restaurant">Restaurant</option>
                <option value="pub">Pub</option>
                <option value="cafe">Cafe</option>
                <option value="takeaway">Takeaway</option>
              </select>
              <label htmlFor="cuisine">Type of Cuisine:</label>
              <select id="cuisine" name="cuisine" onChange={this.handleInput} required>
                <option value="chinese">Chinese</option>
                <option value="thai">Thai</option>
                <option value="indian">Indian</option>
                <option value="british">British</option>
                <option value="italian">Italian</option>
                <option value="spanish">Spanish</option>
                <option value="american">American</option>
                <option value="greek">Greek</option>
                <option value="french">French</option>
                <option value="japanese">Japanese</option>
                <option value="mexican">Mexican</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="about">About:</label>
              <input
                type="text"
                id="about"
                name="about"
                onChange={this.handleInput}
              />
              <label htmlFor="address">Business Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={this.handleInput}
                required
              />
              <label htmlFor="facebook">Facebook URL:</label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                onChange={this.handleInput}
              />
              <label htmlFor="instagram">Instagram URL:</label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                onChange={this.handleInput}
              />
              <label htmlFor="twitter">Twitter URL:</label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                onChange={this.handleInput}
              />
              <label htmlFor="updates">Latest updates:</label>
              <input
                type="text"
                id="updates"
                name="updates"
                onChange={this.handleInput}
                placeholder="Let your customers know your situation during lockdown..."
              />
              <section>
                <p>Please select the dietary requirements you cater for:</p>
                <label htmlFor="vegetarian">Vegetarian</label>
                <input
                  type="checkbox"
                  id="vegetarian"
                  name="vegetarian"
                  value="yes"
                  onChange={this.handleInput}
                />
                <label htmlFor="vegan">Vegan</label>
                <input
                  type="checkbox"
                  id="vegan"
                  name="vegan"
                  value="yes"
                  onChange={this.handleInput}
                />
                <label htmlFor="glutenFree">Gluten-free</label>
                <input
                  type="checkbox"
                  id="glutenFree"
                  name="glutenFree"
                  value="yes"
                  onChange={this.handleInput}
                />
                <label htmlFor="halal">Halal</label>
                <input
                  type="checkbox"
                  id="halal"
                  name="halal"
                  value="yes"
                  onChange={this.handleInput}
                />
              </section>
              <button>Register</button>
            </form>
          </>}
        {this.state.hasRegistered === true &&
          <p>
            Your registration has been successful. Our admin team will email you
            once they have verified your business.
          </p>
        }
      </main>
    );
  }
}

export default BusinessRegistration;
