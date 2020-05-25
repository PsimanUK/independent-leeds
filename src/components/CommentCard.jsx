import React from "react";

const CommentCard = ({ username, body, created_at }) => {
  return (
    <section>
      <h3>User: {username}</h3>
      <h4>Date: {created_at}</h4>
      <p>{body}</p>
    </section>
  );
};

export default CommentCard;
