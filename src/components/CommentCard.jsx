import React from "react";
import CommentVoter from "./CommentVoter";
import { Button } from "@material-ui/core";

const CommentCard = (props) => {
  const { username, body, createdAt, commentId, votes } = props.comment;

  const { deleteComment, loggedInUser } = props;

  const handleClick = (event) => {
    deleteComment(event.currentTarget.value);
  };

  return (
    <section className="commentElements">
      <h3>
        {username} posted this at {createdAt}
      </h3>
      <p>{body}</p>
      <div>
        <CommentVoter
          commentId={commentId}
          businessUsername={props.businessUsername}
          votes={votes}
        />
      </div>
      {username === loggedInUser ? (
        <Button onClick={handleClick} value={commentId} variant="contained">
          Delete comment
        </Button>
      ) : null}
    </section>
  );
};

export default CommentCard;
