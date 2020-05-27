import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";

class BusinessPage extends Component {
  state = {
    username: '',
    businessName: "",
    businessEmail: "",
    about: "",
    postCode: "",
    logoUrl: "",
    tables: "",
    address: '',
    businessType: '',
    cuisine: '',
    vegan: '',
    vegetarian: '',
    halal: '',
    glutenFree: '',
    phoneNumber: '',
    updates: '',
    menu: '',
    facebook: '',
    twitter: '',
    instagram: '',
    comments: [],
  }

  render() {
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
      businessType
    } = this.state;
    const { loggedInUser } = this.props;
    return (
      <section>
        <h2>{businessName}</h2>
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("businessName")} >EDIT</button>}
        <form id="businessName" name="businessName" onSubmit={this.submitUpdate} hidden>
          <input
            type="text"
            ref={(input) => (this.textInput = input)}
            placeholder="update your business name..."
          />
          <button>Update</button>
        </form>
        <p>{businessType}</p>
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("businessType")} >EDIT</button>}
        <form id="businessType" name="businessType" onSubmit={this.submitUpdate} hidden>
          <select
            id="businessType"
            name="businessType"
          >
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
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("logoUrl")} >EDIT</button>}
        <form id="logoUrl" name="logoUrl" onSubmit={this.submitUpdate} hidden>
          <input
            type="url"
            ref={(input) => (this.textInput = input)}
            placeholder="input your new logo URL..."
          />
          <button>Update</button>
        </form>
        <p>{about}</p>
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("about")} >EDIT</button>}
        <form id="about" name="about" onSubmit={this.submitUpdate} hidden>
          <textarea
            ref={(input) => (this.textInput = input)}
            placeholder="update your business information..."
          ></textarea>
          <button>Update</button>
        </form>
        <p>Latest News: {updates}</p>
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("updates")} >EDIT</button>}
        <form id="updates" name="updates" onSubmit={this.submitUpdate} hidden>
          <textarea
            ref={(input) => (this.textInput = input)}
            placeholder="update the latest news for your business..."
          ></textarea>
          <button>Update</button>
        </form>
        <img src={menu} alt="cafe menu" className="menu_image" />
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("menu")} >EDIT</button>}
        <form id="menu" name="menu" onSubmit={this.submitUpdate} hidden>
          <input
            type="url"
            ref={(input) => (this.textInput = input)}
            placeholder="input your the URL for your new menu..."
          />
          <button>Update</button>
        </form>
        <p>Email: {businessEmail}</p>
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("businessEmail")} >EDIT</button>}
        <form id="businessEmail" name="businessEmail" onSubmit={this.submitUpdate} hidden>
          <input
            type="email"
            ref={(input) => (this.textInput = input)}
            placeholder="update your business email..."
          />
          <button>Update</button>
        </form>
        <p>Phone Number: {phoneNumber}</p>
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("phoneNumber")} >EDIT</button>}
        <form id="phoneNumber" name="phoneNumber" onSubmit={this.submitUpdate} hidden>
          <input
            type="text"
            ref={(input) => (this.textInput = input)}
            pattern="(0|(\+44))(044)?(7|1|2)(\d{9})"
            placeholder="update your business phone number..."
          />
          <button>Update</button>
        </form>
        <p>Post Code: {postCode}</p>
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("postCode")} >EDIT</button>}
        <form id="postCode" name="postCode" onSubmit={this.submitUpdate} hidden>
          <input
            type="text"
            ref={(input) => (this.textInput = input)}
            pattern="^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$"
            placeholder="update your post code..."
          />
          <button>Update</button>
        </form>
        <p>Tables Currently Available: {tables}</p>
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("tables")} >EDIT</button>}
        <form id="tables" name="tables" onSubmit={this.submitUpdate} hidden>
          <input
            type="text"
            ref={(input) => (this.textInput = input)}
            placeholder="update the number or tables currently available..."
          />
          <button>Update</button>
        </form>
        <p>Cuisine: {cuisine}</p>
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("cuisine")} >EDIT</button>}
        <form id="cuisine" name="cuisine" onSubmit={this.submitUpdate} hidden>
          <input
            type="text"
            ref={(input) => (this.textInput = input)}
            placeholder="update your cuisine..."
          />
          <button>Update</button>
        </form>
        {comments !== undefined && <><p>Comments:</p>
          {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} {...comment} />;
          })}
        </>
        }
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
            username
          });
        }
      )
      .catch((err) => {
        this.setState({ error: err.code });
      });
  };

  submitUpdate = (event) => {
    event.preventDefault();
    const { loggedInUser } = this.props;
    const { name } = event.target;
    this.setState({ [name]: this.textInput.value });
    api
      .updateBusiness(loggedInUser, { key: name, value: this.textInput.value })
      .catch((err) => {
        this.setState({ error: err.code });
      });
  };

  handleEdit = (id) => {
    if (document.getElementById(id).hasAttribute('hidden')) {
      document.getElementById(id).removeAttribute('hidden');
    } else {
      document.getElementById(id).setAttribute('hidden', true);
    }
  };

}

export default BusinessPage;
