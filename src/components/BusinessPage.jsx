import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";

class BusinessPage extends Component {
  state = {
    businessName: "Jodi's place",
    id: "35",
    businessEmail: "jodi@place.com",
    about: "Wonderful food for all!",
    postCode: "LS7 4DP",
    logoURL: "https://images.unsplash.com/photo-1580821082847-c53037ecfe0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    tables: "12",
    businessUsername: "jodiplace",
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
    console.log(new Date(), '<-- the timestamp')
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
    return (
      <section>
        <h2>{businessName}</h2>
        <p>{businessType}</p>
        <img
          src={logoURL}
          alt={`Logo for ${businessName}`}
          className="largePic"
        />
        <p>{about}</p>
        {loggedInUser === this.state.businessUsername && (
          <form name="about" onSubmit={this.submitUpdate}>
            <textarea
              ref={(input) => (this.textInput = input)}
              placeholder="update your details..."
            ></textarea>
            <button>Update</button>
          </form>
        )}
        <p>Latest News: {updates}</p>
        <img src={menu} alt="cafe menu" className="menu_image" />
        <p>Email: {businessEmail}</p>
        <p>Post Code: {postCode}</p>
        <p>Tables Currently Available: {tables}</p>
        <p>Cuisine: {cuisine}</p>
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
    const { name } = event.target;
    this.setState({ [name]: this.textInput.value });
    const { id } = this.props;
    api
      .updateBusinessById(id, { key: name, value: this.textInput.value })
      .catch((err) => {
        console.log(err, "<--Error in BusinessPage submitUpdate");
      });
  };
}

export default BusinessPage;
