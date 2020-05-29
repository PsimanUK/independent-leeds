import React, { Component } from "react";
import * as api from "../utils/api";

class SupportBusiness extends Component {
  state = {
    voteChange: 0,
  };
  render() {
    return (
      <div>
        <p>Votes: {this.props.votes + this.state.voteChange}</p>
        <button onClick={() => this.handlesVoteChange(1)}>
          Support Business
        </button>
      </div>
    );
  }
  handlesVoteChange = (vote) => {
    const { username } = this.props;
    api.supportBusinessVoter(username, vote);

    this.setState((currentState) => {
      return {
        voteChange: currentState.voteChange + vote,
      };
    });
  };
}

export default SupportBusiness;
