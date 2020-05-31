import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";
import LoadingIndicator from "./LoadingIndicator";
import PostComment from "./PostComment";
import axios from "axios";
import SupportBusiness from "./SupportBusiness";

import {
  TextField,
  FormControl,
  MenuItem,
  Button,
  Select,
  Input,
} from "@material-ui/core";

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
    return (
      <section className="singleBusiness">
        <h1>Business Name: {businessName}</h1>
        {loggedInUser === this.state.username && (
          <Button onClick={() => this.handleEdit("businessName")}>EDIT</Button>
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
        <>
          <img
            src={logoUrl}
            alt={`Logo for ${businessName}`}
            className="largePic"
          />
          <form
            className="businessPageElement"
            id="logoUrl"
            name="logoUrl"
            onSubmit={this.submitUpdate}
            hidden
          >
            <TextField
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
        </>
        <h3>Type: {businessType}</h3>
        {loggedInUser === this.state.username && (
          <Button onClick={() => this.handleEdit("businessType")}>EDIT</Button>
        )}
        <form
          name="businessType"
          onSubmit={this.submitUpdate}
          className="businessPageElement"
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

        <h3>Cuisine: {cuisine}</h3>
        {loggedInUser === this.state.username && (
          <Button onClick={() => this.handleEdit("cuisine")}>EDIT</Button>
        )}
        <form
          name="cuisine"
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
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <Button type="Submit" id="cuisine">
            Update
          </Button>
        </form>
        {loggedInUser === this.state.username && (
          <Button onClick={() => this.handleEdit("logoUrl")}>EDIT</Button>
        )}

        <h3> About {businessName}</h3>
        <p className="businessPageDescription">{about}</p>
        {loggedInUser === this.state.username && (
          <Button onClick={() => this.handleEdit("about")}>EDIT</Button>
        )}
        <form
          id="about"
          name="about"
          onSubmit={this.submitUpdate}
          hidden
          className="businessPageElement"
        >
          <TextField
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
        <h3>Latest News</h3>
        <p className="businessPageDescription">{updates}</p>
        {loggedInUser === this.state.username && (
          <Button onClick={() => this.handleEdit("updates")}>EDIT</Button>
        )}
        <form
          className="businessPageElement"
          id="updates"
          name="updates"
          onSubmit={this.submitUpdate}
          hidden
        >
          <TextField
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
        <h3>Tables Currently Available</h3>
        <p>{tables}</p>
        {loggedInUser === this.state.username && (
          <Button onClick={() => this.handleEdit("tables")}>EDIT</Button>
        )}
        <form
          id="tables"
          name="tables"
          onSubmit={this.submitUpdate}
          className="businessPageElement"
          hidden
        >
          <TextField
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
        <h3 className>Menu</h3>
        <img src={menu} alt="cafe menu" className="menu_image" />
        {loggedInUser === this.state.username && (
          <Button onClick={() => this.handleEdit("menu")}>EDIT</Button>
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
        <SupportBusiness votes={votes} username={this.state.username} />
        <div>
          <h3>Contact Information:</h3>
          <h4>Email</h4>
          <p>{businessEmail}</p>
          {loggedInUser === this.state.username && (
            <Button onClick={() => this.handleEdit("businessEmail")}>
              EDIT
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
          <h3>Phone Number</h3>
          <p>{phoneNumber}</p>
          {loggedInUser === this.state.username && (
            <Button onClick={() => this.handleEdit("phoneNumber")}>EDIT</Button>
          )}
          <form
            className="businessPageElement"
            id="phoneNumber"
            name="phoneNumber"
            onSubmit={this.submitUpdate}
            hidden
          >
            <TextField
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
          <h3>Post Code</h3>
          <p>{postCode}</p>
          {loggedInUser === this.state.username && (
            <Button onClick={() => this.handleEdit("postCode")}>EDIT</Button>
          )}
          <form
            className="businessPageElement"
            id="postCode"
            name="postCode"
            onSubmit={this.submitUpdate}
            hidden
          >
            <TextField
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
        </div>
        <br></br>
        <PostComment
          username={this.props.username}
          addComment={this.addComment}
        />
        {this.state.changeNameOfButton === false ? (
          <div>
            <Button onClick={this.handlesReadComments}>Show comments</Button>
          </div>
        ) : (
          <Button onClick={this.handlesReadComments}>Hide comments</Button>
        )}
        {/*insert form field to add comment to single business - business username is this.state.username*/}
        {comments !== undefined && (
          <>
            {comments.map((comment) => {
              // console.log(comment.commentId);
              return (
                <>
                  {this.state.isShown ? (
                    <CommentCard
                      key={comment.commentId}
                      comment={comment}
                      username={this.props.username}
                      deleteComment={this.handlesDelete}
                    />
                  ) : null}
                </>
              );
            })}
          </>
        )}
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
