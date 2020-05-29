import React from 'react';
import { TextField, FormControl, MenuItem, Checkbox, FormGroup, FormLabel, FormControlLabel, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const BusinessRegCard = ({ handleInput, handleSubmit }) => {
  // console.log(props, '<-- props in BusinessRegCard');
  // const useStyles = makeStyles((theme) => ({
  //   margin: {
  //     margin: theme.spacing(1),
  //   },
  //   div: {
  //     margin: "auto",
  //     textAlign: "left",
  //   },
  //   form: {
  //     size: "large",
  //   },
  //   textField: {
  //     marginBottom: "1em",
  //   }
  // }));

  // const classes = useStyles();

  const businessTypes = [{ value: "restaurant", label: "Restaurant" }, { value: "cafe", label: "Cafe" }, { value: "pub", label: "Pub" }, { value: "takeaway", label: "Takeaway" }];

  const cuisines = [{ value: "american", label: "American" }, { value: "british", label: "British" }, { value: "chinese", label: "Chinese" }, { value: "french", label: "French" }, { value: "greek", label: "Greek" }, { value: "indian", label: "Indian" }, { value: "italian", label: "Italian" }, { value: "japanese", label: "Japanese" }, { value: "mexican", label: "Mexican" }, { value: "other", label: "Other" }, { value: "spanish", label: "Spanish" }, { value: "thai", label: "Thai" }];

  return (
    <div >
      <p>Please enter your details to register a business:</p>
      <FormControl onSubmit={handleSubmit} >
        <TextField id="outlined-basic" label="Business name" required variant="filled" name="businessName" onChange={handleInput} />
        <TextField id="outlined-basic" label="Email" required variant="filled" textarea="TextareaAutosize" name="businessEmail" onChange={handleInput} />
        <TextField id="outlined-basic" label="Phone number" inputProps={{ pattern: "(0|(+44))(044)?(7|1|2)([0-9]{9})" }} variant="filled" name="phoneNumber" onChange={handleInput} />
        <TextField id="outlined-basic" label="Logo URL" type="url" variant="filled" name="logoUrl" onChange={handleInput} />
        <TextField id="outlined-basic" label="Menu URL" type="url" variant="filled" name="menu" onChange={handleInput} />
        <TextField id="outlined-basic" label="Postcode" textHelper="Without spaces" variant="filled" name="postCode" onChange={handleInput} />
        <TextField id="outlined-basic" label="Address" variant="filled" name="address" onChange={handleInput} />
        <TextField id="outlined-basic" label="Facebook URL" type="url" variant="filled" name="facebook" onChange={handleInput} />
        <TextField id="outlined-basic" label="Twitter URL" type="url" variant="filled" name="twitter" onChange={handleInput} />
        <TextField id="outlined-basic" label="Instagram URL" type="url" variant="filled" name="instagram" onChange={handleInput} />
        <TextField id="outlined-basic" label="Business type" select variant="filled" name="businessType" onChange={handleInput} >
          {businessTypes.map(business => {
            return <MenuItem key={business.value} value={business.value}>{business.label}</MenuItem>
          })}
        </TextField>
        <TextField id="outlined-basic" label="Cuisine" select variant="filled" name="cuisine" onChange={handleInput}>
          {cuisines.map(business => {
            return <MenuItem key={business.value} value={business.value}>{business.label}</MenuItem>
          })}
        </TextField>
        <TextField
          id="filled-multiline-flexible"
          label="Tell us about your business"
          multiline
          rows={4}
          onChange={handleInput}
          variant="filled"
        />
        <TextField
          id="filled-multiline-flexible"
          label="Tell us your latest updates"
          multiline
          rows={4}
          onChange={handleInput}
          variant="filled"
        />
        <FormGroup>
          <FormLabel>Which diets can you cater for?</FormLabel>
          <FormControlLabel control={<Checkbox onChange={handleInput} name={"vegan"} />} label={"Vegan"} />
          <FormControlLabel control={<Checkbox onChange={handleInput} name={"vegetarian"} />} label={"Vegetarian"} />
          <FormControlLabel control={<Checkbox onChange={handleInput} name={"halal"} />} label={"Halal"} />
          <FormControlLabel control={<Checkbox onChange={handleInput} name={"glutenFree"} />} label={"Gluten free"} />
        </FormGroup>
        <Button variant="contained" >Submit</Button>
      </FormControl>
    </div >
  );
};

export default BusinessRegCard;


