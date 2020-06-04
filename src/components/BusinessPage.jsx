import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";
import LoadingIndicator from "./LoadingIndicator";
import PostComment from "./PostComment";
import axios from "axios";
import SupportBusiness from "./SupportBusiness";
import { TextField, MenuItem, Button, Select } from "@material-ui/core";

class BusinessPage extends Component {
  state = {
    username: "",
    businessName: "",
    businessEmail: "",
    about: "",
    postCode: "",
    logoUrl: "",
    tables: "",
    keyToUpdate: {
      businessName: "",
      businessEmail: "",
      about: "",
      postCode: "",
      logoUrl: "",
      address: "",
      businessType: "",
      cuisine: "",
      vegan: "",
      menu: "",
      facebook: "",
      twitter: "",
      instagram: "",
      vegetarian: "",
      halal: "",
      glutenFree: "",
      phoneNumber: "",
    },
    address: "",
    businessType: "",
    cuisine: "",
    vegan: "",
    vegetarian: "",
    halal: "",
    glutenFree: "",
    phoneNumber: "",
    updates: "",
    menu: "",
    facebook: "",
    twitter: "",
    instagram: "",
    votes: 0,
    comments: [],
    isLoading: true,
    isShown: false,
    changeNameOfButton: false,
  };

  render() {
    if (this.state.isLoading) return <LoadingIndicator />;
    const {
      businessName,
      businessEmail,
      about,
      postCode,
      phoneNumber,
      logoUrl,
      tables,
      comments,
      cuisine,
      updates,
      menu,
      businessType,
      votes,
    } = this.state;
    const { loggedInUser } = this.props;
    console.log(this.state.username, "<---username in business page");
    return (
      <section className="BusinessPage__card">
        <h1 className="BusinessPage__business_title">{businessName}</h1>
        <br></br>
        {loggedInUser === this.state.username && (
          <Button onClick={() => this.handleEdit("businessName")}>EDIT BUSINESS NAME</Button>
        )}
        <form
          className="businessPageElement"
          noValidate
          autoComplete="off"
          id="businessName"
          name="businessName"
          onSubmit={this.submitUpdate}
          hidden
        >
          <TextField
            className="BusinessPage__update_field"
            label="Business Name"
            id="businessName"
            name="businessName"
            type="text"
            placeholder="update your business name..."
            value={this.state.keyToUpdate.businessName}
            onChange={this.handleInput}
          />
          <Button type="Submit">Update</Button>
        </form>
        <section className="BusinessPage__top_section_card" >
          <section classname="BusinessPage__logo_and_edit">
            <img
              src={logoUrl}
              alt={`Logo for ${businessName}`}
              className="BusinessPage__logo_img"
            />
            <br></br>
            {loggedInUser === this.state.username && (
              <Button onClick={() => this.handleEdit("logoUrl")}>EDIT LOGO</Button>
            )}
            <form
              className="businessPageElement"
              id="logoUrl"
              name="logoUrl"
              onSubmit={this.submitUpdate}
              hidden
            >
              <TextField
                className="BusinessPage__update_field"
                label="Logo URL"
                name="logoUrl"
                id="outlined-basic"
                type="url"
                placeholder="input your new logo URL..."
                value={this.state.keyToUpdate.logoUrl}
                onChange={this.handleInput}
              />
              <Button type="Submit">Update</Button>
            </form>
          </section>
          <section className="BusinessPage__type_cuisine_tables_group" >
            <h2 className="singlebusinessCard__title">Type:</h2>
            <h2>{businessType}</h2>
            <br></br>
            {loggedInUser === this.state.username && (
              <Button onClick={() => this.handleEdit("businessType")}>EDIT BUSINESS TYPE</Button>
            )}
            <form
              name="businessType"
              id="businessType"
              onSubmit={this.submitUpdate}
              className="businessPageElement"
              hidden
            >
              <Select
                id="businessType"
                label="Business Type"
                select
                variant="filled"
                name="businessType"
                onChange={this.handleInput}
              >
                <MenuItem value="Restaurant">Restaurant</MenuItem>
                <MenuItem value="Pub">Pub</MenuItem>
                <MenuItem value="Cafe">Cafe</MenuItem>
                <MenuItem value="Takeaway">Takeaway</MenuItem>
              </Select>
              <Button type="Submit" id="businessType">
                Update
          </Button>
            </form>
            <h2 className="singlebusinessCard__title">Cuisine: </h2>
            <h2>{cuisine}</h2>
            <br></br>
            {loggedInUser === this.state.username && (
              <Button onClick={() => this.handleEdit("cuisine")}>EDIT CUISINE</Button>
            )}
            <form
              name="cuisine"
              id="cuisine"
              onSubmit={this.submitUpdate}
              className="businessPageElement"
              hidden
            >
              <Select
                id="cuisine"
                label="Cuisine"
                select
                variant="filled"
                name="cuisine"
                onChange={this.handleInput}
              >
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Thai">Thai</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="British">British</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="American">American</MenuItem>
                <MenuItem value="Greek">Greek</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Japanese">Japanese</MenuItem>
                <MenuItem value="Mexican">Mexican</MenuItem>
                <MenuItem value="Middle Eastern">Middle Eastern</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <Button type="Submit" id="cuisine">
                Update
          </Button>
            </form>
            <h2 className="singlebusinessCard__title">
              Tables Currently Available:
        </h2>
            <strong>
              <p className="tablesAvailable">{tables}</p>
            </strong>
            <br></br>
            {loggedInUser === this.state.username && (
              <Button onClick={() => this.handleEdit("tables")}>EDIT NO. OF TABLES</Button>
            )}
            <form
              id="tables"
              name="tables"
              onSubmit={this.submitUpdate}
              className="businessPageElement"
              hidden
            >
              <TextField
                className="BusinessPage__update_field"
                label="Tables"
                name="tables"
                id="outlined-basic"
                type="text"
                value={this.state.keyToUpdate.tables}
                placeholder="update tables available..."
                onChange={this.handleInput}
              />
              <Button type="Submit">Update</Button>
            </form>
          </section>
        </section>
        <h2 className="singlebusinessCard__title">About:</h2>
        <br></br>
        <p className="businessPageDescription">{about}</p>
        {loggedInUser === this.state.username && (
          <Button onClick={() => this.handleEdit("about")}>EDIT INFO ABOUT YOUR BUSINESS</Button>
        )}
        <form
          id="about"
          name="about"
          onSubmit={this.submitUpdate}
          hidden
          className="businessPageElement"
        >
          <TextField
            className="BusinessPage__update_field"
            label="About"
            multiline
            rows={2}
            rowsMax={20}
            name="about"
            placeholder="update your business information..."
            value={this.state.keyToUpdate.about}
            onChange={this.handleInput}
          ></TextField>
          <Button type="Submit">Update</Button>
        </form>
        <h2 className="singlebusinessCard__title">Latest News:</h2>
        <p className="businessPageDescription">{updates}</p>
        <br></br>
        {loggedInUser === this.state.username && (
          <Button onClick={() => this.handleEdit("updates")}>EDIT LATEST NEWS</Button>
        )}
        <form
          className="businessPageElement"
          id="updates"
          name="updates"
          onSubmit={this.submitUpdate}
          hidden
        >
          <TextField
            className="BusinessPage__update_field"
            label="Updates"
            multiline
            rows={2}
            rowsMax={20}
            name="updates"
            placeholder="update the latest news for your
            business..."
            value={this.state.keyToUpdate.updates}
            onChange={this.handleInput}
          />
          <Button type="Submit">Update</Button>
        </form>

        <div className="showMenu">
          <h2 className="singlebusinessCard__title">Menu:</h2>
          <img src={menu} alt="No Menu image provided" />
          <br></br>
          {loggedInUser === this.state.username && (
            <Button onClick={() => this.handleEdit("menu")}>EDIT MENU IMAGE</Button>
          )}
          <br></br>
          <form
            id="menu"
            name="menu"
            onSubmit={this.submitUpdate}
            className="businessPageElement"
            hidden
          >
            <TextField
              className="BusinessPage__update_field"
              label="Menu URL"
              name="menu"
              id="outlined-basic"
              type="url"
              placeholder="new Menu URL..."
              value={this.state.keyToUpdate.menu}
              onChange={this.handleInput}
            />
            <Button type="Submit">Update</Button>
          </form>
        </div>
        <SupportBusiness votes={votes} username={this.state.username} />

        <section className="BusinessPage__contactInfo_card">
          <h2 className="singlebusinessCard__title">Contact Information:</h2>
          <section className="BusinessPage__contactInformation_group">
            <section className="BusinessPage__contactInfo_element">
              <a className="singlebusinessCard__title">Phone Number:</a>
              <br></br>
              <u>
                <a href="">{phoneNumber}</a>
              </u>
              <br></br>
              {loggedInUser === this.state.username && (
                <Button onClick={() => this.handleEdit("phoneNumber")}>
                  EDIT PHONE NUMBER
                </Button>
              )}
              <form
                className="businessPageElement"
                id="phoneNumber"
                name="phoneNumber"
                onSubmit={this.submitUpdate}
                hidden
              >
                <TextField
                  className="BusinessPage__update_field"
                  label="Phone Number"
                  type="text"
                  id="outlined-basic"
                  name="phoneNumber"
                  pattern="(0|(\+44))(044)?(7|1|2)(\d{9})"
                  placeholder="update your business phone number..."
                  value={this.state.keyToUpdate.phoneNumber}
                  onChange={this.handleInput}
                />
                <Button type="Submit">Update</Button>
              </form>
            </section>
            <section className="BusinessPage__contactInfo_element">
              <a className="singlebusinessCard__title">Post Code:</a>
              <br></br>
              <u>
                <a href="">{postCode}</a>
              </u>
              <br></br>
              {loggedInUser === this.state.username && (
                <Button onClick={() => this.handleEdit("postCode")}>EDIT POSTCODE</Button>
              )}
              <form
                className="businessPageElement"
                id="postCode"
                name="postCode"
                onSubmit={this.submitUpdate}
                hidden
              >
                <TextField
                  className="BusinessPage__update_field"
                  label="Post Code"
                  name="postCode"
                  id="outlined-basic"
                  type="text"
                  pattern="^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$"
                  placeholder="update your post code..."
                  value={this.state.keyToUpdate.postCode}
                  onChange={this.handleInput}
                />
                <Button type="Submit">Update</Button>
              </form>
            </section>
            <section className="BusinessPage__contactInfo_element">
              <a className="singlebusinessCard__title">Email: </a>
              <br />
              <u>
                {" "}
                <a href="">{businessEmail}</a>
              </u>
              <br></br>
              {loggedInUser === this.state.username && (
                <Button onClick={() => this.handleEdit("businessEmail")}>
                  EDIT BUSINESS EMAIL
                </Button>
              )}
              <form
                className="businessPageElement"
                id="businessEmail"
                name="businessEmail"
                onSubmit={this.submitUpdate}
                hidden
              >
                <TextField
                  className="BusinessPage__update_field"
                  label="Business Email"
                  name="businessEmail"
                  id="outlined-basic"
                  type="email"
                  placeholder="update your business email..."
                  value={this.state.keyToUpdate.businessEmail}
                  onChange={this.handleInput}
                />
                <Button type="Submit">Update</Button>
              </form>
              <br></br>
            </section>
          </section>
        </section>
        <PostComment
          loggedInUser={loggedInUser}
          username={this.props.username}
          addComment={this.addComment}
        />
        <section className="BusinessPage__show_comments_button">
          {this.state.changeNameOfButton === false ? (
            <Button onClick={this.handlesReadComments} variant="contained">
              Show comments
            </Button>
          ) : (
              <Button onClick={this.handlesReadComments} variant="contained">
                Hide comments
              </Button>
            )}
        </section>
        {comments.map((comment) => {
          // console.log(comment.commentId);
          return (
            <>
              {this.state.isShown ? (
                <CommentCard
                  key={comment.commentId}
                  comment={comment}
                  businessUsername={this.state.username}
                  deleteComment={this.handlesDelete}
                  loggedInUser={loggedInUser}
                />
              ) : null}
            </>
          );
        })}
        {/* </> */}
        {/* )} */}
      </section>
    );
  }

