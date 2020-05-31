import React, { Component } from "react";
import * as api from "../utils/api";
import LoadingIndicator from "./LoadingIndicator";


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
    console.log('Updating state via handle input...')
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

    if (this.state.isLoading) return <LoadingIndicator />;
    console.log(this.state.hasRegistered, "<-- has registered in state");
    return (
      <main>
        {this.state.error && <p>An error has occurred, please try again.</p>}
        {this.state.hasRegistered === false && (
          <div >
            <p>Please enter your details to register a business:</p>
            <FormControl onSubmit={this.handleSubmit} >
              <TextField id="outlined-basic" label="Business name" required variant="filled" name="businessName" onChange={this.handleInput} />
              <TextField id="outlined-basic" label="Email" required variant="filled" textarea="TextareaAutosize" name="businessEmail" onChange={this.handleInput} />
              <TextField id="outlined-basic" label="Phone number" inputProps={{ pattern: "(0|(+44))(044)?(7|1|2)([0-9]{9})" }} variant="filled" name="phoneNumber" onChange={this.handleInput} />
              <TextField id="outlined-basic" label="Logo URL" type="url" variant="filled" name="logoUrl" onChange={this.handleInput} />
              <TextField id="outlined-basic" label="Menu URL" type="url" variant="filled" name="menu" onChange={this.handleInput} />
              <TextField id="outlined-basic" label="Postcode" textHelper="Without spaces" variant="filled" name="postCode" onChange={this.handleInput} />
              <TextField id="outlined-basic" label="Address" variant="filled" name="address" onChange={this.handleInput} />
              <TextField id="outlined-basic" label="Facebook URL" type="url" variant="filled" name="facebook" onChange={this.handleInput} />
              <TextField id="outlined-basic" label="Twitter URL" type="url" variant="filled" name="twitter" onChange={this.handleInput} />
              <TextField id="outlined-basic" label="Instagram URL" type="url" variant="filled" name="instagram" onChange={this.handleInput} />
              <TextField id="outlined-basic" label="Business type" select variant="filled" name="businessType" onChange={this.handleInput} >
                {businessTypes.map(business => {
                  return <MenuItem key={business.value} value={business.value}>{business.label}</MenuItem>
                })}
              </TextField>
              <TextField id="outlined-basic" label="Cuisine" select variant="filled" name="cuisine" onChange={√}>
              {cuisines.map(business => {
                return <MenuItem key={business.value} value={business.value}>{business.label}</MenuItem>
              })}
            </TextField>
            <TextField
              id="filled-multiline-flexible"
              label="Tell us about your business"
              multiline
              rows={4}
              onChange={this.handleInput}
              variant="filled"
            />
            <TextField
              id="filled-multiline-flexible"
              label="Tell us your latest updates"
              multiline
              rows={4}
              onChange={this.handleInput}
              variant="filled"
            />
            <FormGroup>
              <FormLabel>Which diets can you cater for?</FormLabel>
              <FormControlLabel control={<Checkbox onChange={this.handleInput} name={"vegan"} />} label={"Vegan"} />
              <FormControlLabel control={<Checkbox onChange={this.handleInput} name={"vegetarian"} />} label={"Vegetarian"} />
              <FormControlLabel control={<Checkbox onChange={this.handleInput} name={"halal"} />} label={"Halal"} />
              <FormControlLabel control={<Checkbox onChange={this.handleInput} name={"glutenFree"} />} label={"Gluten free"} />
            </FormGroup>
            <Button variant="contained" >Submit</Button>
          </FormControl>
        </div>
    )
  }
        {
  this.state.hasRegistered === true && (
    <p>
      Your registration has been successful. Our admin team will email you
      once they have verified your business.
    </p>
  )
}
      </main >
    );
  }
}

export default BusinessRegistration;

          // <BusinessRegCard handleInput={this.handleInput} handleSubmit={this.handleSubmit} hello="hello" />
