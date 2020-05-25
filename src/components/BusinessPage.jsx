import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";

class BusinessPage extends Component {
  state = {
    username: 'bob',
    businessName: "Jodi's place",
    id: "35",
    businessEmail: "jodi@place.com",
    about: "Wonderful food for all!",
    postCode: "LS7 4DP",
    logoURL: "https://images.unsplash.com/photo-1580821082847-c53037ecfe0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    tables: "12",
    address: '16 Headingly Lane, Hyde Park',
    businessType: 'Cafe',
    cuisine: 'Japanese',
    vegan: 'yes',
    vegetarian: 'yes',
    halal: 'no',
    glutenFree: 'yes',
    phoneNumber: '01234 567899',
    updates: 'Latest specials include mouth watering sashimi and unagi.',
    menu: 'https://images.unsplash.com/photo-1515697320591-f3eb3566bc3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
    facebook: 'www.facebook.com',
    twitter: 'www.twitter.com',
    instagram: 'www.instagram.com',
    comments: [{ comment_id: '123', username: 'bob', created_at: 1590414025, body: "'I can't believe the amazing sushi I had here last night. My taste buds almost explode due to the joy of chowing down on the unagi nigiri." }],
  }
  // {
  //   businessName: "Simeon's place",
  //   id: "36",
  //   businessEmail: "simeon@place.com",
  //   about: "Pretty good food for some of us!",
  //   postCode: "LS7 4XL",
  //   logoURL: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
  //   tables: "14",
  //   businessUsername: "simeonplace",
  //   comments: [],
  // }
  // };

  render() {
    const {
      businessName,
      businessEmail,
      about,
      postCode,
      logoURL,
      tables,
      comments,
      cuisine,
      updates,
      menu,
      businessType
    } = this.state;
    const loggedInUser = this.props.username;
    console.log(this.props, '<-- props')
    console.log(loggedInUser, '<-- the logged in user')
    console.log(this.state.username, '<-- the user in state')
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
          src={logoURL}
          alt={`Logo for ${businessName}`}
          className="largePic"
        />
        {loggedInUser === this.state.username &&
          <button onClick={() => this.handleEdit("logoURL")} >EDIT</button>}
        <form id="logoURL" name="logoURL" onSubmit={this.submitUpdate} hidden>
          <input
            type="text"
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
            type="text"
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
            type="text"
            ref={(input) => (this.textInput = input)}
            placeholder="update your business email..."
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

  // componentDidMount = () => {
  //   api
  //     .fetchBusinessById(this.props.id)
  //     .then(
  //       ({
  //         businessName,
  //         businessEmail,
  //         about,
  //         postCode,
  //         logoURL,
  //         tables,
  //         username,
  //         comments,
  //       }) => {
  //         this.setState({
  //           businessName,
  //           businessEmail,
  //           about,
  //           postCode,
  //           logoURL,
  //           tables,
  //           businessUsername: username,
  //           comments,
  //         });
  //       }
  //     )
  //     .catch((err) => {
  //       console.log(err, "<-- error in BusinessPage cDM");
  //     });
  // };

  submitUpdate = (event) => {
    event.preventDefault();
    const { loggedInUser } = this.props;
    const { name } = event.target;
    this.setState({ [name]: this.textInput.value });
    api
      .updateBusiness(loggedInUser, { key: name, value: this.textInput.value })
      .catch((err) => {
        console.log(err, "<--Error in BusinessPage submitUpdate");
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
