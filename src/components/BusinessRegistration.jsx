import React, { Component } from "react";
import * as api from "../utils/api";
import LoadingIndicator from "./LoadingIndicator";
import { Container, TextField, MenuItem, Checkbox, FormGroup, FormLabel, FormControlLabel, Button } from '@material-ui/core';

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
    isLoading: false,
  };

  handleInput = (event) => {
    const { name } = event.target;
    let value = event.target.value;
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
      })
      .catch((err) => {
        this.setState({ error: err.code });
      });
  };

  render() {
    const businessTypes = [
      { value: "restaurant", label: "Restaurant" },
      { value: "cafe", label: "Cafe" },
      { value: "pub", label: "Pub" },
      { value: "takeaway", label: "Takeaway" },
    ];

    const cuisines = [
      { value: "american", label: "American" },
      { value: "british", label: "British" },
      { value: "chinese", label: "Chinese" },
      { value: "french", label: "French" },
      { value: "greek", label: "Greek" },
      { value: "indian", label: "Indian" },
      { value: "italian", label: "Italian" },
      { value: "japanese", label: "Japanese" },
      { value: "mexican", label: "Mexican" },
      { value: "other", label: "Other" },
      { value: "spanish", label: "Spanish" },
      { value: "thai", label: "Thai" },
    ];

    if (this.state.isLoading) return <LoadingIndicator />;
    return (
      <Container>
        {this.state.error && <p>An error has occurred, please try again.</p>}
        {this.state.hasRegistered === false && (
          <div className="registration__card">
            <p>Please enter your details to register a business:</p>
            <form classname="registration__form">
              <TextField
                id="outlined-basic"
                label="Business name"
                required
                variant="filled"
                name="businessName"
                onChange={this.handleInput}
                className="registration__input"
              />
              <TextField
                id="outlined-basic"
                label="Email"
                required
                variant="filled"
                textarea="TextareaAutosize"
                name="businessEmail"
                onChange={this.handleInput}
                className="registration__input"
              />
              <TextField
                id="outlined-basic"
                label="Phone number"
                inputProps={{ pattern: "(0|(+44))(044)?(7|1|2)([0-9]{9})" }}
                variant="filled"
                name="phoneNumber"
                onChange={this.handleInput}
                className="registration__input"
              />
              <TextField
                id="outlined-basic"
                label="Logo URL"
                type="url"
                variant="filled"
                name="logoUrl"
                onChange={this.handleInput}
                className="registration__input"
              />
              <TextField
                id="outlined-basic"
                label="Menu URL"
                type="url"
                variant="filled"
                name="menu"
                onChange={this.handleInput}
                className="registration__input"
              />
              <TextField
                id="outlined-basic"
                label="Postcode"
                textHelper="Without spaces"
                variant="filled"
                name="postCode"
                onChange={this.handleInput}
                className="registration__input"
              />
              <TextField
                id="outlined-basic"
                label="Address"
                variant="filled"
                name="address"
                onChange={this.handleInput}
                className="registration__input"
              />
              <TextField
                id="outlined-basic"
                label="Facebook URL"
                type="url"
                variant="filled"
                name="facebook"
                onChange={this.handleInput}
                className="registration__input"
              />
              <TextField
                id="outlined-basic"
                label="Twitter URL"
                type="url"
                variant="filled"
                name="twitter"
                onChange={this.handleInput}
                className="registration__input"
              />
              <TextField
                id="outlined-basic"
                label="Instagram URL"
                type="url"
                variant="filled"
                name="instagram"
                onChange={this.handleInput}
                className="registration__input"
              />
              <TextField
                id="outlined-basic"
                label="Business type"
                select
                variant="filled"
                name="businessType"
                onChange={this.handleInput}
                className="registration__input"
              >
                {businessTypes.map((business) => {
                  return (
                    <MenuItem key={business.value} value={business.value}>
                      {business.label}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                id="outlined-basic"
                label="Cuisine"
                select
                variant="filled"
                name="cuisine"
                onChange={this.handleInput}
                className="registration__input"
              >
                {cuisines.map((business) => {
                  return (
                    <MenuItem key={business.value} value={business.value}>
                      {business.label}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                id="filled-multiline-flexible"
                label="Tell us about your business"
                name="about"
                multiline
                rows={4}
                onChange={this.handleInput}
                variant="filled"
                className="registration__input"
              />
              <TextField
                id="filled-multiline-flexible"
                label="Tell us your latest updates"
                name="updates"
                multiline
                rows={4}
                onChange={this.handleInput}
                variant="filled"
                className="registration__input"
              />
              <FormGroup className="registration__checkboxGroup">
                <FormLabel>Which diets can you cater for?</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox onChange={this.handleInput} name={"vegan"} />
                  }
                  label={"Vegan"}
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={this.handleInput} name={"vegetarian"} />
                  }
                  label={"Vegetarian"}
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={this.handleInput} name={"halal"} />
                  }
                  label={"Halal"}
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={this.handleInput} name={"glutenFree"} />
                  }
                  label={"Gluten free"}
                />
              </FormGroup>
              <Button variant="contained" onClick={this.handleSubmit}>
                Submit
              </Button>
            </form>
          </div>
        )}
        {this.state.hasRegistered === true && (
          <p>
            Your registration has been successful. Our admin team will email you
            once they have verified your business.
          </p>
        )}
      </Container>
    );
  }
}

export default BusinessRegistration;
