import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";
import LoadingIndicator from "./LoadingIndicator";
import PostComment from "./PostComment";
import axios from "axios";
import SupportBusiness from "./SupportBusiness";

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
      <section>
        <h2>{businessName}</h2>
        {loggedInUser === this.state.username && (
          <button onClick={() => this.handleEdit("businessName")}>EDIT</button>
        )}
        <form
          id="businessName"
          name="businessName"
          onSubmit={this.submitUpdate}
          hidden
        >
          <input
            name="businessName"
            type="text"
            placeholder="update your business name..."
            value={this.state.keyToUpdate.businessName}
            onChange={this.handleInput}
          />
          <button>Update</button>
        </form>
        <p>{businessType}</p>
        {loggedInUser === this.state.username && (
          <button onClick={() => this.handleEdit("businessType")}>EDIT</button>
        )}
        <form
          id="businessType"
          name="businessType"
          onSubmit={this.submitUpdate}
          hidden
        >
          <select id="businessType" name="businessType">
            <option value="restaurant">Restaurant</option>
            <option value="pub">Pub</option>
            <option value="cafe">Cafe</option>
            <option value="takeaway">Takeaway</option>
          </select>
          <button>Update</button>
        </form>
        <img
          src={logoUrl}
          alt={`Logo for ${businessName}`}
          className="largePic"
        />
        {loggedInUser === this.state.username && (
          <button onClick={() => this.handleEdit("logoUrl")}>EDIT</button>
        )}
        <form id="logoUrl" name="logoUrl" onSubmit={this.submitUpdate} hidden>
          <input
            name="logoUrl"
            type="url"
            placeholder="input your new logo URL..."
            value={this.state.keyToUpdate.logoUrl}
            onChange={this.handleInput}
          />
          <button>Update</button>
        </form>
        <p>{about}</p>
        {loggedInUser === this.state.username && (
          <button onClick={() => this.handleEdit("about")}>EDIT</button>
        )}
        <form id="about" name="about" onSubmit={this.submitUpdate} hidden>
          <textarea
            name="about"
            placeholder="update your business information..."
            value={this.state.keyToUpdate.about}
            onChange={this.handleInput}
          ></textarea>
          <button>Update</button>
        </form>
        <p>Latest News: {updates}</p>
        {loggedInUser === this.state.username && (
          <button onClick={() => this.handleEdit("updates")}>EDIT</button>
        )}
        <form id="updates" name="updates" onSubmit={this.submitUpdate} hidden>
          <textarea
            name="updates"
            placeholder="update the latest news for your business..."
            value={this.state.keyToUpdate.updates}
            onChange={this.handleInput}
          ></textarea>
          <button>Update</button>
        </form>
        <img src={menu} alt="cafe menu" className="menu_image" />
        {loggedInUser === this.state.username && (
          <button onClick={() => this.handleEdit("menu")}>EDIT</button>
        )}
        <form id="menu" name="menu" onSubmit={this.submitUpdate} hidden>
          <input
            name="menu"
            type="url"
            placeholder="input your the URL for your new menu..."
            value={this.state.keyToUpdate.menu}
            onChange={this.handleInput}
          />
          <button>Update</button>
        </form>
        <p>Email: {businessEmail}</p>
        {loggedInUser === this.state.username && (
          <button onClick={() => this.handleEdit("businessEmail")}>EDIT</button>
        )}
        <form
          id="businessEmail"
          name="businessEmail"
          onSubmit={this.submitUpdate}
          hidden
        >
          <input
            name="businessEmail"
            type="email"
            placeholder="update your business email..."
            value={this.state.keyToUpdate.businessEmail}
            onChange={this.handleInput}
          />
          <button>Update</button>
        </form>
        <p>Phone Number: {phoneNumber}</p>
        {loggedInUser === this.state.username && (
          <button onClick={() => this.handleEdit("phoneNumber")}>EDIT</button>
        )}
        <form
          id="phoneNumber"
          name="phoneNumber"
          onSubmit={this.submitUpdate}
          hidden
        >
          <input
            type="text"
            name="phoneNumber"
            pattern="(0|(\+44))(044)?(7|1|2)(\d{9})"
            placeholder="update your business phone number..."
            value={this.state.keyToUpdate.phoneNumber}
            onChange={this.handleInput}
          />
          <button>Update</button>
        </form>
        <p>Post Code: {postCode}</p>
        {loggedInUser === this.state.username && (
          <button onClick={() => this.handleEdit("postCode")}>EDIT</button>
        )}
        <form id="postCode" name="postCode" onSubmit={this.submitUpdate} hidden>
          <input
            name="postCode"
            type="text"
            pattern="^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$"
            placeholder="update your post code..."
            value={this.state.keyToUpdate.postCode}
            onChange={this.handleInput}
          />
          <button>Update</button>
        </form>
        <p>Tables Currently Available: {tables}</p>
        {loggedInUser === this.state.username && (
          <button onClick={() => this.handleEdit("tables")}>EDIT</button>
        )}
        <form id="tables" name="tables" onSubmit={this.submitUpdate} hidden>
          <input
            name="tables"
            type="text"
            value={this.state.keyToUpdate.tables}
            placeholder="update the number or tables currently available..."
            onChange={this.handleInput}
          />
          <button>Update</button>
        </form>
        <p>Cuisine: {cuisine}</p>
        {loggedInUser === this.state.username && (
          <button onClick={() => this.handleEdit("cuisine")}>EDIT</button>
        )}
        <form id="cuisine" name="cuisine" onSubmit={this.submitUpdate} hidden>
          <select id="cuisine" name="cuisine">
            <option value="Chinese">Chinese</option>
            <option value="Thai">Thai</option>
            <option value="Indian">Indian</option>
            <option value="British">British</option>
            <option value="Italian">Italian</option>
            <option value="Spanish">Spanish</option>
            <option value="American">American</option>
            <option value="Greek">Greek</option>
            <option value="French">French</option>
            <option value="Japanese">Japanese</option>
            <option value="Mexican">Mexican</option>
            <option value="Other">Other</option>
          </select>
          <button>Update</button>
        </form>
        <SupportBusiness votes={votes} username={this.state.username} />
        <PostComment
          username={this.props.username}
          addComment={this.addComment}
        />
        {/*insert form field to add comment to single business - business username is this.state.username*/}
        {comments !== undefined && (
          <>
            <p>Comments:</p>
            {comments.map((comment) => {
              // console.log(comment.commentId);
              return (
                <>
                  <CommentCard
                    key={comment.commentId}
                    comment={comment}
                    username={this.props.username}
                    deleteComment={this.handlesDelete}
                  />
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
    this.setState({ [name]: value });
    api
      .updateBusiness(loggedInUser, { key: name, value: newValue })
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
    const { value, name } = event.target;
    this.setState({ keyToUpdate: { [name]: value } });
  };

  addComment = () => {
    this.fetchComments();
  };

  handlesDelete = (commentId) => {
    const { username } = this.state;
    api.deleteCommentByCommentId(commentId, username).then(() => {
      this.fetchComments();
    });
  };
}

export default BusinessPage;
