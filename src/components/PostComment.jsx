import React, { Component } from "react";
import * as api from "../utils/api";
import { TextField, FormControl, Button } from "@material-ui/core";

class PostComment extends Component {
  state = {
    username: this.props.username,
    body: "",
  };
  render() {
    const { body } = this.state;
    return (
      <div>
        <form onSubmit={this.handlesCommentSubmission} className={"textInput"}>
          <TextField
            id="outlined-basic"
            label="Add new comment"
            onChange={this.handlesInput}
            className="input"
            name="body"
            type="text"
            value={body}
            variant="filled"
            required
          />
          <button>Submit a new comment</button>
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
    const { username } = this.props;
    const { body } = this.state;
    api
      .commentPoster({
        username: username,
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
