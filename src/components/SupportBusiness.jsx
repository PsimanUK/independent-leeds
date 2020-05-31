import React, { Component } from "react";
import * as api from "../utils/api";
import { Button } from "@material-ui/core";

class SupportBusiness extends Component {
  state = {
    voteChange: 0,
  };
  render() {
    return (
      <div>
        <h3>Votes: {this.props.votes + this.state.voteChange}</h3>
        <Button
          onClick={() => this.handlesVoteChange(1)}
          disabled={this.state.voteChange === 1}
          variant="contained"
          className="businessPageButton"
        >
          Support Business
        </Button>
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
