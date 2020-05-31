import React from "react";
import CommentVoter from "./CommentVoter";
import { Button } from "@material-ui/core";

const CommentCard = (props) => {
  const { username, body, createdAt, commentId, votes } = props.comment;
  console.log(commentId);

  const { deleteComment } = props;

  const handleClick = (event) => {
    deleteComment(event.currentTarget.value);
  };

  // console.log(props.username);
  return (
    <section className="commentElements">
      <h3>
        {username} posted this at {createdAt}
      </h3>
      <p>{body}</p>
      <div>
        <CommentVoter commentId={commentId} username={username} votes={votes} />
      </div>
      {username === props.username ? (
        <Button onClick={handleClick} value={commentId} variant="contained">
          Delete comment
        </Button>
      ) : null}
    </section>
  );
};

export default CommentCard;
