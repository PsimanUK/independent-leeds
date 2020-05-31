import React, { Component } from "react";
import * as api from "../utils/api";
import { Button } from "@material-ui/core";

class CommentVoter extends Component {
  state = {
    voteChange: 0,
  };
  render() {
    return (
      <div>
        <h3>
          <Button
            onClick={() => this.handlesVoteChange(1)}
            disabled={this.state.voteChange === 1}
            variant="contained"
          >
            Vote up
          </Button>
          {this.props.votes + this.state.voteChange}
          <Button
            onClick={() => this.handlesVoteChange(-1)}
            disabled={this.state.voteChange === -1}
            variant="contained"
          >
            Vote down
          </Button>
        </h3>
      </div>
    );
  }
  handlesVoteChange = (vote) => {
    const { commentId, username } = this.props;
    api.updateVotes(commentId, username, vote);

    this.setState((currentState) => {
      return {
        voteChange: currentState.voteChange + vote,
      };
    });
  };
}

export default CommentVoter;