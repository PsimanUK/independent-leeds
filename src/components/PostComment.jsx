import React, { Component } from "react";
import * as api from "../utils/api";
import { TextField, Button } from "@material-ui/core";

class PostComment extends Component {
  state = {
    username: this.props.username,
    body: "",
  };
  render() {
    const { body } = this.state;
    return (
      <div>
        <form onSubmit={this.handlesCommentSubmission}>
          <TextField
            id="outlined-basic"
            label="Add new comment"
            onChange={this.handlesInput}
            name="body"
            type="text"
            value={body}
            variant="filled"
            required
          />
          <br></br>
          <Button type="Submit" variant="contained">
            Submit a new comment
          </Button>
        </form>
      </div>
    );
  }
  handlesInput = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handlesCommentSubmission = (event) => {
    event.preventDefault();
    const { username, loggedInUser } = this.props;
    const { body } = this.state;
    api
      .commentPoster(username, {
        username: loggedInUser,
        body: body,
      })
      .then((response) => {
        console.log(response, "-----> this is the new comment");
        this.props.addComment(response);
        this.setState({
          body: "",
          response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default PostComment;