  componentDidMount = () => {
    api
      .fetchBusinessByUsername(this.props.username)
      .then(
        ({
          businessName,
          businessEmail,
          about,
          postCode,
          phoneNumber,
          logoUrl,
          tables,
          comments,
          cuisine,
          updates,
          menu,
          businessType,
          username,
          votes,
        }) => {
          this.setState({
            businessName,
            businessEmail,
            about,
            postCode,
            phoneNumber,
            logoUrl,
            tables,
            comments,
            cuisine,
            updates,
            menu,
            businessType,
            username,
            votes,
            isLoading: false,
          });
        }
      )
      .catch((err) => {
        this.setState({ error: err.code });
      });
    this.fetchComments();
  };

  fetchComments = () => {
    return axios
      .get(
        `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${this.props.username}/comments`
      )
      .then((response) => {
        console.log(response.data, "---> this is the response");
        this.setState({ comments: response.data });
      });
  };

  submitUpdate = (event) => {
    event.preventDefault();
    const { name } = event.target;
    const { loggedInUser } = this.props;
    let value = event.target.children[0].value;
    let newValue = this.state.keyToUpdate[name];
    this.setState({ [name]: value || newValue });
    this.handleEdit(name);
    api
      .updateBusiness(loggedInUser, { key: name, value: value || newValue })
      .then(() => {
        this.setState({ keyToUpdate: { [name]: "" } });
      })
      .catch((err) => {
        this.setState({ error: err.code });
      });
  };

  handleEdit = (id) => {
    if (document.getElementById(id).hasAttribute("hidden")) {
      document.getElementById(id).removeAttribute("hidden");
    } else {
      document.getElementById(id).setAttribute("hidden", true);
    }
  };

  handleInput = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);

    const { value, name } = event.target;
    this.setState({ keyToUpdate: { [name]: value } });
  };

  addComment = () => {
    this.fetchComments();
  };

  handlesDelete = (commentId) => {
    const { username } = this.state;
    let userPrompt = prompt(
      "Are you sure you want to delete this comment? Type yes if you do"
    );
    if (userPrompt === "yes") {
      api.deleteCommentByCommentId(commentId, username).then(() => {
        this.fetchComments();
      });
    } else {
      return alert("Deleted comment aborted!");
    }
  };

  handlesReadComments = () => {
    const doesShow = this.state.isShown;
    const changeName = this.state.changeNameOfButton;
    this.setState({ isShown: !doesShow, changeNameOfButton: !changeName });
  };
}

export default BusinessPage;
