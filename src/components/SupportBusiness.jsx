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
        <h3 className="businessCard__title">Votes:</h3>
        <strong>
          <p className="tablesAvailable">
            {this.props.votes + this.state.voteChange}
          </p>
        </strong>
        <Button
          onClick={() => this.handlesVoteChange(1)}
          disabled={this.state.voteChange === 1}
          variant="contained"
        >
          Support Business
        </Button>
      </div>
    );
  }
  handlesVoteChange = (vote) => {
    const { username } = this.props;
    alert(
      `Thank you for supporting ${username}'s business during this difficult time.`
    );
    api.supportBusinessVoter(username, vote);

    this.setState((currentState) => {
      return {
        voteChange: currentState.voteChange + vote,
      };
    });
  };
}

export default SupportBusiness;
