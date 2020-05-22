import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";

class BusinessPage extends Component {
  state = {
    businessName: "",
    businessEmail: "",
    about: "",
    postCode: "",
    logoURL: "",
    tables: "",
    businessUsername: "",
    comments: [],
  };

  render() {
    const {
      businessName,
      businessEmail,
      about,
      postCode,
      logoURL,
      tables,
      comments,
    } = this.state;
    const loggedInUser = this.props.username;
    return (
      <section>
        <h2>{businessName}</h2>
        <img src={logoURL} alt={`Logo for ${businessName}`} />
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
        <p>{businessEmail}</p>
        <p>{postCode}</p>
        <p>{tables}</p>
        {comments !== undefined && comments.map((comment) => {
          return <CommentCard key={comment.comment_id} {...comment} />;
        })}
      </section>
    );
  }

  componentDidMount = () => {
    api
      .fetchBusinessById(this.props.id)
      .then(
        ({
          businessName,
          businessEmail,
          about,
          postCode,
          logoURL,
          tables,
          username,
          comments,
        }) => {
          this.setState({
            businessName,
            businessEmail,
            about,
            postCode,
            logoURL,
            tables,
            businessUsername: username,
            comments,
          });
        }
      )
      .catch((err) => {
        console.log(err, "<-- error in BusinessPage cDM");
      });
  };

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
