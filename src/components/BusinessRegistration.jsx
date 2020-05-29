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
    console.log(this.state.hasRegistered, "<-- has registered in state");
    return (
      <main>
        {this.state.error && <p>An error has occurred, please try again.</p>}
        {this.state.hasRegistered === false && (
          <>
            <p>Please enter your business details to register:</p>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                id="businessName"
                name="businessName"
                onChange={this.handleInput}
                required
                placeholder="Business name..."
                className="textInput business"
              />
              <input
                type="email"
                id="businessEmail"
                name="businessEmail"
                onChange={this.handleInput}
                placeholder="Business email..."
                className="textInput business"
              />
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={this.handleInput}
                pattern="(0|(\+44))(044)?(7|1|2)(\d{9})"
                required
                placeholder="Phone number..."
                className="textInput business"
              />
              <input
                type="url"
                id="logoUrl"
                name="logoUrl"
                onChange={this.handleInput}
                placeholder="Logo URL..."
                className="textInput business"
              />
              <input
                type="url"
                id="menu"
                name="menu"
                onChange={this.handleInput}
                placeholder="Menu image URL..."
                className="textInput business"
              />
              <input
                type="text"
                id="postCode"
                name="postCode"
                onChange={this.handleInput}
                pattern="^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$"
                required
                placeholder="Postcode (no spaces)..."
                className="textInput business"
              />
              <input
                type="text"
                id="address"
                name="address"
                onChange={this.handleInput}
                required
                placeholder="Street address..."
                className="textInput business"
              />
              <input
                type="url"
                id="facebook"
                name="facebook"
                onChange={this.handleInput}
                placeholder="Facebook URL..."
                className="textInput business"
              />
              <input
                type="url"
                id="instagram"
                name="instagram"
                onChange={this.handleInput}
                placeholder="Instagram URL..."
                className="textInput business"
              />
              <input
                type="url"
                id="twitter"
                name="twitter"
                onChange={this.handleInput}
                placeholder="Twitter URL..."
                className="textInput business"
              />
              <select
                id="businessType"
                name="businessType"
                onChange={this.handleInput}
                required
              >
                <option value="">Business type</option>
                <option value="restaurant">Restaurant</option>
                <option value="pub">Pub</option>
                <option value="cafe">Cafe</option>
                <option value="takeaway">Takeaway</option>
              </select>
              <select
                id="cuisine"
                name="cuisine"
                onChange={this.handleInput}
                required
              >
                <option value="">Cuisine</option>
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
              <textarea
                id="about"
                name="about"
                onChange={this.handleInput}
                placeholder="Tell us about your business..."
              ></textarea>
              <textarea
                id="updates"
                name="updates"
                onChange={this.handleInput}
                placeholder="What's the latest news...?"
              ></textarea>
              <section className="checkboxes">
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
              <button className="submitButton">Register</button>
            </form>
          </>
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
