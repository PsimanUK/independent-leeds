import React, { Component } from "react";
import * as api from "../utils/api";

class CommentVoter extends Component {
  state = {
    voteChange: 0,
  };
  render() {
    return (
      <div>
        <p>Votes: {this.props.votes + this.state.voteChange}</p>
        <button
          onClick={() => this.handlesVoteChange(1)}
          disabled={this.state.voteChange === 1}
        >
          Increase vote
        </button>
        <button
          onClick={() => this.handlesVoteChange(-1)}
          disabled={this.state.voteChange === -1}
        >
          Decrease vote
        </button>
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
